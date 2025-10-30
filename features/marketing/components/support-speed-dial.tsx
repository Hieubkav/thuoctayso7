"use client";

import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { clinicInfo } from "@/lib/config";

export function SupportSpeedDial() {
  const [open, setOpen] = useState(false);
  const sanitizedHotline = clinicInfo.hotline.replace(/\D/g, "");
  const actions = [
    {
      icon: Phone,
      label: "Gọi hotline",
      href: `tel:+84${sanitizedHotline}`,
      bg: "bg-primary",
    },
    {
      icon: MessageCircle,
      label: "Nhắn Zalo",
      href: `https://zalo.me/${sanitizedHotline}`,
      bg: "bg-secondary",
    },
    {
      icon: MapPin,
      label: "Xem bản đồ",
      href: "#ban-do",
      bg: "bg-accent",
    },
  ] as const;

  return (
    <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3">
      {open
        ? actions.map((action) => (
            <Button
              key={action.label}
              asChild
              className={`${action.bg} text-white shadow-lg`}
              size="sm"
            >
              <Link href={action.href} className="flex items-center gap-2">
                <action.icon className="h-4 w-4" />
                <span>{action.label}</span>
              </Link>
            </Button>
          ))
        : null}
      <Button
        size="lg"
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-xl"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "✕" : "☎"}
      </Button>
    </div>
  );
}
