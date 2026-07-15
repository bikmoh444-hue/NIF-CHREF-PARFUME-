import ProductGridPage from "@/components/ProductGridPage";
import { getProducts } from "@/lib/data";

export default async function FemmePage() {
  const products = await getProducts("femme");
  return <ProductGridPage title="Femme" products={products} />;
}
