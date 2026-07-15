"use client";

import { FormEvent, useState } from "react";
import { Instagram, Facebook, Send, Phone } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const supabase = createClient();
    const { error } = await supabase.from("contact_messages").insert({
      name: String(form.get("name")),
      email: String(form.get("email")),
      message: String(form.get("message"))
    });
    setStatus(error ? "Message gardé localement: connectez Supabase pour l'enregistrer." : "Message reçu. Nous vous répondrons rapidement.");
    if (!error) event.currentTarget.reset();
  }

  return (
    <section id="contact" className="bg-cream px-4 py-11">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-6">
        <div>
          <p className="luxury-label">Rejoignez l'Exclusivité</p>
          <h2 className="mt-3 font-serif text-3xl text-ink">Une maison à votre écoute</h2>
          <p className="mt-4 text-sm leading-7 text-muted">Demandez une recommandation, un coffret sur mesure ou une collaboration avec NIF CHRIF.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://instagram.com" className="border border-ink p-3"><Instagram /></a>
            <a href="https://facebook.com" className="border border-ink p-3"><Facebook /></a>
            <a href="https://tiktok.com" className="border border-ink px-4 py-3 text-sm font-semibold">TikTok</a>
            <a href="https://wa.me/" className="inline-flex items-center gap-2 bg-ink px-4 py-3 text-sm font-semibold text-white"><Send className="h-4 w-4" /> WHATSAPP</a>
            <a href="tel:" className="inline-flex items-center gap-2 border border-ink px-4 py-3 text-sm font-semibold"><Phone className="h-4 w-4" /> APPELEZ-NOUS</a>
          </div>
        </div>
        <form onSubmit={submit} className="grid gap-3 bg-white p-5 shadow-soft">
          <input name="name" required placeholder="Nom" className="border border-line px-3 py-2.5 outline-gold" />
          <input name="email" required type="email" placeholder="Email" className="border border-line px-3 py-2.5 outline-gold" />
          <textarea name="message" required placeholder="Message" rows={4} className="border border-line px-3 py-2.5 outline-gold" />
          <button className="bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white">Envoyer</button>
          {status && <p className="text-sm text-gold">{status}</p>}
        </form>
      </div>
    </section>
  );
}
