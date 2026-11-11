import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { ContactForm, ContactHeader, ContactInfo } from "@/features/guest";

import { isValidLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.contact" });

  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ContactHeader />
      <Section divider={false} spacing="flush-top">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-16">
          <ContactForm />
          <ContactInfo />
        </div>
      </Section>
    </>
  );
}
