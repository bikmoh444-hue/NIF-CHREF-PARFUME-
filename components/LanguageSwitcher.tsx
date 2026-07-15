"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center border border-line text-xs">
      <Languages className="mx-1.5 h-3.5 w-3.5 text-gold" />
      <button className={`px-1.5 py-1.5 ${lang === "fr" ? "bg-ink text-white" : ""}`} onClick={() => setLang("fr")}>FR</button>
      <button className={`px-1.5 py-1.5 ${lang === "ar" ? "bg-ink text-white" : ""}`} onClick={() => setLang("ar")}>AR</button>
    </div>
  );
}
