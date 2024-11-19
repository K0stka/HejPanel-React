import type { Canteen, Either } from "shared/types";
import { printFetchedData } from "../utils/print.ts";

const fetchCanteens = async (): Promise<{ date: Date; canteen: Canteen }[]> => {
	const canteenResponse: Either<{ state: "error" }, { datum: string; nazev: string; druh: string }[][][]> = await fetch("https://app.strava.cz/api/jidelnicky", {
		method: "POST",
		headers: {
			"Content-Type": "text/plain",
		},
		body: '{"cislo":"1692"}',
	}).then((response) => response.json());

	if (canteenResponse.state === "error" || typeof canteenResponse[0] === "undefined" || canteenResponse[0].length === 0) {
		console.error("    Error while fetching canteen data");

		return [];
	}

	const canteens: { date: Date; canteen: Canteen }[] = [];

	for (const key in canteenResponse[0]) {
		if (canteenResponse[0][key].length === 0) continue;

		const day: Canteen = {
			snack: null,
			soup: null,
			lunch1: null,
			lunch2: null,
			lunch3: null,
			commonSuffix: null,
		};

		const lunchesProcessed: {
			lunch1: string[] | null;
			lunch2: string[] | null;
			lunch3: string[] | null;
		} = {
			lunch1: null,
			lunch2: null,
			lunch3: null,
		};

		canteenResponse[0][key].forEach((meal) => {
			switch (meal.druh) {
				case "X1":
					if (meal.nazev === "Polévka") break;
					day.soup = meal.nazev;
					break;
				case "O1":
					if (meal.nazev === "Oběd 1") break;
					day.lunch1 = meal.nazev;
					lunchesProcessed.lunch1 = meal.nazev.split(" ");
					break;
				case "O2":
					if (meal.nazev === "Oběd 2") break;
					day.lunch2 = meal.nazev;
					lunchesProcessed.lunch2 = meal.nazev.split(" ");
					break;
				case "O3":
					if (meal.nazev === "Oběd 3") break;
					day.lunch3 = meal.nazev;
					lunchesProcessed.lunch3 = meal.nazev.split(" ");
					break;
				case "SV":
					if (meal.nazev === "Svačina") break;
					day.snack = meal.nazev;
					break;
			}
		});

		if (!day.lunch1 && !day.lunch2 && !day.lunch3 && !day.soup && !day.snack) continue;

		const commonSuffix: string[] = [];

		if (lunchesProcessed.lunch1 && lunchesProcessed.lunch2 && lunchesProcessed.lunch3) {
			const minLunchLength = Math.min(lunchesProcessed.lunch1.length, lunchesProcessed.lunch2.length, lunchesProcessed.lunch3.length);

			for (let i = 0; i <= minLunchLength; i++) {
				if (
					lunchesProcessed.lunch1[lunchesProcessed.lunch1.length - i] === lunchesProcessed.lunch2[lunchesProcessed.lunch2.length - i] &&
					lunchesProcessed.lunch2[lunchesProcessed.lunch2.length - i] === lunchesProcessed.lunch3[lunchesProcessed.lunch3.length - i]
				) {
					commonSuffix.push(lunchesProcessed.lunch1[lunchesProcessed.lunch1.length - i]);
				} else break;
			}
		} else if (lunchesProcessed.lunch1 && lunchesProcessed.lunch2) {
			const minLunchLength = Math.min(lunchesProcessed.lunch1.length, lunchesProcessed.lunch2.length);

			for (let i = 0; i <= minLunchLength; i++) {
				if (lunchesProcessed.lunch1[lunchesProcessed.lunch1.length - i] === lunchesProcessed.lunch2[lunchesProcessed.lunch2.length - i]) {
					commonSuffix.push(lunchesProcessed.lunch1[lunchesProcessed.lunch1.length - i]);
				} else break;
			}
		}

		if (commonSuffix.length > 0 && commonSuffix.join().trim() !== "") {
			day.commonSuffix = commonSuffix.reverse().join(" ");

			if (day.lunch1) day.lunch1 = day.lunch1.slice(0, -day.commonSuffix.length).trim().replace(/,$/, "");
			if (day.lunch2) day.lunch2 = day.lunch2.slice(0, -day.commonSuffix.length).trim().replace(/,$/, "");
			if (day.lunch3) day.lunch3 = day.lunch3.slice(0, -day.commonSuffix.length).trim().replace(/,$/, "");

			day.commonSuffix = day.commonSuffix.trim();
		}

		const date = canteenResponse[0][key][0].datum.split(".").map((x) => parseInt(x));
		canteens.push({
			date: new Date(date[2], date[1] - 1, date[0]),
			canteen: day,
		});
	}

	printFetchedData("canteen");
	return canteens;
};

export default fetchCanteens;
