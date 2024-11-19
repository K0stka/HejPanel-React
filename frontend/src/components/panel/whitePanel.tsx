import { ClientState } from "shared";

import CanteenTable from "./canteen";
import DeparturesTable from "./departuresTable";
import Clock from "./clock";
import GytoolLogo from "../logos/gytoolLogo";
import SRGHLogo from "../logos/srghLogo";
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
