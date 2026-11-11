import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AppProviders } from "@/providers";
import { site } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { getDirection, isValidLocale, routing } from "@/i18n/routing";
import "../globals.css";

const SITE_DESCRIPTION = "Portfolio of Sahar Mahmoud, front-end developer.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: site.ogImage,
        width: 1200,
        height: 630,
        alt: "Sahar Mahmoud portfolio home page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: SITE_DESCRIPTION,
    images: [site.ogImage],
  },
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
      data-scroll-behavior="smooth"
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
