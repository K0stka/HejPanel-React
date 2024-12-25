import { activities, panels, threads } from "shared/schema";
import { desc, eq } from "shared/orm";

import ActivityPreview from "@/components/ActivityPreview";
import Link from "next/link";
import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import PanelPreview from "@/components/PanelPreview";
import PanelStatus from "@/components/PanelStatus";
import db from "shared/db";
import { getSessionUserInfo } from "@/auth/session-hooks";

const ThreadsPage: NextPage = async () => {
  const user = await getSessionUserInfo();

  const myThreads = await db.query.threads.findMany({
    where: eq(threads.owner, user.id),
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
    <PageTemplate title="Moje panely">
      <div className="grid grid-cols-2 gap-5">
        {myThreads.map((thread) => (
          <Link
            href={`/my-panels/${thread.id}`}
            className="grid grid-cols-[auto,1fr] items-center gap-5 rounded-lg bg-accent p-3 transition-colors hover:bg-accent/70"
            key={thread.id}
          >
            <PanelPreview panel={thread.panels[0]} />
            <div className="flex flex-col gap-2">
              <span>
                <b>Zobrazeno:</b>&nbsp;
                {thread.panels[0].isApproved &&
                !thread.panels[0].isDeprecated &&
                !thread.panels[0].isHidden &&
                thread.panels[0].showFrom > new Date() &&
                thread.panels[0].showTill < new Date()
                  ? "Ano"
                  : "Ne"}
              </span>
              <span>
                <b>Stav:</b>&nbsp;
                <PanelStatus panel={thread.panels[0]} />
              </span>
              <span>
                <b>Poslední aktivita:</b>
              </span>
              <ActivityPreview activity={thread.activities[0]} />
            </div>
          </Link>
        ))}
      </div>
    </PageTemplate>
  );
};

export default ThreadsPage;
