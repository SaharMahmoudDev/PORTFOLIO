import type { LucideIcon } from "lucide-react";
import {
  AlignLeft,
  MonitorSmartphone,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/common";
import { Badge, BracketCard, Section, Text, Title } from "@/components/ui";
import { cn } from "@/lib/utils";

const steps: { key: string; icon: LucideIcon; highlight?: boolean }[] = [
  { key: "performance", icon: TrendingUp },
  { key: "clean", icon: AlignLeft },
  { key: "ai", icon: Sparkles, highlight: true },
  { key: "responsive", icon: MonitorSmartphone },
];

export function HowIWork() {
  const t = useTranslations("home.howIWork");

  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <BracketCard cornerSize="lg" className="h-80 md:h-115">
          <div className="absolute inset-3.5 overflow-hidden">
            <Image
              src="/images/workspace.jpg"
              alt={t("photo")}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <Badge variant="card" className="absolute inset-s-8.5 bottom-8.5">
            {t("badge")}
          </Badge>
        </BracketCard>

        <div>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12"
          />

          <div className="flex items-center">
            {steps.map(({ key, icon: Icon, highlight }, i) => (
              <div
                key={key}
                className="flex flex-1 items-center last:flex-none"
              >
                <span
                  className={cn(
                    "bg-card flex size-11 shrink-0 items-center justify-center rounded-full border",
                    highlight
                      ? "border-primary text-primary"
                      : "border-border-strong text-link",
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                </span>
                {i < steps.length - 1 && (
                  <span className="border-border mx-1.5 h-0 flex-1 border-t border-dashed" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3.5">
            {steps.map(({ key }) => (
              <div key={key}>
                <Title as="h3" size="xs" className="mb-1.5">
                  {t(`steps.${key}.title`)}
                </Title>
                <Text size="xs" tone="muted">
                  {t(`steps.${key}.text`)}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
