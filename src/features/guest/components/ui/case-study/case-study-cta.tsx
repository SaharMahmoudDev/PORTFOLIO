import { useTranslations } from "next-intl";
import { CtaBand } from "@/components/common";

export function CaseStudyCta() {
  const t = useTranslations("caseStudy.cta");

  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      email={t("email")}
    />
  );
}
