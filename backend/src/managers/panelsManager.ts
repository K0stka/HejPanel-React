import type { Panel } from "../../../shared/panel.d.ts";

export default class PanelsManager {
	private onPanelAddCallback: (panel: Panel) => void;
	private onPanelRemoveCallback: (panelId: number) => void;

	private panels: Panel[] = [];

	constructor(onPanelAddCallback: (panel: Panel) => void, onPanelRemoveCallback: (panelId: number) => void) {
		this.onPanelAddCallback = onPanelAddCallback;
		this.onPanelRemoveCallback = onPanelRemoveCallback;
	}
}
