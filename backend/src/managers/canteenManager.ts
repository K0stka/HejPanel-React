import db from "../db/connection.ts";
import { canteenTable } from "../db/schema.ts";
import { eq, lt } from "drizzle-orm";

import type { Canteen } from "../../../panel.d.ts";
import fetchCanteens from "../crawlers/fetchCanteens.ts";
import { printClearedCache, printReadDataFromCache, printWrittenDataToCache } from "../utils/print.ts";

export default class CanteenManager {
	private canteens: Map<string, Canteen> = new Map();
	private onVisibleCanteenChange: () => void;
	private lastVisibleCanteenDate: Date | null = null;

	constructor(onVisibleCanteenChange: () => void) {
		this.onVisibleCanteenChange = onVisibleCanteenChange;

		setInterval(() => {
			const now = new Date();
			if (now.getDate() !== (this.lastVisibleCanteenDate ?? now).getDate()) this.onVisibleCanteenChange();
		}, 1000); //3_600_000);
	}

	public async init() {
		await db.delete(canteenTable).where(lt(canteenTable.date, new Date())).execute();

		printClearedCache("canteen");

		await this.current;
	}

	public async getCanteen(date: Date): Promise<Canteen> {
		if (this.canteens.has(date.toDateString())) {
			printReadDataFromCache("canteen", false);

			return this.canteens.get(date.toDateString())!;
		}

		const canteen = await db.query.canteenTable.findFirst({
			where: eq(canteenTable.date, date),
		});

		if (canteen) {
			this.canteens.set(date.toDateString(), canteen);

			printReadDataFromCache("canteen", true);

			return canteen;
		}

		const fetchedCanteens = await fetchCanteens();

		let canteenToReturn: Canteen = {
			snack: null,
			soup: null,
			lunch1: null,
			lunch2: null,
			lunch3: null,
			commonSuffix: null,
		};
		for (const fetchedCanteen of fetchedCanteens) {
			const existingCanteen = await db.query.canteenTable.findFirst({
				where: eq(canteenTable.date, fetchedCanteen.date),
			});

			if (!existingCanteen) {
				await db.insert(canteenTable).values({
					date: fetchedCanteen.date,
					...fetchedCanteen.canteen,
				});
				this.canteens.set(fetchedCanteen.date.toDateString(), fetchedCanteen.canteen);
			} else this.canteens.set(existingCanteen.date.toDateString(), existingCanteen);

			if (fetchedCanteen.date === date) canteenToReturn = existingCanteen ? existingCanteen : fetchedCanteen.canteen;
		}

		printWrittenDataToCache(`canteen × ${fetchedCanteens.length}`);

		return canteenToReturn;
	}

	public get current(): Promise<Canteen> {
		const now = new Date();
		this.lastVisibleCanteenDate = now;
		return this.getCanteen(now);
	}
}
