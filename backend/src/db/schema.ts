import { boolean, date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	name: varchar({ length: 255 }).notNull(),
	age: integer().notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
});

export const configTable = pgTable("config", {
	theme: varchar({ length: 63 }).notNull().default("normal"),
	timetableEnabled: boolean("timetable_enabled").notNull().default(true),
	canteenEnabled: boolean("canteen_enabled").notNull().default(true),
	departuresEnabled: boolean("departures_enabled").notNull().default(true),
});

export const canteenTable = pgTable("canteen", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	date: date({ mode: "date" }).notNull().unique(),
	soup: varchar({ length: 255 }),
	snack: varchar({ length: 255 }),
	lunch1: varchar({ length: 255 }),
	lunch2: varchar({ length: 255 }),
	lunch3: varchar({ length: 255 }),
	commonSuffix: varchar("common_suffix", { length: 255 }),
});
