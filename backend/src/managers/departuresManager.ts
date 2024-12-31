import { Departures } from "shared/types";
import { Manager } from "./manager.ts";
import fetchDepartures from "../crawlers/fetchDepartures.ts";

export class DeparturesManager extends Manager<Departures> {
	private static readonly STALE_AFTER_MS = 30_000; // 30 seconds

	protected override get dataName(): string {
		return "departures";
	}

	public constructor(onUpdateCallback: (departures: Departures) => void) {
		super((_oldData, newData) => onUpdateCallback(newData));
	}

	protected override isStale = (lastUpdated: Date): boolean => {
		const now = new Date();

		return now.getTime() - lastUpdated.getTime() > DeparturesManager.STALE_AFTER_MS;
	};

	protected override get emptyData(): Departures {
		return {
			ladova: [],
			natrati: [],
			vlak: [],
		};
	}

	protected override async getCurrent(): Promise<Departures | null> {
		return await fetchDepartures();
	}
}
