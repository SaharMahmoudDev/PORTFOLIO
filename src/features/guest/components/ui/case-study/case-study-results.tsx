import { useTranslations } from "next-intl";
import { BracketCard, Eyebrow, Section, Text, Title } from "@/components/ui";

type Metric = { label: string; value: string };

export function CaseStudyResults() {
  const t = useTranslations("caseStudy.results");
  const metrics = t.raw("metrics") as Metric[];

  return (
    <Section>
      <Eyebrow className="mb-4">{t("eyebrow")}</Eyebrow>
      <Title as="h2" size="lg" className="mb-12">
        {t("title")}
      </Title>
      <div className="grid gap-7 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <BracketCard key={metric.label} cornerSize="sm" className="p-7.5">
            <Text
              font="mono"
              size="2xs"
              tone="faint"
              className="mb-3.5 tracking-wider uppercase"
            >
              {metric.label}
            </Text>
            <Title as="p" size="md" tone={index === 0 ? "primary" : "default"}>
              {metric.value}
            </Title>
          </BracketCard>
        ))}
      </div>
    </Section>
  );
}
