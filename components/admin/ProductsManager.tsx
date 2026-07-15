"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

const MEN_ID = "00000000-0000-0000-0000-000000000101";
const WOMEN_ID = "00000000-0000-0000-0000-000000000102";
const empty = { slug: "", name_fr: "", name_ar: "", description_fr: "", description_ar: "", price: 350, image_url: "", category_id: MEN_ID, is_bestseller: false, is_active: true, stock: 100 };

export default function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [message, setMessage] = useState("");

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      slug: String(form.get("slug")),
      name_fr: String(form.get("name_fr")),
      name_ar: String(form.get("name_ar")),
      description_fr: String(form.get("description_fr")),
      description_ar: String(form.get("description_ar")),
      price: Number(form.get("price")),
      image_url: String(form.get("image_url")),
      category_id: String(form.get("category_id")),
      is_bestseller: form.get("is_bestseller") === "on",
      is_active: form.get("is_active") === "on",
      stock: Number(form.get("stock"))
    };
    const supabase = createClient();
    const query = editing ? supabase.from("products").update(payload).eq("id", editing.id).select().single() : supabase.from("products").insert(payload).select().single();
    const { data, error } = await query;
    if (error) return setMessage(error.message);
    setProducts((current) => editing ? current.map((p) => p.id === editing.id ? data as Product : p) : [data as Product, ...current]);
    setEditing(null);
    event.currentTarget.reset();
    setMessage("Produit enregistré.");
  }

  async function remove(product: Product) {
    await createClient().from("products").delete().eq("id", product.id);
    setProducts((current) => current.filter((item) => item.id !== product.id));
  }

  const values = editing ?? (empty as Product);
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={save} className="grid h-max gap-3 bg-white p-5 shadow-soft">
        <h2 className="font-serif text-3xl">{editing ? "Modifier" : "Ajouter"} un produit</h2>
        <input name="slug" defaultValue={values.slug} required placeholder="slug" className="border border-line px-3 py-2" />
        <input name="name_fr" defaultValue={values.name_fr} required placeholder="Nom FR" className="border border-line px-3 py-2" />
        <input name="name_ar" defaultValue={values.name_ar} required placeholder="Nom AR" className="border border-line px-3 py-2" />
        <textarea name="description_fr" defaultValue={values.description_fr ?? ""} placeholder="Description FR" className="border border-line px-3 py-2" />
        <textarea name="description_ar" defaultValue={values.description_ar ?? ""} placeholder="Description AR" className="border border-line px-3 py-2" />
        <input name="price" type="number" defaultValue={values.price} required className="border border-line px-3 py-2" />
        <input name="stock" type="number" defaultValue={values.stock ?? 100} className="border border-line px-3 py-2" />
        <input name="image_url" defaultValue={values.image_url ?? ""} placeholder="Image URL Supabase Storage" className="border border-line px-3 py-2" />
        <select name="category_id" defaultValue={values.category_id ?? MEN_ID} className="border border-line px-3 py-2"><option value={MEN_ID}>Homme</option><option value={WOMEN_ID}>Femme</option></select>
        <label className="flex gap-2 text-sm"><input name="is_bestseller" type="checkbox" defaultChecked={values.is_bestseller} /> Best Seller</label>
        <label className="flex gap-2 text-sm"><input name="is_active" type="checkbox" defaultChecked={values.is_active ?? true} /> Actif</label>
        {message && <p className="text-sm text-gold">{message}</p>}
        <button className="bg-ink px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">Enregistrer</button>
      </form>
      <div className="overflow-x-auto bg-white p-5 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-line"><th className="py-3">Produit</th><th>Prix</th><th>Stock</th><th>Actif</th><th></th></tr></thead>
          <tbody>{products.map((product) => <tr key={product.id} className="border-b border-line"><td className="py-3">{product.name_fr}</td><td>{product.price} MAD</td><td>{product.stock}</td><td>{product.is_active ? "Oui" : "Non"}</td><td className="flex gap-2 py-2"><button onClick={() => setEditing(product)} className="border border-line px-3 py-2">Éditer</button><button onClick={() => remove(product)} className="border border-red-200 px-3 py-2 text-red-700">Supprimer</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
