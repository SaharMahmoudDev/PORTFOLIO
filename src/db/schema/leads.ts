import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  projectType: text("project_type").notNull(),
  budget: text("budget").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  aiType: text("ai_type"),
  aiIndustry: text("ai_industry"),
  aiPriority: text("ai_priority"),
  aiFeatures: text("ai_features").array(),
  aiSuggestedReply: text("ai_suggested_reply"),
  aiClassifiedAt: timestamp("ai_classified_at", { withTimezone: true }),
  repliedAt: timestamp("replied_at", { withTimezone: true }),
});

export type Lead = typeof leads.$inferSelect;
export type NewLead = typeof leads.$inferInsert;
