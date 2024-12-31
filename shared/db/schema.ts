import { Activity, Panel } from "../lib/types.d.ts";
import { activityTypes, panelTypes, themes, userTypes } from "../lib/constants.ts";
import { boolean, date, integer, json, pgEnum, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

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
	microsoftId: varchar("microsoft_id", { length: 63 }).notNull().unique(),
	name: varchar("name", { length: 255 }).notNull(),
	email: varchar("email", { length: 255 }).notNull().unique(),
	type: userTypesEnum("type").notNull().default(userTypes[0]),
	suspended: boolean("suspended").notNull().default(false),
});

export const usersRelations = relations(users, ({ many }) => ({
	panels: many(panels),
	threads: many(threads),
	activities: many(activities),
	notifications: many(notifications),
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
	content: json("content").notNull().$type<Panel["content"]>(),
});

export const panelsRelations = relations(panels, ({ one }) => ({
	thread: one(threads, { fields: [panels.thread], references: [threads.id] }),
	author: one(users, { fields: [panels.author], references: [users.id] }),
}));

export const panelBackgrounds = pgTable("panel_backgrounds", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	url: varchar("url", { length: 255 }).notNull(),
	textColor: varchar("text_color", { length: 7 }).notNull(),
	deprecated: boolean("deprecated").notNull().default(false),
});

export const threads = pgTable("threads", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	owner: integer("owner")
		.notNull()
		.references(() => users.id),
	createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	lastActivityAt: timestamp("last_activity_at", { mode: "date", withTimezone: true }).notNull(),
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
	sentAt: timestamp("sent_at", { mode: "date", withTimezone: true })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	type: activityTypesEnum("type").notNull(),
	data: json("data").notNull().$type<Activity["data"]>(),
});

export const activitiesRelations = relations(activities, ({ one }) => ({
	thread: one(threads, { fields: [activities.thread], references: [threads.id] }),
	author: one(users, { fields: [activities.author], references: [users.id] }),
}));

export const notifications = pgTable("notification", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	recipient: integer("recipient")
		.notNull()
		.references(() => users.id),
	sentAt: timestamp("sent_at", { mode: "date", withTimezone: true })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	title: varchar("title", { length: 255 }).notNull(),
	content: varchar("content", { length: 255 }).notNull(),
	path: varchar("path", { length: 255 }),
	read: boolean("is_read").notNull().default(false),
});

export const notificationsRelations = relations(notifications, ({ one }) => ({
	recipient: one(users, {
		fields: [notifications.recipient],
		references: [users.id],
	}),
}));
