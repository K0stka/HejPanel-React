import { NextRequest, NextResponse } from "next/server";

import { getPages } from "./lib/pages";
import { getSessionUserRecord } from "./auth/session";

// 1. Ignore certain paths
export const config = {
    matcher: [
        "/((?!api|static|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};

export async function middleware(req: NextRequest) {
    // 2. Get the currently logged in user
    const user = await getSessionUserRecord();

    // 3. Redirect
    if (user) {
        const pages = getPages(user.type);
        for (const page of pages)
            if (page.extendable) {
                if (req.nextUrl.pathname.startsWith(page.path))
                    return NextResponse.rewrite(
                        new URL(
                            "/private" +
                                page.file +
                                req.nextUrl.pathname.substring(
                                    page.path.length,
                                ),
                            req.nextUrl,
                        ),
                    );
            } else {
                if (req.nextUrl.pathname === page.path)
                    return NextResponse.rewrite(
                        new URL("/private" + page.file, req.nextUrl),
                    );
            }

        return NextResponse.error();
    } else
        return NextResponse.rewrite(
            new URL("/public" + req.nextUrl.pathname, req.nextUrl),
        );
}
