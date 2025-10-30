"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Pencil, Plus, Trash } from "lucide-react";

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
import type { Service } from "@/lib/db/schema";

const schema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  imageUrl: z.string().url().optional().or(z.literal("")),
  displayOrder: z.coerce.number().min(0).optional(),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});

type ServiceFormValues = z.infer<typeof schema>;

interface ServiceManagerProps {
  services: Service[];
}

export function ServiceManager({ services }: ServiceManagerProps) {
  const router = useRouter();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      displayOrder: 0,
      isFeatured: false,
      isActive: true,
    },
  });

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingService(null);
    form.reset();
  };

  const openCreate = () => {
    form.reset({
      name: "",
      description: "",
      imageUrl: "",
      displayOrder: 0,
      isFeatured: false,
      isActive: true,
    });
    setEditingService(null);
    setDialogOpen(true);
  };

  const openEdit = (service: Service) => {
    form.reset({
      name: service.name,
      description: service.description,
      imageUrl: service.imageUrl ?? "",
      displayOrder: Number(service.displayOrder ?? 0),
      isFeatured: service.isFeatured,
      isActive: service.isActive,
    });
    setEditingService(service);
    setDialogOpen(true);
  };

  const submit = form.handleSubmit((values) => {
    startTransition(async () => {
      try {
        const payload = {
          ...values,
          imageUrl: values.imageUrl || undefined,
        };
        const response = await fetch(
          editingService ? `/api/admin/services/${editingService.id}` : "/api/admin/services",
          {
            method: editingService ? "PATCH" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );
        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể lưu dịch vụ");
        }
        toast.success("Đã lưu dịch vụ");
        closeDialog();
        router.refresh();
      } catch (error) {
        toast.error("Không thể lưu dịch vụ", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  });

  const remove = (id: string) => {
    if (!window.confirm("Xóa dịch vụ này?")) return;
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
        if (!response.ok) {
          const error = (await response.json()) as { message?: string };
          throw new Error(error.message ?? "Không thể xóa dịch vụ");
        }
        toast.success("Đã xóa dịch vụ");
        router.refresh();
      } catch (error) {
        toast.error("Không thể xóa dịch vụ", {
          description: error instanceof Error ? error.message : undefined,
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Quản lý dịch vụ</h2>
          <p className="text-sm text-muted-foreground">
            Điều chỉnh danh sách dịch vụ tư vấn hiển thị cho khách hàng.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>
              <Plus className="mr-2 h-4 w-4" /> Thêm dịch vụ
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingService ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}</DialogTitle>
              <DialogDescription>
                Nhập mô tả rõ ràng để khách hàng hiểu giá trị dịch vụ.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={submit} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên dịch vụ</FormLabel>
                      <FormControl>
                        <Input placeholder="Ví dụ: Tư vấn sử dụng thuốc" {...field} />
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
                        <Textarea rows={4} placeholder="Chi tiết lợi ích dịch vụ..." {...field} />
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
                      <FormLabel>Hình ảnh minh họa (tùy chọn)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="displayOrder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thứ tự hiển thị</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
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
                    {isPending ? "Đang lưu..." : editingService ? "Cập nhật" : "Thêm mới"}
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
            <TableHead>Ưu tiên</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.length ? (
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>{service.isFeatured ? "Có" : "Không"}</TableCell>
                <TableCell>{service.isActive ? "Đang hiển thị" : "Tạm ẩn"}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(service)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(service.id)}>
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-sm text-muted-foreground">
                Chưa có dịch vụ nào.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
