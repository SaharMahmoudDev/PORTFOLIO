"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { getAdminSession } from "../session";
import { projectServerSchema } from "../schemas/project";

export type SaveProjectResult =
  | { ok: true; id: string }
  | {
      ok: false;
      error: "unauthorized" | "invalid" | "duplicateKey" | "failed";
    };

function isDuplicateKeyError(error: unknown) {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as { code?: string }).code === "23505"
  );
}

function toRow(input: unknown) {
  const parsed = projectServerSchema.safeParse(input);
  if (!parsed.success) return null;

  const { tags, contentEn, contentAr, status, ...rest } = parsed.data;
  return {
    ...rest,
    projectStatus: status,
    tags: tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    content: { en: contentEn, ar: contentAr },
  };
}

export async function createProject(
  input: unknown,
): Promise<SaveProjectResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const row = toRow(input);
  if (!row) return { ok: false, error: "invalid" };

  try {
    const [created] = await db
      .insert(projects)
      .values(row)
      .returning({ id: projects.id });

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    return { ok: true, id: created.id };
  } catch (error) {
    return {
      ok: false,
      error: isDuplicateKeyError(error) ? "duplicateKey" : "failed",
    };
  }
}

export async function updateProject(
  id: string,
  input: unknown,
): Promise<SaveProjectResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const row = toRow(input);
  if (!row) return { ok: false, error: "invalid" };

  try {
    await db
      .update(projects)
      .set({ ...row, updatedAt: new Date() })
      .where(eq(projects.id, id));

    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath(`/projects/${row.key}`);
    return { ok: true, id };
  } catch (error) {
    return {
      ok: false,
      error: isDuplicateKeyError(error) ? "duplicateKey" : "failed",
    };
  }
}

export async function deleteProject(id: string) {
  const session = await getAdminSession();
  if (!session) return;

  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}

export async function setProjectPublishStatus(
  id: string,
  publishStatus: "draft" | "published",
) {
  const session = await getAdminSession();
  if (!session) return;

  await db
    .update(projects)
    .set({ publishStatus, updatedAt: new Date() })
    .where(eq(projects.id, id));

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
}
