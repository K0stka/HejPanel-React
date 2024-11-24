import { relations, sql } from "drizzle-orm";
import { boolean, date, integer, pgEnum, pgTable, varchar, json } from "drizzle-orm/pg-core";
import { activityTypes, panelTypes, themes, userTypes } from "../../../admin/lib/constants.ts";

export const themeEnum = pgEnum("theme", themes);

export const config = pgTable("config", {
	theme: themeEnum("theme").notNull().default(themes[0]),
	timetableEnabled: boolean("timetable_enabled").notNull().default(true),
	canteenEnabled: boolean("canteen_enabled").notNull().default(true),
	departuresEnabled: boolean("departures_enabled").notNull().default(true),
});

export const canteens = pgTable("canteen", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	date: date("date", { mode: "date" }).notNull().unique(),
	soup: varchar("soup", { length: 255 }),
	snack: varchar("snack", { length: 255 }),
	lunch1: varchar("lunch1", { length: 255 }),
	lunch2: varchar("lunch2", { length: 255 }),
	lunch3: varchar("lunch3", { length: 255 }),
	commonSuffix: varchar("common_suffix", { length: 255 }),
});

export const userTypesEnum = pgEnum("user_type", userTypes);

export const users = pgTable("users", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	type: userTypesEnum("type").notNull().default(userTypes[0]),
});

export const usersRelations = relations(users, ({ many }) => ({
	panels: many(panels),
	threads: many(threads),
	activities: many(activities),
}));

export const panelTypesEnum = pgEnum("panel_type", panelTypes);

export const panels = pgTable("panels", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	thread: integer("thread")
		.notNull()
		.references(() => threads.id),
	author: integer("author")
		.notNull()
		.references(() => users.id),
	showFrom: date("show_from", { mode: "date" }).notNull(),
	showTill: date("show_till", { mode: "date" }).notNull(),
	isApproved: boolean("is_approved").notNull().default(false),
	isHidden: boolean("is_hidden").notNull().default(false),
	isDeprecated: boolean("is_deprecated").notNull().default(false),
	type: panelTypesEnum("type").notNull(),
	content: varchar("content", { length: 1023 }).notNull(),
});

export const panelsRelations = relations(panels, ({ one }) => ({
	thread: one(threads, { fields: [panels.thread], references: [threads.id] }),
	author: one(users, { fields: [panels.author], references: [users.id] }),
}));

export const threads = pgTable("threads", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	owner: integer("owner")
		.notNull()
		.references(() => users.id),
});

export const threadsRelations = relations(threads, ({ one, many }) => ({
	owner: one(users, { fields: [threads.owner], references: [users.id] }),
	panels: many(panels),
	activities: many(activities),
}));

export const activityTypesEnum = pgEnum("activity_type", activityTypes);

export const activities = pgTable("activity", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	thread: integer("thread")
		.notNull()
		.references(() => threads.id),
	author: integer("author")
		.notNull()
		.references(() => users.id),
	sentAt: date("sent_at", { mode: "date" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	type: activityTypesEnum("type").notNull(),
	data: json("data").notNull(),
});

export const activitiesRelations = relations(activities, ({ one }) => ({
	thread: one(threads, { fields: [activities.thread], references: [threads.id] }),
	author: one(users, { fields: [activities.author], references: [users.id] }),
}));
