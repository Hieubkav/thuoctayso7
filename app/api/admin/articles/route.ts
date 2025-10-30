import { auth } from "@/auth";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  imageUrl: z.string().url().optional().or(z.literal("")),
  authorName: z.string().min(2).optional().or(z.literal("")),
  isPublished: z.boolean().optional(),
  publishedAt: z.string().datetime().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await db.select().from(articles);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = articleSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { imageUrl, authorName, isPublished, publishedAt, title, ...rest } = parsed.data;
  const publishedDate = publishedAt ? new Date(publishedAt) : isPublished ? new Date() : null;

  const [created] = await db
    .insert(articles)
    .values({
      ...rest,
      title,
      slug: slugify(title),
      imageUrl: imageUrl || null,
      authorName: authorName || "Dược sĩ Trọng",
      isPublished: Boolean(isPublished),
      publishedAt: publishedDate,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/articles");

  return NextResponse.json({ data: created }, { status: 201 });
}
