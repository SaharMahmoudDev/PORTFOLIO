"use server";

import Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { env } from "@/config/env";
import { buildSystemPrompt } from "../ai/system-prompt";

const MODEL = "claude-haiku-4-5-20251001";
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

  if (!env.ANTHROPIC_API_KEY) {
    return { ok: false, error: "unavailable" };
  }

  const { message, history } = parsed.data;

  try {
    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system: buildSystemPrompt(),
      messages: [
        ...history.map((entry) => ({
          role: entry.role,
          content: entry.text,
        })),
        { role: "user" as const, content: message },
      ],
    });

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!reply) return { ok: false, error: "failed" };

    return { ok: true, reply };
  } catch {
    return { ok: false, error: "failed" };
  }
}
