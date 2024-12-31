import "./globals.css";

import { heptaSlab, nunito } from "@/assets/fonts";

import type { Metadata } from "next";
import { NextLayout } from "@/lib/types";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

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
                    <Toaster richColors position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
