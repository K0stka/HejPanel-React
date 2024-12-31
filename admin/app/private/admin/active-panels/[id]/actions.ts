"use server";

import {
    Activity,
    ActivityMessage,
    Panel,
    PanelThread,
    User,
} from "shared/types";
import { activities, panels, threads } from "shared/schema";
import { asc, desc, eq } from "shared/orm";
import { getSessionUserInfo, validateUser } from "@/auth/session-utils";

import db from "shared/db";
import { revalidatePath } from "next/cache";

export const getThreadById = async (
    id: number,
): Promise<
    | (PanelThread & {
          activities: (Activity & {
              author: {
                  id: User["id"];
                  name: User["name"];
              };
          })[];
          panels: Panel[];
      })
    | undefined
> => {
    const user = await getSessionUserInfo();

    validateUser(user, {
        isAdmin: true,
        throwError: true,
    });

    return (await db.query.threads.findFirst({
        where: eq(threads.id, id),
        with: {
            activities: {
                orderBy: asc(activities.sentAt),
                with: {
                    author: {
                        columns: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
            panels: {
                orderBy: desc(panels.id),
                limit: 1,
            },
        },
        orderBy: desc(threads.lastActivityAt),
    })) as
        | (PanelThread & {
              activities: (Activity & {
                  author: {
                      id: User["id"];
                      name: User["name"];
                  };
              })[];
              panels: Panel[];
          })
        | undefined;
};

export const sendMessage = async (threadId: number, message: string) => {
    const user = await getSessionUserInfo(true);

    validateUser(user, {
        isSuspended: false,
        isAdmin: true,
        throwError: true,
    });

    const thread = await db.query.threads.findFirst({
        where: eq(threads.id, threadId),
    });

    if (!thread) throw new Error("Thread not found");

    const activityData: ActivityMessage["data"] = {
        message,
    };

    await db.insert(activities).values({
        thread: thread.id,
        author: user.id,
        type: "message",
        data: activityData,
    });

    revalidatePath(`/active-panels/${thread.id}`);
};
