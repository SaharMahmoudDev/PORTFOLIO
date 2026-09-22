"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { deleteLead } from "../../actions/leads";
import { Button } from "@/components/ui";

type DeleteLeadButtonProps = {
  id: string;
};

export function DeleteLeadButton({ id }: DeleteLeadButtonProps) {
  const t = useTranslations("admin.dashboard.leads");
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    if (!window.confirm(t("deleteConfirm"))) return;
    startTransition(() => {
      void deleteLead(id);
    });
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size="sm"
      onClick={onClick}
      disabled={isPending}
    >
      {isPending ? t("deleting") : t("delete")}
    </Button>
  );
}
