"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";

type Props = {
  item: {
    id: string;
    slug: string;
    name: string;
    price: number;
    image_url?: string | null;
    kind: "product" | "gift_set";
  };
  quantity?: number;
  label?: string;
  className?: string;
};

export default function AddToCartButton({ item, quantity = 1, label = "Ajouter au panier", className = "" }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <button onClick={() => addItem(item, quantity)} className={`inline-flex items-center justify-center gap-1.5 border border-ink bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white hover:border-gold hover:bg-gold ${className}`}>
      <ShoppingBag className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
