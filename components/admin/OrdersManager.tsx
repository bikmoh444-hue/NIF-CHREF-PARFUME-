"use client";

import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Order, OrderStatus } from "@/types";

const statuses: OrderStatus[] = ["en_attente", "confirmee", "expediee", "livree", "annulee"];

export default function OrdersManager({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(() => orders.filter((order) => (status === "all" || order.status === status) && `${order.customer_name} ${order.customer_phone}`.toLowerCase().includes(query.toLowerCase())), [orders, query, status]);
  async function updateStatus(id: string, next: OrderStatus) {
    setOrders((current) => current.map((order) => order.id === id ? { ...order, status: next } : order));
    await createClient().from("orders").update({ status: next }).eq("id", id);
  }
  return (
    <section className="mt-8 bg-white p-5 shadow-soft">
      <div className="flex flex-col gap-3 md:flex-row">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Recherche nom/téléphone" className="border border-line px-4 py-3" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border border-line px-4 py-3">
          <option value="all">Tous statuts</option>
          {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-line"><th className="py-3">Date</th><th>Client</th><th>Téléphone</th><th>Ville</th><th>Total</th><th>Statut</th></tr></thead>
          <tbody>{filtered.map((order) => (
            <tr key={order.id} className="border-b border-line align-top">
              <td className="py-3">{order.created_at?.slice(0, 10)}</td><td>{order.customer_name}<div className="text-xs text-muted">{order.customer_address}</div></td><td>{order.customer_phone}</td><td>{order.customer_city}</td><td>{order.total} MAD</td>
              <td><select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)} className="border border-line px-2 py-2">{statuses.map((item) => <option key={item}>{item}</option>)}</select></td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </section>
  );
}
