import { setRequestLocale } from "next-intl/server";
import {
  AskAi,
  ContactCta,
  FreelanceServices,
  Hero,
  HowIWork,
  SelectedWork,
} from "@/features/guest";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SelectedWork locale={locale === "ar" ? "ar" : "en"} />
      <HowIWork />
      <FreelanceServices />
      <AskAi />
      <ContactCta />
    </>
  );
}
