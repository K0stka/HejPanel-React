import { MetadataRoute } from "next";
import { hejpanelBlue } from "../lib/theme";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "HejPanel",
        description:
            "Projekt SRGH sloužící pro rychlou a efektivní distribuci informací mezi studenty a vyučujícími.",
        start_url: "/",
        orientation: "portrait",
        display: "standalone",
        theme_color: hejpanelBlue,
        background_color: hejpanelBlue,
        icons: [
            {
                src: "/icons/icon-192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon-512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}
