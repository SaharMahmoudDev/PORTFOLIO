"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { saveFeatureFlags } from "@/lib/features";
import { getAdminSession } from "../session";

const flagsSchema = z.object({
  askAi: z.boolean(),
  leadAssistant: z.boolean(),
  projectGenerator: z.boolean(),
});

export type SaveSettingsResult =
  { ok: true } | { ok: false; error: "unauthorized" | "invalid" | "failed" };

export async function updateFeatureFlags(
  input: unknown,
): Promise<SaveSettingsResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const parsed = flagsSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  try {
    await saveFeatureFlags(parsed.data);
  } catch {
    return { ok: false, error: "failed" };
  }

  revalidatePath("/", "layout");
  return { ok: true };
}
