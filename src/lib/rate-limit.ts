import "server-only";
import { sql } from "drizzle-orm";
import { headers } from "next/headers";
import { env } from "@/config/env";

type Options = {
  name: string;
  limit: number;
  windowSeconds: number;
};

async function getClientId() {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip") || "unknown";
}

async function hit({ name, limit, windowSeconds }: Options) {
  const [{ db }, { rateLimits }] = await Promise.all([
    import("@/db"),
    import("@/db/schema"),
  ]);
  const key = `${name}:${await getClientId()}`;
  const expired = sql`${rateLimits.windowStart} < now() - make_interval(secs => ${windowSeconds})`;

  const [row] = await db
    .insert(rateLimits)
    .values({ key, count: 1 })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN ${expired} THEN 1 ELSE ${rateLimits.count} + 1 END`,
        windowStart: sql`CASE WHEN ${expired} THEN now() ELSE ${rateLimits.windowStart} END`,
      },
    })
    .returning({ count: rateLimits.count });

  return row.count > limit;
}

export async function isRateLimited(options: Options) {
  if (!env.DATABASE_URL) return false;

  try {
    return await hit(options);
  } catch {
    return false;
  }
}
