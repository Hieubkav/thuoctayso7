import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/password";
import {
  markTokenAsUsed,
  validatePasswordResetToken,
} from "@/features/auth/data/password-reset";

const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = resetSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Thông tin không hợp lệ" },
      { status: 400 },
    );
  }

  const { token, password } = parsed.data;

  try {
    const tokenRecord = await validatePasswordResetToken(token);
    if (!tokenRecord) {
      return NextResponse.json(
        { success: false, message: "Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn." },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);
    await db
      .update(adminUsers)
      .set({ passwordHash: hashedPassword })
      .where(eq(adminUsers.id, tokenRecord.adminUserId));

    await markTokenAsUsed(tokenRecord.id);

    return NextResponse.json({ success: true, message: "Đặt lại mật khẩu thành công." });
  } catch (error) {
    console.error("Unable to reset password", error);
    return NextResponse.json(
      { success: false, message: "Không thể đặt lại mật khẩu, vui lòng thử lại." },
      { status: 500 },
    );
  }
}
