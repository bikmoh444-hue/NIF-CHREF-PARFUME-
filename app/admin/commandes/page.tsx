import OrdersManager from "@/components/admin/OrdersManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import type { Order } from "@/types";

export default async function AdminOrdersPage() {
  if (!hasSupabaseEnv()) {
    return <AdminOrdersShell orders={[]} />;
  }
  const { data } = await createClient().from("orders").select("*, order_items(*)").order("created_at", { ascending: false });
  return <AdminOrdersShell orders={(data ?? []) as Order[]} />;
}

function AdminOrdersShell({ orders }: { orders: Order[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Gestion</p>
      <h1 className="mt-2 font-serif text-5xl">Commandes</h1>
      <OrdersManager initialOrders={orders} />
    </main>
  );
}
