import { desc, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { articles, products, services } from "@/lib/db/schema";

export async function getActiveProducts(limit = 8) {
  const result = await db
    .select()
    .from(products)
    .where(eq(products.isActive, true))
    .orderBy(desc(products.isFeatured), desc(products.updatedAt))
    .limit(limit);
  return result;
}

export async function getActiveServices(limit = 6) {
  const result = await db
    .select()
    .from(services)
    .where(eq(services.isActive, true))
    .orderBy(desc(services.isFeatured), desc(services.updatedAt))
    .limit(limit);
  return result;
}

export async function getPublishedArticles(limit = 3) {
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.isPublished, true))
    .orderBy(desc(articles.publishedAt), desc(articles.updatedAt))
    .limit(limit);
  return result;
}
