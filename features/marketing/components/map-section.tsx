import { clinicInfo } from "@/lib/config";

export function MapSection() {
  return (
    <section id="ban-do" className="bg-muted/40 py-16">
      <div className="container space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">Tìm đường đến quầy thuốc</h2>
        <p className="max-w-2xl text-muted-foreground">
          Chúng tôi nằm ngay trung tâm thị trấn U Minh, thuận tiện di chuyển. Nhấp vào bản đồ để mở chỉ đường trên Google Maps.
        </p>
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border/60 shadow-lg">
          <iframe
            title="Bản đồ đến quầy thuốc"
            src={clinicInfo.mapEmbedUrl}
            loading="lazy"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
