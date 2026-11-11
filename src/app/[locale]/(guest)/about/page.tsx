import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AboutCta,
  AboutHeader,
  Journey,
  MyStory,
  TechStack,
} from "@/features/guest";

import { isValidLocale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.about" });

  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHeader />
      <MyStory />
      <TechStack />
      <Journey />
      <AboutCta />
    </>
  );
}
