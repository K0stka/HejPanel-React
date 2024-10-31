import { useContext } from "react";
import { CanteenContext } from "../../util/context";

const CanteenTable = () => {
	const canteen = useContext(CanteenContext);

	const showCommonSuffix = (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) && canteen.commonSuffix;

	return (
		<div className="canteen">
			{canteen.soup && (
				<div className="row">
					<span className="name">Polévka:</span>
					<span className="meal">{canteen.soup}</span>
				</div>
			)}

			{canteen.soup && (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) && <div />}

			{canteen.lunch1 && (
				<div className="row">
					<span className="name">Oběd 1:</span>
					<span className="meal">{canteen.lunch1}</span>
				</div>
			)}
			{canteen.lunch2 && (
				<div className="row">
					<span className="name">Oběd 2:</span>
					<span className="meal">{canteen.lunch2}</span>
				</div>
			)}
			{canteen.lunch3 && (
				<div className="row">
					<span className="name">Oběd 3:</span>
					<span className="meal">{canteen.lunch3}</span>
				</div>
			)}
			{showCommonSuffix && <div className="common-suffix">+ {canteen.commonSuffix}</div>}

			{canteen.snack && (canteen.lunch1 || canteen.lunch2 || canteen.lunch3) && <div />}

			{canteen.snack && (
				<div className="row">
					<span className="name">Svačina:</span>
					<span className="meal">{canteen.snack}</span>
				</div>
			)}
			{!canteen.snack && !canteen.soup && !canteen.lunch1 && !canteen.lunch2 && !canteen.lunch3 && <div className="no-meals">Na dnešek nejsou nahlášena žádná jídla</div>}
		</div>
	);
};
export default CanteenTable;
