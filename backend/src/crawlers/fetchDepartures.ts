import type { Departure, Departures } from "shared/types";

import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.48/deno-dom-wasm.ts";
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

const FAKE_DATA = true;

export default async function fetchDepartures(): Promise<Departures> {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	const departures: Departures = FAKE_DATA
		? {
				ladova: [
					{
						carrier: "other",
						line: "392",
						time: "16:40",
						delay: null,
						destination: "Olomouc, aut. nádr. ",
					},
					{
						carrier: "DPMO",
						line: "18",
						time: "16:45",
						delay: null,
						destination: "Skrbeň",
					},
					{
						carrier: "DPMO",
						line: "21",
						time: "17:10",
						delay: null,
						destination: "Hlavní nádraží",
					},
				],
				natrati: [
					{
						carrier: "other",
						line: "392",
						time: "16:39",
						delay: null,
						destination: "Olomouc, aut. nádr. ",
					},
					{
						carrier: "DPMO",
						line: "20",
						time: "16:40",
						delay: null,
						destination: "Farmak",
					},
					{
						carrier: "DPMO",
						line: "20",
						time: "16:45",
						delay: null,
						destination: "Chomoutov, škola",
					},
				],
				vlak: [
					{
						carrier: "CD",
						line: "M4",
						time: "16:44",
						delay: null,
						destination: "Prostějov hl. n. ",
					},
					{
						carrier: "CD",
						line: "M4",
						time: "17:15",
						delay: "3",
						destination: "Olomouc hl. n. ",
					},
					{
						carrier: "CD",
						line: "M4",
						time: "18:44",
						delay: null,
						destination: "Senice na Hané",
					},
				],
		  }
		: {
				ladova: await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Ladova&fc=305003", 3),
				natrati: await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Na%20Trati&fc=305003", 3),
				vlak: await fetchDeparturesFromURL("https://idos.cz/vlakyautobusymhdvse/odjezdy/vysledky/?f=Olomouc-Hej%C4%8D%C3%ADn&fc=100003", 3),
		  };

	printFetchedData("departures");

	return departures;
}
