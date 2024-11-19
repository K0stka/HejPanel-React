import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

export default drizzle(process.env.POSTGRES_URL!, {
	schema,
});
