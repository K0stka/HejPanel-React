import { Panel } from "shared";

interface Props {
	panel: Panel;
}

const PanelElement = ({ panel }: Props) => {
	switch (panel.type) {
		case "text":
			return <div>{panel.content}</div>;
		case "image":
			return (
				<img
					src={panel.content}
					alt="panel"
				/>
			);
	}
};

export default PanelElement;
