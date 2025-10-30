import type { Metadata } from "next";

import { LoginForm } from "@/features/auth/components/login-form";
import { clinicInfo } from "@/lib/config";

export const metadata: Metadata = {
  title: "Đăng nhập quản trị",
  description: "Truy cập bảng điều khiển để quản lý nội dung marketing cho quầy thuốc.",
};

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl space-y-8">
        <div className="space-y-2 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {clinicInfo.shortName}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Khu vực quản trị</h1>
          <p className="text-muted-foreground">
            Đăng nhập để cập nhật sản phẩm, dịch vụ và bài viết cho chiến dịch marketing.
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
