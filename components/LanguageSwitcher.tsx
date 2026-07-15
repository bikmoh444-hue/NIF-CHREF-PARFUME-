"use client";

import { useLang } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex border border-line text-[11px] font-semibold uppercase tracking-[0.12em]">
      <button
        type="button"
        className={`px-2.5 py-2 ${lang === "fr" ? "bg-ink text-white" : "text-ink hover:bg-cream"}`}
        onClick={() => setLang("fr")}
      >
        FR
      </button>
      <button
        type="button"
        className={`px-2.5 py-2 ${lang === "ar" ? "bg-ink text-white" : "text-ink hover:bg-cream"}`}
        onClick={() => setLang("ar")}
      >
        AR
      </button>
    </div>
  );
}
