import { User } from "shared/types";
import { cache } from "react";
import db from "shared/db";
import { eq } from "shared/orm";
import { getSessionUserRecord } from "./session";
import { users } from "shared/schema";

export const getSessionUserInfo: () => Promise<User> = cache(async () => {
  const sessionUser = await getSessionUserRecord();

  if (!sessionUser) throw new Error("User not found");

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionUser.id),
  });

  if (!user) throw new Error("User not found");

  return user;
});
