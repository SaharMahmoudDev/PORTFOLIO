import { NextResponse } from "next/server";

/**
 * Central request interceptor. In Next.js 16 the `middleware` file convention
 * was renamed to `proxy` (same behaviour, new name).
 *
 * This will grow to handle, in one place:
 *  - admin route auth guard
 *  - contact-form rate limiting
 *  - locale detection / [locale] routing (next-intl)
 *
 * Pass-through for now. A `config.matcher` gets added alongside the first
 * real rule so it only runs where it needs to.
 */
export function proxy() {
  return NextResponse.next();
}
