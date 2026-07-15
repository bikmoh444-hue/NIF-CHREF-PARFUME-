"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/cart-store";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const nav = [
  ["Accueil", "/"],
  ["À propos", "/heritage"],
  ["Collection", "/#collection"],
  ["Homme", "/homme"],
  ["Femme", "/femme"],
  ["Contact", "/#contact"]
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const count = useCartStore((state) => state.count());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center px-4 py-2.5 lg:grid-cols-[1fr_auto_1fr] lg:px-6">
        <Link href="/" className="font-serif text-lg font-semibold leading-none tracking-[0.2em] text-ink">
          NIF<br />CHRIF
        </Link>

        <nav className="hidden items-center gap-6 text-xs uppercase tracking-[0.12em] text-body lg:flex">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="hover:text-gold">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center justify-end gap-3 lg:flex">
          <Link href="/panier" className="relative border border-line p-1.5" aria-label="Panier">
            <ShoppingBag className="h-4 w-4" />
            {mounted && count > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center bg-gold text-xs text-white">
                {count}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
        </div>

        <button className="border border-line p-2 lg:hidden" onClick={() => setOpen((value) => !value)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white px-4 pb-4 lg:hidden">
          <nav className="flex flex-col gap-3 py-4 text-sm uppercase tracking-[0.13em]">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/panier" className="border border-line px-3 py-2">
              Panier ({mounted ? count : 0})
            </Link>
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
