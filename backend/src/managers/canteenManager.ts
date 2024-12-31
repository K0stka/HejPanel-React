import { eq, lt } from "orm";
import { printClearedCache, printReadDataFromCache, printWrittenDataToDB } from "../utils/print.ts";

import type { Canteen } from "shared/types";
import { Manager } from "./manager.ts";
import { canteens } from "shared/schema";
import db from "shared/db";
import fetchCanteens from "../crawlers/fetchCanteens.ts";

export class CanteenManager extends Manager<Canteen> {
	protected override get dataName(): string {
		return "canteen";
	}

	public constructor(onUpdateCallback: (canteen: Canteen) => void) {
		super((_oldData, newData) => onUpdateCallback(newData));
	}

	protected override isStale = (lastUpdated: Date): boolean => {
		const now = new Date();

		return lastUpdated.getDate() !== now.getDate();
	};

	protected override get emptyData(): Canteen {
		return {
			snack: null,
			soup: null,
			lunch1: null,
			lunch2: null,
			lunch3: null,
			commonSuffix: null,
		};
	}

	protected override async getCurrent(): Promise<Canteen | null> {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		// Garbage collection
		await db.delete(canteens).where(lt(canteens.date, today)).execute();
		printClearedCache("canteen");

		if (today.getDay() === 0 || today.getDay() === 6) {
			printReadDataFromCache("canteen");
			return null;
		}

		const canteen = await db.query.canteens.findFirst({
			where: eq(canteens.date, today),
		});

		if (canteen) {
			printReadDataFromCache("canteen", true);
			return canteen;
		}

		const fetchedCanteens = await fetchCanteens();

		let currentCanteen: Canteen | null = null;
		let newCanteens = 0;

		for (const fetchedCanteen of fetchedCanteens) {
			const existingCanteen = await db.query.canteens.findFirst({
				where: eq(canteens.date, fetchedCanteen.date),
			});

			if (!existingCanteen) {
				await db.insert(canteens).values({
					date: fetchedCanteen.date,
					...fetchedCanteen.canteen,
				});
				newCanteens++;
			}

			if (fetchedCanteen.date === today) currentCanteen = existingCanteen ? existingCanteen : fetchedCanteen.canteen;
		}

		printWrittenDataToDB(`canteen × ${newCanteens}`);

		return currentCanteen;
	}
}
