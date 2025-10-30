import { clinicInfo, marketingContent } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function MissionSection() {
  return (
    <section className="container py-16">
      <Card className="border-border/70 bg-gradient-to-r from-primary/10 via-background to-background">
        <CardContent className="space-y-4 p-8 md:p-12">
          <Badge variant="accent" className="w-fit">Sứ mệnh của chúng tôi</Badge>
          <h2 className="text-3xl font-semibold">Đồng hành cùng sức khỏe gia đình U Minh</h2>
          <p className="max-w-3xl text-lg text-muted-foreground">{marketingContent.mission}</p>
          <div className="grid gap-4 pt-4 text-sm md:grid-cols-3">
            <div>
              <p className="font-semibold text-primary">Dược sĩ phụ trách</p>
              <p>{clinicInfo.name}</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Hotline hỗ trợ</p>
              <p>{clinicInfo.hotline}</p>
            </div>
            <div>
              <p className="font-semibold text-primary">Địa chỉ</p>
              <p>{clinicInfo.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
