import db from "../db/connector.ts";
import { canteens } from "../db/schema.ts";
import { eq, lt } from "drizzle-orm";

import type { Canteen } from "shared/types";
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
		}, 300_000);
	}

	public async init() {
		await db.delete(canteens).where(lt(canteens.date, new Date())).execute();

		printClearedCache("canteen");

		await this.current;
	}

	public async getCanteen(date: Date): Promise<Canteen> {
		if (date.getDay() === 0 || date.getDay() === 6) {
			printReadDataFromCache("canteen");
			return { snack: null, soup: null, lunch1: null, lunch2: null, lunch3: null, commonSuffix: null };
		}

		if (this.canteens.has(date.toDateString())) {
			printReadDataFromCache("canteen", false);

			return this.canteens.get(date.toDateString())!;
		}

		const canteen = await db.query.canteens.findFirst({
			where: eq(canteens.date, date),
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
			const existingCanteen = await db.query.canteens.findFirst({
				where: eq(canteens.date, fetchedCanteen.date),
			});

			if (!existingCanteen) {
				await db.insert(canteens).values({
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
