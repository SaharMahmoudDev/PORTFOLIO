import "server-only";
import { Resend } from "resend";
import { env } from "@/config/env";
import { site } from "@/config/site";

const sandboxFrom = "Portfolio <onboarding@resend.dev>";

type Message = { to: string; subject: string; html: string; replyTo?: string };

export function emailEnabled() {
  return Boolean(env.RESEND_API_KEY);
}

export async function sendEmail({ to, subject, html, replyTo }: Message) {
  if (!env.RESEND_API_KEY) return;

  const resend = new Resend(env.RESEND_API_KEY);
  await resend.emails.send({
    from: env.RESEND_FROM ?? sandboxFrom,
    to,
    subject,
    html,
    replyTo,
  });
}

export const ownerEmail = env.NOTIFY_EMAIL ?? site.email;
export const canAutoReply = Boolean(env.RESEND_FROM);
