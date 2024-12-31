"use server";

import { getSessionUserInfo, validateUser } from "@/auth/session-utils";

import { Configuration } from "shared/types";
import { config } from "shared/schema";
import db from "shared/db";
import { env } from "@/env";

export const getConfiguration = async (): Promise<Configuration> => {
    const user = await getSessionUserInfo(true);

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    return (
        (await db.query.config.findFirst()) ?? {
            theme: "normal",
            timetableEnabled: false,
            canteenEnabled: false,
            departuresEnabled: false,
        }
    );
};

export const setConfiguration = async (configuration: Configuration) => {
    const user = await getSessionUserInfo(true);

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    await db.update(config).set(configuration).execute();

    await fetch(env.BACKEND_URL + "/configuration", {
        method: "POST",
    });
};
