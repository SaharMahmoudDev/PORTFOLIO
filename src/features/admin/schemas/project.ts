import { z } from "zod";
import { projectCategories } from "@/features/guest/data/projects";

export const projectPointSchema = z.object({
  title: z.string().trim().min(1),
  text: z.string().trim().min(1),
});

export const projectMetricSchema = z.object({
  label: z.string().trim().min(1),
  value: z.string().trim().min(1),
});

export const projectLocaleContentSchema = z.object({
  outcome: z.string().trim().min(1).max(300),
  meta: z.object({
    role: z.string().trim().min(1),
    timeline: z.string().trim().min(1),
  }),
  overview: z.string().trim().min(1),
  problem: z.string().trim().min(1),
  goals: z.array(z.string().trim().min(1)).min(1),
  approach: z.array(projectPointSchema).min(1),
  features: z.array(projectPointSchema).min(1),
  design: z.object({
    pointTitle: z.string().trim().min(1),
    pointText: z.string().trim().min(1),
  }),
  implementation: z.array(projectPointSchema).min(1),
  challenges: z.object({
    pointTitle: z.string().trim().min(1),
    pointText: z.string().trim().min(1),
  }),
  detail: z.object({
    caption: z.string().trim().min(1),
  }),
  results: z.array(projectMetricSchema).min(1),
});

export type ProjectLocaleContentInput = z.infer<
  typeof projectLocaleContentSchema
>;

export const contentJsonField = z.string().transform((value, ctx) => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(value);
  } catch {
    ctx.addIssue({ code: "custom", message: "Invalid JSON." });
    return z.NEVER;
  }

  const result = projectLocaleContentSchema.safeParse(parsed);
  if (!result.success) {
    const first = result.error.issues[0];
    ctx.addIssue({
      code: "custom",
      message: first
        ? `${first.path.join(".")}: ${first.message}`
        : "Invalid content.",
    });
    return z.NEVER;
  }

  return result.data;
});

export const projectFormSchema = z.object({
  key: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Required.")
    .max(80)
    .regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and hyphens only."),
  name: z.string().trim().min(1, "Required.").max(120),
  url: z.string().trim().min(1, "Required.").max(200),
  demoUrl: z.union([z.literal(""), z.url("Must be a valid URL.")]),
  repoUrl: z.url("Must be a valid URL."),
  category: z.enum(projectCategories),
  status: z.enum(["live", "inProgress"]),
  publishStatus: z.enum(["draft", "published"]),
  year: z
    .string()
    .trim()
    .regex(/^\d{4}$/, "4-digit year."),
  tags: z.string().trim().min(1, "Required — comma-separated."),
  imageLight: z.string().trim().min(1, "Required."),
  imageDark: z.string().trim().min(1, "Required."),
  sortOrder: z.coerce.number().int().default(0),
  contentEn: contentJsonField,
  contentAr: contentJsonField,
});

export type ProjectFormValues = z.input<typeof projectFormSchema>;
export type ProjectFormOutput = z.output<typeof projectFormSchema>;

export const projectServerSchema = projectFormSchema.extend({
  contentEn: projectLocaleContentSchema,
  contentAr: projectLocaleContentSchema,
});

export const projectDraftSchema = z.object({
  name: z.string().trim().min(1).max(120),
  category: z.enum(projectCategories),
  tags: z.array(z.string().trim().min(1).max(40)).min(1).max(6),
  en: projectLocaleContentSchema,
  ar: projectLocaleContentSchema,
});

export type ProjectDraft = z.infer<typeof projectDraftSchema>;
