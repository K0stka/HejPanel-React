import "jsr:@std/dotenv/load";

import { Application, Router } from "https://deno.land/x/oak@v17.1.0/mod.ts";
import { printConnect, printDisconnect, printHydratedData, printRestartingSync, printSentDataToUID, printServerReady, printStartupScreen, printSuspendingSync } from "./utils/print.ts";

import { CanteenManager } from "./managers/canteenManager.ts";
import { ConfigurationManager } from "./managers/configurationManager.ts";
import { DeparturesManager } from "./managers/departuresManager.ts";
import { PanelsManager } from "./managers/panelsManager.ts";
import { Server as SocketIoServer } from "https://deno.land/x/socket_io@0.2.0/mod.ts";
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

console.clear();

const io = new SocketIoServer({
	cors: {
		origin: "*",
		// origin: [Deno.env.get("PANEL_URL")!, Deno.env.get("ADMIN_URL")!],
	},
});

let numberOfConnections = 0;

io.on("connection", async (socket) => {
	printConnect(socket.id);

	if (!tickInterval) {
		printRestartingSync();

		await Promise.all([panels.init(), canteen.init(), departures.init()]);

		tickInterval = setInterval(tickManagers, tickRate);
	}

	numberOfConnections++;

	socket.emit("sync", {
		...configuration.current,
		canteen: canteen.current,
		departures: departures.current,
		panels: panels.current,
	});
	printSentDataToUID(socket.id, "configuration", "canteen", "departures", "visible panels");

	socket.on("disconnect", () => {
		printDisconnect(socket.id);

		numberOfConnections--;

		if (numberOfConnections === 0 && tickInterval) {
			clearInterval(tickInterval);
			tickInterval = null;
			printSuspendingSync();
		}
	});
});

let tickInterval: number | null = null;
const tickRate = 10_000; // 10 seconds
const tickManagers = () => Promise.all([panels.tick(), canteen.tick(), departures.tick()]);

const configuration = new ConfigurationManager({
	onThemeChange: (theme) => {
		io.emit("theme", theme);
		printHydratedData("theme");
		return Promise.resolve();
	},
	onTimetableEnabledChange: (enabled) => {
		io.emit("timetable:enable", enabled);
		printHydratedData("timetableEnabled");
		return Promise.resolve();
	},
	onCanteenEnabledChange: async (enabled) => {
		io.emit("canteen:enable", enabled);
		printHydratedData("canteenEnabled");

		if (enabled) await canteen.enable();
		else await canteen.disable();
	},
	onDeparturesEnabledChange: async (enabled) => {
		io.emit("departures:enable", enabled);
		printHydratedData("departuresEnabled");

		if (enabled) await departures.enable();
		else await departures.disable();
	},
});

const canteen = new CanteenManager((canteen) => {
	io.emit("canteen:update", canteen);
	printHydratedData("canteen");
});

const departures = new DeparturesManager((departures) => {
	io.emit("departures:update", departures);
	printHydratedData("departures");
});

const panels = new PanelsManager({
	onAddPanel: (panel) => {
		io.emit("panel:add", panel);
		printHydratedData("visible panel (ID: " + panel.id + ")");
	},
	onRemovePanel: (panelId) => {
		io.emit("panel:remove", panelId);
		printHydratedData("hidden panel (ID: " + panelId + ")");
	},
});

const router = new Router();

router.get("/", ({ response }) => {
	response.body = {
		name: "HejPanel API",
		version: "1.0.0",
		status: "running",
		message: "All systems nominal ✅👍🔥😉",
	};
});

router.post("/configuration", async ({ response }) => {
	await configuration.dataSourceChanged();

	response.status = 200;
});

router.post("/canteen", async ({ response }) => {
	await canteen.dataSourceChanged();

	response.status = 200;
});

router.post("/panels", async ({ response }) => {
	await panels.dataSourceChanged();

	response.status = 200;
});

// #region Server startup...
printStartupScreen();

await configuration.init().then(() => {
	const { canteenEnabled, departuresEnabled } = configuration.current;

	canteen.enabled = canteenEnabled;
	departures.enabled = departuresEnabled;
});

new Application()
	.use(router.routes())
	.use(router.allowedMethods())
	.listen({
		port: parseInt(Deno.env.get("API_PORT")!),
	});

serve(io.handler(), {
	port: parseInt(Deno.env.get("WS_PORT")!),
	onListen: () => null,
});

printServerReady();
// #endregion
