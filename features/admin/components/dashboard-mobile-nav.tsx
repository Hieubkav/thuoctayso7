"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebarStore } from "@/features/admin/stores/use-sidebar-store";
import { DashboardSidebar } from "@/features/admin/components/dashboard-sidebar";

export function DashboardMobileNav({ initials }: { initials: string }) {
  const { isOpen, close } = useSidebarStore();

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : close())}>
      <SheetContent side="left" className="w-72 p-0">
        <DashboardSidebar initials={initials} />
      </SheetContent>
    </Sheet>
  );
}
