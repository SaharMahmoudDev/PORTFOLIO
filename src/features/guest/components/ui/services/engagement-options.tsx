import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section } from "@/components/ui";
import { PricingCard } from "./pricing-card";

const plans = [
  { key: "single" },
  { key: "multi", highlight: true },
  { key: "full" },
] as const;

export function EngagementOptions() {
  const t = useTranslations("services.pricing");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        className="mb-13"
      />

      <div className="grid gap-7 md:grid-cols-3">
        {plans.map((plan) => (
          <PricingCard
            key={plan.key}
            label={t(`plans.${plan.key}.label`)}
            price={t(`plans.${plan.key}.price`)}
            priceHint={t("startingAt")}
            description={t(`plans.${plan.key}.description`)}
            points={[1, 2, 3].map((n) => t(`plans.${plan.key}.points.p${n}`))}
            cta={t("cta")}
            href="/contact"
            highlight={"highlight" in plan}
            badge={"highlight" in plan ? t("popular") : undefined}
          />
        ))}
      </div>
    </Section>
  );
}
