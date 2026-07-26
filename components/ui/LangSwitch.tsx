"use client";

import { useLanguage } from "@/components/i18n/LanguageProvider";
import { LANGS } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const LABELS: Record<(typeof LANGS)[number], { short: string; full: string }> = {
  sv: { short: "SV", full: "Svenska" },
  en: { short: "EN", full: "English" },
};

/**
 * SV/EN-växlare. Lysekil är turistort med gästhamn — växlaren finns på båda
 * sidorna och valet följer med via localStorage.
 */
export function LangSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="langsw" role="group" aria-label="Language / Språk">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          className={cn(lang === code && "on")}
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
        >
          <span aria-hidden="true">{LABELS[code].short}</span>
          <span className="sr-only">{LABELS[code].full}</span>
        </button>
      ))}
    </div>
  );
}
