import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AskAi,
  ContactCta,
  FreelanceServices,
  Hero,
  HowIWork,
  SelectedWork,
} from "@/features/guest";
import { JsonLd } from "@/components/common";
import { site } from "@/config/site";
import { isValidLocale } from "@/i18n/routing";
import { getFeatureFlags } from "@/lib/features";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "seo.home" });

  return pageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const flags = await getFeatureFlags();
  const t = await getTranslations("seo");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              name: site.name,
              url: site.url,
              jobTitle: t("person.jobTitle"),
              description: t("home.description"),
              address: t("person.location"),
              sameAs: [site.github.url, site.linkedin.url],
            },
            {
              "@type": "WebSite",
              name: site.name,
              url: site.url,
              inLanguage: locale,
            },
          ],
        }}
      />
      <Hero />
      <SelectedWork locale={locale === "ar" ? "ar" : "en"} />
      <HowIWork />
      <FreelanceServices />
      {flags.askAi && <AskAi />}
      <ContactCta />
    </>
  );
}
