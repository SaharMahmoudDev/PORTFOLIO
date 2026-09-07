import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // drizzle-kit reads process.env directly; set DATABASE_URL in the shell
    // or an env file it can see before running db:* scripts.
    url: process.env.DATABASE_URL!,
  },
  strict: true,
  verbose: true,
});
