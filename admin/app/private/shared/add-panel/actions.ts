"use server";

import { Panel, PanelBackground } from "shared/types";
import { activities, panelBackgrounds, panels, threads } from "shared/schema";
import { and, eq } from "shared/orm";
import { getSessionUserInfo, validateUser } from "@/auth/session-utils";

import db from "shared/db";
import { env } from "@/env";
import { panelTypes } from "shared/constants";
import { z } from "zod";

export interface CreatePanelDTO {
    type: Panel["type"];
    showFrom: Date;
    showTill: Date;
    content:
        | { base64: string }
        | { base64: string }
        | { content: string; backgroundId: number };
}

const validateCreatePanelDTO = async (
    data: CreatePanelDTO,
): Promise<{
    type: Panel["type"];
    showFrom: Date;
    showTill: Date;
    content: Panel["content"];
}> => {
    const parsed = z
        .object({
            type: z.enum(panelTypes),
            showFrom: z.date().transform((d) => {
                d.setHours(0, 0, 0, 0);
                return d;
            }),
            showTill: z.date().transform((d) => {
                d.setHours(23, 59, 59, 999);
                return d;
            }),
            content: z.object({
                base64: z.string().optional(),
                content: z.string().optional(),
                backgroundId: z.number().optional(),
            }),
        })
        .parse(data);

    let content: Panel["content"];

    switch (parsed.type) {
        case "image":
            if (!parsed.content.base64)
                throw new Error("Image URL is required");

            content = {
                url: parsed.content.base64,
            };
            break;
        case "video":
            if (!parsed.content.base64)
                throw new Error("Video URL is required");
            content = {
                url: parsed.content.base64,
            };
            break;
        case "text":
            if (!parsed.content.content || parsed.content.content.length === 0)
                throw new Error("Text content is required");

            if (!parsed.content.backgroundId)
                throw new Error("Background ID is required");

            const background = await db.query.panelBackgrounds.findFirst({
                where: and(
                    eq(panelBackgrounds.id, parsed.content.backgroundId),
                    eq(panelBackgrounds.deprecated, false),
                ),
                columns: {
                    url: true,
                    textColor: true,
                },
            });

            if (!background) throw new Error("Background not found");

            content = {
                content: parsed.content.content,
                background: background.url,
                textColor: background.textColor,
            };
            break;
    }

    return {
        type: parsed.type,
        showFrom: parsed.showFrom,
        showTill: parsed.showTill,
        content,
    };
};

export const addPanel = async (createPanelDTO: CreatePanelDTO) => {
    const user = await getSessionUserInfo(true);

    validateUser(user, {
        isSuspended: false,
        throwError: true,
    });

    const { type, showFrom, showTill, content } =
        await validateCreatePanelDTO(createPanelDTO);

    throw new Error(
        JSON.stringify({
            showFrom: showFrom.toLocaleString(),
            showTill: showTill.toLocaleString(),
        }),
    );

    const newThreadId = (
        await db
            .insert(threads)
            .values({
                owner: user.id,
                lastActivityAt: new Date(),
            })
            .returning({ insertedId: threads.id })
    )[0].insertedId;

    const newPanelId = (
        await db
            .insert(panels)
            .values({
                author: user.id,
                thread: newThreadId,
                type: type,
                showFrom: showFrom,
                showTill: showTill,
                content: content,
                isApproved: validateUser(user, {
                    isAdmin: true,
                }),
            })
            .returning({ insertedId: panels.id })
    )[0].insertedId;

    await db.insert(activities).values({
        thread: newThreadId,
        author: user.id,
        type: validateUser(user, {
            isAdmin: true,
        })
            ? "admin:addPanel"
            : "user:request:addPanel",
        data: {
            panel: newPanelId,
        },
    });

    await fetch(env.BACKEND_URL + "/panels", { method: "POST" });

    return newThreadId;
};

export const getPanelBackgrounds = async (): Promise<PanelBackground[]> => {
    await getSessionUserInfo(true);

    return await db.query.panelBackgrounds.findMany({
        where: eq(panelBackgrounds.deprecated, false),
    });
};
