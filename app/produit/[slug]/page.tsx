import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getProduct } from "@/lib/data";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();
  return (
    <main className="px-4 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div className="grid gap-4">
          <div className="product-frame relative aspect-[4/5] overflow-hidden">
            <Image src={product.image_url || ""} alt={product.name_fr} fill className="object-cover" priority />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {product.is_bestseller && <span className="mb-4 w-max bg-gold px-3 py-1 text-xs font-bold text-white">BEST SELLER</span>}
          <p className="luxury-label">NIF CHRIF</p>
          <h1 className="mt-3 font-serif text-6xl text-ink">{product.name_fr}</h1>
          <p className="mt-5 text-2xl text-gold">{Number(product.price).toFixed(0)} MAD</p>
          <p className="mt-7 leading-8 text-muted">{product.description_fr}</p>
          <AddToCartButton className="mt-8 w-full md:w-max" label="Ajouter au panier" item={{ id: product.id, slug: product.slug, name: product.name_fr, price: product.price, image_url: product.image_url, kind: "product" }} />
          {(product.notes_top || product.notes_heart || product.notes_base) && (
            <div className="mt-10 border-t border-line pt-8">
              <h2 className="font-serif text-3xl">Fiche olfactive</h2>
              <dl className="mt-5 grid gap-3 text-sm">
                {product.notes_top && <div><dt className="font-semibold text-ink">Notes de tête</dt><dd className="text-muted">{product.notes_top}</dd></div>}
                {product.notes_heart && <div><dt className="font-semibold text-ink">Notes de cœur</dt><dd className="text-muted">{product.notes_heart}</dd></div>}
                {product.notes_base && <div><dt className="font-semibold text-ink">Notes de fond</dt><dd className="text-muted">{product.notes_base}</dd></div>}
              </dl>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
