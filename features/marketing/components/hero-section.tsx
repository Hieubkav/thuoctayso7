import Link from "next/link";
import { PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { clinicInfo, marketingContent } from "@/lib/config";

export function HeroSection() {
  return (
    <section
      id="gioi-thieu"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50 via-background to-background"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_60%)]" />
      <div className="container grid gap-10 py-16 md:grid-cols-[1.1fr,0.9fr] md:items-center md:py-24">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit">
            Chăm sóc sức khỏe cộng đồng U Minh
          </Badge>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            {marketingContent.hero.title}
          </h1>
          <p className="text-lg text-muted-foreground md:max-w-xl">
            {marketingContent.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={`tel:+84${clinicInfo.hotline.replace(/\D/g, "")}`}>
                <PhoneCall className="mr-2 h-4 w-4" /> {marketingContent.hero.ctaPrimary}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#dich-vu">{marketingContent.hero.ctaSecondary}</Link>
            </Button>
          </div>
          <ul className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2">
            {marketingContent.highlights.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-2 rounded-lg border border-border/60 bg-background/70 p-3"
              >
                <span className="mt-1 text-primary">•</span>
                <span>
                  <span className="block font-semibold text-foreground">{item.title}</span>
                  <span>{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative hidden h-full min-h-[320px] overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/20 via-background to-accent/20 shadow-xl md:block">
          <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.25),_transparent_60%)]" />
          <div className="absolute inset-6 rounded-2xl border border-dashed border-primary/30 p-6 text-sm text-primary-foreground backdrop-blur-sm">
            <p className="text-lg font-semibold text-primary">
              Dược sĩ Trọng luôn sẵn sàng đồng hành cùng gia đình bạn
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Tư vấn tận tâm, hướng dẫn chi tiết và theo dõi sát sao giúp người dân U Minh an tâm
              khi sử dụng thuốc.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
