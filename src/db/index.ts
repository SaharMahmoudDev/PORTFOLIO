import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/config/env";
import * as schema from "./schema";

if (!env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it to .env.local before using the database.",
  );
}

const databaseUrl = env.DATABASE_URL;

// Neon is queried over HTTP so the same code runs on Cloudflare Workers, where
// postgres.js can't keep a TCP connection alive. Any other Postgres uses it.
const isNeon = new URL(databaseUrl).hostname.endsWith(".neon.tech");

export const db = isNeon
  ? (drizzleNeon(neon(databaseUrl), {
      schema,
    }) as unknown as ReturnType<typeof createPostgresDb>)
  : createPostgresDb();

function createPostgresDb() {
  return drizzlePostgres(postgres(databaseUrl), { schema });
}
