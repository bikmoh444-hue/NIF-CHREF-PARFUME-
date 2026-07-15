import ProductGridPage from "@/components/ProductGridPage";
import { getProducts } from "@/lib/data";

export default async function HommePage() {
  const products = await getProducts("homme");
  return <ProductGridPage title="Homme" products={products} />;
}
