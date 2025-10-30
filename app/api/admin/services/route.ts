import { auth } from "@/auth";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { z } from "zod";

const serviceSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  displayOrder: z.coerce.number().optional(),
});

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const data = await db.select().from(services);
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => null);
  const parsed = serviceSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ message: "Dữ liệu không hợp lệ", errors: parsed.error.flatten() }, { status: 400 });
  }

  const { displayOrder, imageUrl, name, ...rest } = parsed.data;

  const [created] = await db
    .insert(services)
    .values({
      ...rest,
      name,
      slug: slugify(name),
      imageUrl: imageUrl || null,
      displayOrder: displayOrder !== undefined ? displayOrder.toString() : null,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/landing");
  revalidatePath("/admin/dashboard/services");

  return NextResponse.json({ data: created }, { status: 201 });
}
