import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AppProviders } from "@/providers";
import { fontVariables } from "@/lib/fonts";
import { getDirection, isValidLocale, routing } from "@/i18n/routing";
import "../globals.css";

const SITE_URL = "https://sahar-portfolio.webcraft-labs.workers.dev";
const SITE_TITLE = "Sahar Mahmoud — Front-End Developer";
const SITE_DESCRIPTION = "Portfolio of Sahar Mahmoud, front-end developer.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Sahar Mahmoud",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sahar Mahmoud portfolio home page",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
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
