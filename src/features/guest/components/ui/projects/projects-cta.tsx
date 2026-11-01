import { useTranslations } from "next-intl";
import { CtaBand } from "@/components/common";

export function ProjectsCta() {
  const t = useTranslations("projects.cta");

  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      email={t("email")}
    />
  );
}
