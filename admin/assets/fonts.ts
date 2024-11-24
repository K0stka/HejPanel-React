import { Hepta_Slab, Nunito } from "next/font/google";

export const nunito = Nunito({
	preload: true,
	subsets: ["latin", "latin-ext"],
	weight: "200",
	variable: "--f-nunito",
});

export const nunitoBold = Nunito({
	preload: true,
	subsets: ["latin", "latin-ext"],
	weight: "1000",
	variable: "--f-nunito-bold",
});

export const heptaSlab = Hepta_Slab({
	preload: true,
	subsets: ["latin", "latin-ext"],
	weight: "400",
	variable: "--f-hepta-slab",
});

export const heptaSlabBold = Hepta_Slab({
	preload: true,
	subsets: ["latin", "latin-ext"],
	weight: "900",
	variable: "--f-hepta-slab-bold",
});
