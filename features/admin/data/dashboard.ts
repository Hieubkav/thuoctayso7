import { sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { articles, products, services } from "@/lib/db/schema";

export async function getDashboardStats() {
  const [[productCount], [serviceCount], [articleCount]] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(products),
    db.select({ count: sql<number>`count(*)` }).from(services),
    db.select({ count: sql<number>`count(*)` }).from(articles),
  ]);

  return {
    products: Number(productCount?.count ?? 0),
    services: Number(serviceCount?.count ?? 0),
    articles: Number(articleCount?.count ?? 0),
  };
}

export async function getRecentArticles(limit = 5) {
  const data = await db
    .select()
    .from(articles)
    .orderBy(sql`COALESCE(${articles.publishedAt}, ${articles.updatedAt}) DESC`)
    .limit(limit);
  return data;
}
