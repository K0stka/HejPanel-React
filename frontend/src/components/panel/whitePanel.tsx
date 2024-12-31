import CanteenTable from "./Canteen";
import { ClientState } from "shared";
import Clock from "./Clock";
import DeparturesTable from "./DeparturesTable";
import GytoolLogo from "../logos/GytoolLogo";
import SRGHLogo from "../logos/SrghLogo";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
	canteenEnabled: boolean;
	departuresEnabled: boolean;
	online: boolean;
	theme: ClientState["theme"];
}

const WhitePanel = ({ canteenEnabled, departuresEnabled, online, theme }: Props) => {
	const [parent] = useAutoAnimate();

	return (
		<div
			className={`info ${theme}`}
			ref={parent}>
			<div className="logo-container">
				<GytoolLogo />
				{theme === "light" && <text>💡</text>}
				{theme === "dark" && <text>🌙</text>}
				<SRGHLogo />
			</div>

			<Clock />

			{canteenEnabled && <CanteenTable />}

			{canteenEnabled && online && departuresEnabled && <span className="divider" />}

			{online && departuresEnabled && <DeparturesTable />}
		</div>
	);
};

export default WhitePanel;
