"use client";

import { TooltipProvider } from "@radix-ui/react-tooltip";
import { SessionProvider } from "next-auth/react";
import type { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <TooltipProvider delayDuration={100}>
        {children}
        <Toaster />
      </TooltipProvider>
    </SessionProvider>
  );
}
