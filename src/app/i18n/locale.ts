export const locales = ["en", "de", "nl", "ru"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  de: "DE",
  nl: "NL",
  ru: "RU",
};

export const ATLAS_LOCALE_COOKIE = "atlas_locale";
export const ATLAS_LOCALE_HEADER = "x-atlas-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(
  value: string | string[] | null | undefined,
): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return isLocale(candidate) ? candidate : "en";
}
