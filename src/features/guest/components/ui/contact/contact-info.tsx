import { useTranslations } from "next-intl";
import { BracketCard, Dot, Text } from "@/components/ui";
import { contactInfo } from "../../../data/contact";

export function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <BracketCard className="bg-card border-border rounded-lg border p-7 lg:sticky lg:top-28">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2.5">
          <Dot />
          <Text font="mono" size="xs" tone="primary">
            {t("status")}
          </Text>
        </div>

        <dl className="flex flex-col gap-5">
          {contactInfo.map((item) => (
            <div key={item.key} className="flex flex-col gap-1">
              <Text as="dt" font="mono" size="2xs" tone="faint">
                {`// ${t(item.key)}`}
              </Text>
              <dd>
                <a
                  dir="ltr"
                  href={item.href}
                  className="text-foreground hover:text-primary block text-start font-mono text-[13px] transition-colors rtl:text-right"
                >
                  {item.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>

        <Text font="mono" size="2xs" tone="faint">
          {t("timezone")}
        </Text>
      </div>
    </BracketCard>
  );
}
