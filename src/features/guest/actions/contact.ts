"use server";

import { env } from "@/config/env";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "../schemas/contact";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "unavailable" | "failed" | "rateLimited" };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const { website, ...lead } = parsed.data;
  if (website) return { ok: true };

  if (!env.DATABASE_URL) return { ok: false, error: "unavailable" };

  try {
    if (
      await isRateLimited({ name: "contact", limit: 3, windowSeconds: 3600 })
    ) {
      return { ok: false, error: "rateLimited" };
    }

    const [{ db }, { leads }] = await Promise.all([
      import("@/db"),
      import("@/db/schema"),
    ]);
    await db.insert(leads).values(lead);
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}
