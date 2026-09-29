import "server-only";
import { GoogleGenAI, Type } from "@google/genai";
import { z } from "zod";
import { env } from "@/config/env";

const MODEL = "gemini-3.6-flash";

export const leadTypes = [
  "newProject",
  "collaboration",
  "jobOpportunity",
  "question",
  "spam",
  "other",
] as const;

export const leadPriorities = ["low", "medium", "high"] as const;

const classificationSchema = z.object({
  type: z.enum(leadTypes),
  industry: z.string().trim().min(1).max(60),
  priority: z.enum(leadPriorities),
  features: z.array(z.string().trim().min(1).max(40)).max(6),
  suggestedReply: z.string().trim().min(1).max(2000),
});

export type LeadClassification = z.infer<typeof classificationSchema>;

type LeadInput = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  locale?: "en" | "ar" | null;
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    type: { type: Type.STRING, enum: [...leadTypes] },
    industry: { type: Type.STRING },
    priority: { type: Type.STRING, enum: [...leadPriorities] },
    features: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedReply: { type: Type.STRING },
  },
  required: ["type", "industry", "priority", "features", "suggestedReply"],
};

const isArabic = (value: string) => /[؀-ۿ]/.test(value);

function buildPrompt(lead: LeadInput) {
  // The visitor's actual message wins over the site route they happened to
  // be on — someone can type Arabic on the /en page and vice versa.
  const replyLanguage =
    isArabic(lead.message) || lead.locale === "ar" ? "Arabic" : "English";

  return `You are triaging an incoming contact-form message for Sahar Mahmoud, a freelance front-end developer (React, Next.js, TypeScript), and drafting a reply for her to review before sending.

## Message
Name: ${lead.name}
Email: ${lead.email}
Project type selected: ${lead.projectType}
Budget selected: ${lead.budget}
Message:
"""
${lead.message}
"""

## Task
Classify this message and draft a short reply, as JSON matching the schema:
- type: pick exactly one — newProject (a real project inquiry), collaboration (partnership/networking), jobOpportunity (job/full-time offer), question (general question, not a project), spam (irrelevant/promotional/scam), other.
- industry: the visitor's business domain in a short English term (e.g. "E-commerce", "Real estate", "SaaS", "Healthcare", "Education", "Portfolio/Personal", "Restaurant", "Other"). Always in English, even if the message is in Arabic.
- priority: high (clear budget + clear scope + ready to start), medium (real interest, some details missing), low (vague, spam, or not a real lead).
- features: up to 5 short English tags naming concrete features/pages the visitor seems to need (e.g. "Booking system", "Admin dashboard", "AI chatbot", "E-commerce checkout", "Multi-language"). Empty array if none are clear.
- suggestedReply: a warm, professional reply from Sahar (first person "I"), 3-5 sentences, in ${replyLanguage}. Reference something specific from their message. Never quote a specific price or a specific delivery date — say pricing depends on scope and she'll follow up with details after a quick look. Never invent features or commitments Sahar didn't offer. End by inviting them to share more details or hop on a quick call. Do not include a greeting salutation or sign-off (no "Hi," or "Best, Sahar") — just the body.

Respond with JSON only, matching the schema.`;
}

const TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("classifyLead timed out")), ms),
    ),
  ]);
}

async function attemptClassify(
  client: GoogleGenAI,
  lead: LeadInput,
): Promise<LeadClassification | null> {
  const response = await withTimeout(
    client.models.generateContent({
      model: MODEL,
      contents: [{ role: "user", parts: [{ text: buildPrompt(lead) }] }],
      config: {
        maxOutputTokens: 700,
        thinkingConfig: { thinkingBudget: 0 },
        responseMimeType: "application/json",
        responseSchema,
      },
    }),
    TIMEOUT_MS,
  );

  const text = response.text?.trim();
  if (!text) return null;

  const parsed = classificationSchema.safeParse(JSON.parse(text));
  return parsed.success ? parsed.data : null;
}

export async function classifyLead(
  lead: LeadInput,
): Promise<LeadClassification | null> {
  if (!env.GEMINI_API_KEY) return null;

  const client = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const result = await attemptClassify(client, lead);
      if (result) return result;
    } catch (error) {
      if (attempt === 1) {
        console.error("classifyLead failed", error);
      }
    }
  }

  return null;
}
