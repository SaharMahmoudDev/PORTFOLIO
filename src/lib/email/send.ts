import "server-only";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { env } from "@/config/env";
import { site } from "@/config/site";

const sandboxFrom = "Portfolio <onboarding@resend.dev>";

type Message = { to: string; subject: string; html: string; replyTo?: string };

export const ownerEmail = env.NOTIFY_EMAIL ?? site.email;
export const canNotifyOwner = Boolean(
  env.RESEND_API_KEY || env.GMAIL_APP_PASSWORD,
);
export const canAutoReply = Boolean(env.RESEND_FROM || env.GMAIL_APP_PASSWORD);

export async function sendOwnerEmail({ to, subject, html, replyTo }: Message) {
  if (env.RESEND_API_KEY) {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({
      from: env.RESEND_FROM ?? sandboxFrom,
      to,
      subject,
      html,
      replyTo,
    });
    return;
  }
  await sendWithGmail({ to, subject, html, replyTo });
}

export async function sendVisitorEmail({ to, subject, html }: Message) {
  if (env.RESEND_API_KEY && env.RESEND_FROM) {
    const resend = new Resend(env.RESEND_API_KEY);
    await resend.emails.send({ from: env.RESEND_FROM, to, subject, html });
    return;
  }
  await sendWithGmail({ to, subject, html });
}

async function sendWithGmail({ to, subject, html, replyTo }: Message) {
  if (!env.GMAIL_APP_PASSWORD) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: site.email, pass: env.GMAIL_APP_PASSWORD },
  });
  await transporter.sendMail({
    from: `Sahar Mahmoud <${site.email}>`,
    to,
    subject,
    html,
    replyTo,
  });
}
