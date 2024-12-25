"use server";

import { Panel, PanelBackground, PanelBackgroundOrId } from "shared/types";
import { activities, panelBackgrounds, panels, threads } from "shared/schema";

import db from "shared/db";
import { eq } from "shared/orm";
import { getSessionUserRecord } from "@/auth/session";

interface CreatePanelDto {
  type: Panel["type"];
  showFrom: Date;
  showTill: Date;
  content: Panel["content"];
}

export const addPanel = async ({
  type,
  showFrom,
  showTill,
  content,
}: CreatePanelDto) => {
  const user = await getSessionUserRecord();

  if (!user) throw new Error("User not logged in");

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
      })
      .returning({ insertedId: panels.id })
  )[0].insertedId;

  await db.insert(activities).values({
    thread: newThreadId,
    author: user.id,
    type: "user:request:addPanel",
    data: {
      panel: newPanelId,
    },
  });
};

export const getPanelBackgrounds = async (): Promise<PanelBackground[]> => {
  return await db.query.panelBackgrounds.findMany({
    where: eq(panelBackgrounds.deprecated, false),
  });
};
