import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function ConfirmedPage({ params }: { params: { id: string } }) {
  const order = hasSupabaseEnv()
    ? (await createClient().from("orders").select("*, order_items(*)").eq("id", params.id).single()).data
    : null;
  return (
    <main className="bg-cream px-4 py-16 lg:px-8">
      <div className="mx-auto max-w-3xl bg-white p-8 text-center shadow-soft">
        <p className="luxury-label">Commande confirmée</p>
        <h1 className="mt-3 font-serif text-5xl">Merci ! Votre commande a été bien reçue.</h1>
        <p className="mt-5 text-muted">Numéro de commande: <strong className="text-ink">{order?.order_number ?? params.id}</strong></p>
        <div className="mt-8 border-y border-line py-6 text-left">
          {(order?.order_items ?? []).map((item: { id: string; product_name: string; quantity: number; line_total: number }) => (
            <div key={item.id} className="flex justify-between py-2 text-sm">
              <span>{item.product_name} × {item.quantity}</span>
              <span>{item.line_total} MAD</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xl font-semibold text-gold">Total à payer à la livraison: {order?.total ?? "—"} MAD</p>
        <p className="mt-3 text-sm text-muted">Délai estimé: 24 à 72 heures selon la ville.</p>
      </div>
    </main>
  );
}
