import { useTranslations } from "next-intl";
import { CtaBand } from "@/components/common";

export function ContactCta() {
  const t = useTranslations("home.contactCta");

  return (
    <CtaBand
      title={t("title")}
      description={t("description")}
      cta={t("cta")}
      email={t("email")}
    />
  );
}
