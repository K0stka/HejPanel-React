import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import process from "node:process";
import { canteenTable, configTable, usersTable } from "./schema.ts";

const db = drizzle(process.env.DATABASE_URL!, {
	schema: {
		usersTable,
		configTable,
		canteenTable,
	},
});

export default db;
