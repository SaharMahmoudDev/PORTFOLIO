export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** RTL locales — drives `dir` on <html> once [locale] routing lands in Phase 3. */
export const rtlLocales: readonly Locale[] = ["ar"];
