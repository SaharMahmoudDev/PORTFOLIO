"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { getAdminSession } from "../session";

export async function markLeadRead(id: string) {
  const session = await getAdminSession();
  if (!session) return;

  await db.update(leads).set({ status: "read" }).where(eq(leads.id, id));
  revalidatePath("/admin");
}
