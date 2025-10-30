"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutDashboard, Package, Stethoscope } from "lucide-react";

import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { useSidebarStore } from "@/features/admin/stores/use-sidebar-store";
import { useDashboardStore } from "@/features/admin/stores/use-dashboard-store";

const NAV_ITEMS = [
  { href: routes.admin.dashboard, label: "Tổng quan", icon: LayoutDashboard, key: "overview" },
  { href: routes.admin.products, label: "Sản phẩm", icon: Package, key: "products" },
  { href: routes.admin.services, label: "Dịch vụ", icon: Stethoscope, key: "services" },
  { href: routes.admin.articles, label: "Bài viết", icon: FileText, key: "articles" },
] as const;

export function DashboardSidebar({ initials }: { initials: string }) {
  const pathname = usePathname();
  const { close } = useSidebarStore();
  const { activeTab, setActiveTab } = useDashboardStore();

  return (
    <aside className="flex h-full flex-col border-r border-border/70 bg-background">
      <div className="flex items-center gap-3 border-b border-border/70 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Quầy Thuốc Tây</span>
          <span className="text-xs text-muted-foreground">Khu vực quản trị</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || activeTab === item.key;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                setActiveTab(item.key);
                close();
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-primary text-primary-foreground shadow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
