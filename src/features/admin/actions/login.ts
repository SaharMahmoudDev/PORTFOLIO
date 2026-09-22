"use server";

import { compare } from "bcryptjs";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";
import { loginSchema } from "../schemas/login";

export type LoginResult =
  { ok: true } | { ok: false; error: "invalid" | "unavailable" };

export async function login(input: unknown): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "invalid" };

  if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD_HASH || !env.AUTH_SECRET) {
    return { ok: false, error: "unavailable" };
  }

  const { email, password } = parsed.data;
  const emailMatches = email.toLowerCase() === env.ADMIN_EMAIL.toLowerCase();
  const passwordMatches = await compare(password, env.ADMIN_PASSWORD_HASH);

  if (!emailMatches || !passwordMatches) {
    return { ok: false, error: "invalid" };
  }

  const token = await createSessionToken({ email });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return { ok: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
