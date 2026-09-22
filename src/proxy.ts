import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

const intlMiddleware = createMiddleware(routing);
const ADMIN_LOGIN_PATH = "/admin/login";

function splitLocale(pathname: string) {
  const [, maybeLocale, ...rest] = pathname.split("/");
  if ((routing.locales as readonly string[]).includes(maybeLocale)) {
    return { locale: maybeLocale, path: `/${rest.join("/")}` };
  }
  return { locale: routing.defaultLocale, path: pathname };
}

export default async function proxy(request: NextRequest) {
  const { locale, path } = splitLocale(request.nextUrl.pathname);
  const isAdminRoute = path === "/admin" || path.startsWith("/admin/");

  if (isAdminRoute) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const session = token ? await verifySessionToken(token) : null;
    const isLoginPath = path === ADMIN_LOGIN_PATH;

    if (!session && !isLoginPath) {
      return NextResponse.redirect(
        new URL(`/${locale}${ADMIN_LOGIN_PATH}`, request.url),
      );
    }
    if (session && isLoginPath) {
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
