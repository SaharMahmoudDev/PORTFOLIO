import "server-only";
import { cache } from "react";
import { inArray, sql } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { featureKeys } from "./features-config";
import type { FeatureFlags, FeatureKey } from "./features-config";

const settingKey = (feature: FeatureKey) => `feature.${feature}`;

export const getFeatureFlags = cache(async (): Promise<FeatureFlags> => {
  const rows = await db
    .select({ key: settings.key, enabled: settings.enabled })
    .from(settings)
    .where(inArray(settings.key, featureKeys.map(settingKey)));

  const stored = new Map(rows.map((row) => [row.key, row.enabled]));
  const flags = {} as FeatureFlags;
  for (const feature of featureKeys) {
    flags[feature] = stored.get(settingKey(feature)) ?? true;
  }
  return flags;
});

export async function saveFeatureFlags(flags: FeatureFlags) {
  await db
    .insert(settings)
    .values(
      featureKeys.map((feature) => ({
        key: settingKey(feature),
        enabled: flags[feature],
      })),
    )
    .onConflictDoUpdate({
      target: settings.key,
      set: { enabled: sql`excluded.enabled`, updatedAt: new Date() },
    });
}
