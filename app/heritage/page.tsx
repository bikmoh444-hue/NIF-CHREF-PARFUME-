import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import { contentValue, getSiteContent } from "@/lib/data";

export default async function HeritagePage() {
  const content = await getSiteContent();
  return (
    <main>
      <section className="relative min-h-[55vh] bg-ink px-4 py-24 text-white lg:px-8">
        <Image src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80" alt="Sahara" fill className="object-cover opacity-50" />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <p className="luxury-label">NIF CHRIF</p>
          <h1 className="mt-4 font-serif text-7xl">L'Héritage</h1>
          <p className="mt-6 font-serif text-2xl italic text-gold-light">Entre les dunes du Sahara et les ateliers de Grasse.</p>
        </div>
      </section>
      <section className="px-4 py-20 lg:px-8">
        <SectionTitle title="Une parfumerie de peau, de lieu et de mémoire" />
        <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-9 text-muted">
          <p>{contentValue(content, "heritage_text")}</p>
          <p>Nos compositions sont construites comme des rituels: une ouverture claire, un cœur généreux, puis une base qui reste proche de la peau. Le flacon devient un objet de présence, à la fois marocain et universel.</p>
          <p>Depuis l'admin, ce contenu, les images, le logo et les coordonnées peuvent être adaptés sans modifier le code.</p>
        </div>
      </section>
    </main>
  );
}
