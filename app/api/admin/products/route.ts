import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2, "Tên sản phẩm quá ngắn"),
  description: z.string().min(10, "Mô tả cần ít nhất 10 ký tự"),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  unit: z.string().min(1).max(32).optional(),
  imageUrl: z.string().url().optional(),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await db.select().from(products);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { price, name, ...rest } = parsed.data;
  const [created] = await db
    .insert(products)
    .values({
      ...rest,
      name,
      slug: slugify(name),
      price: price.toString(),
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/dashboard/products");

  return NextResponse.json({ data: created }, { status: 201 });
}
