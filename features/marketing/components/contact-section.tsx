import Link from "next/link";
import { Mail, PhoneCall } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { clinicInfo } from "@/lib/config";

export function ContactSection() {
  return (
    <section id="lien-he" className="container py-16">
      <Card className="border-border/70 bg-background/70 shadow-lg">
        <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tight">Cần tư vấn ngay?</h2>
            <p className="text-muted-foreground">
              Liên hệ trực tiếp với dược sĩ Trọng để được tư vấn sử dụng thuốc an toàn và hiệu quả.
            </p>
          </div>
          <div className="flex flex-col gap-3 md:flex-row">
            <Button size="lg" asChild>
              <Link href={`tel:+84${clinicInfo.hotline.replace(/\D/g, "")}`}>
                <PhoneCall className="mr-2 h-5 w-5" /> {clinicInfo.hotline}
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`mailto:${clinicInfo.email}`}>
                <Mail className="mr-2 h-5 w-5" /> Gửi email
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
