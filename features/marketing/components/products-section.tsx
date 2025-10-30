import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/lib/db/schema";
import { formatCurrency } from "@/lib/format";
import { productImageFallback } from "@/features/marketing/data/fallback";

interface ProductsSectionProps {
  products: Array<Pick<Product, "id" | "name" | "description" | "price" | "imageUrl" | "unit" | "isFeatured">> | Array<{ name: string; description: string; price?: string; unit?: string; imageUrl?: string }>;
}

export function ProductsSection({ products }: ProductsSectionProps) {
  return (
    <section id="san-pham" className="bg-muted/30 py-16">
      <div className="container space-y-6">
        <div className="space-y-2 text-center">
          <Badge variant="outline" className="mx-auto w-fit">
            Sản phẩm tiêu biểu
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Dược phẩm & thiết bị y tế</h2>
          <p className="text-muted-foreground">
            Danh mục sản phẩm được chọn lọc kỹ, đảm bảo nguồn gốc rõ ràng và tư vấn bởi dược sĩ Trọng.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <Card key={(product as Product).id ?? product.name} className="overflow-hidden border-border/70 shadow-sm">
              <div className="relative h-40 w-full overflow-hidden bg-muted">
                <Image
                  src={"imageUrl" in product && product.imageUrl ? product.imageUrl : productImageFallback}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 90vw"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between text-sm">
                <span className="font-semibold text-primary">
                  {"price" in product && product.price !== undefined
                    ? formatCurrency(product.price as string | number)
                    : "Liên hệ"}
                </span>
                {"unit" in product && product.unit ? <span className="text-muted-foreground">/{product.unit}</span> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
