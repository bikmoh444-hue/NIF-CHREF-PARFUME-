import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { demoCategories, demoContent, demoGiftSets, demoProducts, demoTranslations } from "@/lib/demo-data";
import type { GiftSet, Order, Product, SiteContent, Translation } from "@/types";

export function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function warn(label: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") console.warn(`[nif-chrif] ${label}`, error);
}

export async function getProducts(categorySlug?: string) {
  noStore();
  if (!hasSupabaseEnv()) {
    return demoProducts.filter((product) => !categorySlug || demoCategories.find((category) => category.id === product.category_id)?.slug === categorySlug);
  }
  const supabase = createClient();
  let query = supabase.from("products").select("*, category:categories(*)").eq("is_active", true).order("created_at", { ascending: false });
  if (categorySlug) query = query.eq("categories.slug", categorySlug);
  const { data, error } = await query;
  if (error || !data?.length) {
    if (error) warn("products fallback", error.message);
    return demoProducts.filter((product) => !categorySlug || demoCategories.find((category) => category.id === product.category_id)?.slug === categorySlug);
  }
  return data as Product[];
}

export async function getProduct(slug: string) {
  noStore();
  if (!hasSupabaseEnv()) return demoProducts.find((product) => product.slug === slug) ?? null;
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*, category:categories(*)").eq("slug", slug).single();
  if (error || !data) return demoProducts.find((product) => product.slug === slug) ?? null;
  return data as Product;
}

export async function getGiftSets() {
  noStore();
  if (!hasSupabaseEnv()) return demoGiftSets;
  const supabase = createClient();
  const { data, error } = await supabase.from("gift_sets").select("*").eq("is_active", true).order("created_at", { ascending: false });
  if (error || !data?.length) return demoGiftSets;
  return data as GiftSet[];
}

export async function getSiteContent() {
  noStore();
  if (!hasSupabaseEnv()) return demoContent;
  const supabase = createClient();
  const { data, error } = await supabase.from("site_content").select("*");
  if (error || !data?.length) return demoContent;
  return data as SiteContent[];
}

export async function getTranslations() {
  noStore();
  if (!hasSupabaseEnv()) return demoTranslations;
  const supabase = createClient();
  const { data, error } = await supabase.from("translations").select("*").order("key");
  if (error || !data?.length) return demoTranslations;
  return data as Translation[];
}

export async function getAdminStats() {
  noStore();
  if (!hasSupabaseEnv()) return { orders: [], revenue: 0, pending: 0, lowStock: 0 };
  const supabase = createClient();
  const [{ data: orders }, { data: products }] = await Promise.all([
    supabase.from("orders").select("*").order("created_at", { ascending: false }),
    supabase.from("products").select("*")
  ]);
  const typedOrders = (orders ?? []) as Order[];
  const typedProducts = (products ?? []) as Product[];
  return {
    orders: typedOrders,
    revenue: typedOrders.reduce((sum, order) => sum + Number(order.total), 0),
    pending: typedOrders.filter((order) => order.status === "en_attente").length,
    lowStock: typedProducts.filter((product) => Number(product.stock ?? 0) <= 5).length
  };
}

export function contentValue(content: SiteContent[], key: string, fallback = "") {
  const entry = content.find((item) => item.key === key);
  return entry?.value_raw ?? entry?.value_fr ?? fallback;
}
