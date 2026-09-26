import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    DATABASE_URL: z.url().optional(),
    ADMIN_EMAIL: z.email().optional(),
    ADMIN_PASSWORD_HASH: z.string().min(1).optional(),
    AUTH_SECRET: z.string().min(32).optional(),
    GEMINI_API_KEY: z.string().min(1).optional(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH,
    AUTH_SECRET: process.env.AUTH_SECRET,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
