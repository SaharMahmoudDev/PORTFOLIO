import "server-only";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export type LeadStatusFilter = "all" | "new" | "read";

type GetLeadsOptions = {
  status?: LeadStatusFilter;
  query?: string;
};

export async function getLeads({
  status = "all",
  query,
}: GetLeadsOptions = {}) {
  const conditions = [
    status !== "all" ? eq(leads.status, status) : undefined,
    query
      ? or(ilike(leads.name, `%${query}%`), ilike(leads.email, `%${query}%`))
      : undefined,
  ].filter((condition) => condition !== undefined);

  return db
    .select()
    .from(leads)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(leads.createdAt));
}

export async function getLeadStats() {
  const all = await db
    .select({ id: leads.id, status: leads.status })
    .from(leads);

  return {
    total: all.length,
    new: all.filter((lead) => lead.status === "new").length,
    read: all.filter((lead) => lead.status === "read").length,
  };
}
