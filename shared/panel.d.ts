export type User = {
	id: number;
	name: string;
	role: "admin" | "user";
};

export type PanelThread = {
	id: number;
	owner: User;
};

export type PanelBase = {
	id: number;
	showFrom: Date;
	showTill: Date;
	type: "text" | "image";
};

export type TextPanel = PanelBase & {
	type: "text";
	content: string;
};

export type ImagePanel = PanelBase & {
	type: "image";
	url: string;
};

export type Panel = TextPanel | ImagePanel;

export type Canteen = {
	snack: string | null;
	soup: string | null;
	lunch1: string | null;
	lunch2: string | null;
	lunch3: string | null;
	commonSuffix: string | null;
};

export type Departures = {
	ladova: Departure[];
	natrati: Departure[];
	vlak: Departure | null;
};

export type Departure = {
	carrier: "DPMO" | "CD" | "other";
	line: string;
	time: string;
	delay: string | null;
	destination: string;
};

export const themes = ["normal", "dark", "light"];
export type Theme = (typeof themes)[number];

export type Configuration = {
	theme: Theme;
	timetableEnabled: boolean;
	canteenEnabled: boolean;
	departuresEnabled: boolean;
};

export type ClientState = Configuration & {
	online: boolean;
	panels: Panel[];
	canteen: Canteen;
	departures: Departures;
};

export type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
