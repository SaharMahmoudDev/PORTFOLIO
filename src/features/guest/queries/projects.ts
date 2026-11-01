import "server-only";
import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import type { Project } from "@/db/schema";
import type { PublicProject } from "../data/projects";

type Locale = "en" | "ar";

function toPublicProject(row: Project, locale: Locale): PublicProject {
  return {
    key: row.key,
    name: row.name,
    url: row.url,
    demoUrl: row.demoUrl,
    repoUrl: row.repoUrl,
    category: row.category as PublicProject["category"],
    status: row.projectStatus as PublicProject["status"],
    year: row.year,
    tags: row.tags,
    image: { light: row.imageLight, dark: row.imageDark },
    ...row.content[locale],
  };
}

export async function getPublishedProjects(
  locale: Locale,
): Promise<PublicProject[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.publishStatus, "published"))
    .orderBy(asc(projects.sortOrder));

  return rows.map((row) => toPublicProject(row, locale));
}

export async function getPublishedProjectKeys(): Promise<string[]> {
  const rows = await db
    .select({ key: projects.key })
    .from(projects)
    .where(eq(projects.publishStatus, "published"));

  return rows.map((row) => row.key);
}

export async function getPublishedProject(
  key: string,
  locale: Locale,
): Promise<PublicProject | undefined> {
  const [row] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.key, key), eq(projects.publishStatus, "published")));

  return row ? toPublicProject(row, locale) : undefined;
}

export async function getNextPublishedProject(
  key: string,
  locale: Locale,
): Promise<PublicProject | undefined> {
  const rows = await db
    .select()
    .from(projects)
    .where(eq(projects.publishStatus, "published"))
    .orderBy(asc(projects.sortOrder));

  const index = rows.findIndex((row) => row.key === key);
  if (index === -1) return undefined;

  const next = rows[(index + 1) % rows.length];
  return toPublicProject(next, locale);
}

export async function getFeaturedProjects(
  keys: readonly string[],
  locale: Locale,
): Promise<PublicProject[]> {
  const rows = await db
    .select()
    .from(projects)
    .where(
      and(
        eq(projects.publishStatus, "published"),
        inArray(projects.key, [...keys]),
      ),
    );

  const byKey = new Map(rows.map((row) => [row.key, row]));
  return keys
    .map((key) => byKey.get(key))
    .filter((row) => row !== undefined)
    .map((row) => toPublicProject(row, locale));
}
