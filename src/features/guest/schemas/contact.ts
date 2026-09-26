import { z } from "zod";

export const projectTypes = [
  "website",
  "webApp",
  "automation",
  "other",
] as const;
export const budgets = ["small", "medium", "large", "unsure"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "name"),
  email: z.email("email"),
  projectType: z.enum(projectTypes),
  budget: z.enum(budgets),
  message: z.string().trim().min(20, "message"),
  website: z.string().optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
