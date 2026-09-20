import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Section, Tag, Text } from "@/components/ui";

const groups = [
  { key: "core", tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { key: "data", tags: ["TanStack Query", "Zod", "React Hook Form"] },
  { key: "ui", tags: ["shadcn/ui", "Sonner"] },
  { key: "ai", tags: [] },
];

export function TechStack() {
  const t = useTranslations("about.stack");

  return (
    <Section>
      <SectionHeading
        eyebrow={t("eyebrow")}
        title={t("title")}
        className="mb-12"
      />

      <div>
        {groups.map(({ key, tags }) => (
          <div
            key={key}
            className="border-border flex flex-col gap-4 border-t py-6 last:border-b sm:flex-row sm:items-center sm:gap-10"
          >
            <Text
              as="span"
              font="mono"
              size="xs"
              tone="faint"
              className="w-37.5 shrink-0 tracking-wide"
            >
              {t(`groups.${key}`)}
            </Text>
            <div className="flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {key === "ai" && (
                <>
                  <Tag active>{t("aiWorkflows")}</Tag>
                  <Tag>{t("aiTool")}</Tag>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
