import KeyValueManager from "@/components/admin/KeyValueManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { demoTranslations } from "@/lib/demo-data";
import type { Translation } from "@/types";

export default async function AdminTranslationsPage() {
  if (!hasSupabaseEnv()) return <AdminTranslationsShell rows={demoTranslations} />;
  const { data } = await createClient().from("translations").select("*").order("key");
  return <AdminTranslationsShell rows={((data?.length ? data : demoTranslations) ?? []) as Translation[]} />;
}

function AdminTranslationsShell({ rows }: { rows: Translation[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Langues</p>
      <h1 className="mt-2 font-serif text-5xl">Traductions</h1>
      <KeyValueManager table="translations" rows={rows} />
    </main>
  );
}
