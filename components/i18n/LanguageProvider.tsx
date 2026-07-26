"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";
import {
  DEFAULT_LANG,
  LANG_STORAGE_KEY,
  isLang,
  tx,
  type Lang,
  type Loc,
} from "@/lib/i18n";

/**
 * Språkvalet ligger i localStorage och delas mellan sidorna. Det läses som en
 * extern källa, så servern alltid renderar svenska och ett sparat val slår
 * igenom direkt efter hydrering — och följer med till andra öppna flikar.
 */
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    // localStorage kan vara blockerad — svenska gäller då.
    return DEFAULT_LANG;
  }
}

function writeStoredLang(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Ignorera; språkvalet gäller ändå för den här sessionen.
  }
  notify();
}

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Plockar rätt språk ur ett Loc-värde. */
  t: (value: Loc | string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, () => DEFAULT_LANG);

  // Påverkar skärmläsare och radbrytning.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => writeStoredLang(next), []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, t: (v) => tx(v, lang) }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage måste användas inuti en LanguageProvider");
  }
  return ctx;
}
