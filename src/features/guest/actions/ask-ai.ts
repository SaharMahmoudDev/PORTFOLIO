"use server";

import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { env } from "@/config/env";
import { buildSystemPrompt } from "../ai/system-prompt";

const MODEL = "gemini-3.6-flash";
const MAX_HISTORY = 8;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  text: z.string().min(1).max(1000),
});

const askAiSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z.array(messageSchema).max(MAX_HISTORY).default([]),
});

export type AskAiResult =
  | { ok: true; reply: string }
  | { ok: false; error: "invalid" | "unavailable" | "failed" };

export async function askSaharsAi(input: unknown): Promise<AskAiResult> {
  const parsed = askAiSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (!env.GEMINI_API_KEY) {
    return { ok: false, error: "unavailable" };
  }

  const { message, history } = parsed.data;

  try {
    const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

    const response = await client.models.generateContent({
      model: MODEL,
      config: {
        systemInstruction: buildSystemPrompt(),
        maxOutputTokens: 500,
        thinkingConfig: { thinkingBudget: 0 },
      },
      contents: [
        ...history.map((entry) => ({
          role:
            entry.role === "assistant" ? ("model" as const) : ("user" as const),
          parts: [{ text: entry.text }],
        })),
        { role: "user" as const, parts: [{ text: message }] },
      ],
    });

    const reply = response.text?.trim();

    if (!reply) return { ok: false, error: "failed" };

    return { ok: true, reply };
  } catch {
    return { ok: false, error: "failed" };
  }
}
