import { ProductManager } from "@/features/admin/components/product-manager";
import { listProducts } from "@/features/admin/data/products";

export default async function ProductsManagementPage() {
  const products = await listProducts();
  return <ProductManager products={products} />;
}
