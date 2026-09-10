import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

/**
 * Central request interceptor. In Next.js 16 the `middleware` file convention
 * was renamed to `proxy` (same behaviour, new name).
 *
 * For now it only does locale negotiation / [locale] routing via next-intl.
 * Admin auth guard and contact-form rate limiting get added here in later
 * phases.
 */
export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
