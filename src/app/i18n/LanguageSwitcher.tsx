"use client";

import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import {
  getCommonUiCopy,
  getNativeLocaleName,
} from "@/app/i18n/global-ui-copy";
import { localeLabels, locales, type Locale } from "@/app/i18n/locale";
import { useLocale } from "@/app/i18n/LocaleProvider";

export function LanguageSwitcher() {
  const locale = useLocale();

  return (
    <Suspense fallback={<LanguageSwitcherSummary locale={locale} />}>
      <LanguageSwitcherMenu locale={locale} />
    </Suspense>
  );
}

function LanguageSwitcherSummary({ locale }: { locale: Locale }) {
  const common = getCommonUiCopy(locale);

  return (
    <div
      aria-label={`${common.interfaceLanguage}: ${getNativeLocaleName(locale)}`}
      className="flex items-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] shadow-sm sm:px-4 sm:py-2.5"
    >
      <span aria-hidden="true" className="text-sm">
        ◎
      </span>
      <span className="hidden sm:inline">{common.language}</span>
      <strong>{localeLabels[locale]}</strong>
    </div>
  );
}

function LanguageSwitcherMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const common = getCommonUiCopy(locale);

  function localeHref(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);
    return `${pathname}?${params.toString()}`;
  }

  return (
    <details className="atlas-language group relative shrink-0">
      <summary
        aria-label={`${common.interfaceLanguage}: ${getNativeLocaleName(locale)}`}
        className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] shadow-sm transition hover:border-[#10264a]/30 sm:px-4 sm:py-2.5"
      >
        <span aria-hidden="true" className="text-sm">
          ◎
        </span>
        <span className="hidden sm:inline">{common.language}</span>
        <strong>{localeLabels[locale]}</strong>
        <span className="text-[#10264a]/35" aria-hidden="true">
          ⌄
        </span>
      </summary>

      <div className="absolute right-0 top-[48px] z-[80] grid min-w-[190px] overflow-hidden rounded-2xl border border-[#10264a]/10 bg-white p-1.5 shadow-[0_18px_45px_rgba(16,38,74,.16)]">
        {locales.map((item) => (
          <a
            aria-current={item === locale ? "page" : undefined}
            className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f2eadc] ${
              item === locale
                ? "font-semibold text-[#147c73]"
                : "text-[#10264a]/65"
            }`}
            href={localeHref(item)}
            key={item}
          >
            <span>{getNativeLocaleName(item)}</span>
            <span className="text-[10px] font-semibold tracking-[0.1em] text-[#10264a]/40">
              {localeLabels[item]}
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}
