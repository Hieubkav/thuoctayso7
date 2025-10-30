import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const productUpdateSchema = z
  .object({
    name: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    price: z.coerce.number().min(0).optional(),
    unit: z.string().min(1).max(32).optional(),
    imageUrl: z.string().url().optional(),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Không có dữ liệu cập nhật",
  });

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const json = await request.json().catch(() => null);
  const parsed = productUpdateSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { price, name, ...rest } = parsed.data;

  await db
    .update(products)
    .set({
      ...rest,
      ...(price !== undefined ? { price: price.toString() } : {}),
      ...(name ? { name, slug: slugify(name) } : {}),
    })
    .where(eq(products.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/products");

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await db.delete(products).where(eq(products.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/products");

  return NextResponse.json({ success: true });
}
