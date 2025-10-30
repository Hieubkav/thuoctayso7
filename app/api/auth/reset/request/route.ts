import { NextResponse } from "next/server";
import { z } from "zod";

import { sendPasswordResetEmail } from "@/features/auth/email";
import { createPasswordResetRequest } from "@/features/auth/data/password-reset";

const requestSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { success: false, message: "Vui lòng nhập email hợp lệ." },
      { status: 400 },
    );
  }

  try {
    const result = await createPasswordResetRequest(parsed.data.email);
    if (result) {
      await sendPasswordResetEmail({
        email: parsed.data.email,
        token: result.token,
        expiresAt: result.expiresAt,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Nếu email tồn tại, chúng tôi đã gửi hướng dẫn đặt lại mật khẩu.",
    });
  } catch (error) {
    console.error("Failed to create password reset request", error);
    return NextResponse.json(
      {
        success: false,
        message: "Không thể xử lý yêu cầu đặt lại mật khẩu. Vui lòng thử lại sau.",
      },
      { status: 500 },
    );
  }
}
