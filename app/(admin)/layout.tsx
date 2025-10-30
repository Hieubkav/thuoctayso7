"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/admin/login");
  }, [router]);

  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="flex w-full flex-col">{children}</div>
    </div>
  );
}
