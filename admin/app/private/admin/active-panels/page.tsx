import { Activity, Panel, User } from "shared/types";
import { activities, panels, threads } from "shared/schema";

import ActivityText from "@/components/ActivityText";
import Link from "next/link";
import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import PanelPreview from "@/components/PanelPreview";
import PanelStatus from "@/components/PanelStatus";
import { cs } from "date-fns/locale";
import db from "shared/db";
import { desc } from "shared/orm";

const ThreadsPage: NextPage = async () => {
    const myThreads = await db.query.threads.findMany({
        with: {
            activities: {
                orderBy: desc(activities.sentAt),
                with: {
                    author: {
                        columns: {
                            name: true,
                        },
                    },
                },
                columns: {
                    sentAt: true,
                    type: true,
                    data: true,
                },
                limit: 1,
            },
            panels: {
                orderBy: desc(panels.id),
                limit: 1,
            },
        },
        orderBy: desc(threads.lastActivityAt),
    });

    return (
        <PageTemplate title="Aktivní panely">
            <div className="grid grid-cols-2 gap-5">
                {myThreads.map((thread) => {
                    const panel = thread.panels[0] as Panel | null;

                    if (!panel) return null;

                    const activity = thread.activities[0] as Activity & {
                        author: User;
                    };
                    return (
                        <Link
                            href={`/active-panels/${thread.id}`}
                            className="grid grid-cols-[auto,1fr] items-center gap-5 rounded-lg bg-accent p-3 transition-colors hover:bg-accent/70"
                            key={thread.id}
                        >
                            <PanelPreview
                                type={panel.type}
                                content={panel.content}
                            />
                            <div className="flex flex-col gap-2">
                                <span>
                                    <b>Zobrazeno:</b>&nbsp;
                                    {panel.isApproved &&
                                    !panel.isDeprecated &&
                                    !panel.isHidden &&
                                    panel.showFrom > new Date() &&
                                    panel.showTill < new Date()
                                        ? "Ano"
                                        : "Ne"}
                                </span>
                                <span>
                                    <b>Stav:</b>&nbsp;
                                    <PanelStatus panel={panel} />
                                </span>
                                <span>
                                    <b>Poslední aktivita:</b>
                                </span>
                                {activity.sentAt.toLocaleString(cs.code)}&nbsp;
                                {activity.author.name}&nbsp;
                                <ActivityText activity={activity} />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </PageTemplate>
    );
};

export default ThreadsPage;
