"use client";

import { Menu, Power } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { useSidebarStore } from "@/features/admin/stores/use-sidebar-store";

export function DashboardHeader() {
  const { data } = useSession();
  const { toggle } = useSidebarStore();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border/70 bg-background px-4">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="md:hidden"
          onClick={toggle}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Mở menu</span>
        </Button>
        <div className="flex flex-col text-sm">
          <span className="font-medium">Xin chào, {data?.user?.name ?? "quản trị viên"}</span>
          <span className="text-xs text-muted-foreground">Quản lý nội dung marketing</span>
        </div>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => signOut({ redirect: true, callbackUrl: "/admin/login" })}
      >
        <Power className="mr-2 h-4 w-4" /> Đăng xuất
      </Button>
    </header>
  );
}
