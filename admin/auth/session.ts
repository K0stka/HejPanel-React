import "server-only";

import type { SessionUserRecord } from "@/lib/types";

import { SignJWT, jwtVerify } from "jose";

import { cache } from "react";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { User } from "shared";
import { userTypes } from "@/lib/constants";

const secretKey = process.env.SECRET ?? "key";
export const key = new TextEncoder().encode(secretKey);

const session_cookie = "session";
const session_lifetime = 60 * 60 * 24 * 7 * 1000;
const session_lifetime_string = "7d";

function encrypt(payload: SessionUserRecord): Promise<string> {
	return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime(session_lifetime_string).sign(key);
}

async function decrypt(session: string | undefined = ""): Promise<SessionUserRecord | null> {
	if (!session) return null;

	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ["HS256"],
		});

		if (typeof payload.id !== "number" || !userTypes.includes(payload?.type as User["type"])) return null;

		return {
			id: payload.id,
			type: payload.type as User["type"],
		};
	} catch (error) {
		return null;
	}
}

export async function setSession(user: User) {
	const expiresAt = new Date(Date.now() + session_lifetime);
	const session = await encrypt({
		id: user.id,
		type: user.type,
	});

	(await cookies()).set(session_cookie, session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "strict",
		path: "/",
	});

	redirect("/");
}

export const getSession = cache(async (): Promise<SessionUserRecord | null> => {
	const cookie = (await cookies()).get(session_cookie)?.value;
	const session = await decrypt(cookie);

	if (!session) return null;

	return session;
});

export async function updateSession() {
	const session = (await cookies()).get(session_cookie)?.value;

	if (!session) return;

	(await cookies()).set(session_cookie, session, {
		httpOnly: true,
		secure: true,
		expires: new Date(Date.now() + session_lifetime),
		sameSite: "strict",
		path: "/",
	});
}

export async function deleteSession() {
	(await cookies()).delete(session_cookie);

	redirect("/");
}
