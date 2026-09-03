"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import { getCommonUiCopy } from "@/app/i18n/global-ui-copy";
import { LanguageSwitcher } from "@/app/i18n/LanguageSwitcher";
import { useLocale } from "@/app/i18n/LocaleProvider";

const exploreLinks = [
  { href: "/#map", key: "jurisdictions" },
  { href: "/explore/compare", key: "compare" },
  { href: "/explore/system-map", key: "systemMap" },
] as const;

function isJurisdictionPath(pathname: string) {
  return (
    /^\/[^/]+$/.test(pathname) &&
    !["/deploy", "/learn", "/terms"].includes(pathname)
  );
}

export function GlobalNavigation() {
  const locale = useLocale();
  const common = getCommonUiCopy(locale);
  const pathname = usePathname();
  const exploreMenuId = useId();
  const mobileMenuId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const exploreButtonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);
  const exploreLinkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const exploreActive =
    pathname.startsWith("/explore/") || isJurisdictionPath(pathname);
  const learnActive = pathname === "/learn" || pathname.startsWith("/learn/");
  const anyMenuOpen = exploreOpen || mobileOpen;

  useEffect(() => {
    if (!anyMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setExploreOpen(false);
        setMobileOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      event.preventDefault();
      if (mobileOpen) {
        setMobileOpen(false);
        mobileButtonRef.current?.focus();
        return;
      }

      setExploreOpen(false);
      exploreButtonRef.current?.focus();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [anyMenuOpen, exploreOpen, mobileOpen]);

  function closeMenus() {
    setExploreOpen(false);
    setMobileOpen(false);
  }

  function focusExploreLink(index: number) {
    requestAnimationFrame(() => exploreLinkRefs.current[index]?.focus());
  }

  function handleExploreButtonKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    setMobileOpen(false);
    setExploreOpen(true);
    focusExploreLink(event.key === "ArrowDown" ? 0 : exploreLinks.length - 1);
  }

  function handleExploreMenuKeyDown(
    event: ReactKeyboardEvent<HTMLElement>,
  ) {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();
    const links = exploreLinkRefs.current.filter(
      (link): link is HTMLAnchorElement => Boolean(link),
    );
    const currentIndex = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === "Home") {
      links[0]?.focus();
      return;
    }
    if (event.key === "End") {
      links.at(-1)?.focus();
      return;
    }

    const direction = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex =
      currentIndex < 0
        ? direction > 0
          ? 0
          : links.length - 1
        : (currentIndex + direction + links.length) % links.length;
    links[nextIndex]?.focus();
  }

  const desktopLinkClass =
    "rounded-sm outline-none transition hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4";
  const menuLinkClass =
    "rounded-lg px-3 py-2.5 text-sm font-semibold text-[#10264a]/68 outline-none transition hover:bg-[#f2eadc] hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-inset";

  return (
    <header className="sticky top-0 z-[70] border-b border-[#10264a]/10 bg-[#fbf7ef]/94 text-[#10264a] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
        <Link
          className="flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
          href={`/?lang=${locale}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#10264a]/20 font-serif text-base font-semibold">
            A
          </span>
          <span className="hidden text-xs font-semibold uppercase tracking-[0.08em] sm:inline lg:text-sm">
            Autonomy Regulation Atlas
          </span>
        </Link>

        <div className="relative flex items-center" ref={containerRef}>
          <nav
            aria-label={common.primaryNavigation}
            className="hidden items-center gap-6 text-sm font-semibold text-[#10264a]/55 lg:flex"
          >
            <div className="relative">
              <button
                aria-controls={exploreMenuId}
                aria-expanded={exploreOpen}
                aria-haspopup="true"
                className={`${desktopLinkClass} flex items-center gap-1.5 ${
                  exploreActive || exploreOpen ? "text-[#147c73]" : ""
                }`}
                onClick={() => {
                  setMobileOpen(false);
                  setExploreOpen((open) => !open);
                }}
                onKeyDown={handleExploreButtonKeyDown}
                ref={exploreButtonRef}
                type="button"
              >
                {common.explorer}
                <span aria-hidden="true" className="text-[10px]">
                  ▾
                </span>
              </button>

              {exploreOpen ? (
                <div
                  aria-label={common.explorer}
                  className="absolute left-0 top-[calc(100%+0.75rem)] grid min-w-52 gap-1 rounded-2xl border border-[#10264a]/10 bg-white p-2 shadow-[0_16px_40px_rgba(16,38,74,.16)]"
                  id={exploreMenuId}
                  onKeyDown={handleExploreMenuKeyDown}
                  role="group"
                >
                  {exploreLinks.map((item, index) => (
                    <Link
                      aria-current={
                        pathname === item.href ? "page" : undefined
                      }
                      className={`${menuLinkClass} ${
                        pathname === item.href ? "bg-[#e7f1ed] text-[#147c73]" : ""
                      }`}
                      href={item.href}
                      key={item.key}
                      onClick={closeMenus}
                      ref={(node) => {
                        exploreLinkRefs.current[index] = node;
                      }}
                    >
                      {common[item.key]}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            <Link
              aria-current={learnActive ? "page" : undefined}
              className={`${desktopLinkClass} ${
                learnActive ? "text-[#147c73]" : ""
              }`}
              href="/learn"
            >
              {common.learning}
            </Link>
            <Link className={desktopLinkClass} href="/#method">
              {common.methodology}
            </Link>
          </nav>

          <button
            aria-controls={mobileMenuId}
            aria-expanded={mobileOpen}
            aria-haspopup="true"
            className="flex h-9 items-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 text-xs font-semibold shadow-sm outline-none transition hover:border-[#10264a]/30 focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 lg:hidden"
            onClick={() => {
              setExploreOpen(false);
              setMobileOpen((open) => !open);
            }}
            ref={mobileButtonRef}
            type="button"
          >
            <span aria-hidden="true" className="text-base leading-none">
              ☰
            </span>
            {common.menu}
          </button>

          <div
            className={`${
              mobileOpen
                ? "absolute right-0 top-[calc(100%+0.75rem)] block w-[min(20rem,calc(100vw-2.5rem))]"
                : "hidden"
            } max-h-[calc(100vh-5.5rem)] overflow-y-auto rounded-2xl border border-[#10264a]/10 bg-white p-3 shadow-[0_16px_40px_rgba(16,38,74,.16)] lg:static lg:ml-6 lg:block lg:w-auto lg:overflow-visible lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
            id={mobileMenuId}
          >
            <nav
              aria-label={common.primaryNavigation}
              className="grid gap-1 lg:hidden"
            >
              <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#147c73]">
                {common.explorer}
              </p>
              <div className="mb-2 ml-3 grid gap-1 border-l border-[#147c73]/25 pl-2">
                {exploreLinks.map((item) => (
                  <Link
                    aria-current={
                      pathname === item.href ? "page" : undefined
                    }
                    className={`${menuLinkClass} ${
                      pathname === item.href ? "bg-[#e7f1ed] text-[#147c73]" : ""
                    }`}
                    href={item.href}
                    key={item.key}
                    onClick={closeMenus}
                  >
                    {common[item.key]}
                  </Link>
                ))}
              </div>
              <Link
                aria-current={learnActive ? "page" : undefined}
                className={`${menuLinkClass} ${
                  learnActive ? "bg-[#e7f1ed] text-[#147c73]" : ""
                }`}
                href="/learn"
                onClick={closeMenus}
              >
                {common.learning}
              </Link>
              <Link
                className={menuLinkClass}
                href="/#method"
                onClick={closeMenus}
              >
                {common.methodology}
              </Link>
            </nav>

            <div className="mt-3 flex items-center justify-between gap-5 border-t border-[#10264a]/10 px-3 pt-3 lg:mt-0 lg:block lg:border-0 lg:px-0 lg:pt-0">
              <span className="text-xs font-semibold text-[#10264a]/55 lg:hidden">
                {common.language}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
