"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Calendar, Pencil, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Article } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";

const schema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  imageUrl: z.string().url().optional().or(z.literal("")),
  authorName: z.string().min(2).optional().or(z.literal("")),
  isPublished: z.boolean().default(false),
  publishedAt: z.string().optional().or(z.literal("")),
});

type ArticleFormValues = z.infer<typeof schema>;

interface ArticleManagerProps {
  articles: Article[];
}

export function ArticleManager({ articles }: ArticleManagerProps) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      authorName: "",
      isPublished: false,
      publishedAt: "",
    },
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingArticle(null);
    form.reset();
  };

  const openCreate = () => {
    form.reset({
      title: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      authorName: "",
      isPublished: false,
      publishedAt: "",
    });
    setEditingArticle(null);
    setDialogOpen(true);
  };

  const openEdit = (article: Article) => {
    form.reset({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      imageUrl: article.imageUrl ?? "",
      authorName: article.authorName ?? "",
      isPublished: article.isPublished,
      publishedAt: article.publishedAt ? new Date(article.publishedAt).toISOString().slice(0, 16) : "",
    });
    setEditingArticle(article);
    setDialogOpen(true);
  };

  const submit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          imageUrl: values.imageUrl || undefined,
          authorName: values.authorName || undefined,
          publishedAt: values.publishedAt ? new Date(values.publishedAt).toISOString() : undefined,
        };
        const response = await fetch(
          editingArticle ? `/api/admin/articles/${editingArticle.id}` : "/api/admin/articles",
          {
            method: editingArticle ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể lưu bài viết");
        }
        toast.success("Đã lưu bài viết");
        closeDialog();
        router.refresh();
      } catch (error) {
        toast.error("Không thể lưu bài viết", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  });

  const remove = (id: string) => {
    if (!window.confirm("Xóa bài viết này?")) return;
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể xóa bài viết");
        }
        toast.success("Đã xóa bài viết");
        router.refresh();
      } catch (error) {
        toast.error("Không thể xóa bài viết", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quản lý bài viết</h2>
          <p className="text-sm text-muted-foreground">
            Cập nhật nội dung tư vấn sức khỏe để xây dựng niềm tin với khách hàng.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Thêm bài viết
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingArticle ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}</DialogTitle>
              <DialogDescription>Chia sẻ kiến thức chính xác, dễ hiểu cho người dân địa phương.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={submit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tiêu đề</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: Cách xử lý khi cảm cúm mùa mưa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tóm tắt</FormLabel>
                      <FormControl>
                        <Textarea rows={3} placeholder="Đoạn giới thiệu ngắn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung chi tiết</FormLabel>
                      <FormControl>
                        <Textarea rows={8} placeholder="Nội dung bài viết..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hình ảnh minh họa</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="authorName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tác giả</FormLabel>
                      <FormControl>
                        <Input placeholder="Dược sĩ Trọng" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormLabel>Đã xuất bản</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="publishedAt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ngày xuất bản</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                            <Input type="datetime-local" {...field} />
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog} disabled={isPending}>
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Đang lưu..." : editingArticle ? "Cập nhật" : "Thêm mới"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Ngày cập nhật</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.length ? (
            articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell>{formatDate(article.updatedAt)}</TableCell>
                <TableCell>{article.isPublished ? "Đã xuất bản" : "Bản nháp"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(article)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(article.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                Chưa có bài viết nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
