import type { Metadata } from "next";
import { site } from "@/config/site";
import { routing } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const openGraphLocale: Record<Locale, string> = {
  en: "en_US",
  ar: "ar_EG",
};

type PageMetadataInput = {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: { url: string; alt: string };
  absoluteTitle?: boolean;
};

export function localizedPath(locale: Locale, path = "") {
  return `/${locale}${path}`;
}

export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedPath(locale, path)]),
    ),
    "x-default": localizedPath(routing.defaultLocale, path),
  };
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image,
  absoluteTitle,
}: PageMetadataInput): Metadata {
  const url = localizedPath(locale, path);
  const ogImage = image ?? { url: site.ogImage, alt: site.title };
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: openGraphLocale[locale],
      alternateLocale: routing.locales
        .filter((other) => other !== locale)
        .map((other) => openGraphLocale[other]),
      images: [{ ...ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}
