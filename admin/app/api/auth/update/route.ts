import { NextRequest, NextResponse } from "next/server";
import { getSessionUserRecord, removeSessionUser } from "@/auth/session";

import db from "shared/db";
import { eq } from "shared/orm";
import { users } from "shared/schema";

export const GET = async (req: NextRequest) => {
    const user = await getSessionUserRecord();

    if (!user) return NextResponse.error();

    const userDetails = await db.query.users.findFirst({
        where: eq(users.id, user.id),
    });

    if (!userDetails || userDetails.type !== user.type)
        await removeSessionUser();

    return NextResponse.redirect(new URL("/logged-out", req.nextUrl));
};
