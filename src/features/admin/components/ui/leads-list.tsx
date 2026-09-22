import { getTranslations } from "next-intl/server";
import { getLeads } from "../../queries/leads";
import type { LeadStatusFilter } from "../../queries/leads";
import { LeadCard } from "./lead-card";
import { Text } from "@/components/ui";

type LeadsListProps = {
  status?: LeadStatusFilter;
  query?: string;
};

export async function LeadsList({ status, query }: LeadsListProps) {
  const t = await getTranslations("admin.dashboard.leads");
  const leads = await getLeads({ status, query });

  if (leads.length === 0) {
    const isFiltered = (status && status !== "all") || Boolean(query);
    return (
      <Text tone="muted" className="mt-8">
        {t(isFiltered ? "emptyFiltered" : "empty")}
      </Text>
    );
  }

  return (
    <div className="mt-8 flex flex-col gap-4">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} />
      ))}
    </div>
  );
}
