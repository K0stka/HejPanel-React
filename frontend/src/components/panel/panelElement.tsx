import { DisplayPanel } from "shared";
import { env } from "../../../env";
import { getPanelBackgroundUrl } from "../../../../admin/lib/utils";

interface Props {
	panel: DisplayPanel;
}

const PanelElement = ({ panel }: Props) => {
	return (
		<div className={`panel ${panel.type}`}>
			{(() => {
				switch (panel.type) {
					case "text":
						return (
							<>
								<img
									alt=""
									src={env.ADMIN_URL + getPanelBackgroundUrl(panel.content.background)}
									className="panel-background"
								/>
								<div
									className="panel-text"
									style={{ color: panel.content.textColor }}>
									{panel.content.content}
								</div>
							</>
						);
					case "image":
						return (
							<>
								<img
									src={panel.content.url}
									alt=""
									className="panel-background"
								/>
								<img
									src={panel.content.url}
									alt=""
									className="panel-image"
								/>
							</>
						);
					case "video":
						return (
							<>
								<video
									src={panel.content.url}
									className="panel-video"
									autoPlay
									loop
									muted
								/>
							</>
						);
				}
			})()}
		</div>
	);
};

export default PanelElement;
