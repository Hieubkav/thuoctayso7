import { ArticleManager } from "@/features/admin/components/article-manager";
import { listArticles } from "@/features/admin/data/articles";

export default async function ArticlesManagementPage() {
  const articles = await listArticles();
  return <ArticleManager articles={articles} />;
}
