"use server";

import { env } from "@/config/env";
import { contactSchema } from "../schemas/contact";

export type ContactResult =
  { ok: true } | { ok: false; error: "invalid" | "unavailable" | "failed" };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (!env.DATABASE_URL) return { ok: false, error: "unavailable" };

  try {
    const [{ db }, { leads }] = await Promise.all([
      import("@/db"),
      import("@/db/schema"),
    ]);
    await db.insert(leads).values(parsed.data);
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}
