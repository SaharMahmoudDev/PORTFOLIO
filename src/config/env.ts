import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Centralised, type-safe environment variables.
 *
 * Add every new env var here so it is validated once, at build/start time,
 * instead of being read ad-hoc via `process.env` around the codebase.
 */
export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    // Optional for now — Phase 4 wires the DB into real queries and makes
    // this required.
    DATABASE_URL: z.url().optional(),
  },
  client: {},
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
