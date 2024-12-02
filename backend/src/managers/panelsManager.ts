import db from "shared/db";
import { panels, users } from "shared/schema";
import { and, eq, gte, lte } from "orm";
import type { Panel } from "shared/types";

export default class PanelsManager {
	private onPanelAddCallback: (panel: Panel) => void;
	private onPanelRemoveCallback: (panelId: number) => void;

	private shownPanels: Panel[] = [];
	private lastPanelsUpdate: Date = new Date();

	constructor(onPanelAddCallback: (panel: Panel) => void, onPanelRemoveCallback: (panelId: number) => void) {
		this.onPanelAddCallback = onPanelAddCallback;
		this.onPanelRemoveCallback = onPanelRemoveCallback;
	}

	public async init() {
		await this.loadVisiblePanels(true);
	}

	private async loadVisiblePanels(suppressHydration: boolean = false) {
		const now = new Date();

		const visiblePanels = await db.query.panels.findMany({
			where: and(eq(panels.isApproved, true), eq(panels.isDeprecated, false), eq(panels.isHidden, false), lte(panels.showFrom, now), gte(panels.showTill, now)),
		});

		const newlyVisiblePanels = visiblePanels.filter((panel) => !this.shownPanels.some((p) => p.id === panel.id));
		const newlyHiddenPanels = this.shownPanels.filter((panel) => !visiblePanels.some((p) => p.id === panel.id));

		this.shownPanels = visiblePanels;

		if (suppressHydration) return;

		for (const panel of newlyVisiblePanels) this.onPanelAddCallback(panel);
		for (const panel of newlyHiddenPanels) this.onPanelRemoveCallback(panel.id);
	}

	public async createPanel(panel: Panel, suppressHydration: boolean = false) {
		const panelId = (
			await db
				.insert(panels)
				.values({
					author: typeof panel.author === "number" ? panel.author : panel.author.id,
					content: panel.content,
					isApproved: panel.isApproved,
					isDeprecated: panel.isDeprecated,
					isHidden: panel.isHidden,
					showFrom: panel.showFrom,
					showTill: panel.showTill,
					thread: typeof panel.thread === "number" ? panel.thread : panel.thread.id,
					type: panel.type,
				})
				.returning({ insertId: users.id })
		)[0].insertId;

		panel.id = panelId;

		if (!PanelsManager.isPanelVisible(panel)) return;

		this.shownPanels.push(panel);

		if (!suppressHydration) this.onPanelAddCallback(panel);
	}

	public async updatePanel(panel: Panel, suppressHydration: boolean = false) {
		await db
			.update(panels)
			.set({
				author: typeof panel.author === "number" ? panel.author : panel.author.id,
				content: panel.content,
				isApproved: panel.isApproved,
				isDeprecated: panel.isDeprecated,
				isHidden: panel.isHidden,
				showFrom: panel.showFrom,
				showTill: panel.showTill,
				thread: typeof panel.thread === "number" ? panel.thread : panel.thread.id,
				type: panel.type,
			})
			.where(eq(panels.id, panel.id));

		const panelIndex = this.shownPanels.findIndex((p) => p.id === panel.id);
		const panelVisible = PanelsManager.isPanelVisible(panel);

		if (panelIndex === -1 && panelVisible) {
			this.shownPanels.push(panel);
			if (!suppressHydration) this.onPanelAddCallback(panel);
		} else if (panelIndex !== -1 && !panelVisible) {
			this.shownPanels.splice(panelIndex, 1);
			if (!suppressHydration) this.onPanelRemoveCallback(panel.id);
		}
	}

	public get visiblePanels() {
		return this.shownPanels;
	}

	private static isPanelVisible(panel: Panel) {
		const now = new Date();
		return panel.isApproved && !panel.isDeprecated && !panel.isHidden && panel.showFrom <= now && panel.showTill >= now;
	}
}
