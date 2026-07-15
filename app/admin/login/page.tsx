"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password"))
    });
    setLoading(false);
    if (authError) return setError(authError.message);
    router.push("/admin");
    router.refresh();
  }
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-white p-8 shadow-soft">
        <p className="luxury-label">Administration</p>
        <h1 className="mt-3 font-serif text-5xl">Connexion</h1>
        <div className="mt-8 grid gap-4">
          <input name="email" type="email" required placeholder="Email admin" className="border border-line px-4 py-3 outline-gold" />
          <input name="password" type="password" required placeholder="Mot de passe" className="border border-line px-4 py-3 outline-gold" />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button disabled={loading} className="bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">{loading ? "Connexion..." : "Se connecter"}</button>
        </div>
      </form>
    </main>
  );
}
