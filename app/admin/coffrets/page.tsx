import GiftSetsManager from "@/components/admin/GiftSetsManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { demoGiftSets } from "@/lib/demo-data";
import type { GiftSet } from "@/types";

export default async function AdminGiftSetsPage() {
  if (!hasSupabaseEnv()) return <AdminGiftSetsShell sets={demoGiftSets} />;
  const { data } = await createClient().from("gift_sets").select("*").order("created_at", { ascending: false });
  return <AdminGiftSetsShell sets={((data?.length ? data : demoGiftSets) ?? []) as GiftSet[]} />;
}

function AdminGiftSetsShell({ sets }: { sets: GiftSet[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Signature Sets</p>
      <h1 className="mt-2 font-serif text-5xl">Coffrets</h1>
      <GiftSetsManager initialSets={sets} />
    </main>
  );
}
