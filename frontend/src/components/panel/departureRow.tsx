import CarrierIcon from "./CarrierIcon";
import { Departure } from "shared";

interface Props {
	departure: Departure;
}

const DepartureRow = ({ departure }: Props) => {
	return (
		<div className="departure">
			<span className="time">{departure.time}</span>
			<span className="delay">{departure.delay && `+${departure.delay}`}</span>
			<span className="line">
				<CarrierIcon carrier={departure.carrier} />
				{departure.line}
			</span>
			<span className="destination">{departure.destination}</span>
		</div>
	);
};

export default DepartureRow;
