import type { LucideIcon } from "lucide-react";
import { CodeXml, LayoutGrid, PanelTop, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/ui";
import { ServiceCard } from "./service-card";

const services: {
  key: string;
  icon: LucideIcon;
  tags: string[];
  highlight?: boolean;
}[] = [
  { key: "frontend", icon: CodeXml, tags: ["React", "Next.js", "TypeScript"] },
  { key: "landing", icon: PanelTop, tags: ["Next.js", "Tailwind", "GSAP"] },
  {
    key: "dashboards",
    icon: LayoutGrid,
    tags: ["TanStack Query", "shadcn/ui", "Zod"],
  },
  {
    key: "ai",
    icon: Sparkles,
    tags: ["AI Automation", "Server Actions"],
    highlight: true,
  },
];

export function ServicesGrid() {
  const t = useTranslations("services.grid");

  return (
    <Section divider={false} spacing="flush-top">
      <div className="grid gap-7 md:grid-cols-2">
        {services.map(({ key, icon, tags, highlight }, index) => (
          <ServiceCard
            key={key}
            icon={icon}
            index={String(index + 1).padStart(2, "0")}
            title={t(`items.${key}.title`)}
            description={t(`items.${key}.description`)}
            points={[1, 2, 3].map((n) => t(`items.${key}.points.p${n}`))}
            tags={tags}
            highlight={highlight}
          />
        ))}
      </div>
    </Section>
  );
}
