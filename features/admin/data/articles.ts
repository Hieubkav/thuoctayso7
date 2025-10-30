import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";

export async function listArticles() {
  return db.select().from(articles).orderBy(desc(articles.updatedAt));
}

export async function deleteArticle(id: string) {
  await db.delete(articles).where(eq(articles.id, id));
}
