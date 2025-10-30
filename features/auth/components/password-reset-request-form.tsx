"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

type FormValues = z.infer<typeof schema>;

export function PasswordResetRequestForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/auth/reset/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { success: boolean; message: string };
      if (!response.ok) {
        throw new Error(data.message);
      }

      toast.success("Đã gửi hướng dẫn đặt lại mật khẩu", {
        description: data.message,
      });
      form.reset();
    } catch (error) {
      toast.error("Không thể xử lý yêu cầu", {
        description:
          error instanceof Error ? error.message : "Vui lòng thử lại sau vài phút.",
      });
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Quên mật khẩu</CardTitle>
        <CardDescription>
          Nhập email quản trị để nhận hướng dẫn đặt lại mật khẩu.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="duocsitrong@example.com" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
