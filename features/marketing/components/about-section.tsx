import { Card, CardContent } from "@/components/ui/card";

export function AboutSection() {
  return (
    <section className="container grid gap-8 py-16 md:grid-cols-[0.9fr,1.1fr] md:items-center">
      <div className="order-2 space-y-4 md:order-1">
        <h2 className="text-3xl font-semibold tracking-tight">Câu chuyện của dược sĩ Trọng</h2>
        <p className="text-muted-foreground">
          Với hơn 15 năm kinh nghiệm dược lâm sàng, dược sĩ Trọng luôn tâm niệm mang đến những giải pháp điều trị an toàn và phù hợp nhất cho bà con U Minh. Quầy thuốc được trang bị đầy đủ thiết bị hỗ trợ đo huyết áp, đường huyết, cùng kho dữ liệu thuốc được cập nhật liên tục.
        </p>
        <Card className="border-border/60 bg-background/70">
          <CardContent className="space-y-2 p-6">
            <p className="text-sm font-medium text-primary uppercase tracking-wider">Giá trị cốt lõi</p>
            <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
              <li>Tư vấn tận tâm, dễ hiểu cho mọi lứa tuổi.</li>
              <li>Sản phẩm chính hãng, bảo quản đúng chuẩn.</li>
              <li>Đồng hành dài lâu cùng sức khỏe người dân địa phương.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="order-1 relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-accent/20 shadow-xl md:order-2">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,250,252,0.6),_transparent_70%)]" />
        <div className="absolute inset-6 rounded-2xl border border-border/60 bg-background/80 p-6">
          <h3 className="text-2xl font-semibold text-primary">Không gian quầy thuốc</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Sắp xếp khoa học, dễ tìm sản phẩm với khu vực tư vấn riêng tư giúp khách hàng thoải
            mái trao đổi về vấn đề sức khỏe.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>• Khu vực đo huyết áp, đường huyết miễn phí</li>
            <li>• Tủ thuốc gia đình theo mùa</li>
            <li>• Góc chăm sóc trẻ nhỏ và người cao tuổi</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
