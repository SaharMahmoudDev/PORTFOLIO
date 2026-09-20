import { useTranslations } from "next-intl";
import { CtaBand } from "@/components/common";

export function AboutCta() {
  const t = useTranslations("about.cta");

  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      email={t("email")}
    />
  );
}
