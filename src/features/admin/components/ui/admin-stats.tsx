import { getTranslations } from "next-intl/server";
import type { LeadStats } from "../../queries/leads";
import { BracketCard, Text, Title } from "@/components/ui";

type AdminStatsProps = {
  stats: LeadStats;
};

export async function AdminStats({ stats }: AdminStatsProps) {
  const t = await getTranslations("admin.dashboard.stats");

  const items = [
    { key: "total", value: stats.total, tone: "default" as const },
    { key: "new", value: stats.new, tone: "primary" as const },
    { key: "read", value: stats.read, tone: "default" as const },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-3.5">
      {items.map((item) => (
        <BracketCard key={item.key} cornerSize="sm" className="p-5">
          <Text
            font="mono"
            size="2xs"
            tone="faint"
            className="mb-2 tracking-wider uppercase"
          >
            {t(item.key)}
          </Text>
          <Title as="p" size="sm" tone={item.tone}>
            {item.value}
          </Title>
        </BracketCard>
      ))}
    </div>
  );
}
