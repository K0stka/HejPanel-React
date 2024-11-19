import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";

export default drizzle(Deno.env.get("POSTGRES_URL")!, {
	schema,
});
