import "./globals.css";

import { heptaSlab, nunito } from "@/assets/fonts";

import type { Metadata } from "next";
import { NextLayout } from "@/lib/types";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import getManifest from "./manifest";

const manifest = getManifest();

export const metadata: Metadata = {
    title: manifest.name,
    description: manifest.description,
};

const Layout: NextLayout = ({ children }) => {
    return (
        <html lang="cs" suppressHydrationWarning>
            <body
                className={`${nunito.variable} ${heptaSlab.variable}`}
                style={{ margin: "0 !important" }}
            >
                <ThemeProvider
                    enableSystem={true}
                    defaultTheme="system"
                    attribute="class"
                >
                    {children}
                    <Toaster richColors position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
