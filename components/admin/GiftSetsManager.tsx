"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GiftSet } from "@/types";

export default function GiftSetsManager({ initialSets }: { initialSets: GiftSet[] }) {
  const [sets, setSets] = useState(initialSets);
  const [editing, setEditing] = useState<GiftSet | null>(null);
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
      included_products: String(form.get("included_products")).split(",").map((x) => x.trim()).filter(Boolean),
      is_active: form.get("is_active") === "on"
    };
    const q = editing ? createClient().from("gift_sets").update(payload).eq("id", editing.id).select().single() : createClient().from("gift_sets").insert(payload).select().single();
    const { data } = await q;
    if (data) setSets((current) => editing ? current.map((s) => s.id === editing.id ? data as GiftSet : s) : [data as GiftSet, ...current]);
    setEditing(null);
  }
  async function remove(id: string) {
    await createClient().from("gift_sets").delete().eq("id", id);
    setSets((current) => current.filter((set) => set.id !== id));
  }
  const v = editing ?? { slug: "", name_fr: "", name_ar: "", description_fr: "", description_ar: "", price: 700, image_url: "", included_products: [], is_active: true };
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={save} className="grid h-max gap-3 bg-white p-5 shadow-soft">
        <h2 className="font-serif text-3xl">Coffret</h2>
        <input name="slug" defaultValue={v.slug} required placeholder="slug" className="border border-line px-3 py-2" />
        <input name="name_fr" defaultValue={v.name_fr} required placeholder="Nom FR" className="border border-line px-3 py-2" />
        <input name="name_ar" defaultValue={v.name_ar} required placeholder="Nom AR" className="border border-line px-3 py-2" />
        <textarea name="description_fr" defaultValue={v.description_fr ?? ""} placeholder="Description FR" className="border border-line px-3 py-2" />
        <textarea name="description_ar" defaultValue={v.description_ar ?? ""} placeholder="Description AR" className="border border-line px-3 py-2" />
        <input name="price" type="number" defaultValue={v.price} className="border border-line px-3 py-2" />
        <input name="image_url" defaultValue={v.image_url ?? ""} placeholder="URL de l'image" className="border border-line px-3 py-2" />
        <input name="included_products" defaultValue={(v.included_products ?? []).join(", ")} placeholder="Produits inclus, séparés par virgules" className="border border-line px-3 py-2" />
        <label className="flex gap-2 text-sm"><input name="is_active" type="checkbox" defaultChecked={v.is_active ?? true} /> Actif</label>
        <button className="bg-ink px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">Enregistrer</button>
      </form>
      <div className="overflow-x-auto bg-white p-5 shadow-soft">
        {sets.map((set) => <div key={set.id} className="flex items-center justify-between border-b border-line py-4"><div><h3 className="font-serif text-2xl">{set.name_fr}</h3><p className="text-sm text-muted">{set.price} MAD</p></div><div className="flex gap-2"><button onClick={() => setEditing(set)} className="border border-line px-3 py-2">Éditer</button><button onClick={() => remove(set.id)} className="border border-red-200 px-3 py-2 text-red-700">Supprimer</button></div></div>)}
      </div>
    </div>
  );
}
