import { setRequestLocale } from "next-intl/server";
import {
  AskAi,
  ContactCta,
  FreelanceServices,
  Hero,
  HowIWork,
  SelectedWork,
} from "@/features/guest";
import { getFeatureFlags } from "@/lib/features";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const flags = await getFeatureFlags();

  return (
    <>
      <Hero />
      <SelectedWork locale={locale === "ar" ? "ar" : "en"} />
      <HowIWork />
      <FreelanceServices />
      {flags.askAi && <AskAi />}
      <ContactCta />
    </>
  );
}
