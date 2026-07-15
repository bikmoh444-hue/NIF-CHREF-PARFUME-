import AdminSettings from "@/components/admin/AdminSettings";

export default function AdminSettingsPage() {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Administration</p>
      <h1 className="mt-2 font-serif text-5xl">Paramètres</h1>
      <AdminSettings />
    </main>
  );
}
