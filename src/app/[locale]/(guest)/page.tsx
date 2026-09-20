import { setRequestLocale } from "next-intl/server";
import { Hero, HowIWork, SelectedWork } from "@/features/guest";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <SelectedWork />
      <HowIWork />
    </>
  );
}
