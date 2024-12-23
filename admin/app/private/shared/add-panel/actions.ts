"use server";

import { activities, panels, threads } from "shared/schema";

import { AddPanelFormSchema } from "@/lib/constants";
import db from "shared/db";
import { getSessionUserRecord } from "@/auth/session";
import z from "zod";

const addPanel = async (formData: FormData) => {
  const user = await getSessionUserRecord();

  if (!user) throw new Error("User not logged in");

  const validatedData = AddPanelFormSchema.parse(formData);

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
        type: validatedData.type,
        showFrom: validatedData.showFrom,
        showTill: validatedData.showTill,
        content: validatedData.content ?? "",
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

export default addPanel;
