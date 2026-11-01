"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { deleteProject, setProjectPublishStatus } from "../../actions/projects";
import { Button } from "@/components/ui";

type ProjectRowActionsProps = {
  id: string;
  publishStatus: "draft" | "published";
};

export function ProjectRowActions({
  id,
  publishStatus,
}: ProjectRowActionsProps) {
  const t = useTranslations("admin.dashboard.projects");
  const [isToggling, startToggle] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  const onToggle = () => {
    startToggle(async () => {
      await setProjectPublishStatus(
        id,
        publishStatus === "published" ? "draft" : "published",
      );
    });
  };

  const onDelete = () => {
    if (!window.confirm(t("deleteConfirm"))) return;
    startDelete(async () => {
      await deleteProject(id);
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onToggle}
        disabled={isToggling}
      >
        {isToggling
          ? t("updating")
          : publishStatus === "published"
            ? t("unpublish")
            : t("publish")}
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={onDelete}
        disabled={isDeleting}
      >
        {isDeleting ? t("deleting") : t("delete")}
      </Button>
    </div>
  );
}
