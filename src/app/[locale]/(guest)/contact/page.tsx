import { setRequestLocale } from "next-intl/server";
import { ContactHeader } from "@/features/guest";

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ContactHeader />;
}
