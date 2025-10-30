import type { Metadata } from "next";

import { PasswordResetRequestForm } from "@/features/auth/components/password-reset-request-form";

export const metadata: Metadata = {
  title: "Quên mật khẩu quản trị",
  description: "Gửi yêu cầu đặt lại mật khẩu cho tài khoản quản trị.",
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <PasswordResetRequestForm />
    </main>
  );
}
