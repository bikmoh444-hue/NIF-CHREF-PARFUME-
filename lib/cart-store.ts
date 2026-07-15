"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/types";

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((entry) => entry.id === item.id);
          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry
              )
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        }),
      setQuantity: (id, quantity) =>
        set((state) => ({
          items: quantity <= 0 ? state.items.filter((item) => item.id !== id) : state.items.map((item) => (item.id === id ? { ...item, quantity } : item))
        })),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }),
    { name: "nif-chrif-cart" }
  )
);
