import {
    Archive,
    Grip,
    ImageIcon,
    ImagePlus,
    LucideProps,
    Settings2,
    Shield,
    UsersRound,
    Utensils,
    Wallpaper,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

import { User } from "shared/types";

type PageInfo = {
    name: string;
    path: string;
    extendable?: true;
    file: string;
    showInSidebar?: true;
    icon?: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
};

export const getPages = (userType: User["type"]): PageInfo[] => {
    if (userType === "suspended")
        return [
            {
                name: "Zablokovaný účet",
                path: "/",
                file: "/suspended",
            },
        ];

    const pages: PageInfo[] = [
        {
            name: "Přidat panel",
            path: "/add-panel",
            file: "/shared/add-panel",
            showInSidebar: true,
            icon: ImagePlus,
        },
        {
            name: "Nastavení",
            path: "/settings",
            file: "/shared/settings",
        },
    ];

    if (userType === "user") {
        pages.unshift({
            name: "Přehled",
            path: "/",
            file: "/user",
            showInSidebar: true,
            icon: Grip,
        });
        pages.push(
            ...([
                {
                    name: "Aktivní panely",
                    path: "/active-panels",
                    extendable: true,
                    file: "/user/active-panels",
                    showInSidebar: true,
                    icon: Wallpaper,
                },
                {
                    name: "Archiv panelů",
                    path: "/archived-panels",
                    extendable: true,
                    file: "/user/archived-panels",
                    showInSidebar: true,
                    icon: Archive,
                },
            ] as PageInfo[]),
        );
    }

    if (userType === "admin" || userType === "super-admin") {
        pages.unshift({
            name: "Přehled",
            path: "/",
            file: "/admin/",
            showInSidebar: true,
            icon: Grip,
        });

        pages.push(
            ...([
                {
                    name: "Aktivní panely",
                    path: "/active-panels",
                    extendable: true,
                    file: "/admin/active-panels",
                    showInSidebar: true,
                    icon: Wallpaper,
                },
                {
                    name: "Archiv panelů",
                    path: "/archived-panels",
                    extendable: true,
                    file: "/admin/archived-panels",
                    showInSidebar: true,
                    icon: Archive,
                },
                {
                    name: "Uživatelé",
                    path: "/users",
                    extendable: true,
                    file: "/admin/users",
                    showInSidebar: true,
                    icon: UsersRound,
                },
            ] as PageInfo[]),
        );

        if (userType === "super-admin")
            pages.push({
                name: "Administrátoři",
                path: "/admins",
                extendable: true,
                file: "/super-admin/admins",
                showInSidebar: true,
                icon: Shield,
            } as PageInfo);

        pages.push(
            ...([
                {
                    name: "Nastavení HejPanelu",
                    path: "/configuration",
                    file: "/admin/configuration",
                    showInSidebar: true,
                    icon: Settings2,
                },
                {
                    name: "Správa jídelny",
                    path: "/canteen",
                    file: "/admin/canteen",
                    showInSidebar: true,
                    icon: Utensils,
                },
                {
                    name: "Pozadí panelů",
                    path: "/backgrounds",
                    file: "/admin/backgrounds",
                    showInSidebar: true,
                    icon: ImageIcon,
                },
            ] as PageInfo[]),
        );
    }

    return pages;
};
