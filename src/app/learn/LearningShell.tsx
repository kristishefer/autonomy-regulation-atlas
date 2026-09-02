import Link from "next/link";
import type { ReactNode } from "react";

export function LearningShell({ children }: { children: ReactNode }) {
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

          <nav
            aria-label="Learning navigation"
            className="flex items-center gap-4 text-xs font-semibold sm:gap-6 sm:text-sm"
          >
            <Link
              className="rounded-sm text-[#147c73] outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
              href="/learn"
            >
              Learning
            </Link>
            <Link
              className="rounded-sm text-[#10264a]/58 outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
              href="/learn/glossary"
            >
              Glossary
            </Link>
            <Link
              className="hidden rounded-sm text-[#10264a]/58 outline-none hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4 sm:inline"
              href="/explore/system-map"
            >
              System Map
            </Link>
          </nav>
        </div>
      </header>

      {children}

      <footer className="border-t border-[#10264a]/10 bg-[#f3ecdf]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs leading-5 text-[#10264a]/55 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <p>
            Learning explains the evidence architecture. It does not replace
            jurisdiction-specific legal analysis.
          </p>
          <div className="flex gap-5 font-semibold text-[#147c73]">
            <Link href="/explore/compare">Compare jurisdictions</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
