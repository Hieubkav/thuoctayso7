import Link from "next/link";

import { clinicInfo } from "@/lib/config";
import { routes } from "@/lib/routes";
import { Separator } from "@/components/ui/separator";

export function MarketingFooter() {
  return (
    <footer className="mt-16 border-t bg-muted/40">
      <div className="container grid gap-8 py-10 md:grid-cols-3">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">{clinicInfo.shortName}</h3>
          <p className="text-sm text-muted-foreground">{clinicInfo.description}</p>
          <div className="text-sm">
            <p className="font-medium">Địa chỉ</p>
            <p>{clinicInfo.address}</p>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Giờ hoạt động
          </h4>
          <ul className="space-y-2 text-sm">
            {clinicInfo.workingHours.map((item) => (
              <li key={item.days}>
                <span className="font-medium">{item.days}:</span> {item.hours}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Liên hệ
          </h4>
          <p className="text-sm">Hotline: <Link href={`tel:+84${clinicInfo.hotline.replace(/\D/g, "")}`} className="font-semibold text-primary">{clinicInfo.hotline}</Link></p>
          <p className="text-sm">Email: <Link href={`mailto:${clinicInfo.email}`} className="text-primary">{clinicInfo.email}</Link></p>
          <div className="flex gap-3 text-sm">
            <Link href={routes.marketing.products}>Sản phẩm</Link>
            <Link href={routes.marketing.services}>Dịch vụ</Link>
            <Link href={routes.marketing.articles}>Bài viết</Link>
          </div>
        </div>
      </div>
      <Separator className="bg-border/70" />
      <div className="container flex flex-col items-center justify-between gap-3 py-4 text-xs text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} {clinicInfo.name}. Lưu ý: Thông tin chỉ mang tính tham khảo, vui lòng liên hệ trực tiếp để được tư vấn.</p>
        <p>Thiết kế & vận hành bởi đội ngũ marketing địa phương.</p>
      </div>
    </footer>
  );
}
