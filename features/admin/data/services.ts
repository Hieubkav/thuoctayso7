import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";

export async function listServices() {
  return db.select().from(services).orderBy(desc(services.updatedAt));
}

export async function deleteService(id: string) {
  await db.delete(services).where(eq(services.id, id));
}
