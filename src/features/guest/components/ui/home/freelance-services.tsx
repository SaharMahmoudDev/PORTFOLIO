import { CodeXml, LayoutGrid, PanelTop } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Badge, Section, Text, Title } from "@/components/ui";

const services: { key: string; icon: LucideIcon }[] = [
  { key: "frontend", icon: CodeXml },
  { key: "landing", icon: PanelTop },
  { key: "dashboards", icon: LayoutGrid },
];

export function FreelanceServices() {
  const t = useTranslations("home.services");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        meta={<Badge>{t("availability")}</Badge>}
        className="mb-12"
      />

      <ul>
        {services.map(({ key, icon: Icon }, i) => (
          <li
            key={key}
            className="border-border flex items-start gap-5 border-t py-7 last:border-b sm:gap-7"
          >
            <Text
              as="span"
              font="mono"
              size="xs"
              tone="faint"
              className="w-7 shrink-0 pt-0.5"
            >
              {String(i + 1).padStart(2, "0")}
            </Text>
            <Icon
              size={22}
              className="text-link mt-px shrink-0"
              aria-hidden="true"
            />
            <div className="flex-1">
              <Title as="h3" size="sm" className="mb-1.5">
                {t(`items.${key}.title`)}
              </Title>
              <Text size="sm" tone="muted" className="max-w-150">
                {t(`items.${key}.text`)}
              </Text>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
