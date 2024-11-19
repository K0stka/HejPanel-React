import { useContext } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import { DeparturesContext } from "../../util/context";

import DepartureRow from "./departureRow";
import { Departures } from "shared";

const DeparturesTable = () => {
	const departures: Departures = useContext(DeparturesContext);

	const [parent1] = useAutoAnimate();
	const [parent2] = useAutoAnimate();
	const [parent3] = useAutoAnimate();

	return (
		<div className="departures-container">
			<div
				className="departures"
				ref={parent1}>
				<h2>Ladova:</h2>
				{departures.ladova.map((departure) => (
					<DepartureRow
						key={departure.line + departure.carrier + departure.destination.substring(-5)}
						departure={departure}
					/>
				))}
			</div>
			<div
				className="departures"
				ref={parent2}>
				<h2>Na Trati:</h2>
				{departures.natrati.map((departure) => (
					<DepartureRow
						key={departure.line + departure.carrier + departure.destination.substring(-5)}
						departure={departure}
					/>
				))}
			</div>
			{departures.vlak && (
				<div
					className="departures"
					ref={parent3}>
					<h2>Vlak:</h2>
					<DepartureRow departure={departures.vlak} />
				</div>
			)}
		</div>
	);
};

export default DeparturesTable;
