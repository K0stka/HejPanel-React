import { activities, threads } from "shared/schema";

import { NextPage } from "next";
import PageTemplate from "@/components/PageTemplate";
import db from "shared/db";
import { desc } from "shared/orm";

const PanelsPage: NextPage = async () => {
  const threadsList = await db.query.threads.findMany({
    orderBy: desc(threads.lastActivityAt),
    with: {
      owner: true,
      activities: {
        limit: 1,
        orderBy: desc(activities.sentAt),
      },
    },
  });
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <PageTemplate title="Panely">
      <pre>{JSON.stringify(threadsList, null, 2)}</pre>
    </PageTemplate>
  );
};

export default PanelsPage;
