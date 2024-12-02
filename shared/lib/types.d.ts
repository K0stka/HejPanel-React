import { userTypes, activityTypes, panelTypes, themes } from "./constants.ts";

export type User = {
	id: number;
	microsoftId: string;
	name: string;
	email: string;
	type: (typeof userTypes)[number];
};

export type UserOrId = User | number;

export type PanelThread = {
	id: number;
	owner: UserOrId;
};

export type PanelThreadOrId = PanelThread | number;

type ActivityBase = {
	id: number;
	thread: PanelThreadOrId;
	author: UserOrId;
	sentAt: Date;
	type: (typeof activityTypes)[number];
};

export type ActivityAdminAccept = ActivityBase & {
	type: "admin:accept";
	data: {
		activity: ActivityOrId;
	};
};

export type ActivityAdminReject = ActivityBase & {
	type: "admin:reject";
	data: {
		activity: ActivityOrId;
	};
};

export type ActivityMessage = ActivityBase & {
	type: "message";
	data: {
		message: string;
	};
};

export type ActivityUserRequestAddPanel = ActivityBase & {
	type: "user:request:addPanel";
	data: {
		panel: PanelOrId;
	};
};

export type ActivityUserRequestChangeTime = ActivityBase & {
	type: "user:request:changeTime";
	data: {
		panel: PanelOrId;
		showFrom: Date;
		showTill: Date;
	};
};

export type ActivityUserRequestChangePanel = ActivityBase & {
	type: "user:request:changeContent";
	data: {
		panel: PanelOrId;
		content: string;
	};
};

export type Activity = ActivityAdminAccept | ActivityAdminReject | ActivityMessage | ActivityUserRequestAddPanel | ActivityUserRequestChangeTime | ActivityUserRequestChangePanel;

export type ActivityOrId = Activity | number;

export type Panel = {
	id: number;
	thread: PanelThreadOrId;
	author: UserOrId;
	showFrom: Date;
	showTill: Date;
	isApproved: boolean;
	isDeprecated: boolean;
	isHidden: boolean;
	type: (typeof panelTypes)[number];
	content: string;
};

export type PanelOrId = Panel | number;

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

export type HejNotification = {
	id: number;
	recipient: UserOrId;
	title: string;
	content: string;
	path?: string;
	sentAt: Date;
	read: boolean;
};

export type Only<T, U> = {
	[P in keyof T]: T[P];
} & {
	[P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
