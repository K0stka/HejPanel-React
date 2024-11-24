"use server";

import { User } from "shared";
import { deleteSession, getSession, updateSession } from "./session";
import db from "@/db/connector";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";

export const getSessionUser = async (): Promise<User | null> => {
	const session = await getSession();

	if (!session) return null;

	const user = await db.query.users.findFirst({
		where: eq(users.id, session.id),
	});

	if (!user) {
		// deleteSession();
		return null;
	}

	// updateSession();
	return user;
};
