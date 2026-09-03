"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import type { StatusTone } from "@/app/explore/regulatory-data";

export type NavigatorJurisdiction = {
  slug: string;
  name: string;
  code: string;
  scope: string;
  primaryMessage: string;
  snapshot: Array<{
    label: string;
    status: string;
    scope?: string;
    tone: StatusTone;
  }>;
};

export type JurisdictionNavigatorCopy = {
  tabsLabel: string;
  scopeLabel: string;
  overviewLabel: string;
  snapshotLabel: string;
  openProfile: string;
  compareJurisdictions: string;
};

const snapshotToneClasses: Record<StatusTone, string> = {
  positive: "text-[#147c73]",
  conditional: "text-[#b97512]",
  neutral: "text-[#10264a]/65",
  watch: "text-[#9a5f08]",
};

export function JurisdictionNavigator({
  jurisdictions,
  copy,
}: {
  jurisdictions: NavigatorJurisdiction[];
  copy: JurisdictionNavigatorCopy;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const hasSelected = useRef(false);
  const selected = jurisdictions[selectedIndex] ?? jurisdictions[0];

  useEffect(() => {
    if (!hasSelected.current) {
      hasSelected.current = true;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) return;

    panel.getAnimations().forEach((animation) => animation.cancel());
    panel.animate(
      [
        { opacity: 0.45, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 300,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );

    panel
      .querySelectorAll<HTMLElement>("[data-navigator-detail]")
      .forEach((detail, index) => {
        detail.getAnimations().forEach((animation) => animation.cancel());
        detail.animate(
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            delay: 45 + index * 45,
            duration: 260,
            easing: "ease-out",
            fill: "both",
          },
        );
      });
  }, [selectedIndex]);

  if (!selected) {
    return null;
  }

  function selectJurisdiction(index: number, focus = false) {
    setSelectedIndex(index);
    if (focus) {
      requestAnimationFrame(() => tabRefs.current[index]?.focus());
    }
  }

  function handleTabKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % jurisdictions.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + jurisdictions.length) % jurisdictions.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = jurisdictions.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    selectJurisdiction(nextIndex, true);
  }

  return (
    <div>
      <div className="relative">
        <div
          aria-label={copy.tabsLabel}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 pr-8 md:grid md:grid-cols-5 md:overflow-visible md:pb-0 md:pr-0"
          role="tablist"
        >
          {jurisdictions.map((jurisdiction, index) => {
            const active = index === selectedIndex;

            return (
              <button
                aria-controls="jurisdiction-panel"
                aria-selected={active}
                className={`min-w-max snap-start rounded-xl border px-4 py-3 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 md:min-w-0 ${
                  active
                    ? "border-[#10264a] bg-[#10264a] text-white shadow-sm"
                    : "border-[#10264a]/12 bg-[#fbf7ef]/75 text-[#10264a]/62 hover:border-[#147c73]/45 hover:bg-white hover:text-[#10264a]"
                }`}
                id={`jurisdiction-tab-${jurisdiction.slug}`}
                key={jurisdiction.slug}
                onClick={() => selectJurisdiction(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                tabIndex={active ? 0 : -1}
                type="button"
              >
                <span
                  className={`block font-mono text-[9px] font-semibold uppercase tracking-[0.16em] ${
                    active ? "text-white/55" : "text-[#147c73]"
                  }`}
                >
                  {jurisdiction.code}
                </span>
                <span className="mt-1 block text-sm font-semibold leading-5">
                  {jurisdiction.name}
                </span>
              </button>
            );
          })}
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 right-0 top-0 w-8 bg-gradient-to-l from-[#edf0e7] to-transparent md:hidden"
        />
      </div>

      <div
        aria-labelledby={`jurisdiction-tab-${selected.slug}`}
        className="mt-5 rounded-[28px] border border-[#10264a]/12 bg-[#fbf7ef] p-6 shadow-[0_18px_55px_rgba(16,38,74,0.06)] sm:p-8"
        id="jurisdiction-panel"
        ref={panelRef}
        role="tabpanel"
      >
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12">
          <div data-navigator-detail>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                {selected.code}
              </span>
              <h3 className="font-serif text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                {selected.name}
              </h3>
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/42">
              {copy.scopeLabel}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#10264a]/68">
              {selected.scope}
            </p>
          </div>

          <div data-navigator-detail>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/42">
              {copy.overviewLabel}
            </p>
            <p className="mt-3 max-w-3xl font-serif text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
              {selected.primaryMessage}
            </p>
          </div>
        </div>

        <div
          className="mt-8 border-t border-[#10264a]/12 pt-6"
          data-navigator-detail
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/42">
            {copy.snapshotLabel}
          </p>
          <dl className="mt-4 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {selected.snapshot.map((item) => (
              <div className="border-t border-[#10264a]/10 pt-4" key={item.label}>
                <dt className="text-xs font-semibold text-[#10264a]/52">
                  {item.label}
                </dt>
                <dd className={`mt-1.5 text-sm font-semibold ${snapshotToneClasses[item.tone]}`}>
                  {item.status}
                </dd>
                {item.scope ? (
                  <p className="mt-1 text-xs leading-5 text-[#10264a]/48">
                    {item.scope}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#10264a]/12 pt-5 text-sm font-semibold">
          <Link
            className="rounded-sm text-[#147c73] outline-none transition hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
            href={`/${selected.slug}`}
          >
            {copy.openProfile} →
          </Link>
          <Link
            className="rounded-sm text-[#10264a]/58 outline-none transition hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
            href="/explore/compare"
          >
            {copy.compareJurisdictions} →
          </Link>
        </div>
      </div>
    </div>
  );
}
