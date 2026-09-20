import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Dot, Section, Text } from "@/components/ui";
import { ChatCard } from "./chat-card";

const points = ["instant", "knows", "human"] as const;

export function AskAi() {
  const t = useTranslations("home.askAi");

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-7"
          />
          <ul className="flex flex-col gap-3">
            {points.map((key) => (
              <li key={key} className="flex items-center gap-2.5">
                <Dot size="xs" />
                <Text as="span" font="mono" size="xs" tone="subtle">
                  {t(`points.${key}`)}
                </Text>
              </li>
            ))}
          </ul>
        </div>

        <ChatCard />
      </div>
    </Section>
  );
}
