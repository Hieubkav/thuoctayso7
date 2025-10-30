"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Plus, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/lib/db/schema";
import { formatCurrency } from "@/lib/format";

const productFormSchema = z.object({
  name: z.string().min(2, "Tên quá ngắn"),
  description: z.string().min(10, "Mô tả phải có ít nhất 10 ký tự"),
  price: z.coerce.number().min(0, "Giá không hợp lệ"),
  unit: z.string().min(1).max(32).optional().or(z.literal("")),
  imageUrl: z.string().url().optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

interface ProductManagerProps {
  products: Product[];
}

export function ProductManager({ products }: ProductManagerProps) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      unit: "",
      imageUrl: "",
      isFeatured: false,
      isActive: true,
    },
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingProduct(null);
    form.reset();
  };

  const openCreateDialog = () => {
    form.reset({
      name: "",
      description: "",
      price: 0,
      unit: "",
      imageUrl: "",
      isFeatured: false,
      isActive: true,
    });
    setEditingProduct(null);
    setDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    form.reset({
      name: product.name,
      description: product.description,
      price: Number(product.price ?? 0),
      unit: product.unit ?? "",
      imageUrl: product.imageUrl ?? "",
      isFeatured: product.isFeatured,
      isActive: product.isActive,
    });
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const submitForm = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          unit: values.unit || undefined,
          imageUrl: values.imageUrl || undefined,
        };
        const response = await fetch(
          editingProduct ? `/api/admin/products/${editingProduct.id}` : "/api/admin/products",
          {
            method: editingProduct ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể lưu sản phẩm");
        }

        toast.success("Đã lưu sản phẩm thành công");
        closeDialog();
        router.refresh();
      } catch (error) {
        toast.error("Không thể lưu sản phẩm", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  });

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa sản phẩm này?");
    if (!confirmed) return;

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể xóa sản phẩm");
        }
        toast.success("Đã xóa sản phẩm");
        router.refresh();
      } catch (error) {
        toast.error("Không thể xóa sản phẩm", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Quản lý sản phẩm</h2>
          <p className="text-sm text-muted-foreground">Thêm, cập nhật và vô hiệu hóa sản phẩm hiển thị trên trang marketing.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog}>
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
              <DialogDescription>
                Điền thông tin chi tiết sản phẩm để hiển thị trên landing page và trang chủ.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={submitForm} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: Thuốc ho Prospan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Công dụng chính, đối tượng sử dụng..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Giá bán (VNĐ)</FormLabel>
                        <FormControl>
                          <Input type="number" min={0} step={1000} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Đơn vị</FormLabel>
                        <FormControl>
                          <Input placeholder="Ví dụ: hộp, chai" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Liên kết hình ảnh (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center gap-4">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormLabel>Ưu tiên</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isActive"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormLabel>Đang hiển thị</FormLabel>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={closeDialog} disabled={isPending}>
                    Hủy
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending ? "Đang lưu..." : editingProduct ? "Cập nhật" : "Thêm mới"}
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
            <TableHead>Tên</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Ưu tiên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length ? (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>{product.isFeatured ? "Có" : "Không"}</TableCell>
                <TableCell>{product.isActive ? "Đang hiển thị" : "Tạm ẩn"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(product)}>
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Chỉnh sửa</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(product.id)}>
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Xóa</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-sm text-muted-foreground">
                Chua co san pham nao. Bam nut Them san pham de bat dau.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
