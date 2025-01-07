"use server";

import { and, eq, sql } from "shared/orm";
import { cwd, off } from "process";
import { existsSync, promises as fs } from "fs";
import { getSessionUserInfo, validateUser } from "@/auth/session-utils";
import { panelBackgrounds, panels } from "shared/schema";

import { PanelBackground } from "shared/types";
import db from "shared/db";
import { revalidatePath } from "next/cache";

export const addPanelBackground = async (base64: string, textColor: string) => {
    const user = await getSessionUserInfo({ throwErrorOnInvalidSession: true });

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    let filename, uploadPath;
    let offset = 0;
    while (true) {
        filename = Date.now() + offset + ".png";
        uploadPath = `${cwd()}/uploads/backgrounds/${filename}`;

        if (existsSync(uploadPath)) offset++;
        else break;
    }

    const buffer = Buffer.from(base64, "base64");
    await fs.writeFile(uploadPath, buffer);

    await db.insert(panelBackgrounds).values({
        fileName: "",
        textColor,
    });

    revalidatePath("/backgrounds");
};

export const updatePanelBackgroundTextColor = async (
    backgroundId: PanelBackground["id"],
    textColor: PanelBackground["textColor"],
) => {
    const user = await getSessionUserInfo({ throwErrorOnInvalidSession: true });

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    const background = await db.query.panelBackgrounds.findFirst({
        where: eq(panelBackgrounds.id, backgroundId),
    });

    if (!background) throw new Error("Background not found");

    await db
        .update(panelBackgrounds)
        .set({ textColor })
        .where(eq(panelBackgrounds.id, backgroundId));

    await db
        .update(panels)
        .set({
            content: sql`jsonb_set(
                ${panels.content},
                '{textColor}',
                ${textColor}
            )`,
        })
        .where(
            and(
                eq(panels.type, "text"),
                sql`${panels.content}->>'background' = ${backgroundId}`,
            ),
        );

    revalidatePath("/backgrounds");
};

export const disablePanelBackground = async (
    backgroundId: PanelBackground["id"],
) => {
    const user = await getSessionUserInfo({ throwErrorOnInvalidSession: true });

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    const background = await db.query.panelBackgrounds.findFirst({
        where: and(
            eq(panelBackgrounds.id, backgroundId),
            eq(panelBackgrounds.disabled, false),
        ),
    });

    if (!background) throw new Error("Background not found");

    await db
        .update(panelBackgrounds)
        .set({ disabled: true })
        .where(eq(panelBackgrounds.id, backgroundId));

    revalidatePath("/backgrounds");
};

export const enablePanelBackground = async (
    backgroundId: PanelBackground["id"],
) => {
    const user = await getSessionUserInfo({ throwErrorOnInvalidSession: true });

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    const background = await db.query.panelBackgrounds.findFirst({
        where: and(
            eq(panelBackgrounds.id, backgroundId),
            eq(panelBackgrounds.disabled, true),
        ),
    });

    if (!background) throw new Error("Background not found");

    await db
        .update(panelBackgrounds)
        .set({ disabled: false })
        .where(eq(panelBackgrounds.id, backgroundId));

    revalidatePath("/backgrounds");
};
