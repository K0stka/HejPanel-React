import { and, eq, gte, lte } from "orm";
import { printLoadedDataFromDB } from "../utils/print.ts";

import { DisplayPanel } from "shared/types";
import { Manager } from "./manager.ts";
import db from "shared/db";
import { panels } from "shared/schema";

interface PanelsManagerConfiguration {
	onAddPanel: (panel: DisplayPanel) => void;
	onRemovePanel: (panelId: number) => void;
}

export class PanelsManager extends Manager<DisplayPanel[]> {
	protected override get dataName(): string {
		return "visible panels";
	}

	constructor({ onAddPanel, onRemovePanel }: PanelsManagerConfiguration) {
		super((oldData, newData) => {
			const newlyVisiblePanels = newData.filter((panel) => !oldData.some((p) => p.id === panel.id));
			const newlyHiddenPanels = oldData.filter((panel) => !newData.some((p) => p.id === panel.id));

			for (const panel of newlyVisiblePanels) onAddPanel(panel);
			for (const panel of newlyHiddenPanels) onRemovePanel(panel.id);
		});
	}

	protected override isStale = (lastUpdated: Date): boolean => {
		const now = new Date();

		return now.getDate() !== lastUpdated.getDate();
	};

	protected override get emptyData(): DisplayPanel[] {
		return [];
	}

	protected override async getCurrent(): Promise<DisplayPanel[]> {
		const now = new Date();

		const visiblePanels = (await db.query.panels.findMany({
			where: and(eq(panels.isApproved, true), eq(panels.isDeprecated, false), eq(panels.isHidden, false), lte(panels.showFrom, now), gte(panels.showTill, now)),
			columns: {
				id: true,
				type: true,
				content: true,
			},
		})) as DisplayPanel[];

		printLoadedDataFromDB("visible panels");

		return visiblePanels;
	}
}
