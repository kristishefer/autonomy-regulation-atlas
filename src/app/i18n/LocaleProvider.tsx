"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "@/app/i18n/locale";

const LocaleContext = createContext<Locale | null>(null);

export function LocaleProvider({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const locale = useContext(LocaleContext);

  if (!locale) {
    throw new Error("useLocale must be used within LocaleProvider");
  }

  return locale;
}
