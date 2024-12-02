import {
  GalleryHorizontalEnd,
  Grip,
  Plus,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";

import { PageInfo } from "./types";

export const sharedPages: PageInfo[] = [
  {
    name: "Profil",
    path: "/profile",
  },
  {
    name: "Přidat panel",
    path: "/add-panel",
  },
];

export const userPages: PageInfo[] = [
  {
    name: "Přehled",
    path: "/",
    icon: Grip,
  },
  {
    name: "Přidat panel",
    path: "/add-panel",
    icon: Plus,
  },
  {
    name: "Moje panely",
    path: "/my-panels",
    icon: GalleryHorizontalEnd,
  },
];

export const adminPages: PageInfo[] = [
  {
    name: "Přehled",
    path: "/",
    icon: Grip,
  },
  {
    name: "Přidat panel",
    path: "/add-panel",
    icon: Plus,
  },
  {
    name: "Panely",
    path: "/panels",
    icon: GalleryHorizontalEnd,
  },
  {
    name: "Uživatelé",
    path: "/users",
    icon: UsersRound,
  },
  {
    name: "Nastavení HejPanelu",
    path: "/settings",
    icon: SlidersHorizontal,
  },
];
