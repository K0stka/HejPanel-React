import { NextRequest, NextResponse } from "next/server";

import db from "shared/db";
import { env } from "@/env";
import { eq } from "shared/orm";
import { setSessionUserRecord } from "@/auth/session";
import { users } from "shared/schema";

type MicrosoftUserInfo = {
    id: string;
    displayName: string;
    mail: string;
};

async function getUserInfoFromCode(
    code: string,
): Promise<MicrosoftUserInfo | null> {
    // return {
    //     id: "123",
    //     displayName: "Test User",
    //     mail: "test.mail@example.com",
    // };

    const tokenResponse = await fetch(
        `https://login.microsoftonline.com/${env.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                client_id: env.MICROSOFT_CLIENT_ID,
                scope: "User.Read",
                code: code,
                redirect_uri: env.AUTH_CALLBACK_URL,
                grant_type: "authorization_code",
                client_secret: env.MICROSOFT_CLIENT_SECRET,
            }),
        },
    ).then((res) => res.json());

    const accessToken = tokenResponse.access_token;

    if (!accessToken) return null;

    const userData = await fetch("https://graph.microsoft.com/v1.0/me", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    }).then((res) => res.json());

    if (!userData.id) return null;

    const user: MicrosoftUserInfo = {
        id: userData.id,
        displayName: userData.displayName,
        mail: userData.mail?.toLowerCase(),
    };

    return user;
}

export async function GET(req: NextRequest) {
    const code = new URL(req.url).searchParams.get("code") ?? "";

    const userInfo = await getUserInfoFromCode(code);

    if (!userInfo)
        return NextResponse.redirect(new URL("/login-failed", req.nextUrl));

    let user = await db.query.users.findFirst({
        where: eq(users.microsoftId, userInfo.id),
    });

    if (!user) {
        const newUser = await db
            .insert(users)
            .values({
                microsoftId: userInfo.id,
                name: userInfo.displayName,
                email: userInfo.mail,
                type: "user",
            })
            .returning({ insertedId: users.id });

        user = {
            id: newUser[0].insertedId,
            microsoftId: userInfo.id,
            name: userInfo.displayName,
            email: userInfo.mail,
            type: "user",
            suspended: false,
        };
    }

    await setSessionUserRecord(user);

    return NextResponse.redirect("/");
}
