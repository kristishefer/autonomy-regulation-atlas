import Link from "next/link";
import type { ReactNode } from "react";
import { getCommonUiCopy, getLearningUiCopy } from "@/app/i18n/global-ui-copy";
import { LanguageNotice } from "@/app/i18n/LanguageNotice";
import { LanguageSwitcher } from "@/app/i18n/LanguageSwitcher";
import type { Locale } from "@/app/i18n/locale";

export function LearningShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  const common = getCommonUiCopy(locale);
  const learning = getLearningUiCopy(locale);

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <header className="sticky top-0 z-50 border-b border-[#10264a]/10 bg-[#fbf7ef]/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
          <Link
            className="flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
            href="/"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#10264a]/20 font-serif text-base font-semibold">
              A
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.08em] sm:inline lg:text-sm">
              Autonomy Regulation Atlas
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <nav
              aria-label={learning.learningNavigation}
              className="hidden items-center gap-4 text-xs font-semibold sm:flex sm:gap-6 sm:text-sm"
            >
              <Link
                className="rounded-sm text-[#147c73] outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
                href="/learn"
              >
                {common.learning}
              </Link>
              <Link
                className="rounded-sm text-[#10264a]/58 outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
                href="/learn/glossary"
              >
                {common.glossary}
              </Link>
              <Link
                className="hidden rounded-sm text-[#10264a]/58 outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4 lg:inline"
                href="/explore/system-map"
              >
                {common.systemMap}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <LanguageNotice locale={locale} />

      {children}

      <footer className="border-t border-[#10264a]/10 bg-[#f3ecdf]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs leading-5 text-[#10264a]/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>
            {learning.footer}
          </p>
          <div className="flex gap-5 font-semibold text-[#147c73]">
            <Link href="/explore/compare">{common.compareJurisdictions}</Link>
            <Link href="/terms">{common.terms}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
