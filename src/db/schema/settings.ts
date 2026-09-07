import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

/**
 * Single key/value table that drives per-plan feature flags
 * (Basic / Pro / Premium) and other runtime settings. One database is
 * shared across plans — behaviour differs only by rows here.
 */
export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value"),
  enabled: boolean("enabled").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Setting = typeof settings.$inferSelect;
export type NewSetting = typeof settings.$inferInsert;
