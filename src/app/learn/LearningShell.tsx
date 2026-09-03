import Link from "next/link";
import type { ReactNode } from "react";
import { getCommonUiCopy, getLearningUiCopy } from "@/app/i18n/global-ui-copy";
import { LanguageNotice } from "@/app/i18n/LanguageNotice";
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
      <LanguageNotice locale={locale} />

      <div className="border-b border-[#10264a]/10 bg-[#f3ecdf]/55">
        <nav
          aria-label={learning.learningNavigation}
          className="mx-auto flex max-w-7xl items-center gap-5 px-5 py-3 text-xs font-semibold sm:px-8 sm:text-sm lg:px-10"
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
        </nav>
      </div>

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
