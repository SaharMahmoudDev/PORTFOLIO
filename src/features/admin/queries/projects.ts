import "server-only";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";

export async function getAdminProjects() {
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getAdminProject(id: string) {
  const [row] = await db.select().from(projects).where(eq(projects.id, id));
  return row;
}
