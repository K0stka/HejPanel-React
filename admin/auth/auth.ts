"use server";

import db from "@/db/connector";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import { deleteSession, setSession } from "@/auth/session";

export async function login(userId: number): Promise<boolean> {
	const user = await db.query.users.findFirst({
		where: eq(users.id, userId),
	});

	if (!user) return false;

	await setSession(user);
	return true;
}

export async function logout() {
	await deleteSession();
}
