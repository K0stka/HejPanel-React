import { useContext } from "react";

import { PanelsContext } from "../../util/context";

import PanelElement from "./panelElement";

const Carousel = () => {
	const panels = useContext(PanelsContext);

	return (
		<div className="carousel">
			{panels.length === 0 && <div className="carousel-empty">No panels to display</div>}
			{panels.length > 1 && <div className="carousel-progress">1 / {panels.length}</div>}
			{panels.map((panel) => (
				<PanelElement
					key={panel.id}
					panel={panel}
				/>
			))}
		</div>
	);
};

export default Carousel;
