import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import SectionTitle from "@/components/SectionTitle";
import { getGiftSets } from "@/lib/data";

export default async function SignatureSetsPage() {
  const sets = await getGiftSets();
  return (
    <main className="bg-cream px-4 py-16 lg:px-8">
      <SectionTitle label="LE CADEAU ULTIME" title="Signature Sets" copy="Des coffrets pensés pour offrir un rituel complet, luxueux et mémorable." />
      <div className="mx-auto mt-14 grid max-w-7xl gap-10">
        {sets.map((set) => (
          <article key={set.id} className="grid gap-8 bg-white p-5 shadow-soft md:grid-cols-[320px_1fr]">
            <div className="product-frame relative aspect-[4/5] overflow-hidden">
              <Image src={set.image_url || ""} alt={set.name_fr} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-4xl">{set.name_fr}</h2>
              <p className="mt-4 leading-8 text-muted">{set.description_fr}</p>
              <p className="mt-5 text-xl font-semibold text-gold">{set.price} MAD</p>
              <p className="mt-3 text-sm text-muted">Inclus: {(set.included_products ?? []).join(", ")}</p>
              <AddToCartButton className="mt-7 w-max" item={{ id: set.id, slug: set.slug, name: set.name_fr, price: set.price, image_url: set.image_url, kind: "gift_set" }} label="Ajouter au panier" />
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
