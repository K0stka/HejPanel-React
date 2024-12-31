import { userTypes, activityTypes, panelTypes, themes } from "./constants.ts";
import type { Dispatch, SetStateAction } from "react";

export type User = {
	id: number;
	microsoftId: string;
	name: string;
	email: string;
	type: (typeof userTypes)[number];
	suspended: boolean;
};

export type PanelThread = {
	id: number;
	owner: User["id"];
};

type BaseActivity = {
	id: number;
	thread: PanelThread["id"];
	author: User["id"];
	sentAt: Date;
	type: (typeof activityTypes)[number];
	data: object;
};

export type ActivityAdminAccept = BaseActivity & {
	type: "admin:accept";
	data: {
		activity: Activity["id"];
	};
};

export type ActivityAdminReject = BaseActivity & {
	type: "admin:reject";
	data: {
		activity: Activity["id"];
	};
};

export type ActivityMessage = BaseActivity & {
	type: "message";
	data: {
		message: string;
	};
};

export type ActivityUserRequestAddPanel = BaseActivity & {
	type: "user:request:addPanel";
	data: {
		panel: Panel["id"];
	};
};

export type ActivityAdminAddPanel = BaseActivity & {
	type: "admin:addPanel";
	data: {
		panel: Panel["id"];
	};
};

export type ActivityUserRequestChangeTime = BaseActivity & {
	type: "user:request:changeTime";
	data: {
		panel: Panel["id"];
		showFrom: Date;
		showTill: Date;
	};
};

export type ActivityAdminChangeTime = BaseActivity & {
	type: "admin:changeTime";
	data: {
		panel: Panel["id"];
		showFrom: Date;
		showTill: Date;
	};
};

export type ActivityUserRequestChangePanel = BaseActivity & {
	type: "user:request:changeContent";
	data: {
		panel: Panel["id"];
		content: string;
	};
};

export type ActivityAdminChangePanel = BaseActivity & {
	type: "admin:changeContent";
	data: {
		panel: Panel["id"];
		content: string;
	};
};

export type Activity =
	| ActivityAdminAccept
	| ActivityAdminReject
	| ActivityMessage
	| ActivityUserRequestAddPanel
	| ActivityAdminAddPanel
	| ActivityUserRequestChangeTime
	| ActivityAdminChangeTime
	| ActivityUserRequestChangePanel
	| ActivityAdminChangePanel;

type BasePanel = {
	id: number;
	thread: PanelThread["id"];
	author: User["id"];
	showFrom: Date;
	showTill: Date;
	isApproved: boolean;
	isDeprecated: boolean;
	isHidden: boolean;
	type: (typeof panelTypes)[number];
};

export type ImagePanel = BasePanel & {
	type: "image";
	content: {
		url: string;
	};
};

export type VideoPanel = BasePanel & {
	type: "video";
	content: {
		url: string;
	};
};

export type TextPanel = BasePanel & {
	type: "text";
	content: {
		content: string;
		background: PanelBackground["url"];
		textColor: PanelBackground["textColor"];
	};
};

export type Panel = ImagePanel | VideoPanel | TextPanel;

export type DisplayPanel = {
	id: Panel["id"];
} & (
	| {
			type: ImagePanel["type"];
			content: ImagePanel["content"];
	  }
	| {
			type: VideoPanel["type"];
			content: VideoPanel["content"];
	  }
	| {
			type: TextPanel["type"];
			content: TextPanel["content"];
	  }
);

export type PanelBackground = {
	id: number;
	url: string;
	textColor: string;
};

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
	vlak: Departure[];
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
	panels: DisplayPanel[];
	canteen: Canteen;
	departures: Departures;
};

export type HejNotification = {
	id: number;
	recipient: User;
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

export type SetState<T> = Dispatch<SetStateAction<T>>;
