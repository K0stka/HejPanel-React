import getClientState from "./util/getClientState";

import { CanteenContext, DeparturesContext, PanelsContext, TimetableEnabledContext } from "./util/context";

import WhitePanel from "./components/panel/whitePanel";
import Carousel from "./components/panel/carousel";

function Panel() {
	const state = getClientState();

	return (
		<main>
			<link
				rel="stylesheet"
				href="Panel.css"
			/>
			<div className="carousel-container">
				{state.online ? (
					<PanelsContext.Provider value={state.panels}>
						<Carousel />{" "}
					</PanelsContext.Provider>
				) : (
					<div className="error">HejPanel je offline</div>
				)}
			</div>

			<CanteenContext.Provider value={state.canteen}>
				<DeparturesContext.Provider value={state.departures}>
					<TimetableEnabledContext.Provider value={state.timetableEnabled}>
						<WhitePanel
							canteenEnabled={state.canteenEnabled}
							departuresEnabled={state.departuresEnabled}
							online={state.online}
							theme={state.theme}
						/>
					</TimetableEnabledContext.Provider>
				</DeparturesContext.Provider>
			</CanteenContext.Provider>
		</main>
	);
}

export default Panel;
