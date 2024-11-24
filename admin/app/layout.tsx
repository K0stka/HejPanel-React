import type { Metadata } from "next";

import { NextLayout } from "@/lib/types";

import "./globals.css";

import { heptaSlab, heptaSlabBold, nunito, nunitoBold } from "@/assets/fonts";
import Header from "@/components/header";

export const metadata: Metadata = {
	title: "HejPanel",
	description: "Projekt SRGH sloužící pro rychlou a efektivní distribuci informací mezi studenty a vyučujícími.",
};

const Layout: NextLayout = ({ children }) => {
	return (
		<html lang="cs">
			<body className={`${nunito.variable} ${nunitoBold.variable} ${heptaSlab.variable} ${heptaSlabBold.variable}`}>
				<Header />
				<main>{children}</main>
			</body>
		</html>
	);
};

export default Layout;
