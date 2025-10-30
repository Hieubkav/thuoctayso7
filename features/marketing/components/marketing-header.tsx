"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { clinicInfo } from "@/lib/config";

const menuItems = [
  { href: "#gioi-thieu", label: "Giới thiệu" },
  { href: "#dich-vu", label: "Dịch vụ" },
  { href: "#san-pham", label: "Sản phẩm" },
  { href: "#bai-viet", label: "Bài viết" },
  { href: "#lien-he", label: "Liên hệ" },
];

export function MarketingHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="hidden border-b border-border/60 bg-primary text-primary-foreground md:block">
        <div className="container flex items-center justify-between py-2 text-sm">
          <p>
            {clinicInfo.workingHours[0]?.days}: {clinicInfo.workingHours[0]?.hours}
          </p>
          <div className="flex items-center gap-4">
            <span>
              Hotline: <strong>{clinicInfo.hotline}</strong>
            </span>
            <span>Email: {clinicInfo.email}</span>
          </div>
        </div>
      </div>
      <div className="container flex h-16 items-center justify-between">
        <Link href={pathname === "/" ? "#" : "/"} className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 p-2 text-primary">
            <span className="text-lg font-bold">QT</span>
          </span>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-muted-foreground">Quầy Thuốc Tây</span>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Dược sĩ Trọng
            </span>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted-foreground transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button size="sm" asChild className="hidden md:inline-flex">
            <Link href={`tel:+84${clinicInfo.hotline.replace(/\D/g, "")}`}>Gọi ngay</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="ghost" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Mở menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <div className="space-y-6 pt-10">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Liên hệ nhanh</p>
                  <p className="text-lg font-semibold">{clinicInfo.hotline}</p>
                  <p className="text-sm">{clinicInfo.address}</p>
                </div>
                <nav className="flex flex-col gap-4 text-base font-medium">
                  {menuItems.map((item) => (
                    <Link key={item.href} href={item.href} className="text-foreground">
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
