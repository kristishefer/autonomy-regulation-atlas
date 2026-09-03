"use client";

import {
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
} from "react";
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
    <button
      aria-label={`${common.interfaceLanguage}: ${getNativeLocaleName(locale)}`}
      className="flex h-9 min-w-[64px] items-center justify-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 text-xs font-semibold tracking-[0.08em] shadow-sm"
      disabled
      type="button"
    >
      <strong>{localeLabels[locale]}</strong>
      <span aria-hidden="true" className="text-[#10264a]/40">
        ▾
      </span>
    </button>
  );
}

function LanguageSwitcherMenu({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const common = getCommonUiCopy(locale);
  const menuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  function localeHref(nextLocale: Locale) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLocale);
    return `${pathname}?${params.toString()}`;
  }

  function selectLocale(
    event: MouseEvent<HTMLAnchorElement>,
    nextLocale: Locale,
  ) {
    setIsOpen(false);

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    window.location.assign(localeHref(nextLocale));
  }

  return (
    <div className="relative shrink-0" ref={containerRef}>
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label={`${common.interfaceLanguage}: ${getNativeLocaleName(locale)}`}
        className="flex h-9 min-w-[64px] items-center justify-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 text-xs font-semibold tracking-[0.08em] shadow-sm transition hover:border-[#10264a]/30 focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2"
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <strong>{localeLabels[locale]}</strong>
        <span className="text-[#10264a]/35" aria-hidden="true">
          ▾
        </span>
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 top-[calc(100%+0.5rem)] z-[80] grid min-w-[150px] overflow-hidden rounded-xl border border-[#10264a]/10 bg-white p-1 shadow-[0_14px_36px_rgba(16,38,74,.16)]"
          id={menuId}
        >
          {locales.map((item) => (
            <a
              aria-current={item === locale ? "page" : undefined}
              className={`flex items-center justify-between gap-4 rounded-lg px-3 py-2 text-sm transition hover:bg-[#f2eadc] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-inset ${
                item === locale
                  ? "font-semibold text-[#147c73]"
                  : "text-[#10264a]/65"
              }`}
              href={localeHref(item)}
              key={item}
              onClick={(event) => selectLocale(event, item)}
            >
              <span>{getNativeLocaleName(item)}</span>
              <span className="text-[10px] font-semibold tracking-[0.1em] text-[#10264a]/40">
                {localeLabels[item]}
              </span>
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
