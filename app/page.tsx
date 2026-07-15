import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ContactForm from "@/components/ContactForm";
import ProductCard from "@/components/ProductCard";
import SectionTitle from "@/components/SectionTitle";
import { contentValue, getGiftSets, getProducts, getSiteContent } from "@/lib/data";

export default async function HomePage() {
  const [products, giftSets, content] = await Promise.all([getProducts(), getGiftSets(), getSiteContent()]);
  const men = products.filter((p) => p.category_id === "00000000-0000-0000-0000-000000000101" || p.category?.slug === "homme").slice(0, 4);
  const women = products.filter((p) => p.category_id === "00000000-0000-0000-0000-000000000102" || p.category?.slug === "femme").slice(0, 4);
  const featured = products[0];

  return (
    <main>
      <section className="relative flex min-h-[66vh] items-center justify-center overflow-hidden bg-ink text-white">
        <Image src="https://images.unsplash.com/photo-1548018560-c7196548e84d?auto=format&fit=crop&w=1800&q=80" alt="Arcade marocaine" fill priority className="object-cover opacity-55" />
        <div className="perfume-smoke absolute inset-0" />
        <div className="relative z-10 px-4 text-center">
          <p className="luxury-label">{contentValue(content, "hero_subtitle", "L'ART DE LA PARFUMERIE")}</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[0.14em] md:text-6xl">{contentValue(content, "hero_title", "NIF CHRIF")}</h1>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="#collection" className="bg-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">DÉCOUVRIR LA COLLECTION</Link>
            <Link href="/signature-sets" className="border border-white px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white">SIGNATURE SETS</Link>
          </div>
        </div>
        <span className="absolute bottom-8 animate-bounce text-3xl text-white/80">⌄</span>
      </section>

      {featured && (
        <section className="bg-neutral-900 px-4 py-9 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row lg:px-6">
            <div>
              <p className="luxury-label">Produit vedette</p>
              <h2 className="mt-2 font-serif text-2xl">{featured.name_fr} | The Essence of Moonlight</h2>
            </div>
            <div className="flex gap-3">
              <Link href={`/produit/${featured.slug}`} className="border border-white px-5 py-3 text-sm font-semibold">EXPLORE</Link>
              <AddToCartButton item={{ id: featured.id, slug: featured.slug, name: featured.name_fr, price: featured.price, image_url: featured.image_url, kind: "product" }} />
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-12 lg:px-6">
        <div className="mx-auto grid max-w-6xl gap-9 lg:grid-cols-2">
          <div className="grid grid-cols-2 gap-4">
            {[
              "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80"
            ].map((src, index) => (
              <div key={src} className={`product-frame relative overflow-hidden ${index === 0 ? "col-span-2 aspect-[16/8]" : "aspect-square"}`}>
                <Image src={src} alt="Héritage NIF CHRIF" fill className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center">
            <p className="luxury-label">PRESTIGE GARANTI</p>
            <h2 className="mt-3 font-serif text-4xl text-ink">L'Héritage</h2>
            <p className="mt-4 font-serif text-lg italic text-gold">"Entre les dunes du Sahara et les ateliers de Grasse."</p>
            <p className="mt-5 text-sm leading-7 text-muted">{contentValue(content, "heritage_text")}</p>
            <div className="separator mt-10 justify-start">◆</div>
          </div>
        </div>
      </section>

      <section id="collection" className="bg-cream px-4 py-12 lg:px-6">
        <SectionTitle label="LE CADEAU ULTIME" title="Signature Sets" />
        <div className="mx-auto mt-10 grid max-w-6xl gap-6 md:grid-cols-3">
          {giftSets.slice(0, 3).map((set) => (
            <article key={set.id}>
              <Link href="/signature-sets" className="product-frame relative block aspect-[4/5] overflow-hidden">
                <Image src={set.image_url || ""} alt={set.name_fr} fill className="object-cover" />
              </Link>
              <h3 className="mt-4 font-serif text-xl">{set.name_fr}</h3>
              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{set.description_fr}</p>
              <p className="mt-3 font-semibold text-gold">{set.price} MAD</p>
            </article>
          ))}
        </div>
      </section>

      <ProductPreview title="Homme" href="/homme" products={men} />
      <ProductPreview title="Femme" href="/femme" products={women} cream />
      <ContactForm />
    </main>
  );
}

function ProductPreview({ title, href, products, cream = false }: { title: string; href: string; products: Awaited<ReturnType<typeof getProducts>>; cream?: boolean }) {
  return (
      <section className={`${cream ? "bg-cream" : "bg-white"} px-4 py-11 lg:px-6`}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className="luxury-label">Catégorie</p>
            <h2 className="font-serif text-4xl text-ink">{title}</h2>
          </div>
          <Link href={href} className="text-sm font-semibold uppercase tracking-[0.16em] text-gold">TOUT VOIR →</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
