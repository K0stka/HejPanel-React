import Clock from "./clock";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const WhitePanel = () => {
	const [parent] = useAutoAnimate();

	return (
		<div
			className="info shadow-xl"
			ref={parent}>
			<Clock />

			<p style={{ fontFamily: "var(--f-bold)", fontWeight: "bold", fontSize: "var(--s-s)" }}>
				Ahoj, já jsem HejPanel, projekt Studentské rady Gymnázia Hejčín!
				<br />
				<br />
				Jsem tu, abych pomáhal žákům každý den. Ukazuji, co máme k obědu, kdy jede autobus z nejbližší zastávky, za jak dlouho začíná nebo končí vyučovací hodina, a jaké akce se na naší škole chystají.
				<br />
				<br />
				Že nevíš, co je Studentská rada? Tak poslouchej! Studentská rada se stará o studenty naší školy. Když má student nějaký nápad, problém nebo návrh, může to říct svému třídnímu předsedovi, který vše probere na schůzi Studentské rady,
				nebo může přijít rovnou sám.
				<br />
				<br />
				Zajímá tě více o Studentské radě? Stav se do Klubu (v přízemí u vchodu do tělocvičny na této budově) – jednoho z projektů Studentské rady, kde se dozvíš vše podstatné.
			</p>
		</div>
	);
};

export default WhitePanel;
