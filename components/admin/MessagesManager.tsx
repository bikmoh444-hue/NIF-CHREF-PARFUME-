"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Message = { id: string; name: string; email: string; message: string; is_read: boolean; created_at: string };

export default function MessagesManager({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  async function toggle(id: string, read: boolean) {
    setMessages((current) => current.map((m) => m.id === id ? { ...m, is_read: read } : m));
    await createClient().from("contact_messages").update({ is_read: read }).eq("id", id);
  }
  return (
    <div className="mt-8 grid gap-4">
      {messages.map((message) => <article key={message.id} className="bg-white p-5 shadow-soft">
        <div className="flex flex-col justify-between gap-3 md:flex-row">
          <div><h2 className="font-serif text-2xl">{message.name}</h2><p className="text-sm text-muted">{message.email} · {message.created_at?.slice(0, 10)}</p></div>
          <button onClick={() => toggle(message.id, !message.is_read)} className="border border-line px-3 py-2 text-sm">{message.is_read ? "Marquer non lu" : "Marquer lu"}</button>
        </div>
        <p className="mt-4 leading-7 text-muted">{message.message}</p>
      </article>)}
    </div>
  );
}
