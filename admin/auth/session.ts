import "server-only";

import { SignJWT, jwtVerify } from "jose";

import { SessionUserRecord } from "@/lib/types";
import { cache } from "react";
import { cookies } from "next/headers";
import { env } from "@/env";
import { redirect } from "next/navigation";

const encodedKey = new TextEncoder().encode(env.AUTH_SECRET);

const session_cookie_name = "session";
const session_cookie_max_age = 1000 * 60 * 60 * 24 * 7; // 1 week

export async function setSessionUser(user: SessionUserRecord) {
  const cookieStore = await cookies();

  const expiresAt = new Date(Date.now() + session_cookie_max_age);
  const cookie = await encryptSessionUser(user);

  cookieStore.set(session_cookie_name, cookie, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
}

export const getSessionUserRecord: () => Promise<SessionUserRecord | null> =
  cache(async () => {
    const cookieStore = await cookies();
    const cookie = cookieStore.get(session_cookie_name)?.value;

    if (!cookie) return null;

    return decryptSessionUser(cookie);
  });

export async function removeSessionUser() {
  const cookieStore = await cookies();
  cookieStore.delete(session_cookie_name);

  redirect("/");
}

async function encryptSessionUser(user: SessionUserRecord): Promise<string> {
  // @ts-ignore
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

async function decryptSessionUser(
  session: string,
): Promise<SessionUserRecord | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return {
      id: payload.id,
      type: payload.type,
    };
  } catch (error) {
    return null;
  }
}
