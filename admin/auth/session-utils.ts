import { User } from "shared/types";
import { cache } from "react";
import db from "shared/db";
import { eq } from "shared/orm";
import { getSessionUserRecord } from "./session";
import { redirect } from "next/navigation";
import { users } from "shared/schema";

export const getSessionUserInfo: (serverAction?: boolean) => Promise<User> =
    cache(async (serverAction?: boolean) => {
        const sessionUser = await getSessionUserRecord();

        if (!sessionUser) throw new Error("You are not logged in");

        const user = await db.query.users.findFirst({
            where: eq(users.id, sessionUser.id),
        });

        if (!user || user.type !== sessionUser.type)
            if (serverAction) throw new Error("Invalid session");
            else redirect("/api/auth/update");

        return user;
    });

interface Options {
    isAdmin?: boolean;
    isSuperAdmin?: boolean;
    isSuspended?: boolean;
    throwError?: boolean;
}

export const validateUser = (user: User, options: Options): boolean => {
    const validated = (() => {
        if (options.isAdmin !== undefined) {
            if (options.isAdmin)
                return user.type === "admin" || user.type === "super-admin";
            else return user.type === "user";
        }

        if (options.isSuperAdmin !== undefined) {
            if (options.isSuperAdmin) return user.type === "super-admin";
            else return user.type !== "super-admin";
        }

        if (options.isSuspended !== undefined) {
            return user.suspended === options.isSuspended;
        }

        return true;
    })();

    if (options.throwError && !validated)
        throw new Error("You are not authorized to perform this action");

    return validated;
};
