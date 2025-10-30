import { auth } from "@/auth";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z
  .object({
    title: z.string().min(5).optional(),
    excerpt: z.string().min(20).optional(),
    content: z.string().min(50).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    authorName: z.string().min(2).optional().or(z.literal("")),
    isPublished: z.boolean().optional(),
    publishedAt: z.string().datetime().optional().or(z.literal("")),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Không có dữ liệu",
  });

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const json = await request.json().catch(() => null);
  const parsed = updateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { publishedAt, isPublished, title, imageUrl, authorName, ...rest } = parsed.data;
  const updatePayload: Record<string, unknown> = {
    ...rest,
    ...(imageUrl !== undefined ? { imageUrl: imageUrl || null } : {}),
    ...(authorName !== undefined ? { authorName: authorName || "Dược sĩ Trọng" } : {}),
  };

  if (isPublished !== undefined) {
    updatePayload.isPublished = isPublished;
  }
  if (publishedAt) {
    updatePayload.publishedAt = new Date(publishedAt);
  } else if (isPublished) {
    updatePayload.publishedAt = new Date();
  }
  if (title) {
    updatePayload.title = title;
    updatePayload.slug = slugify(title);
  }

  await db.update(articles).set(updatePayload).where(eq(articles.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/articles");

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await db.delete(articles).where(eq(articles.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/articles");

  return NextResponse.json({ success: true });
}
