"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types";

export default function ProductGridPage({ title, products }: { title: string; products: Product[] }) {
  const [sort, setSort] = useState("popularite");
  const sorted = useMemo(() => {
    const copy = [...products];
    if (sort === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") copy.sort((a, b) => b.price - a.price);
    if (sort === "popularite") copy.sort((a, b) => Number(b.is_bestseller) - Number(a.is_bestseller));
    return copy;
  }, [products, sort]);
  return (
    <main className="bg-cream px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-6 border-b border-line pb-8 md:flex-row md:items-end">
          <div>
            <p className="luxury-label">La Collection</p>
            <h1 className="mt-2 font-serif text-6xl text-ink">{title}</h1>
          </div>
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="border border-line bg-white px-4 py-3">
            <option value="popularite">Popularité</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </main>
  );
}
