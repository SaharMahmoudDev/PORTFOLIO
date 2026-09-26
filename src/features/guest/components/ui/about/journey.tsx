import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Dot, Section, Text, Title } from "@/components/ui";
import { cn } from "@/lib/utils";

const entries = ["current", "internship", "learning"] as const;

export function Journey() {
  const t = useTranslations("about.journey");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-14"
      />

      <ol className="max-w-190">
        {entries.map((key, index) => {
          const current = index === 0;
          const last = index === entries.length - 1;

          return (
            <li key={key} className="flex gap-5">
              <div className="flex flex-col items-center pt-1">
                <Dot
                  size="lg"
                  variant={current ? "filled" : "ring"}
                  tone={current ? "primary" : "term-grey"}
                />
                {!last && <span className="bg-border min-h-16 w-px flex-1" />}
              </div>

              <div className={cn(!last && "pb-10")}>
                <div className="mb-2 flex flex-wrap items-baseline gap-3">
                  <Title as="h3" size="sm">
                    {t(`entries.${key}.role`)}
                  </Title>
                  <Text as="span" font="mono" size="xs" tone="muted">
                    {t(`entries.${key}.company`)}
                  </Text>
                  <Text
                    as="span"
                    font="mono"
                    size="xs"
                    tone={current ? "primary" : "faint"}
                    className="ms-auto"
                  >
                    {t(`entries.${key}.period`)}
                  </Text>
                </div>
                <Text size="sm" tone="muted" className="max-w-140">
                  {t(`entries.${key}.text`)}
                </Text>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
