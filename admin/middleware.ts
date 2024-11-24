import { NextRequest, NextResponse } from "next/server";
import { PageInfo } from "@/lib/types";
import { getSession } from "@/auth/session";

const sharedPages: PageInfo[] = [
	{
		name: "Profil",
		path: "/profile",
	},
];

export const userPages: PageInfo[] = [
	{
		name: "Přehled",
		path: "/",
	},
	{
		name: "Přidat panel",
		path: "/add-panel",
	},
	{
		name: "Moje panely",
		path: "/my-panels",
	},
];

export const adminPages: PageInfo[] = [
	{
		name: "Přehled",
		path: "/",
	},
	{
		name: "Přidat panel",
		path: "/add-panel",
	},
	{
		name: "Panely",
		path: "/panels",
	},
	{
		name: "Uživatelé",
		path: "/users",
	},
	{
		name: "Nastavení HejPanelu",
		path: "/settings",
	},
];

// 1. Define the configuration
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		"/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
	],
};

export default async function middleware(req: NextRequest) {
	// 2. Check if the current route is protected or public
	const isPublicRoute = req.nextUrl.pathname === "/login";

	// 3. Get the currently logged in user
	const user = await getSession();

	// 4. Redirect
	if (user) {
		if (sharedPages.some((page) => page.path === req.nextUrl.pathname)) return NextResponse.rewrite(new URL("/private/shared" + req.nextUrl.pathname, req.nextUrl));

		switch (user.type) {
			case "user":
				if (userPages.some((page) => page.path === req.nextUrl.pathname)) return NextResponse.rewrite(new URL("/private/user" + req.nextUrl.pathname, req.nextUrl));
				break;
			case "admin":
				if (adminPages.some((page) => page.path === req.nextUrl.pathname)) return NextResponse.rewrite(new URL("/private/admin" + req.nextUrl.pathname, req.nextUrl));
				break;
			default:
				throw new Error(`Invalid user type ${user.type}`);
		}
	} else if (!isPublicRoute) return NextResponse.rewrite(new URL("/public", req.nextUrl));

	return NextResponse.next();
}
