import { HeroSection } from "@/features/marketing/components/hero-section";
import { MissionSection } from "@/features/marketing/components/mission-section";
import { ServicesSection } from "@/features/marketing/components/services-section";
import { ProductsSection } from "@/features/marketing/components/products-section";
import { ArticlesSection } from "@/features/marketing/components/articles-section";
import { ContactSection } from "@/features/marketing/components/contact-section";
import { MapSection } from "@/features/marketing/components/map-section";
import { getActiveProducts, getActiveServices, getPublishedArticles } from "@/features/marketing/data/catalog";
import { fallbackProducts, fallbackServices, fallbackArticles } from "@/features/marketing/data/fallback";

export default async function MarketingHomePage() {
  const [products, services, articles] = await Promise.all([
    getActiveProducts(6),
    getActiveServices(6),
    getPublishedArticles(3),
  ]);

  return (
    <>
      <HeroSection />
      <MissionSection />
      <ServicesSection services={services.length ? services : fallbackServices} />
      <ProductsSection products={products.length ? products : fallbackProducts} />
      <ArticlesSection articles={articles.length ? articles : fallbackArticles} />
      <ContactSection />
      <MapSection />
    </>
  );
}
