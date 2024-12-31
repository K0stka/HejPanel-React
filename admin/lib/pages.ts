import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
    GalleryHorizontalEnd,
    Grip,
    LucideProps,
    Plus,
    SlidersHorizontal,
    UsersRound,
} from "lucide-react";

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
    const pages: PageInfo[] = [
        {
            name: "Přidat panel",
            path: "/add-panel",
            file: "/shared/add-panel",
            showInSidebar: true,
            icon: Plus,
        },
        {
            name: "Profil",
            path: "/profile",
            file: "/shared/profile",
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
                    icon: GalleryHorizontalEnd,
                },
                {
                    name: "Archiv panelů",
                    path: "/archived-panels",
                    extendable: true,
                    file: "/user/archived-panels",
                    showInSidebar: true,
                    icon: GalleryHorizontalEnd,
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
                    icon: GalleryHorizontalEnd,
                },
                {
                    name: "Archiv panelů",
                    path: "/archived-panels",
                    extendable: true,
                    file: "/admin/archived-panels",
                    showInSidebar: true,
                    icon: GalleryHorizontalEnd,
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
                icon: UsersRound,
            } as PageInfo);

        pages.push({
            name: "Nastavení HejPanelu",
            path: "/settings",
            file: "/admin/settings",
            showInSidebar: true,
            icon: SlidersHorizontal,
        } as PageInfo);
    }

    return pages;
};
