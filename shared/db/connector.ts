import * as schema from "./schema.ts";

import { drizzle } from "drizzle-orm/node-postgres";
import process from "node:process";

const db = drizzle(process.env.POSTGRES_URL!, {
	schema,
});

export default db;
