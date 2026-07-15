import MessagesManager from "@/components/admin/MessagesManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

export default async function AdminMessagesPage() {
  if (!hasSupabaseEnv()) return <AdminMessagesShell messages={[]} />;
  const { data } = await createClient().from("contact_messages").select("*").order("created_at", { ascending: false });
  return <AdminMessagesShell messages={(data ?? []) as never[]} />;
}

function AdminMessagesShell({ messages }: { messages: never[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Contact</p>
      <h1 className="mt-2 font-serif text-5xl">Messages</h1>
      <MessagesManager initialMessages={messages} />
    </main>
  );
}
