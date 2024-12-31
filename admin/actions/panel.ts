"use server";

import { getSessionUserInfo, validateUser } from "@/auth/session-utils";

import { Panel } from "shared/types";
import db from "shared/db";
import { eq } from "shared/orm";
import { panels } from "shared/schema";

export const getPanelById = async (id: Panel["id"]): Promise<Panel> => {
    const user = await getSessionUserInfo(true);

    const panel = (await db.query.panels.findFirst({
        where: eq(panels.id, id),
    })) as Panel | undefined;

    if (validateUser(user, { isAdmin: false }) && panel?.author !== user.id)
        throw new Error("Unauthorized");

    if (!panel) throw new Error("Panel not found");

    return panel;
};
