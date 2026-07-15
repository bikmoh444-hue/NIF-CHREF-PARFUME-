import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream lg:grid lg:grid-cols-[260px_1fr]">
      <AdminSidebar />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
