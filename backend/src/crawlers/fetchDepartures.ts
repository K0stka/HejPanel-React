import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";
import type { Departure, Departures } from "shared/types";
import { printFetchedData } from "../utils/print.ts";

const fetchDeparturesFromURL = async (url: string, numberOfElements: number): Promise<Departure[]> => {
	try {
		const document = new DOMParser().parseFromString(await fetch(url).then((res) => res.text()), "text/html");

		const departures: Departure[] = [];

		if (document) {
			let even = false;
			Array.from(document.querySelector("#col-content > div > div.box.connection > table > tbody")?.children ?? []).forEach((row) => {
				if (numberOfElements <= 0) return;

				if (even) {
					departures[departures.length - 1].carrier = ((): Departure["carrier"] => {
						switch (row.children[1].querySelector("span")?.textContent) {
							case "Dopravní podnik města Olomouce, a.s.":
								return "DPMO";
							case "České dráhy, a.s.":
								return "CD";
							case "ARRIVA autobusy a.s.":
							case "VOJTILA TRANS s.r.o.":
								return "other";
							default:
								throw new Error(`Unknown carrier ${row.children[1].querySelector("span")?.textContent}`);
						}
					})();

					departures[departures.length - 1].delay =
						row.children[2]
							.querySelector("a")
							?.innerText.replace(/Aktuální zpoždění ([0-9]+) min.*/, "$1")
							.replace("Aktuálně bez zpoždění", "")
							.replace("Nepředpokládá se zpoždění", "") ?? null;
					if (departures[departures.length - 1].delay === "") departures[departures.length - 1].delay = null;

					numberOfElements--;
				} else
					departures.push({
						carrier: "other",
						line:
							row.children[1]
								.querySelector("h3")
								?.textContent.trim()
								.replace(/\(.*\)/, "")
								.replace("Bus", "")
								.replace("Os", "")
								.replaceAll(" ", "") ?? "",
						time: row.children[2].querySelector("h3")?.textContent.match(/(\d{1,2}:\d{2})/)?.[0] ?? "",
						delay: null,
						destination:
							row.children[0]
								.querySelector("h3")
								?.textContent.trim()
								.replaceAll(/[,]+/g, ", ")
								.replaceAll(".", ". ")
								.replaceAll(/[ ]{2,}/g, " ") ?? "",
					});

				even = !even;
			});
		} else throw new Error("Failed to parse departures");

		return departures;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export default async function fetchDepartures(): Promise<Departures> {
	// const departures = {
	// 	ladova: await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Ladova&fc=305003", 3),
	// 	natrati: await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Na%20Trati&fc=305003", 3),
	// 	vlak: (await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Olomouc-Hej%C4%8D%C3%ADn&fc=100003", 1))[0] ?? null,
	// };

	printFetchedData("departures");

	const departures: Departures = {
		ladova: [
			{
				carrier: "DPMO",
				line: "13",
				time: "2:30",
				delay: "5",
				destination: "Svatý Kopeček",
			},
			{
				carrier: "CD",
				line: "RJ 1003",
				time: "12:45",
				delay: null,
				destination: "Praha hl.n.",
			},
			{
				carrier: "other",
				line: "Os 3103",
				time: "12:50",
				delay: null,
				destination: "Šumperk",
			},
		],
		natrati: [
			{
				carrier: "DPMO",
				line: "13",
				time: "12:30",
				delay: "5",
				destination: "Svatý Kopeček",
			},
			{
				carrier: "CD",
				line: "RJ 1003",
				time: "12:45",
				delay: null,
				destination: "Praha hl.n.",
			},
			{
				carrier: "other",
				line: "Os 3103",
				time: "12:50",
				delay: null,
				destination: "Šumperk",
			},
		],
		vlak: {
			carrier: "DPMO",
			line: "13",
			time: "12:30",
			delay: "5",
			destination: "Svatý Kopeček",
		},
	};

	return departures;
}
