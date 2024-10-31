import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Server } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";

import "dotenv/config";
import process from "node:process";

import { printConnect, printDisconnect, printHydratedData, printSentDataToUID, printServerReady, printStartupScreen } from "./utils/print.ts";

import { themes, type Departures } from "../../shared/panel.d.ts";
import fetchDepartures from "./crawlers/fetchDepartures.ts";
import ConfigurationManager from "./managers/configurationManager.ts";
import CanteenManager from "./managers/canteenManager.ts";
import setInstantInterval from "./utils/functions.ts";
// import PanelsManager from "./panelsManager.ts";

console.clear();

const io = new Server({
	cors: {
		origin: `${process.env.FRONTEND_URL!}:${process.env.FRONTEND_PORT!}`,
	},
});

io.on("connection", async (socket) => {
	printConnect(socket.id);

	socket.emit("sync", {
		...configuration.all,
		canteen: await canteen.current,
		departures,
		panels: [],
	});
	printSentDataToUID(socket.id, "configuration", "canteen", "departures");

	socket.on("disconnect", () => printDisconnect(socket.id));
});

const router = new Router();

const configuration = new ConfigurationManager({
	onThemeChange: (theme) => {
		io.emit("theme", theme);
		printHydratedData("theme");
	},
	onTimetableEnabledChange: (enabled) => {
		io.emit("timetable:enable", enabled);
		printHydratedData("timetableEnabled");
	},
	onCanteenEnabledChange: async (enabled) => {
		io.emit("canteen:enable", enabled);
		printHydratedData("canteenEnabled");

		if (enabled) io.emit("canteen:update", await canteen.current);
	},
	onDeparturesEnabledChange: (enabled, skipHydrate) => {
		if (!skipHydrate) {
			io.emit("departures:enable", enabled);
			printHydratedData("departuresEnabled");
		}

		if (enabled) {
			if (departuresRefresh === null)
				departuresRefresh = setInstantInterval((isFirst) => {
					fetchDepartures().then((newDepartures) => {
						departures = newDepartures;

						if (isFirst && skipHydrate) return;

						io.emit("departures:update", departures);
						printHydratedData("departures");
					});
				}, 30_000);
		} else {
			departures = { ladova: [], natrati: [], vlak: null };

			if (departuresRefresh !== null) {
				clearInterval(departuresRefresh);
				departuresRefresh = null;
			}
		}
	},
});

const canteen = new CanteenManager(async () => {
	if (!configuration.canteenEnabled) return;

	io.emit("canteen:update", await canteen.current);
	printHydratedData("canteen");
});

let departures: Departures = { ladova: [], natrati: [], vlak: null };
let departuresRefresh: number | null = null;

// const Panels = new PanelsManager(
// 	(panel) => {
// 		socket.emit("panel:add", panel);
// 	},
// 	(panelId) => {
// 		socket.emit("panel:remove", panelId);
// 	}
// );

router.post("/theme", (context) => {
	const theme = context.request.url.searchParams.get("theme");

	if (theme && themes.includes(theme)) {
		configuration.theme = theme;
		context.response.status = 200;
	} else {
		context.response.status = 400;
	}
});

router.post("/timetable", (context) => {
	const isTimetableEnabled = context.request.url.searchParams.get("enabled") === "true";
	configuration.timetableEnabled = isTimetableEnabled;

	context.response.status = 200;
});

router.post("/canteen", (context) => {
	const isCanteenEnabled = context.request.url.searchParams.get("enabled") === "true";
	configuration.canteenEnabled = isCanteenEnabled;

	context.response.status = 200;
});

router.post("/departures", (context) => {
	const isDeparturesEnabled = context.request.url.searchParams.get("enabled") === "true";
	configuration.departuresEnabled = isDeparturesEnabled;

	context.response.status = 200;
});

// router.get("/debug", async (context) => {
// 	const requestDetails = {
// 		method: context.request.method,
// 		url: context.request.url.toString(),
// 		headers: Object.fromEntries(context.request.headers.entries()),
// 		body: await context.request.body.text(),
// 	};
// 	context.response.headers.set("Content-Type", "application/json");
// 	context.response.body = JSON.stringify(requestDetails, null, 2);
// 	context.response.status = 200;
// });

// #region Server startup...
printStartupScreen();

Promise.all([configuration.init(), canteen.init()]).then(() => {
	printServerReady();
	Promise.any([
		new Application()
			.use(router.routes())
			.use(router.allowedMethods())
			.listen({
				port: parseInt(process.env.API_PORT!),
			}),
		serve(io.handler(), {
			port: parseInt(process.env.WS_PORT!),
			onListen: () => null,
		}),
	]);
});
// #endregion
