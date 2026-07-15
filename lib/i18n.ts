"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/types";

export const defaultTranslations = {
  nav_collection: { fr: "La Collection", ar: "المجموعة" },
  nav_men: { fr: "Homme", ar: "رجال" },
  nav_women: { fr: "Femme", ar: "نساء" },
  nav_heritage: { fr: "L'Héritage", ar: "الإرث" },
  nav_sets: { fr: "Coffrets Signature", ar: "أطقم التوقيع" },
  search: { fr: "Rechercher...", ar: "بحث..." },
  add_to_bag: { fr: "Ajouter au panier", ar: "أضف إلى السلة" },
  checkout: { fr: "Passer la commande", ar: "إتمام الطلب" }
};

export function useLang() {
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const saved = (localStorage.getItem("nif-chrif-lang") as Lang | null) ?? "fr";
    setLangState(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
  }, []);

  function setLang(next: Lang) {
    localStorage.setItem("nif-chrif-lang", next);
    setLangState(next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  }

  return { lang, setLang };
}

export function pickLang<T extends { name_fr?: string; name_ar?: string; description_fr?: string | null; description_ar?: string | null }>(
  item: T,
  field: "name" | "description",
  lang: Lang
) {
  const key = `${field}_${lang}` as keyof T;
  const fallback = `${field}_fr` as keyof T;
  return String(item[key] ?? item[fallback] ?? "");
}
