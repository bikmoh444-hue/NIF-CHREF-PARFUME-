import { getAdminStats } from "@/lib/data";

export default async function AdminPage() {
  const stats = await getAdminStats();
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Dashboard</p>
      <h1 className="mt-2 font-serif text-5xl">Vue d'ensemble</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <Stat label="Commandes" value={stats.orders.length} />
        <Stat label="Chiffre d'affaires" value={`${stats.revenue.toFixed(0)} MAD`} />
        <Stat label="En attente" value={stats.pending} />
        <Stat label="Rupture / bas stock" value={stats.lowStock} />
      </div>
      <section className="mt-8 bg-white p-6 shadow-soft">
        <h2 className="font-serif text-3xl">Dernières commandes</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead><tr className="border-b border-line"><th className="py-3">N°</th><th>Client</th><th>Total</th><th>Statut</th></tr></thead>
            <tbody>{stats.orders.slice(0, 8).map((order) => <tr key={order.id} className="border-b border-line"><td className="py-3">{order.order_number}</td><td>{order.customer_name}</td><td>{order.total} MAD</td><td>{order.status}</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return <div className="bg-white p-6 shadow-soft"><p className="text-sm text-muted">{label}</p><p className="mt-3 font-serif text-4xl text-ink">{value}</p></div>;
}
