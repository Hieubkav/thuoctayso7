import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

export async function listProducts() {
  return db.select().from(products).orderBy(desc(products.updatedAt));
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id));
}
