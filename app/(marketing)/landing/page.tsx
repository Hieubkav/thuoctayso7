import type { Metadata } from "next";

import { HeroSection } from "@/features/marketing/components/hero-section";
import { AboutSection } from "@/features/marketing/components/about-section";
import { ServicesSection } from "@/features/marketing/components/services-section";
import { ProductsSection } from "@/features/marketing/components/products-section";
import { ArticlesSection } from "@/features/marketing/components/articles-section";
import { ContactSection } from "@/features/marketing/components/contact-section";
import { MapSection } from "@/features/marketing/components/map-section";
import { getActiveProducts, getActiveServices, getPublishedArticles } from "@/features/marketing/data/catalog";
import { fallbackProducts, fallbackServices, fallbackArticles } from "@/features/marketing/data/fallback";

export const metadata: Metadata = {
  title: "Landing page Quầy Thuốc Tây số 7",
  description: "Landing page giới thiệu đầy đủ dịch vụ, sản phẩm và thông tin liên hệ quầy thuốc Dược sĩ Trọng.",
};

export default async function LandingPage() {
  const [products, services, articles] = await Promise.all([
    getActiveProducts(9),
    getActiveServices(6),
    getPublishedArticles(6),
  ]);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection services={services.length ? services : fallbackServices} />
      <ProductsSection products={products.length ? products : fallbackProducts} />
      <ArticlesSection articles={articles.length ? articles : fallbackArticles} />
      <ContactSection />
      <MapSection />
    </>
  );
}
