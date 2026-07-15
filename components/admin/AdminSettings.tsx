"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminSettings() {
  const [message, setMessage] = useState("Supabase ne permet pas de créer un utilisateur Auth avec la clé anon depuis le navigateur. Utilisez Supabase Dashboard pour les admins, ou ajoutez une route serveur avec service role.");
  async function updatePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await createClient().auth.updateUser({ password: String(form.get("password")) });
    setMessage(error ? error.message : "Mot de passe mis à jour.");
  }
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      <form onSubmit={updatePassword} className="grid h-max gap-3 bg-white p-5 shadow-soft">
        <h2 className="font-serif text-3xl">Changer mon mot de passe</h2>
        <input name="password" type="password" minLength={8} required placeholder="Nouveau mot de passe" className="border border-line px-3 py-2" />
        <button className="bg-ink px-4 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">Mettre à jour</button>
      </form>
      <div className="bg-white p-5 shadow-soft"><h2 className="font-serif text-3xl">Comptes admin</h2><p className="mt-4 leading-7 text-muted">{message}</p></div>
    </div>
  );
}
