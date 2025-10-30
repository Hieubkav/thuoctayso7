import type { Metadata } from "next";
import Link from "next/link";

import { PasswordResetForm } from "@/features/auth/components/password-reset-form";
import { validatePasswordResetToken } from "@/features/auth/data/password-reset";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu quản trị",
};

interface ResetPasswordPageProps {
  params: { token: string };
}

export default async function ResetPasswordPage({ params }: ResetPasswordPageProps) {
  const tokenRecord = await validatePasswordResetToken(params.token);

  if (!tokenRecord) {
    return (
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md space-y-4 rounded-lg border bg-card p-8 text-center shadow-sm">
          <h1 className="text-xl font-semibold">Liên kết không hợp lệ</h1>
          <p className="text-sm text-muted-foreground">
            Liên kết đặt lại mật khẩu đã hết hạn hoặc không tồn tại. Vui lòng yêu cầu liên kết mới.
          </p>
          <div className="pt-2">
            <Link href={routes.admin.forgotPassword} className="text-primary underline-offset-4 hover:underline">
              Gửi yêu cầu mới
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <PasswordResetForm token={params.token} />
    </main>
  );
}
