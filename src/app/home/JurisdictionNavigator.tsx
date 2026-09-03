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
  positive: "text-[var(--atlas-teal)]",
  conditional: "text-[var(--atlas-origin)]",
  neutral: "text-[var(--atlas-ink-muted)]",
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
    <div className="atlas-dossier">
      <div className="relative">
        <div
          aria-label={copy.tabsLabel}
          className="atlas-dossier-tabs flex snap-x snap-mandatory overflow-x-auto border-y border-[rgba(24,50,74,0.12)] pr-8 md:grid md:grid-cols-5 md:overflow-visible md:pr-0"
          role="tablist"
        >
          {jurisdictions.map((jurisdiction, index) => {
            const active = index === selectedIndex;

            return (
              <button
                aria-controls="jurisdiction-panel"
                aria-selected={active}
                className={`atlas-dossier-tab min-w-max snap-start border-r border-[rgba(24,50,74,0.08)] px-4 py-3 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--atlas-origin)] focus-visible:ring-inset md:min-w-0 ${
                  active
                    ? "is-active bg-white/85 text-[var(--atlas-ink)]"
                    : "bg-transparent text-[var(--atlas-ink-muted)] hover:bg-white/50 hover:text-[var(--atlas-ink)]"
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
                    active ? "text-[var(--atlas-origin)]" : "text-[var(--atlas-teal)]"
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
          className="pointer-events-none absolute bottom-px right-0 top-px w-8 bg-gradient-to-l from-[var(--atlas-field-blue)] to-transparent md:hidden"
        />
      </div>

      <div
        aria-labelledby={`jurisdiction-tab-${selected.slug}`}
        className="atlas-dossier-panel mt-4 border-y border-[rgba(24,50,74,0.12)] bg-[rgba(250,249,245,0.42)]"
        id="jurisdiction-panel"
        ref={panelRef}
        role="tabpanel"
      >
        <div className="grid lg:grid-cols-[0.72fr_1.28fr] lg:divide-x lg:divide-[rgba(24,50,74,0.08)]">
          <div className="px-1 py-7 sm:px-6 lg:pl-0 lg:pr-10" data-navigator-detail>
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--atlas-teal)]">
                {selected.code}
              </span>
              <h3 className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                {selected.name}
              </h3>
            </div>

            <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(24,50,74,0.46)]">
              {copy.scopeLabel}
            </p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--atlas-ink-muted)]">
              {selected.scope}
            </p>
          </div>

          <div className="border-t border-[rgba(24,50,74,0.08)] px-1 py-7 sm:px-6 lg:border-t-0 lg:pl-10 lg:pr-0" data-navigator-detail>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(24,50,74,0.46)]">
              {copy.overviewLabel}
            </p>
            <p className="atlas-editorial mt-3 max-w-3xl text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
              {selected.primaryMessage}
            </p>
          </div>
        </div>

        <div
          className="border-t border-[rgba(24,50,74,0.08)] px-1 py-7 sm:px-6 lg:px-0"
          data-navigator-detail
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[rgba(24,50,74,0.46)]">
            {copy.snapshotLabel}
          </p>
          <dl className="mt-4 grid border-b border-[rgba(24,50,74,0.08)] sm:grid-cols-2 sm:divide-x sm:divide-[rgba(24,50,74,0.08)]">
            {selected.snapshot.map((item) => (
              <div className="border-t border-[rgba(24,50,74,0.08)] px-0 py-4 sm:px-6 sm:first:pl-0" key={item.label}>
                <dt className="text-xs font-semibold text-[rgba(24,50,74,0.56)]">
                  {item.label}
                </dt>
                <dd className={`mt-1.5 text-sm font-semibold ${snapshotToneClasses[item.tone]}`}>
                  {item.status}
                </dd>
                {item.scope ? (
                  <p className="mt-1 text-xs leading-5 text-[rgba(24,50,74,0.52)]">
                    {item.scope}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[rgba(24,50,74,0.08)] px-1 py-5 text-sm font-semibold sm:px-6 lg:px-0">
          <Link
            className="rounded-sm text-[var(--atlas-teal)] outline-none transition hover:text-[var(--atlas-ink)] focus-visible:ring-2 focus-visible:ring-[var(--atlas-origin)] focus-visible:ring-offset-4"
            href={`/${selected.slug}`}
          >
            {copy.openProfile} →
          </Link>
          <Link
            className="rounded-sm text-[var(--atlas-ink-muted)] outline-none transition hover:text-[var(--atlas-ink)] focus-visible:ring-2 focus-visible:ring-[var(--atlas-origin)] focus-visible:ring-offset-4"
            href="/explore/compare"
          >
            {copy.compareJurisdictions} →
          </Link>
        </div>
      </div>
    </div>
  );
}
