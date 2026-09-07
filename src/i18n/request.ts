import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";

/**
 * Light setup: a single fixed locale so next-intl is wired without an
 * `app/[locale]` restructure. Phase 3 switches this to read the matched
 * `[locale]` route segment and negotiate the request locale.
 */
export default getRequestConfig(async () => {
  const locale = defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
