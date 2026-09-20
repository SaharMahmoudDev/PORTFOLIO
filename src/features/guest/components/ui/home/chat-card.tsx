import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Dot, Tag, Text } from "@/components/ui";

const suggestions = ["build", "best", "available"] as const;

export function ChatCard() {
  const t = useTranslations("home.askAi.chat");

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -start-10 -top-8 size-80 rounded-full bg-[radial-gradient(circle,rgba(53,212,130,0.16),rgba(53,212,130,0)_70%)] blur-[60px]" />

      <div className="border-border bg-card relative overflow-hidden rounded-[10px] border">
        <div className="border-border bg-panel flex items-center justify-between gap-2.5 border-b px-5 py-4">
          <div className="flex items-center gap-2.5">
            <span className="border-border-strong bg-secondary flex size-7.5 items-center justify-center rounded-full border">
              <Sparkles size={15} className="text-primary" aria-hidden="true" />
            </span>
            <Text as="span" font="mono" size="xs" tone="default">
              {t("name")}
            </Text>
          </div>
          <div className="flex items-center gap-1.5">
            <Dot size="xs" />
            <Text as="span" font="mono" size="2xs" tone="faint">
              {t("online")}
            </Text>
          </div>
        </div>

        <div className="px-5 pt-5 pb-1.5">
          <div className="border-border bg-panel max-w-[88%] rounded-lg border px-3.5 py-3">
            <Text size="xs" tone="link">
              {t("greeting")}
            </Text>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-5 pt-3.5 pb-5">
          {suggestions.map((key) => (
            <Tag key={key} shape="pill">
              {t(`suggestions.${key}`)}
            </Tag>
          ))}
        </div>

        <div className="border-border flex items-center gap-2.5 border-t px-5 py-3.5">
          <Text as="span" font="mono" size="xs" tone="faint" className="flex-1">
            {t("placeholder")}
          </Text>
          <span className="bg-primary text-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-[7px]">
            <ArrowRight
              size={14}
              className="rtl:-scale-x-100"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </div>
  );
}
