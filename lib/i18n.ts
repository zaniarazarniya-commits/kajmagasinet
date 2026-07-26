/**
 * Språkstöd SV/EN.
 *
 * All text ligger i data som `{ sv, en }`-par — inte som DOM-attribut. Samma
 * modell används av menydatan, sidinnehållet och drinklistan, så det finns
 * bara ett sätt att uttrycka översatt text i kodbasen.
 */

export const LANGS = ["sv", "en"] as const;

export type Lang = (typeof LANGS)[number];

/** Ett översatt textvärde. */
export type Loc = { sv: string; en: string };

/** Nyckeln språkvalet sparas under i localStorage. Delas av båda sidorna. */
export const LANG_STORAGE_KEY = "kaj-lang";

export const DEFAULT_LANG: Lang = "sv";

export function isLang(value: unknown): value is Lang {
  return value === "sv" || value === "en";
}

/** Plockar rätt språk ur ett Loc-värde. Rena strängar passerar oförändrade. */
export function tx(value: Loc | string, lang: Lang): string {
  return typeof value === "string" ? value : value[lang];
}
