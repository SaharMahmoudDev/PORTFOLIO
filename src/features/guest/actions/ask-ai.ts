"use server";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { env } from "@/config/env";
import { withTimeout } from "@/lib/ai/with-timeout";
import { getFeatureFlags } from "@/lib/features";
import { isRateLimited } from "@/lib/rate-limit";
import { buildSystemPrompt } from "../ai/system-prompt";

const MODEL = "gemini-3.5-flash";
const MAX_HISTORY = 8;
const TIMEOUT_MS = 15_000;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1).max(4000),
});

const askAiSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(messageSchema)
    .default([])
    .transform((entries) => entries.slice(-MAX_HISTORY)),
});

export type AskAiResult =
  | { ok: true; reply: string }
  | { ok: false; error: "invalid" | "unavailable" | "failed" | "rateLimited" };

export async function askSaharsAi(input: unknown): Promise<AskAiResult> {
  const parsed = askAiSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (!env.GEMINI_API_KEY || !(await getFeatureFlags()).askAi) {
    return { ok: false, error: "unavailable" };
  }

  const { message, history } = parsed.data;

  try {
    if (
      await isRateLimited({ name: "ask-ai", limit: 20, windowSeconds: 600 })
    ) {
      return { ok: false, error: "rateLimited" };
    }

    const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });
    const systemInstruction = await buildSystemPrompt();

    const contents = [
      ...history.map((entry) => ({
        role:
          entry.role === "assistant" ? ("model" as const) : ("user" as const),
        parts: [{ text: entry.text }],
      })),
      { role: "user" as const, parts: [{ text: message }] },
    ];

    let reply: string | undefined;
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await withTimeout(
          client.models.generateContent({
            model: MODEL,
            config: {
              systemInstruction,
              maxOutputTokens: 500,
              thinkingConfig: { thinkingBudget: 0 },
            },
            contents,
          }),
          TIMEOUT_MS,
        );
        reply = response.text?.trim();
        if (reply) break;
      } catch (error) {
        if (attempt === 1) console.error("askSaharsAi failed", error);
      }
    }

    if (!reply) return { ok: false, error: "failed" };

    return { ok: true, reply };
  } catch {
    return { ok: false, error: "failed" };
  }
}
