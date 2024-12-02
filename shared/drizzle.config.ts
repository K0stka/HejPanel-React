import { defineConfig } from "drizzle-kit";
import process from "node:process";

export default defineConfig({
	out: "./db/migrations",
	schema: "./db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.POSTGRES_URL!,
	},
});
