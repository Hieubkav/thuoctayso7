import { auth } from "@/auth";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

const updateSchema = z
  .object({
    name: z.string().min(2).optional(),
    description: z.string().min(10).optional(),
    imageUrl: z.string().url().optional().or(z.literal("")),
    isFeatured: z.boolean().optional(),
    isActive: z.boolean().optional(),
    displayOrder: z.coerce.number().optional(),
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

  const { displayOrder, imageUrl, name, ...rest } = parsed.data;

  await db
    .update(services)
    .set({
      ...rest,
      ...(imageUrl !== undefined ? { imageUrl: imageUrl || null } : {}),
      ...(displayOrder !== undefined ? { displayOrder: displayOrder.toString() } : {}),
      ...(name ? { name, slug: slugify(name) } : {}),
    })
    .where(eq(services.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/services");

  return NextResponse.json({ success: true });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await db.delete(services).where(eq(services.id, id));

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/services");

  return NextResponse.json({ success: true });
}
