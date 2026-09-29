import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export type ProjectPoint = { title: string; text: string };
export type ProjectMetric = { label: string; value: string };

export type ProjectLocaleContent = {
  outcome: string;
  meta: { role: string; timeline: string };
  overview: string;
  problem: string;
  goals: string[];
  approach: ProjectPoint[];
  features: ProjectPoint[];
  design: { pointTitle: string; pointText: string };
  implementation: ProjectPoint[];
  challenges: { pointTitle: string; pointText: string };
  detail: { caption: string };
  results: ProjectMetric[];
};

export type ProjectContent = {
  en: ProjectLocaleContent;
  ar: ProjectLocaleContent;
};

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: text("key").notNull().unique(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  demoUrl: text("demo_url").notNull(),
  repoUrl: text("repo_url").notNull(),
  category: text("category").notNull(),
  projectStatus: text("project_status").notNull(), // "live" | "inProgress"
  publishStatus: text("publish_status").notNull().default("published"), // "draft" | "published"
  year: text("year").notNull(),
  tags: text("tags").array().notNull(),
  imageLight: text("image_light").notNull(),
  imageDark: text("image_dark").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  content: jsonb("content").$type<ProjectContent>().notNull(),
  sourceUrl: text("source_url"), // the URL pasted into the AI Project Generator, if any
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
