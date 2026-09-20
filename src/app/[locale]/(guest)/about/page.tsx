import { setRequestLocale } from "next-intl/server";
import { AboutHeader, MyStory } from "@/features/guest";

export default async function AboutPage({
  params,
}: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHeader />
      <MyStory />
    </>
  );
}
