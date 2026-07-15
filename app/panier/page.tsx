"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

const deliveryFee = 35;

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCartStore();
  const sub = subtotal();
  return (
    <main className="bg-cream px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="luxury-label">Votre sélection</p>
        <h1 className="mt-2 font-serif text-6xl">Panier</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="grid gap-4">
            {items.length === 0 && <div className="bg-white p-8 text-muted">Votre panier est vide.</div>}
            {items.map((item) => (
              <article key={item.id} className="grid grid-cols-[90px_1fr] gap-4 bg-white p-4 shadow-soft">
                <div className="relative aspect-square overflow-hidden border border-gold-light">
                  {item.image_url && <Image src={item.image_url} alt={item.name} fill className="object-cover" />}
                </div>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="font-serif text-2xl">{item.name}</h2>
                    <p className="text-sm text-muted">{item.price} MAD</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" min={1} value={item.quantity} onChange={(e) => setQuantity(item.id, Number(e.target.value))} className="w-20 border border-line px-3 py-2" />
                    <button onClick={() => removeItem(item.id)} className="border border-line p-2"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <aside className="h-max bg-white p-6 shadow-soft">
            <h2 className="font-serif text-3xl">Récapitulatif</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span>Sous-total</span><span>{sub.toFixed(0)} MAD</span></div>
              <div className="flex justify-between"><span>Frais de livraison</span><span>{deliveryFee} MAD</span></div>
              <div className="flex justify-between border-t border-line pt-4 text-lg font-semibold"><span>Total</span><span>{(sub + deliveryFee).toFixed(0)} MAD</span></div>
            </div>
            <Link href="/checkout" className={`mt-6 block bg-ink px-5 py-3 text-center text-sm font-semibold uppercase tracking-[0.15em] text-white ${items.length === 0 ? "pointer-events-none opacity-50" : ""}`}>Passer la commande</Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
