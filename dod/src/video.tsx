import { useEffect, useState } from "react";

import GytoolLogo from "./components/logos/gytoolLogo";
import SRGHLogo from "./components/logos/srghLogo";
import { panels } from "./panels";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useHotkeys } from "react-hotkeys-hook";

const Video = () => {
	const [parent] = useAutoAnimate();

	const [panelId, setPanelId] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setPanelId((prevPanelId) => (prevPanelId + 1) % panels.length);
		}, 8_000);
		return () => clearInterval(interval);
	}, []);

	useHotkeys("right", () => {
		setPanelId((prevPanelId) => (prevPanelId + 1) % panels.length);
	});

	useHotkeys("left", () => {
		setPanelId((prevPanelId) => (prevPanelId - 1 + panels.length) % panels.length);
	});

	return (
		<div
			ref={parent}
			className="relative w-full h-full overflow-hidden">
			{panels[panelId].title && (
				<div className="absolute top-10 flex w-full z-10 justify-between items-center px-10">
					<div className="size-24 bg-white shadow-lg rounded-2xl flex items-center justify-center text-7xl">
						<GytoolLogo />
					</div>
					<h1 className="text-5xl col-span-3 flex items-center justify-center text-nowrap overflow-hidden bg-white text-goh-blue font-bold shadow-2xl p-3 rounded-2xl">
						<span key={panelId}>{panels[panelId].title}</span>
					</h1>
					<div className="size-24 bg-white shadow-lg rounded-2xl flex items-center justify-center text-7xl">
						<SRGHLogo />
					</div>
				</div>
			)}
			<div
				key={panelId}
				className="w-full h-full flex items-center justify-center">
				{panels[panelId].element}
			</div>
			{panels[panelId].description && (
				<div className="absolute bottom-10 flex w-full z-10 justify-center items-center px-10 italic">
					<div className="bg-white p-5 rounded-2xl shadow-lg text-center">{panels[panelId].description}</div>
				</div>
			)}
		</div>
	);
};

export default Video;
