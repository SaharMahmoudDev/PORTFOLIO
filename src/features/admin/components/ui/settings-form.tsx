"use client";

import { useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { updateFeatureFlags } from "../../actions/settings";
import { BracketCard, Button, Switch, Text, Title } from "@/components/ui";
import {
  featureKeys,
  planFeatures,
  planNames,
  type FeatureFlags,
} from "@/lib/features-config";

type SettingsFormProps = {
  initial: FeatureFlags;
};

export function SettingsForm({ initial }: SettingsFormProps) {
  const t = useTranslations("admin.dashboard.settings");
  const [flags, setFlags] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const activePlan = planNames.find((plan) =>
    featureKeys.every((key) => planFeatures[plan][key] === flags[key]),
  );

  const onSave = () => {
    startTransition(async () => {
      const result = await updateFeatureFlags(flags);
      if (!result.ok) {
        toast.error(t(`errors.${result.error}`));
        return;
      }
      toast.success(t("saved"));
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <Title as="h1" size="lg">
          {t("title")}
        </Title>
        <Text tone="muted" className="mt-2 max-w-140">
          {t("description")}
        </Text>
      </div>

      <section>
        <Text font="mono" size="xs" tone="subtle" className="mb-3">
          {t("plan.label")}
        </Text>
        <div className="flex flex-wrap gap-3">
          {planNames.map((plan) => (
            <Button
              key={plan}
              type="button"
              size="sm"
              variant={activePlan === plan ? "primary" : "secondary"}
              aria-pressed={activePlan === plan}
              onClick={() => setFlags(planFeatures[plan])}
            >
              {t(`plan.${plan}`)}
            </Button>
          ))}
        </div>
        <Text font="mono" size="2xs" tone="faint" className="mt-3">
          {activePlan ? t("plan.hint") : t("plan.custom")}
        </Text>
      </section>

      <section className="flex flex-col gap-4">
        {featureKeys.map((key) => (
          <BracketCard key={key} cornerSize="sm" className="p-5">
            <label className="flex cursor-pointer items-center justify-between gap-6">
              <span>
                <Title as="h2" size="xs">
                  {t(`features.${key}.title`)}
                </Title>
                <Text size="sm" tone="muted" className="mt-1.5 max-w-130">
                  {t(`features.${key}.description`)}
                </Text>
              </span>
              <Switch
                checked={flags[key]}
                onChange={(event) =>
                  setFlags((prev) => ({ ...prev, [key]: event.target.checked }))
                }
              />
            </label>
          </BracketCard>
        ))}
      </section>

      <div>
        <Button type="button" onClick={onSave} disabled={isPending}>
          {isPending ? t("saving") : t("save")}
        </Button>
      </div>
    </div>
  );
}
