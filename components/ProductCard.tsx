import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link href={`/produit/${product.slug}`} className="product-frame relative block aspect-[4/4.6] overflow-hidden">
        {product.is_bestseller && <span className="absolute left-3 top-3 z-10 bg-gold px-3 py-1 text-xs font-bold text-white">Meilleure vente</span>}
        <Image src={product.image_url || "/placeholder.jpg"} alt={product.name_fr} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(min-width: 1024px) 25vw, 50vw" />
      </Link>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link href={`/produit/${product.slug}`} className="font-serif text-base text-ink hover:text-gold">{product.name_fr}</Link>
          <p className="mt-1 text-xs text-muted">{Number(product.price).toFixed(0)} MAD</p>
        </div>
        <AddToCartButton item={{ id: product.id, slug: product.slug, name: product.name_fr, price: Number(product.price), image_url: product.image_url, kind: "product" }} label="Ajouter" className="px-3 py-2 text-xs" />
      </div>
    </article>
  );
}
