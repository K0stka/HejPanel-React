import db from "shared/db";

import type { Configuration, Theme } from "shared/types";
import { config } from "shared/schema";
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

	private readonly defaultConfiguration: Configuration = { theme: "normal", timetableEnabled: false, canteenEnabled: false, departuresEnabled: false };

	constructor(callbacks: ConfigurationChangeCallbacks) {
		this.configuration = this.defaultConfiguration;
		this.onChangeCallbacks = callbacks;
	}

	public async init() {
		const configuration = await db.query.config.findFirst();

		if (!configuration) {
			await db.insert(config).values(this.defaultConfiguration).execute();
		}

		this.configuration = {
			theme: configuration?.theme ?? this.defaultConfiguration.theme,
			timetableEnabled: configuration?.timetableEnabled ?? this.defaultConfiguration.timetableEnabled,
			canteenEnabled: configuration?.canteenEnabled ?? this.defaultConfiguration.canteenEnabled,
			departuresEnabled: configuration?.departuresEnabled ?? this.defaultConfiguration.departuresEnabled,
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
		db.update(config).set({ theme: value }).execute();

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
		db.update(config).set({ timetableEnabled: value }).execute();

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
		db.update(config).set({ canteenEnabled: value }).execute();

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
		db.update(config).set({ departuresEnabled: value }).execute();

		printWrittenDataToCache("departuresEnabled");

		this.onChangeCallbacks.onDeparturesEnabledChange(value, false);
	}
}
