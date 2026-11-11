export const featureKeys = [
  "askAi",
  "leadAssistant",
  "projectGenerator",
] as const;

export type FeatureKey = (typeof featureKeys)[number];
export type FeatureFlags = Record<FeatureKey, boolean>;

export const planNames = ["basic", "pro", "premium"] as const;
export type PlanName = (typeof planNames)[number];

export const planFeatures: Record<PlanName, FeatureFlags> = {
  basic: { askAi: false, leadAssistant: false, projectGenerator: false },
  pro: { askAi: false, leadAssistant: false, projectGenerator: true },
  premium: { askAi: true, leadAssistant: true, projectGenerator: true },
};
