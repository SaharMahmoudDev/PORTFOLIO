import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("email"),
  password: z.string().min(1, "password"),
});

export type LoginValues = z.infer<typeof loginSchema>;
