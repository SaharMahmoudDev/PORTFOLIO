import { useTranslations } from "next-intl";
import { Button, Section, Text, Title } from "@/components/ui";

export function ContactCta() {
  const t = useTranslations("home.contactCta");

  return (
    <Section
      tone="inverted"
      divider={false}
      containerClassName="flex flex-col items-start gap-7"
    >
      <Title as="h2" size="xl" tone="inverted" className="max-w-160">
        {t("title")}
      </Title>
      <Text size="lg" tone="inverted-muted" className="max-w-130">
        {t("description")}
      </Text>
      <div className="flex flex-wrap items-center gap-4">
        <Button href="/contact" variant="inverted">
          {t("cta")}
        </Button>
        <Text as="span" font="mono" size="sm" tone="inverted-muted">
          {t("email")}
        </Text>
      </div>
    </Section>
  );
}
