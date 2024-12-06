import Collage from "./collage";
import GytoolLogo from "./components/logos/gytoolLogo";
import SRGHLogo from "./components/logos/srghLogo";

export const panels: { title?: string; element: React.ReactNode; description?: string }[] = [
	{
		element: (
			<div className="flex flex-col gap-2 items-center justify-center text-goh-blue bg-white p-10 rounded-3xl shadow-xl">
				<span className="text-9xl mb-10">
					<GytoolLogo />
				</span>
				<h1 className="font-bold text-5xl">Vítáme Vás na Gymnáziu Olomouc - Hejčín</h1>
				<span className="text-3xl">Přejeme Vám krásný den</span>
				<span className="flex items-center gap-2 mt-5">
					<span className="text-4xl flex items-center justify-center">
						<SRGHLogo />
					</span>
					Studentská rada Gymnázia Hejčín
				</span>
			</div>
		),
	},
	{
		title: "Klub",
		element: <Collage images={["klub/1.jpg", "klub/2.jpg", "klub/3.jpg"]} />,
		description: "Klub vznikl s cílem poskytnout studentům prostor pro odpočinek a relaxaci. Byl koncipován, naplánován a i realizován hlavně studenty samotnými.",
	},
	{
		title: "Patroni",
		element: <Collage images={[]} />,
		description: "Program SRGH pro podporu nových studentů Gymnázia Hejčín. Má za cíl seznámit nové studenty se školou nejen skrze pedagogy ale i skrze starší studenty.",
	},
	{
		title: "Vánoční aukce",
		element: <Collage images={["aukce/2.jpg", "aukce/1.jpg", "aukce/3.jpg"]} />,
		description:
			"Než se všichni rozejdou na vánoční prázdniny, pořádáme SRGH každoroční Vánoční aukci, kde si můžete koupit různé věci, které věnovali studenti a učitelé. Výtěžek z této aukce jde na charitativní účely. Minulý rok se podařilo vybrat XX Kč pro Hemato-onkologické oddělení.",
	},
	{
		title: "Tématické dny",
		element: <Collage images={["tematicke_dny/2.jpg", "tematicke_dny/4.jpg", "tematicke_dny/5.jpg", "tematicke_dny/6.jpg", "tematicke_dny/7.jpg", "tematicke_dny/8.jpg", "tematicke_dny/9.jpg", "tematicke_dny/11.jpg", "tematicke_dny/12.jpg"]} />,
		description:
			"Je už jistou tradicí zde na Hejčíně, že SRGH každoročně pořádá mnoho různých tématických dnů, konkrétně: Halloween, Čepicový den, Suit up day, Den bez batohů, Den svetrů, Ponožkový den (podpora lidí s Downovým syndromem) a Den učitelů (po domluvě si mohou žáci zkusit učit).",
	},
	{
		title: "Ročenka",
		element: <Collage images={[]} />,
		description: "Tradiční (dvou)ročenka Gymnázia Hejčín, kterou SRGH vydává každý rok. Obsahuje fotky všech studentů, pedagogů a zaměstnanců školy, spolu s citáty studentů.",
	},
	{
		title: "Valentýn",
		element: <Collage images={["valentyn/1.jpg"]} />,
		description: "Každý rok pořádáme Valentýnský den, kdy SRGH zprostředkovává celoškolní poštu s Valentýnkami.",
	},
	{
		title: "Přístřešek pro kola",
		element: <Collage images={[]} />,
		description: "Jeden z nejnovějších projektů SRGH, který je stále v procesu realizace. Jeho cílem je dopřát zastřešené parkování pro kola studentům.",
	},
	{
		title: "Move for hope",
		element: <Collage images={["move_for_hope/1.jpg", "move_for_hope/2.jpg", "move_for_hope/3.jpg"]} />,
		description: "Charitativní akce, kterou SRGH pořádá každý rok. Studenti a učitelé se mohou zapojit do různých sportovních aktivit a získat tak peníze pro charitativní účely.",
	},
	{
		title: "Menstruační pomůcky",
		element: <Collage images={["menstruacni_pomucky/1.jpg", "menstruacni_pomucky/2.jpg", "menstruacni_pomucky/3.jpg"]} />,
		description: "Zbrusu nový projekt SRGH, který nedávno vešel do testovacího provozu. Jeho cílem je na dívčích toaletách školy umístit menstruační pomůcky.",
	},
	{
		title: "Materiální sbírka při povodních",
		element: <Collage images={["materialni_sbirka/1.jpg"]} />,
		description: "Jakožto reakci na zářijové povodně SRGH uspořádala materiální sbírku pro pomoc obětem.",
	},
	{
		element: (
			<div className="flex flex-col gap-2 items-center justify-center text-goh-blue bg-white p-10 rounded-3xl shadow-xl">
				<h1 className="font-bold text-5xl">Chcete vědět více?</h1>
				<span className="text-3xl">Přijďte za námi do Klubíku!</span>
				<span>(Po schodech dolů, levé dveře před Vámi a budete tam)</span>
				<span className="flex items-center gap-2 mt-5">
					<span className="text-4xl flex items-center justify-center">
						<SRGHLogo />
					</span>
					Studentská rada Gymnázia Hejčín
				</span>
			</div>
		),
	},
];
