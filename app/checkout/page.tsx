"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useCartStore } from "@/lib/cart-store";

const deliveryFee = 35;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clear } = useCartStore();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const sub = subtotal();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length) return setError("Votre panier est vide.");

    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const orderId = crypto.randomUUID();
    const orderNumber = `NC-${Date.now().toString().slice(-8)}`;
    const supabase = createClient();

    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      order_number: orderNumber,
      customer_name: String(form.get("name")),
      customer_phone: String(form.get("phone")),
      customer_city: String(form.get("city")),
      customer_address: String(form.get("address")),
      note: String(form.get("note") || ""),
      subtotal: sub,
      delivery_fee: deliveryFee,
      total: sub + deliveryFee
    });

    if (orderError) {
      setLoading(false);
      setError(`Commande non enregistree: ${orderError.message}. Execute le SQL Supabase puis reessaie.`);
      return;
    }

    const { error: itemsError } = await supabase.from("order_items").insert(
      items.map((item) => ({
        order_id: orderId,
        product_id: item.kind === "product" && uuidPattern.test(item.id) ? item.id : null,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        line_total: item.price * item.quantity
      }))
    );

    if (itemsError) {
      setLoading(false);
      setError(`Commande creee, mais articles non enregistres: ${itemsError.message}`);
      return;
    }

    clear();
    router.push(`/commande-confirmee/${orderId}`);
  }

  return (
    <main className="bg-cream px-4 py-12 lg:px-6">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={submit} className="grid gap-3 bg-white p-5 shadow-soft">
          <p className="luxury-label">Paiement à la livraison</p>
          <h1 className="font-serif text-4xl">Commande</h1>
          <input name="name" required placeholder="Nom complet" className="border border-line px-3 py-2.5 outline-gold" />
          <input name="phone" required placeholder="Telephone" className="border border-line px-3 py-2.5 outline-gold" />
          <input name="city" required placeholder="Ville" className="border border-line px-3 py-2.5 outline-gold" />
          <textarea name="address" required placeholder="Adresse complete" rows={4} className="border border-line px-3 py-2.5 outline-gold" />
          <textarea name="note" placeholder="Note optionnelle" rows={3} className="border border-line px-3 py-2.5 outline-gold" />
          <div className="border border-gold-light bg-cream p-3 text-sm text-muted">
            Paiement a la livraison. Vous paierez le total au livreur apres confirmation.
          </div>
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="bg-ink px-5 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white disabled:opacity-60">
            {loading ? "Validation..." : "Valider la commande"}
          </button>
        </form>

        <aside className="h-max bg-white p-5 shadow-soft">
          <h2 className="font-serif text-2xl">Commande</h2>
          <div className="mt-5 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-4 text-sm">
                <span>{item.name} x {item.quantity}</span>
                <span>{(item.price * item.quantity).toFixed(0)} MAD</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between"><span>Sous-total</span><span>{sub.toFixed(0)} MAD</span></div>
            <div className="flex justify-between"><span>Livraison</span><span>{deliveryFee} MAD</span></div>
            <div className="flex justify-between text-base font-semibold"><span>Total final</span><span>{(sub + deliveryFee).toFixed(0)} MAD</span></div>
          </div>
        </aside>
      </div>
    </main>
  );
}
