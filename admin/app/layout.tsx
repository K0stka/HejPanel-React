import type { Metadata } from "next";

import { NextLayout } from "@/lib/types";

import "./globals.css";

import { nunito, heptaSlab } from "@/assets/fonts";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export const metadata: Metadata = {
  title: "HejPanel",
  description:
    "Projekt SRGH sloužící pro rychlou a efektivní distribuci informací mezi studenty a vyučujícími.",
};

const Layout: NextLayout = ({ children }) => {
  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${nunito.variable} ${heptaSlab.variable}`}>
        <ThemeProvider defaultTheme="system" attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default Layout;
