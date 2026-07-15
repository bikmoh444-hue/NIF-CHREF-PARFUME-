"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 lg:px-8">
        <div>
          <div className="font-serif text-2xl tracking-[0.22em]">NIF<br />CHRIF</div>
          <p className="mt-5 text-sm leading-7 text-white/70">Maison marocaine de parfumerie de luxe, entre dunes du Sahara, hammam et ateliers de Grasse.</p>
        </div>
        <div>
          <h3 className="luxury-label">Navigation</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            <Link href="/#collection">La Collection</Link>
            <Link href="/heritage">Nos Engagements</Link>
            <Link href="/heritage">Nos boutiques</Link>
            <Link href="/checkout">Devenir Partenaire</Link>
          </div>
        </div>
        <div>
          <h3 className="luxury-label">Assistance</h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/75">
            <Link href="/heritage">Politique de confidentialité</Link>
            <Link href="/heritage">Livraison et retours</Link>
            <Link href="/#contact">Contact</Link>
            <Link href="/heritage">FAQ</Link>
          </div>
        </div>
        <div>
          <h3 className="luxury-label">Paiement</h3>
          <div className="mt-5 flex gap-3 text-white/80"><CreditCard /><Instagram /><Facebook /></div>
          <p className="mt-6 text-sm text-white/60">Paiement à la livraison disponible partout au Maroc.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/50">© {new Date().getFullYear()} NIF CHRIF. Tous droits réservés.</div>
    </footer>
  );
}
