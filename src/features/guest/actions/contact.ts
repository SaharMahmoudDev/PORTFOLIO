"use server";

import { eq } from "drizzle-orm";
import { env } from "@/config/env";
import { classifyLead } from "@/lib/ai/classify-lead";
import { getFeatureFlags } from "@/lib/features";
import {
  canAutoReply,
  canNotifyOwner,
  ownerEmail,
  sendOwnerEmail,
  sendVisitorEmail,
} from "@/lib/email/send";
import { ownerNotification, visitorAutoReply } from "@/lib/email/templates";
import { isRateLimited } from "@/lib/rate-limit";
import { contactSchema } from "../schemas/contact";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: "invalid" | "unavailable" | "failed" | "rateLimited" };

export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  const { website, locale, ...lead } = parsed.data;
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
    const [inserted] = await db
      .insert(leads)
      .values(lead)
      .returning({ id: leads.id });

    const jobs: Promise<unknown>[] = [];

    if (canNotifyOwner) {
      jobs.push(
        sendOwnerEmail({
          to: ownerEmail,
          replyTo: lead.email,
          ...ownerNotification(lead),
        }),
      );
      if (canAutoReply) {
        jobs.push(
          sendVisitorEmail({
            to: lead.email,
            ...visitorAutoReply(lead.name, locale ?? "en"),
          }),
        );
      }
    }

    const { leadAssistant } = await getFeatureFlags();
    if (leadAssistant) {
      jobs.push(
        classifyLead({ ...lead, locale }).then(async (result) => {
          if (!result) return;
          await db
            .update(leads)
            .set({
              aiType: result.type,
              aiIndustry: result.industry,
              aiPriority: result.priority,
              aiFeatures: result.features,
              aiSuggestedReply: result.suggestedReply,
              aiClassifiedAt: new Date(),
            })
            .where(eq(leads.id, inserted.id));
        }),
      );
    }

    await Promise.allSettled(jobs);

    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}
