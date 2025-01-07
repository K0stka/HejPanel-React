import CanteenTable from "./Canteen";
import { ClientState } from "shared";
import Clock from "./Clock";
import DeparturesTable from "./DeparturesTable";
import GytoolLogo from "../logos/GytoolLogo";
import SRGHLogo from "../logos/SrghLogo";
import { socket } from "../../util/socket";
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
				<SRGHLogo />
				{theme === "light" && <>💡</>}
				{theme === "dark" && <>🌙</>}
			</div>

			<Clock />

			{canteenEnabled && <CanteenTable />}

			{canteenEnabled && online && departuresEnabled && <span className="divider" />}

			{online && departuresEnabled && <DeparturesTable />}

			{!online ? (
				<button
					onClick={() => {
						socket.connect();
					}}>
					Connect
				</button>
			) : (
				<button
					onClick={() => {
						socket.disconnect();
					}}>
					Disconnect
				</button>
			)}
		</div>
	);
};

export default WhitePanel;
