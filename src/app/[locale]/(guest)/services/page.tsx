import { setRequestLocale } from "next-intl/server";
import { ServicesHeader } from "@/features/guest";

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ServicesHeader />;
}
