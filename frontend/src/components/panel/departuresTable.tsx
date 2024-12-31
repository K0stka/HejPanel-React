import DepartureRow from "./DepartureRow";
import { Departures } from "shared";
import { DeparturesContext } from "../../util/context";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useContext } from "react";

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
			<div
				className="departures"
				ref={parent3}>
				<h2>Vlak:</h2>
				{departures.vlak.map((departure) => (
					<DepartureRow
						key={departure.line + departure.carrier + departure.destination.substring(-5)}
						departure={departure}
					/>
				))}
			</div>
		</div>
	);
};

export default DeparturesTable;
