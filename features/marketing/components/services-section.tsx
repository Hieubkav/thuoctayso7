import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Service } from "@/lib/db/schema";
import { serviceImageFallback } from "@/features/marketing/data/fallback";

interface ServicesSectionProps {
  services: Array<Pick<Service, "id" | "name" | "description" | "imageUrl">> | Array<{ name: string; description: string; imageUrl?: string }>;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="dich-vu" className="container space-y-6 py-16">
      <div className="space-y-2 text-center">
        <Badge variant="outline" className="mx-auto w-fit">
          Giải pháp tại quầy thuốc
        </Badge>
        <h2 className="text-3xl font-semibold tracking-tight">Dịch vụ nổi bật</h2>
        <p className="text-muted-foreground">
          Được thiết kế phù hợp với nhu cầu chăm sóc sức khỏe của người dân U Minh.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <Card key={(service as Service).id ?? service.name} className="h-full overflow-hidden border-border/70 shadow-sm">
            <div className="relative h-36 w-full overflow-hidden bg-muted">
              <Image
                src={"imageUrl" in service && service.imageUrl ? service.imageUrl : serviceImageFallback}
                alt={service.name}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 90vw"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
