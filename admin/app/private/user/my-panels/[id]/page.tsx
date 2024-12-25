import { activities, panels, threads } from "shared/schema";
import { and, desc, eq } from "shared/orm";

import ActivityPreview from "@/components/ActivityPreview";
import Avatar from "@/components/Avatar";
import { NextPage } from "next";
import PageError from "@/components/utility/PageError";
import PageTemplate from "@/components/utility/PageTemplate";
import PanelPreview from "@/components/PanelPreview";
import PanelStatus from "@/components/PanelStatus";
import db from "shared/db";
import { getSessionUserInfo } from "@/auth/session-hooks";

interface Props {
  params: Promise<{ id: string }>;
}

const ThreadPage: NextPage<Props> = async ({ params }) => {
  const user = await getSessionUserInfo();

  const thread = await db.query.threads.findFirst({
    where: and(
      eq(threads.owner, user.id),
      eq(threads.id, parseInt((await params).id)),
    ),
    with: {
      activities: {
        orderBy: desc(activities.sentAt),
        with: {
          author: {
            columns: {
              type: true,
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
  });

  if (!thread)
    return <PageError error="Panel nebyl nalezen" backLink="/my-panels" />;

  return (
    <PageTemplate title="Můj panel">
      <div className="grid grid-cols-[3fr,7fr] items-start gap-5">
        <div className="flex flex-col gap-5 rounded-lg bg-accent p-5">
          <h1>Aktuální stav</h1>
          <PanelPreview panel={thread.panels[0]} />
          <PanelStatus panel={thread.panels[0]} />
        </div>
        <div className="grid grid-cols-1 gap-5">
          {thread.activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex flex-col ${activity.author.type === user.type ? "items-end" : "items-start"} gap-5`}
            >
              <div className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2">
                <Avatar user={activity.author} />
                {activity.author.name}
              </div>
              <div>
                <ActivityPreview activity={activity} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default ThreadPage;
