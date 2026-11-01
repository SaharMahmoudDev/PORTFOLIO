import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section, Text, Title } from "@/components/ui";

const stats = ["experience", "projects", "focus"] as const;

export function MyStory() {
  const t = useTranslations("about.story");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-12"
      />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="flex max-w-155 flex-col gap-5">
          <Text>{t("paragraph1")}</Text>
          <Text>{t("paragraph2")}</Text>
        </div>

        <div>
          {stats.map((key) => (
            <div
              key={key}
              className="border-border flex items-baseline gap-3.5 border-t py-5.5 last:border-b"
            >
              <Title
                as="span"
                size="md"
                tone={key === "focus" ? "primary" : "default"}
                className="w-16 shrink-0"
              >
                {t(`stats.${key}.value`)}
              </Title>
              <Text as="span" font="mono" size="xs" tone="muted">
                {t(`stats.${key}.label`)}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
