import { setRequestLocale } from "next-intl/server";
import { Section } from "@/components/ui";
import { ContactForm, ContactHeader, ContactInfo } from "@/features/guest";

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
