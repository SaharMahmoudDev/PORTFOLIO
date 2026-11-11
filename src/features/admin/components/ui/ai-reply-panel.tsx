"use client";

import { useState, useTransition } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { toast } from "sonner";
import { classifyLeadAction, sendLeadReply } from "../../actions/leads";
import { Button, Tag, Text, Textarea } from "@/components/ui";

type AiReplyPanelProps = {
  id: string;
  aiEnabled: boolean;
  aiType: string | null;
  aiIndustry: string | null;
  aiPriority: string | null;
  aiFeatures: string[] | null;
  aiSuggestedReply: string | null;
  aiClassifiedAt: string | null;
  repliedAt: string | null;
};

export function AiReplyPanel({
  id,
  aiEnabled,
  aiType,
  aiIndustry,
  aiPriority,
  aiFeatures,
  aiSuggestedReply,
  aiClassifiedAt,
  repliedAt,
}: AiReplyPanelProps) {
  const t = useTranslations("admin.dashboard.leads.ai");
  const tl = useTranslations("admin.dashboard.leads");
  const format = useFormatter();

  const [reply, setReply] = useState(aiSuggestedReply ?? "");
  const [classified, setClassified] = useState(Boolean(aiClassifiedAt));
  const [sentAt, setSentAt] = useState(repliedAt);
  const [isClassifying, startClassify] = useTransition();
  const [isSending, startSend] = useTransition();

  const onClassify = () => {
    startClassify(async () => {
      const result = await classifyLeadAction(id);
      if (!result.ok) {
        toast.error(t("classifyFailed"));
        return;
      }
      setClassified(true);
    });
  };

  const onSend = () => {
    startSend(async () => {
      const result = await sendLeadReply(id, reply);
      if (!result.ok) {
        toast.error(
          result.error === "unavailable"
            ? t("sendUnavailable")
            : t("sendFailed"),
        );
        return;
      }
      setSentAt(new Date().toISOString());
      toast.success(tl("replied"));
    });
  };

  return (
    <div className="border-border mt-4 border-t pt-4">
      {!aiEnabled ? null : classified ? (
        <div className="flex flex-wrap items-center gap-2">
          {aiType && <Tag size="sm">{t(`type.${aiType}`)}</Tag>}
          {aiIndustry && <Tag size="sm">{aiIndustry}</Tag>}
          {aiPriority && (
            <Tag size="sm" active={aiPriority === "high"}>
              {t(`priority.${aiPriority}`)}
            </Tag>
          )}
          {aiFeatures?.map((feature) => (
            <Tag key={feature} size="sm" shape="pill">
              {feature}
            </Tag>
          ))}
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClassify}
            disabled={isClassifying}
            className="ms-auto"
          >
            {isClassifying ? t("classifying") : t("reclassify")}
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-3">
          <Text tone="faint" size="sm">
            {t("notClassified")}
          </Text>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={onClassify}
            disabled={isClassifying}
          >
            {isClassifying ? t("classifying") : t("classify")}
          </Button>
        </div>
      )}

      <Text
        font="mono"
        size="2xs"
        tone="faint"
        className={aiEnabled ? "mt-4 mb-1.5" : "mb-1.5"}
      >
        {t("replyLabel")}
      </Text>
      <Textarea
        value={reply}
        onChange={(event) => setReply(event.target.value)}
        placeholder={t("replyPlaceholder")}
        className="min-h-28"
      />

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Button
          type="button"
          size="sm"
          onClick={onSend}
          disabled={isSending || !reply.trim()}
        >
          {isSending ? t("sending") : t("send")}
        </Button>
        {sentAt && (
          <Text font="mono" size="2xs" tone="primary">
            {t("sent", {
              date: format.dateTime(new Date(sentAt), {
                dateStyle: "medium",
                timeStyle: "short",
              }),
            })}
          </Text>
        )}
      </div>
    </div>
  );
}
