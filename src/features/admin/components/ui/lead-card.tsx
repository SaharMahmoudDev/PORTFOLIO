import { getFormatter, getTranslations } from "next-intl/server";
import { markLeadRead } from "../../actions/leads";
import { getFeatureFlags } from "@/lib/features";
import type { Lead } from "@/db/schema";
import { Badge, BracketCard, Button, Tag, Text, Title } from "@/components/ui";
import { AiReplyPanel } from "./ai-reply-panel";
import { DeleteLeadButton } from "./delete-lead-button";

type LeadCardProps = {
  lead: Lead;
};

export async function LeadCard({ lead }: LeadCardProps) {
  const t = await getTranslations("admin.dashboard.leads");
  const tc = await getTranslations("contact.form");
  const format = await getFormatter();
  const isNew = lead.status === "new";
  const { leadAssistant } = await getFeatureFlags();

  const markRead = async () => {
    "use server";
    await markLeadRead(lead.id);
  };

  return (
    <BracketCard cornerSize="sm" className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Title as="h3" size="xs">
            {lead.name}
          </Title>
          <Badge size="sm" tone={isNew ? "primary" : "muted"}>
            {t(`status.${lead.status}`)}
          </Badge>
          {lead.repliedAt && (
            <Badge size="sm" tone="primary">
              {t("replied")}
            </Badge>
          )}
        </div>
        <Text font="mono" size="2xs" tone="faint">
          {format.dateTime(lead.createdAt, {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Text>
      </div>

      <Text font="mono" size="xs" tone="link" className="mt-2">
        {lead.email}
      </Text>

      <div className="mt-3.5 flex flex-wrap gap-2">
        <Tag size="sm">{tc(`projectTypes.${lead.projectType}`)}</Tag>
        <Tag size="sm">{tc(`budgets.${lead.budget}`)}</Tag>
      </div>

      <Text tone="subtle" className="mt-4 line-clamp-3">
        {lead.message}
      </Text>

      <div className="mt-4 flex items-center gap-3">
        {isNew && (
          <form action={markRead}>
            <Button type="submit" variant="secondary" size="sm">
              {t("markRead")}
            </Button>
          </form>
        )}
        <DeleteLeadButton id={lead.id} />
      </div>

      <AiReplyPanel
        id={lead.id}
        aiEnabled={leadAssistant}
        aiType={lead.aiType}
        aiIndustry={lead.aiIndustry}
        aiPriority={lead.aiPriority}
        aiFeatures={lead.aiFeatures}
        aiSuggestedReply={lead.aiSuggestedReply}
        aiClassifiedAt={lead.aiClassifiedAt?.toISOString() ?? null}
        repliedAt={lead.repliedAt?.toISOString() ?? null}
      />
    </BracketCard>
  );
}
