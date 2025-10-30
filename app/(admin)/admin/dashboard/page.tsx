import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDashboardStats, getRecentArticles } from "@/features/admin/data/dashboard";
import { formatDate } from "@/lib/format";

export default async function AdminDashboardPage() {
  const [stats, recentArticles] = await Promise.all([
    getDashboardStats(),
    getRecentArticles(5),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Bảng điều khiển</h1>
          <p className="text-sm text-muted-foreground">Theo dõi nhanh hoạt động nội dung marketing.</p>
        </div>
        <Badge variant="outline" className="text-xs uppercase tracking-wider">
          Cập nhật {new Date().toLocaleDateString("vi-VN")}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border/60">
          <CardHeader>
            <CardDescription>Tổng sản phẩm</CardDescription>
            <CardTitle className="text-3xl">{stats.products}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Danh mục thuốc và thiết bị hiện có.</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader>
            <CardDescription>Dịch vụ tư vấn</CardDescription>
            <CardTitle className="text-3xl">{stats.services}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Số dịch vụ đang hiển thị cho khách hàng.</p>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardHeader>
            <CardDescription>Bài viết</CardDescription>
            <CardTitle className="text-3xl">{stats.articles}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Số bài tư vấn đã xuất bản trên trang.</p>
          </CardContent>
        </Card>
      </div>
      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-lg">Bài viết gần đây</CardTitle>
          <CardDescription>Kiểm tra nhanh các bài mới được cập nhật hoặc xuất bản.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tiêu đề</TableHead>
                <TableHead>Ngày cập nhật</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentArticles.length ? (
                recentArticles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title}</TableCell>
                    <TableCell>{formatDate(article.publishedAt ?? article.updatedAt)}</TableCell>
                    <TableCell>
                      <Badge variant={article.isPublished ? "accent" : "outline"}>
                        {article.isPublished ? "Đã xuất bản" : "Bản nháp"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    Chưa có bài viết nào. Hãy thêm bài mới trong mục quản lý.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
