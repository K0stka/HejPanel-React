import { printReadDataFromCache } from "../utils/print.ts";

interface RefreshOptions {
	suppressHydration?: boolean;
	ignoreNotStale?: boolean;
	ignoreNotEnabled?: boolean;
}

export abstract class Manager<T> {
	protected abstract get dataName(): string;

	private _enabled: boolean = false;
	public set enabled(value: boolean) {
		this._enabled = value;
	}

	private _data: T | null = null;
	protected abstract get emptyData(): T;
	public get current(): T {
		printReadDataFromCache(this.dataName);

		if (!this._data || !this._enabled) return this.emptyData;

		return this._data;
	}

	private _lastUpdated: Date | null = null;
	protected abstract isStale: (lastUpdated: Date) => boolean;
	private get _isStale(): boolean {
		if (!this._lastUpdated) return true;

		return this.isStale(this._lastUpdated);
	}

	private _onUpdateCallback: (oldData: T, newData: T) => void;

	public constructor(onUpdateCallback: (oldData: T, newData: T) => void) {
		this._onUpdateCallback = onUpdateCallback;
	}

	public async init(): Promise<void> {
		await this.refresh({
			suppressHydration: true,
		});
	}

	public async tick(): Promise<void> {
		await this.refresh();
	}

	public async dataSourceChanged(): Promise<void> {
		await this.refresh({
			ignoreNotStale: true,
		});
	}

	public async enable(): Promise<void> {
		await this.refresh({
			ignoreNotEnabled: true,
		});

		this._enabled = true;
	}

	public async disable(): Promise<void> {
		this._enabled = false;

		await this._onUpdateCallback(this._data ?? this.emptyData, this.emptyData);
	}

	private async refresh({ suppressHydration, ignoreNotEnabled, ignoreNotStale }: RefreshOptions = {}): Promise<void> {
		if (!this._enabled && !ignoreNotEnabled) return;
		if (!this._isStale && !ignoreNotStale) return;

		const oldData = this._data ?? this.emptyData;
		const newData = (await this.getCurrent()) ?? this.emptyData;

		this._data = newData;
		this._lastUpdated = new Date();

		if (!suppressHydration) await this._onUpdateCallback(oldData, newData);
	}

	protected abstract getCurrent(): Promise<T | null>;
}
