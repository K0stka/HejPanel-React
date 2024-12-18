import SyncHandler from "./syncHandler";
import Video from "./video";
import WhitePanel from "./components/panel/whitePanel";

function Panel() {
	return (
		<main>
			<div className="carousel-container">
				<Video />
			</div>

			<SyncHandler />

			<WhitePanel />
		</main>
	);
}

export default Panel;
