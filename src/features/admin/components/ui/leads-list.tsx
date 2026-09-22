import { getTranslations } from "next-intl/server";
import { getLeads } from "../../queries/leads";
import { LeadCard } from "./lead-card";
import { Text } from "@/components/ui";

export async function LeadsList() {
  const t = await getTranslations("admin.dashboard.leads");
  const leads = await getLeads();

  if (leads.length === 0) {
    return (
      <Text tone="muted" className="mt-8">
        {t("empty")}
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
