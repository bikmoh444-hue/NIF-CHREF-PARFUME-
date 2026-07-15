import KeyValueManager from "@/components/admin/KeyValueManager";
import { hasSupabaseEnv } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";
import { demoContent } from "@/lib/demo-data";
import type { SiteContent } from "@/types";

export default async function AdminContentPage() {
  if (!hasSupabaseEnv()) return <AdminContentShell rows={demoContent} />;
  const { data } = await createClient().from("site_content").select("*").order("key");
  return <AdminContentShell rows={((data?.length ? data : demoContent) ?? []) as SiteContent[]} />;
}

function AdminContentShell({ rows }: { rows: SiteContent[] }) {
  return (
    <main className="p-5 lg:p-8">
      <p className="luxury-label">Site</p>
      <h1 className="mt-2 font-serif text-5xl">Contenu</h1>
      <KeyValueManager table="site_content" rows={rows} />
    </main>
  );
}
