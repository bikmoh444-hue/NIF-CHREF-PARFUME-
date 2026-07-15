"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { SiteContent, Translation } from "@/types";

type Row = SiteContent | Translation;

export default function KeyValueManager({ table, rows }: { table: "site_content" | "translations"; rows: Row[] }) {
  const [items, setItems] = useState(rows);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { data } = table === "site_content"
      ? await supabase.from("site_content").upsert({ key: String(form.get("key")), value_fr: String(form.get("value_fr")), value_ar: String(form.get("value_ar")), value_raw: String(form.get("value_raw")) }, { onConflict: "key" }).select().single()
      : await supabase.from("translations").upsert({ key: String(form.get("key")), value_fr: String(form.get("value_fr")), value_ar: String(form.get("value_ar")) }, { onConflict: "key" }).select().single();
    if (data) setItems((current) => [data as Row, ...current.filter((item) => item.key !== data.key)]);
    event.currentTarget.reset();
  }
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[420px_1fr]">
      <form onSubmit={save} className="grid h-max gap-3 bg-white p-5 shadow-soft">
        <h2 className="font-serif text-3xl">Éditeur</h2>
        <input name="key" required placeholder="key" className="border border-line px-3 py-2" />
        <textarea name="value_fr" placeholder="Valeur FR" className="border border-line px-3 py-2" />
        <textarea name="value_ar" placeholder="Valeur AR" className="border border-line px-3 py-2" />
        {table === "site_content" && <input name="value_raw" placeholder="Valeur brute: URL, nombre, image..." className="border border-line px-3 py-2" />}
        <button className="bg-ink px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">Enregistrer</button>
      </form>
      <div className="overflow-x-auto bg-white p-5 shadow-soft">
        <table className="w-full text-left text-sm">
          <thead><tr className="border-b border-line"><th className="py-3">Key</th><th>FR</th><th>AR</th><th>Raw</th></tr></thead>
          <tbody>{items.map((item) => <tr key={item.key} className="border-b border-line align-top"><td className="py-3 font-semibold">{item.key}</td><td>{item.value_fr}</td><td dir="rtl">{item.value_ar}</td><td>{"value_raw" in item ? item.value_raw : ""}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
