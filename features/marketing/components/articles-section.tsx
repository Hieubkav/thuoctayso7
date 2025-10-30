import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@/lib/db/schema";
import { formatDate } from "@/lib/format";
import { articleImageFallback } from "@/features/marketing/data/fallback";

interface ArticlesSectionProps {
  articles: Array<Pick<Article, "id" | "title" | "excerpt" | "publishedAt" | "imageUrl">> | Array<{ title: string; excerpt: string; publishedAt?: string; imageUrl?: string }>;
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section id="bai-viet" className="container space-y-6 py-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <Badge variant="outline" className="w-fit">
            Góc tư vấn sức khỏe
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight">Chia sẻ từ dược sĩ Trưng</h2>
          <p className="text-muted-foreground">
            Cập nhật kiến thức và hướng dẫn chăm sóc sức khỏe cho gia đình bạn.
          </p>
        </div>
        <Link href="#lien-he" className="inline-flex items-center text-sm font-medium text-primary">
          Đặt câu hỏi ngay <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article) => (
          <Card key={(article as Article).id ?? article.title} className="overflow-hidden border-border/70 shadow-sm">
            <div className="relative h-40 w-full overflow-hidden bg-muted">
              <Image
                src={"imageUrl" in article && article.imageUrl ? article.imageUrl : articleImageFallback}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 33vw, 90vw"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl leading-tight">{article.title}</CardTitle>
              <CardDescription>
                {"publishedAt" in article && article.publishedAt ? formatDate(article.publishedAt as Date | string) : "Tin mới"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{article.excerpt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}