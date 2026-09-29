import "server-only";
import { GoogleGenAI, Type } from "@google/genai";
import { env } from "@/config/env";
import { withTimeout } from "@/lib/ai/with-timeout";
import { projectCategories } from "@/features/guest/data/projects";
import {
  projectDraftSchema,
  type ProjectDraft,
} from "@/features/admin/schemas/project";
import type { FetchedPage } from "./fetch-url";

const MODEL = "gemini-3.6-flash";
const TIMEOUT_MS = 25_000;

const pointSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    text: { type: Type.STRING },
  },
  required: ["title", "text"],
};

const metricSchema = {
  type: Type.OBJECT,
  properties: {
    label: { type: Type.STRING },
    value: { type: Type.STRING },
  },
  required: ["label", "value"],
};

const localeContentSchema = {
  type: Type.OBJECT,
  properties: {
    outcome: { type: Type.STRING },
    meta: {
      type: Type.OBJECT,
      properties: {
        role: { type: Type.STRING },
        timeline: { type: Type.STRING },
      },
      required: ["role", "timeline"],
    },
    overview: { type: Type.STRING },
    problem: { type: Type.STRING },
    goals: { type: Type.ARRAY, items: { type: Type.STRING } },
    approach: { type: Type.ARRAY, items: pointSchema },
    features: { type: Type.ARRAY, items: pointSchema },
    design: {
      type: Type.OBJECT,
      properties: {
        pointTitle: { type: Type.STRING },
        pointText: { type: Type.STRING },
      },
      required: ["pointTitle", "pointText"],
    },
    implementation: { type: Type.ARRAY, items: pointSchema },
    challenges: {
      type: Type.OBJECT,
      properties: {
        pointTitle: { type: Type.STRING },
        pointText: { type: Type.STRING },
      },
      required: ["pointTitle", "pointText"],
    },
    detail: {
      type: Type.OBJECT,
      properties: { caption: { type: Type.STRING } },
      required: ["caption"],
    },
    results: { type: Type.ARRAY, items: metricSchema },
  },
  required: [
    "outcome",
    "meta",
    "overview",
    "problem",
    "goals",
    "approach",
    "features",
    "design",
    "implementation",
    "challenges",
    "detail",
    "results",
  ],
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    category: { type: Type.STRING, enum: [...projectCategories] },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    en: localeContentSchema,
    ar: localeContentSchema,
  },
  required: ["name", "category", "tags", "en", "ar"],
};

type GenerateInput = {
  sourceUrl: string;
  repoUrl?: string;
  fetched: FetchedPage;
};

function buildPrompt({ sourceUrl, repoUrl, fetched }: GenerateInput) {
  return `You are drafting a portfolio case study for Sahar Mahmoud, a freelance front-end developer (React, Next.js, TypeScript), based on a live project she built. She will review and edit every field before anything is published — this is a first draft, not final copy.

## Source
URL: ${sourceUrl}
${repoUrl ? `Repo: ${repoUrl}\n` : ""}Page title: ${fetched.title || "(none)"}
Meta description: ${fetched.description || fetched.ogDescription || "(none)"}
OG title: ${fetched.ogTitle || "(none)"}
Visible page text (excerpt): """
${fetched.textExcerpt || "(none extracted)"}
"""

## Task
Produce a JSON draft matching the schema:
- name: a short, clean project name (title case, no domain/extension).
- category: pick exactly one — webApp (multi-page product/app), dashboard (admin/data UI), ecommerce (storefront/cart), landing (single-page marketing/portfolio site).
- tags: up to 5 short tech/stack tags. Only include a technology if the page content gives a real signal for it (framework names, visible library credits, etc.) — otherwise infer conservatively from what a typical site like this would use, and keep vague ones generic (e.g. "HTML5", "CSS3") rather than guessing a specific framework with no evidence.
- en / ar: the full case study, written in first person ("I built...") as Sahar, in a concise, technical, portfolio tone. Both locales must cover the exact same content, ar in Egyptian-adjacent standard Arabic matching her other case studies' tone. Ground everything in the source content above — where the source doesn't give enough detail for a field (e.g. team size, exact metrics), write a plausible, clearly-generic placeholder rather than a fabricated specific claim, since Sahar will edit these before publishing. Never invent specific numbers, client names or team sizes that aren't implied by the source.
  - goals: 2-4 items. approach/features/implementation: 2-3 items each. results: 2-3 metrics.

Respond with JSON only, matching the schema.`;
}

export async function generateProjectDraft(
  input: GenerateInput,
): Promise<ProjectDraft | null> {
  if (!env.GEMINI_API_KEY) return null;

  const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const response = await withTimeout(
        client.models.generateContent({
          model: MODEL,
          contents: [{ role: "user", parts: [{ text: buildPrompt(input) }] }],
          config: {
            maxOutputTokens: 4000,
            thinkingConfig: { thinkingBudget: 0 },
            responseMimeType: "application/json",
            responseSchema,
          },
        }),
        TIMEOUT_MS,
      );

      const text = response.text?.trim();
      if (!text) continue;

      const parsed = projectDraftSchema.safeParse(JSON.parse(text));
      if (parsed.success) return parsed.data;
    } catch (error) {
      if (attempt === 1) console.error("generateProjectDraft failed", error);
    }
  }

  return null;
}
