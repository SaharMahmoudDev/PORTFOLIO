import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  EngagementOptions,
  ServicesCta,
  ServicesGrid,
  ServicesHeader,
} from "@/features/guest";

import { isValidLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.services" });

  return pageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ServicesHeader />
      <ServicesGrid />
      <EngagementOptions />
      <ServicesCta />
    </>
  );
}
