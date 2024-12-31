import { CanteenContext, DeparturesContext, TimetableEnabledContext } from "./util/context";

import Carousel from "./components/panel/Carousel";
import WhitePanel from "./components/panel/WhitePanel";
import getClientState from "./util/getClientState";

function Panel() {
	const state = getClientState();

	return (
		<main>
			<div className="carousel-container">{state.online ? <Carousel panels={state.panels} /> : <div className="error">🔴 OFFLINE</div>}</div>

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
