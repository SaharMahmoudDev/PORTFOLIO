import "server-only";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function getLeads() {
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}
