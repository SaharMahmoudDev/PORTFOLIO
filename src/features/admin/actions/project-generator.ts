"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { fetchPageSafely } from "@/lib/project-generator/fetch-url";
import { generateProjectDraft as callAi } from "@/lib/project-generator/generate-draft";
import { getAdminSession } from "../session";

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return slug || "project";
}

async function uniqueKey(base: string) {
  let key = base;
  for (let suffix = 2; ; suffix++) {
    const [existing] = await db
      .select({ id: projects.id })
      .from(projects)
      .where(eq(projects.key, key));
    if (!existing) return key;
    key = `${base}-${suffix}`;
  }
}

export type GenerateDraftResult =
  | { ok: true; id: string }
  | {
      ok: false;
      error: "unauthorized" | "invalidUrl" | "fetchFailed" | "aiFailed";
    };

export async function generateProjectDraft(
  sourceUrl: string,
  repoUrl: string,
): Promise<GenerateDraftResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(sourceUrl.trim());
  } catch {
    return { ok: false, error: "invalidUrl" };
  }
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return { ok: false, error: "invalidUrl" };
  }

  const fetched = await fetchPageSafely(parsedUrl.toString());
  if (!fetched) return { ok: false, error: "fetchFailed" };

  const draft = await callAi({
    sourceUrl: parsedUrl.toString(),
    repoUrl: repoUrl.trim() || undefined,
    fetched,
  });
  if (!draft) return { ok: false, error: "aiFailed" };

  const key = await uniqueKey(slugify(draft.name));

  const [row] = await db
    .insert(projects)
    .values({
      key,
      name: draft.name,
      url:
        parsedUrl.hostname +
        (parsedUrl.pathname !== "/" ? parsedUrl.pathname : ""),
      demoUrl: parsedUrl.toString(),
      repoUrl: repoUrl.trim(),
      category: draft.category,
      projectStatus: "live",
      publishStatus: "draft",
      year: String(new Date().getFullYear()),
      tags: draft.tags,
      imageLight: "",
      imageDark: "",
      sortOrder: 999,
      content: { en: draft.en, ar: draft.ar },
      sourceUrl: parsedUrl.toString(),
    })
    .returning({ id: projects.id });

  revalidatePath("/admin/projects");
  return { ok: true, id: row.id };
}

export type RegenerateDraftResult =
  | { ok: true }
  | {
      ok: false;
      error: "unauthorized" | "noSource" | "fetchFailed" | "aiFailed";
    };

export async function regenerateProjectDraft(
  id: string,
): Promise<RegenerateDraftResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const [project] = await db.select().from(projects).where(eq(projects.id, id));
  if (!project?.sourceUrl) return { ok: false, error: "noSource" };

  const fetched = await fetchPageSafely(project.sourceUrl);
  if (!fetched) return { ok: false, error: "fetchFailed" };

  const draft = await callAi({
    sourceUrl: project.sourceUrl,
    repoUrl: project.repoUrl || undefined,
    fetched,
  });
  if (!draft) return { ok: false, error: "aiFailed" };

  await db
    .update(projects)
    .set({
      name: draft.name,
      category: draft.category,
      tags: draft.tags,
      content: { en: draft.en, ar: draft.ar },
      updatedAt: new Date(),
    })
    .where(eq(projects.id, id));

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  return { ok: true };
}
