import WhitePanel from "./components/panel/whitePanel";

function Panel() {
	return (
		<main>
			<link
				rel="stylesheet"
				href="Panel.css"
			/>
			<div className="carousel-container">
				<div className="error">Představte si, že toto je video 👌</div>
			</div>

			<WhitePanel />
		</main>
	);
}

export default Panel;
