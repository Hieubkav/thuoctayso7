import { Resend } from "resend";

import { clinicInfo } from "@/lib/config";
import { env } from "@/lib/env";
import { getBaseUrl } from "@/lib/url";

const resendClient = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

interface SendPasswordResetParams {
  email: string;
  token: string;
  expiresAt: Date;
}

export async function sendPasswordResetEmail({
  email,
  token,
  expiresAt,
}: SendPasswordResetParams) {
  if (!resendClient || !env.RESEND_FROM_EMAIL) {
    console.info("Skipping password reset email because Resend is not configured.");
    return;
  }

  const baseUrl = getBaseUrl();
  const resetUrl = `${baseUrl}/admin/reset-password/${token}`;

  await resendClient.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: email,
    subject: `Đặt lại mật khẩu quản trị - ${clinicInfo.shortName}`,
    html: `
      <p>Xin chào,</p>
      <p>Anh/chị vừa yêu cầu đặt lại mật khẩu cho tài khoản quản trị ${clinicInfo.shortName}.</p>
      <p>Nhấp vào liên kết sau để đặt lại mật khẩu (có hiệu lực đến ${expiresAt.toLocaleString("vi-VN")}):</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>Nếu anh/chị không yêu cầu, vui lòng bỏ qua email này.</p>
      <p>Trân trọng,<br/>${clinicInfo.name}</p>
    `,
  });
}
