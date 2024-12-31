import { Canteen, ClientState, Departures, DisplayPanel, Theme } from "shared";
import { useEffect, useState } from "react";

import { socket } from "./socket";

export default function getClientState(): ClientState {
	const [online, setOnline] = useState(socket.connected);

	const [panels, setPanels] = useState<DisplayPanel[]>([]);

	const [theme, setTheme] = useState<Theme>("normal");

	const [timetableEnabled, setTimetableEnabled] = useState(false);

	const [canteenEnabled, setIsCanteenEnabled] = useState(false);
	const [canteen, setCanteen] = useState<Canteen>({
		snack: null,
		soup: null,
		lunch1: null,
		lunch2: null,
		lunch3: null,
		commonSuffix: null,
	});

	const [departuresEnabled, setIsDeparturesEnabled] = useState(false);
	const [departures, setDepartures] = useState<Departures>({
		ladova: [],
		natrati: [],
		vlak: [],
	});

	useEffect(() => {
		const onConnect = () => setOnline(true);
		const onDisconnect = () => setOnline(false);

		const onPanelAdd = (panel: DisplayPanel) => setPanels((panels) => [...panels, panel]);
		const onPanelRemove = (panelId: number) => setPanels((panels) => panels.filter((p) => p.id !== panelId));

		const onThemeChange = (newTheme: Theme) => setTheme(newTheme);

		const onTimetableEnable = (isTimetableEnabled: boolean) => setTimetableEnabled(isTimetableEnabled);

		const onCanteenEnable = (isCanteenEnabled: boolean) => setIsCanteenEnabled(isCanteenEnabled);
		const onCanteenUpdate = (newCanteen: Canteen) => setCanteen(newCanteen);

		const onDeparturesEnable = (isDeparturesEnabled: boolean) => setIsDeparturesEnabled(isDeparturesEnabled);
		const onDeparturesUpdate = (newDepartures: Departures) => setDepartures(newDepartures);

		const onSync = (state: ClientState) => {
			setTheme(state.theme);
			setTimetableEnabled(state.timetableEnabled);
			setIsCanteenEnabled(state.canteenEnabled);
			setCanteen(state.canteen);
			setIsDeparturesEnabled(state.departuresEnabled);
			setDepartures(state.departures);
			setPanels(state.panels);
		};

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		socket.on("panel:add", onPanelAdd);
		socket.on("panel:remove", onPanelRemove);

		socket.on("theme", onThemeChange);

		socket.on("timetable:enable", onTimetableEnable);

		socket.on("canteen:enable", onCanteenEnable);
		socket.on("canteen:update", onCanteenUpdate);

		socket.on("departures:enable", onDeparturesEnable);
		socket.on("departures:update", onDeparturesUpdate);

		socket.on("sync", onSync);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);

			socket.off("panel:add", onPanelAdd);
			socket.off("panel:remove", onPanelRemove);

			socket.off("theme", onThemeChange);

			socket.off("timetable:enable", onTimetableEnable);

			socket.off("canteen:enable", onCanteenEnable);
			socket.off("canteen:update", onCanteenUpdate);

			socket.off("departures:enable", onDeparturesEnable);
			socket.off("departures:update", onDeparturesUpdate);

			socket.off("sync", onSync);
		};
	}, []);

	return {
		online,
		panels,
		theme,
		timetableEnabled,
		canteenEnabled,
		canteen,
		departuresEnabled,
		departures,
	};
}
