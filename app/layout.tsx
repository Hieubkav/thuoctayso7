import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import type { Metadata } from "next";
import "./globals.css";

import { clinicInfo } from "@/lib/config";
import { inter, sourceSerif } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { AppProviders } from "./providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://thuocso7.vercel.app"),
  title: {
    default: clinicInfo.name,
    template: `%s | ${clinicInfo.shortName}`,
  },
  description: clinicInfo.description,
  openGraph: {
    title: clinicInfo.name,
    description: clinicInfo.description,
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          sourceSerif.variable,
          "min-h-screen bg-background font-sans text-foreground antialiased",
        )}
      >
        <AppProviders>{children}</AppProviders>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
