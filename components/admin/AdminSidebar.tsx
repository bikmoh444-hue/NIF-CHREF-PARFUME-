"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Boxes, Gift, Home, Languages, LogOut, Mail, PackageCheck, Settings, SlidersHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const items = [
  ["Vue d'ensemble", "/admin", BarChart3],
  ["Commandes", "/admin/commandes", PackageCheck],
  ["Produits", "/admin/produits", Boxes],
  ["Coffrets", "/admin/coffrets", Gift],
  ["Contenu", "/admin/contenu", SlidersHorizontal],
  ["Messages", "/admin/messages", Mail],
  ["Traductions", "/admin/traductions", Languages],
  ["Paramètres", "/admin/parametres", Settings]
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();
  async function logout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }
  return (
    <aside className="border-r border-line bg-ink text-white lg:min-h-screen">
      <div className="flex items-center justify-between border-b border-white/10 p-5 lg:block">
        <Link href="/" className="font-serif text-xl tracking-[0.2em]">NIF<br />CHRIF</Link>
        <Link href="/" className="lg:hidden"><Home /></Link>
      </div>
      <nav className="grid gap-1 p-3">
        {items.map(([label, href, Icon]) => (
          <Link key={href as string} href={href as string} className={`flex items-center gap-3 px-3 py-3 text-sm ${pathname === href ? "bg-gold text-white" : "text-white/75 hover:bg-white/10"}`}>
            <Icon className="h-4 w-4" />
            {label as string}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="m-3 flex w-[calc(100%-1.5rem)] items-center gap-3 border border-white/15 px-3 py-3 text-sm text-white/80">
        <LogOut className="h-4 w-4" /> Déconnexion
      </button>
    </aside>
  );
}
