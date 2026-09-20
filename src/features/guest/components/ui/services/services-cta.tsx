import { useTranslations } from "next-intl";
import { CtaBand } from "@/components/common";

export function ServicesCta() {
  const t = useTranslations("services.cta");

  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      email={t("email")}
    />
  );
}
