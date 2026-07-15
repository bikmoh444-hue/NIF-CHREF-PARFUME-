import ProductsManager from "@/components/admin/ProductsManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { demoProducts } from "@/lib/demo-data";
import type { Product } from "@/types";

export default async function AdminProductsPage() {
  if (!hasSupabaseEnv()) return <AdminProductsShell products={demoProducts} />;
  const { data } = await createClient().from("products").select("*").order("created_at", { ascending: false });
  return <AdminProductsShell products={((data?.length ? data : demoProducts) ?? []) as Product[]} />;
}

function AdminProductsShell({ products }: { products: Product[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Catalogue</p>
      <h1 className="mt-2 font-serif text-5xl">Produits</h1>
      <ProductsManager initialProducts={products} />
    </main>
  );
}
