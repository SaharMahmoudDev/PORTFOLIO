"use server";

import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { classifyLead } from "@/lib/ai/classify-lead";
import { canAutoReply, sendVisitorEmail } from "@/lib/email/send";
import { leadReply } from "@/lib/email/templates";
import { getFeatureFlags } from "@/lib/features";
import { getAdminSession } from "../session";

export async function markLeadRead(id: string) {
  const session = await getAdminSession();
  if (!session) return;

  await db.update(leads).set({ status: "read" }).where(eq(leads.id, id));
  revalidatePath("/admin");
}

export async function deleteLead(id: string) {
  const session = await getAdminSession();
  if (!session) return;

  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath("/admin");
}

export type ClassifyLeadResult = { ok: boolean };

export async function classifyLeadAction(
  id: string,
): Promise<ClassifyLeadResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false };
  if (!(await getFeatureFlags()).leadAssistant) return { ok: false };

  const [lead] = await db.select().from(leads).where(eq(leads.id, id));
  if (!lead) return { ok: false };

  const result = await classifyLead(lead);
  if (!result) return { ok: false };

  await db
    .update(leads)
    .set({
      aiType: result.type,
      aiIndustry: result.industry,
      aiPriority: result.priority,
      aiFeatures: result.features,
      aiSuggestedReply: result.suggestedReply,
      aiClassifiedAt: new Date(),
    })
    .where(eq(leads.id, id));

  revalidatePath("/admin");
  return { ok: true };
}

export type SendLeadReplyResult =
  | { ok: true }
  | {
      ok: false;
      error: "unauthorized" | "empty" | "notFound" | "unavailable" | "failed";
    };

export async function sendLeadReply(
  id: string,
  body: string,
): Promise<SendLeadReplyResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false, error: "unauthorized" };

  const trimmed = body.trim();
  if (!trimmed) return { ok: false, error: "empty" };

  if (!canAutoReply) return { ok: false, error: "unavailable" };

  const [lead] = await db.select().from(leads).where(eq(leads.id, id));
  if (!lead) return { ok: false, error: "notFound" };

  try {
    await sendVisitorEmail({
      to: lead.email,
      ...leadReply(lead.name, trimmed),
    });

    await db
      .update(leads)
      .set({
        status: "read",
        aiSuggestedReply: trimmed,
        repliedAt: new Date(),
      })
      .where(eq(leads.id, id));

    revalidatePath("/admin");
    return { ok: true };
  } catch {
    return { ok: false, error: "failed" };
  }
}

export type ExportLeadsResult =
  { ok: true; base64: string; filename: string } | { ok: false };

const BRAND = {
  bg: "FF0A0F0D",
  card: "FF111815",
  primary: "FF35D482",
  amber: "FFE8B75C",
  faint: "FF8A968F",
  white: "FFFFFFFF",
  lightBg: "FFF6F8F7",
  darkFg: "FF0B120F",
  borderLight: "FFC3CFC8",
} as const;

const MONO = "Consolas";

const columns = [
  { header: "Name", key: "name", width: 20 },
  { header: "Email", key: "email", width: 26 },
  { header: "Project type", key: "projectType", width: 16 },
  { header: "Budget", key: "budget", width: 14 },
  { header: "Message", key: "message", width: 46 },
  { header: "Status", key: "status", width: 10 },
  { header: "AI type", key: "aiType", width: 16 },
  { header: "AI industry", key: "aiIndustry", width: 16 },
  { header: "AI priority", key: "aiPriority", width: 12 },
  { header: "AI features", key: "aiFeatures", width: 30 },
  { header: "AI suggested reply", key: "aiSuggestedReply", width: 46 },
  { header: "Replied", key: "replied", width: 10 },
  { header: "Replied at", key: "repliedAt", width: 20 },
  { header: "Received at", key: "createdAt", width: 20 },
] as const;

export async function exportLeadsAction(): Promise<ExportLeadsResult> {
  const session = await getAdminSession();
  if (!session) return { ok: false };

  const rows = await db.select().from(leads).orderBy(desc(leads.createdAt));

  const { default: ExcelJS } = await import("exceljs");
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Sahar Mahmoud — Portfolio Admin";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Messages", {
    properties: { tabColor: { argb: BRAND.primary } },
    views: [{ state: "frozen", ySplit: 2 }],
  });

  sheet.columns = columns.map(({ key, width }) => ({ key, width }));

  const titleRow = sheet.addRow([`// sahar mahmoud — leads export`]);
  sheet.mergeCells(1, 1, 1, columns.length);
  titleRow.height = 26;
  titleRow.eachCell({ includeEmpty: true }, (cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: BRAND.bg },
    };
  });
  titleRow.getCell(1).font = {
    name: MONO,
    size: 13,
    bold: true,
    color: { argb: BRAND.primary },
  };
  titleRow.getCell(1).alignment = { vertical: "middle", indent: 1 };

  const headerRow = sheet.addRow(columns.map((c) => c.header));
  headerRow.height = 20;
  headerRow.eachCell((cell) => {
    cell.font = {
      name: MONO,
      size: 10.5,
      bold: true,
      color: { argb: BRAND.primary },
    };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: BRAND.card },
    };
    cell.border = {
      bottom: { style: "medium", color: { argb: BRAND.primary } },
    };
    cell.alignment = { vertical: "middle" };
  });

  rows.forEach((lead, index) => {
    const row = sheet.addRow({
      name: lead.name,
      email: lead.email,
      projectType: lead.projectType,
      budget: lead.budget,
      message: lead.message,
      status: lead.status,
      aiType: lead.aiType ?? "",
      aiIndustry: lead.aiIndustry ?? "",
      aiPriority: lead.aiPriority ?? "",
      aiFeatures: lead.aiFeatures?.join(", ") ?? "",
      aiSuggestedReply: lead.aiSuggestedReply ?? "",
      replied: lead.repliedAt ? "Yes" : "No",
      repliedAt: lead.repliedAt ? lead.repliedAt.toISOString() : "",
      createdAt: lead.createdAt.toISOString(),
    });

    const zebra = index % 2 === 0 ? BRAND.white : BRAND.lightBg;
    row.eachCell((cell) => {
      cell.font = { name: MONO, size: 10, color: { argb: BRAND.darkFg } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: zebra },
      };
      cell.border = {
        top: { style: "hair", color: { argb: BRAND.borderLight } },
        bottom: { style: "hair", color: { argb: BRAND.borderLight } },
      };
      cell.alignment = { vertical: "top", wrapText: true };
    });

    if (lead.aiPriority === "high") {
      row.getCell("aiPriority").font = {
        name: MONO,
        size: 10,
        bold: true,
        color: { argb: BRAND.primary },
      };
    } else if (lead.aiPriority === "medium") {
      row.getCell("aiPriority").font = {
        name: MONO,
        size: 10,
        bold: true,
        color: { argb: BRAND.amber },
      };
    }

    row.getCell("replied").font = {
      name: MONO,
      size: 10,
      bold: true,
      color: { argb: lead.repliedAt ? BRAND.primary : BRAND.faint },
    };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const base64 = Buffer.from(buffer).toString("base64");
  const filename = `leads-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return { ok: true, base64, filename };
}
