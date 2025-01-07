import { Either, User } from "shared/types";

import { cache } from "react";
import db from "shared/db";
import { eq } from "shared/orm";
import { getSessionUserRecord } from "./session";
import { redirect } from "next/navigation";
import { users } from "shared/schema";

interface GetSessionUserOptions {
    throwErrorOnInvalidSession?: true;
}

export const getSessionUserInfo: (
    options?: GetSessionUserOptions,
) => Promise<User> = cache(
    async ({ throwErrorOnInvalidSession }: GetSessionUserOptions = {}) => {
        const sessionUser = await getSessionUserRecord();

        if (!sessionUser) throw new Error("You are not logged in");

        const user = await db.query.users.findFirst({
            where: eq(users.id, sessionUser.id),
        });

        if (!user || user.type !== sessionUser.type)
            if (throwErrorOnInvalidSession) throw new Error("Invalid session");
            else redirect("/api/auth/update");

        return user;
    },
);

type ValidateUserOptions = {
    throwError?: true;
} & Either<
    Either<{ isAdmin: true }, { isUser: true }>,
    Either<{ isSuperAdmin: true }, { isSuspended: false }>
>;

export const validateUser = (
    user: User,
    options: ValidateUserOptions,
): boolean => {
    const validated = (() => {
        if (options.isAdmin)
            if (user.type !== "admin" && user.type !== "super-admin")
                return false;

        if (options.isSuperAdmin) if (user.type !== "super-admin") return false;

        if (options.isUser) if (user.type !== "user") return false;

        if (options.isSuspended === false)
            if (user.type === "suspended") return false;

        return true;
    })();

    if (options.throwError && !validated)
        throw new Error("You are not authorized to perform this action");

    return validated;
};
