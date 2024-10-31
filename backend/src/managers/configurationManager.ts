import db from "../db/connection.ts";

import type { Configuration, Theme } from "../../../shared/panel.d.ts";
import { configTable } from "../db/schema.ts";
import { printReadDataFromCache, printWrittenDataToCache } from "../utils/print.ts";

type ConfigurationChangeCallbacks = {
	onThemeChange: (theme: Theme) => void;
	onTimetableEnabledChange: (enabled: boolean) => void;
	onCanteenEnabledChange: (enabled: boolean) => void;
	onDeparturesEnabledChange: (enabled: boolean, skipHydrate: boolean) => void;
};

export default class ConfigurationManager {
	private configuration: Configuration;
	private loaded: boolean = false;

	private readonly onChangeCallbacks: ConfigurationChangeCallbacks;

	private readonly defaultConfiguration = { theme: "normal", timetableEnabled: false, canteenEnabled: false, departuresEnabled: false };

	constructor(callbacks: ConfigurationChangeCallbacks) {
		this.configuration = this.defaultConfiguration;
		this.onChangeCallbacks = callbacks;
	}

	public async init() {
		let config = await db.query.configTable.findFirst();

		if (!config) {
			config = this.defaultConfiguration;
			await db.insert(configTable).values(config).execute();
		}

		this.configuration = {
			theme: config.theme as Theme,
			timetableEnabled: config.timetableEnabled,
			canteenEnabled: config.canteenEnabled,
			departuresEnabled: config.departuresEnabled,
		};

		this.loaded = true;

		printReadDataFromCache("configuration", true);

		this.onChangeCallbacks.onDeparturesEnabledChange(this.configuration.departuresEnabled, true);
	}

	public get all(): Configuration {
		if (!this.loaded) throw new Error("State not loaded yet");

		printReadDataFromCache("configuration");

		return this.configuration;
	}

	public get theme(): Theme {
		if (!this.loaded) throw new Error("State not loaded yet");

		printReadDataFromCache("theme");

		return this.configuration.theme;
	}

	public set theme(value: Theme) {
		if (!this.loaded) throw new Error("State not loaded yet");

		if (this.configuration.theme === value) return;

		this.configuration.theme = value;
		db.update(configTable).set({ theme: value }).execute();

		printWrittenDataToCache("theme");

		this.onChangeCallbacks.onThemeChange(value);
	}

	public get timetableEnabled(): boolean {
		if (!this.loaded) throw new Error("State not loaded yet");

		printReadDataFromCache("timetableEnabled");

		return this.configuration.timetableEnabled;
	}

	public set timetableEnabled(value: boolean) {
		if (!this.loaded) throw new Error("State not loaded yet");

		if (this.configuration.timetableEnabled === value) return;

		this.configuration.timetableEnabled = value;
		db.update(configTable).set({ timetableEnabled: value }).execute();

		printWrittenDataToCache("timetableEnabled");

		this.onChangeCallbacks.onTimetableEnabledChange(value);
	}

	public get canteenEnabled(): boolean {
		if (!this.loaded) throw new Error("State not loaded yet");

		printReadDataFromCache("canteenEnabled");

		return this.configuration.canteenEnabled;
	}

	public set canteenEnabled(value: boolean) {
		if (!this.loaded) throw new Error("State not loaded yet");

		if (this.configuration.canteenEnabled === value) return;

		this.configuration.canteenEnabled = value;
		db.update(configTable).set({ canteenEnabled: value }).execute();

		printWrittenDataToCache("canteenEnabled");

		this.onChangeCallbacks.onCanteenEnabledChange(value);
	}

	public get departuresEnabled(): boolean {
		if (!this.loaded) throw new Error("State not loaded yet");

		printReadDataFromCache("departuresEnabled");

		return this.configuration.departuresEnabled;
	}

	public set departuresEnabled(value: boolean) {
		if (!this.loaded) throw new Error("State not loaded yet");

		if (this.configuration.departuresEnabled === value) return;

		this.configuration.departuresEnabled = value;
		db.update(configTable).set({ departuresEnabled: value }).execute();

		printWrittenDataToCache("departuresEnabled");

		this.onChangeCallbacks.onDeparturesEnabledChange(value, false);
	}
}
