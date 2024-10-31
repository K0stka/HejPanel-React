import { type Config } from "drizzle-kit";

import { env } from "hejpanel_admin/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["hejpanel_admin_*"],
} satisfies Config;
