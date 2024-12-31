import { useEffect, useState } from "react";

import { DisplayPanel } from "shared";
import PanelElement from "./PanelElement";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface CarouselProps {
	panels: DisplayPanel[];
}

const REVOLUTION_MS = 5_000;

const Carousel = ({ panels }: CarouselProps) => {
	const [parent] = useAutoAnimate({
		easing: "ease-in-out",
	});

	const [visiblePanel, setVisiblePanel] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setVisiblePanel((prev) => (prev + 1) % panels.length);
		}, REVOLUTION_MS);

		return () => clearInterval(interval);
	}, [panels.length]);

	return (
		<div
			className="carousel"
			ref={parent}>
			{panels.length === 0 && <div className="carousel-empty">😞</div>}
			{panels.length > 1 && (
				<div className={`carousel-progress ${visiblePanel}`}>
					{visiblePanel + 1} / {panels.length}
				</div>
			)}
			{panels[visiblePanel] && (
				<PanelElement
					panel={panels[visiblePanel]}
					key={panels[visiblePanel].id}
				/>
			)}
		</div>
	);
};

export default Carousel;
