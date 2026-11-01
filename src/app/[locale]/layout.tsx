import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AppProviders } from "@/providers";
import { fontVariables } from "@/lib/fonts";
import { getDirection, isValidLocale, routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sahar Mahmoud — Front-End Developer",
  description: "Portfolio of Sahar Mahmoud, front-end developer.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      className={`${fontVariables} h-full antialiased`}
      suppressHydrationWarning
    >
      <body id="top" className="font-sans">
        <NextIntlClientProvider>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
