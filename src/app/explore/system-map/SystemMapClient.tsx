"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ExplainDetails, ExplainTooltip } from "@/app/explore/Explain";
import {
  CLUSTERS,
  EDGES,
  JURISDICTIONS,
  NODES,
  NODE_TYPE_LABELS,
  type CoreClusterId,
  type JurisdictionKey,
  type SystemNode,
} from "./system-map-data";

type LegalFilter = "all" | "binding" | "voluntary" | "depends";
const CORE_NODES = NODES.filter((node) => node.cluster);

export default function SystemMapClient() {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<CoreClusterId | "all">("all");
  const [legalFilter, setLegalFilter] = useState<LegalFilter>("all");
  const [selected, setSelected] = useState<SystemNode | null>(null);
  const [jurisdiction, setJurisdiction] = useState<JurisdictionKey | null>(null);

  const visibleNodes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CORE_NODES.filter((node) => {
      if (cluster !== "all" && node.cluster !== cluster) return false;

      if (q) {
        const haystack = [
          node.name,
          node.issuingBody,
          node.whatItIs,
          node.takeaway,
          node.legalEffect,
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      const legalText = node.legalEffect.toLowerCase();

      if (legalFilter === "binding") {
        if (!legalText.includes("binding")) return false;
      }

      if (legalFilter === "voluntary") {
        if (!legalText.includes("voluntary")) return false;
      }

      if (legalFilter === "depends") {
        if (
          !legalText.includes("depends") &&
          !legalText.includes("if applicable") &&
          !legalText.includes("specific regime")
        ) {
          return false;
        }
      }

      return true;
    });
  }, [cluster, legalFilter, query]);

  const visibleIds = new Set(visibleNodes.map((node) => node.id));

  const overlayJurisdiction = jurisdiction
    ? JURISDICTIONS.find((item) => item.key === jurisdiction) ?? null
    : null;

  const overlayNodes = jurisdiction
    ? NODES.filter((node) => node.jurisdiction === jurisdiction)
    : [];

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <header className="sticky top-0 z-40 border-b border-[#10264a]/10 bg-[#fbf7ef]/94 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="grid h-9 w-9 place-items-center rounded-full border border-[#10264a]/20 font-serif font-semibold"
            >
              A
            </Link>

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/35">
                Explore / Regulatory System Map
              </div>
              <div className="font-serif text-lg font-semibold">
                Autonomy Regulation Atlas
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="rounded-full border border-[#10264a]/10 bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#10264a]/40">
              EN prototype
            </span>
            <Link
              href="/"
              className="text-sm text-[#10264a]/50 transition hover:text-[#10264a]"
            >
              Back to Atlas
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-5 pb-14 pt-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/atlaslings/fox-explore-seated.png"
                alt=""
                className="h-20 w-20 object-contain"
                height={160}
                width={160}
              />
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                Explore mode
              </div>
            </div>

            <h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
              How does autonomous-vehicle regulation fit together
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#10264a]/55">
              Start with the common system. Open a regulatory territory, then
              drill into standards, concepts, regulations and legal frameworks.
              National law is applied separately as a jurisdiction layer.
            </p>

            <div className="mt-4 inline-flex items-center rounded-full border border-[#10264a]/10 bg-white px-3 py-2 text-xs text-[#10264a]/55">
              <span>
                New to AV regulation? Hover a highlighted node for <strong className="text-[#10264a]/75">Cat explains</strong>.
              </span>
            </div>
          </div>

          <div className="relative hidden min-h-[300px] lg:block">
            <Image
              src="/atlaslings/fox-autonomous.png"
              alt=""
              className="absolute bottom-[-18px] right-0 h-[305px] w-auto object-contain"
              height={610}
              width={480}
            />

            <details className="absolute right-0 top-0 z-30">
              <summary className="cursor-pointer list-none rounded-full border border-[#10264a]/15 bg-white/95 px-4 py-2.5 text-sm font-semibold shadow-sm backdrop-blur">
                How to read this map
              </summary>

              <div className="absolute right-0 top-12 z-30 w-[330px] rounded-2xl border border-[#10264a]/10 bg-white p-5 text-sm shadow-[0_18px_45px_rgba(16,38,74,.14)]">
                <LegendLine symbol="→" text="Structural relationship" />
                <LegendLine symbol="━" text="Institutional / legal framework" />
                <LegendLine
                  symbol="···"
                  text="Related engineering / regulatory domain"
                />
                <p className="mt-4 border-t border-[#10264a]/10 pt-4 text-xs leading-5 text-[#10264a]/45">
                  A connection describes the relationship shown in Atlas. It does
                  not by itself mean that one instrument legally incorporates or
                  mandates another.
                </p>
              </div>
            </details>
          </div>

          <details className="relative lg:hidden">
            <summary className="cursor-pointer list-none rounded-full border border-[#10264a]/15 bg-white px-4 py-2.5 text-sm font-semibold">
              How to read this map
            </summary>
            <div className="absolute right-0 top-12 z-30 w-[min(330px,calc(100vw-40px))] rounded-2xl border border-[#10264a]/10 bg-white p-5 text-sm shadow-[0_18px_45px_rgba(16,38,74,.14)]">
              <LegendLine symbol="→" text="Structural relationship" />
              <LegendLine symbol="━" text="Institutional / legal framework" />
              <LegendLine symbol="···" text="Related engineering / regulatory domain" />
            </div>
          </details>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <ModeButton active label="Explore" icon="🦊" />
          <ModeButton label="Learn" icon="🐱" soon />
          <ModeButton label="Apply to deployment" icon="🐶" soon />
        </div>

        {/* SEARCH + CONTEXT + FILTERS */}
        <div className="mt-6 rounded-[24px] border border-[#10264a]/10 bg-white p-4">
          <div className="grid gap-3 xl:grid-cols-[1fr_auto_auto]">
            <label className="relative">
              <span className="sr-only">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search standards, concepts, rules..."
                autoComplete="off"
                className="h-11 w-full rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-4 text-sm outline-none transition placeholder:text-[#10264a]/30 focus:border-[#147c73]/50"
              />
            </label>

            <select
              value={jurisdiction ?? "global"}
              onChange={(event) =>
                setJurisdiction(
                  event.target.value === "global"
                    ? null
                    : (event.target.value as JurisdictionKey)
                )
              }
              autoComplete="off"
              aria-label="Jurisdiction context"
              className="h-11 rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-3 text-sm outline-none"
            >
              <option value="global">Global core</option>
              <option value="eu">European Union</option>
              <optgroup label="EU countries">
                <option value="nl">Netherlands</option>
                <option value="de">Germany</option>
                <option value="fr">France</option>
                <option value="es">Spain</option>
                <option value="it">Italy</option>
                <option value="at">Austria</option>
              </optgroup>
              <option value="uk">United Kingdom</option>
              <option value="ru">Russia</option>
              <option value="us">United States</option>
              <option value="ca">California</option>
              <option value="cn">China</option>
            </select>

            <select
              value={legalFilter}
              onChange={(event) =>
                setLegalFilter(event.target.value as LegalFilter)
              }
              autoComplete="off"
              className="h-11 rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-3 text-sm outline-none"
            >
              <option value="all">All legal effects</option>
              <option value="binding">Binding / binding if applicable</option>
              <option value="voluntary">Voluntary</option>
              <option value="depends">Depends on regime</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip
              active={cluster === "all"}
              onClick={() => setCluster("all")}
            >
              All
            </FilterChip>

            {CLUSTERS.map((item) => (
              <FilterChip
                key={item.id}
                active={cluster === item.id}
                onClick={() => setCluster(item.id)}
              >
                {item.shortTitle}
              </FilterChip>
            ))}
          </div>
        </div>

        {overlayJurisdiction && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#10264a]/10 bg-[#f1ece2] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[#10264a]/45">Jurisdiction context</span>
              <span className="font-semibold">{overlayJurisdiction.label}</span>
              <span className="text-[#10264a]/25">·</span>
              <span className="text-[#10264a]/45">
                {overlayNodes.length > 0
                  ? `${overlayNodes.length} legal nodes mapped`
                  : "research pending"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setJurisdiction(null)}
              className="text-xs font-semibold text-[#147c73]"
            >
              Return to global core
            </button>
          </div>
        )}

        {/* CORE SYSTEM MAP */}
        <div className="relative mt-6 overflow-visible rounded-[30px] border border-[#10264a]/10 bg-[#f6f0e5]">
          <div
            className={`grid min-h-[690px] transition-[grid-template-columns] duration-300 ${
              selected
                ? "lg:grid-cols-[minmax(0,1fr)_390px]"
                : "lg:grid-cols-[minmax(0,1fr)_0px]"
            }`}
          >
            <div className="min-w-0 p-4 sm:p-6 lg:p-7">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#10264a]/35">
                    Core system
                  </div>
                  <div className="mt-1 text-sm text-[#10264a]/50">
                    {visibleNodes.length} of {CORE_NODES.length} core nodes visible
                  </div>
                </div>

                {(query ||
                  cluster !== "all" ||
                  legalFilter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setCluster("all");
                      setLegalFilter("all");
                    }}
                    className="rounded-full border border-[#10264a]/10 bg-white px-3 py-2 text-xs font-semibold"
                  >
                    Clear filters
                  </button>
                )}
              </div>

              <div className="grid gap-4 xl:grid-cols-12">
                {CLUSTERS.map((territory) => {
                  const nodes = visibleNodes.filter(
                    (node) => node.cluster === territory.id
                  );

                  if (nodes.length === 0) return null;

                  return (
                    <Territory
                      key={territory.id}
                      territory={territory}
                      nodes={nodes}
                      visibleIds={visibleIds}
                      selectedId={selected?.id ?? null}
                      onSelect={setSelected}
                    />
                  );
                })}
              </div>

              {visibleNodes.length === 0 && (
                <div className="grid min-h-[300px] place-items-center text-center">
                  <div>
                    <div className="font-serif text-2xl font-semibold">
                      No nodes match these filters
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setCluster("all");
                        setLegalFilter("all");
                      }}
                      className="mt-4 rounded-full bg-[#10264a] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            <aside
              className={`border-l border-[#10264a]/10 bg-white transition-opacity duration-200 ${
                selected
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {selected && (
                <NodeDrawer
                  node={selected}
                  onClose={() => setSelected(null)}
                  onSelect={(id) => {
                    const next = NODES.find((node) => node.id === id);
                    if (next) setSelected(next);
                  }}
                />
              )}
            </aside>
          </div>
        </div>

        {/* JURISDICTION LAYER */}
        <section className="mt-6 rounded-[30px] border border-[#10264a]/10 bg-[#10264a] p-5 text-[#fbf7ef] sm:p-7">
          <div className="grid gap-7 lg:grid-cols-[330px_1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#77c7bd]">
                Jurisdiction layer
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
                Apply a legal order to the core system
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/55">
                International standards and vehicle-regulation frameworks are
                only part of the picture. Choose a jurisdiction to see its
                supranational, national or subnational overlay.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <JurisdictionChip
                  active={jurisdiction === null}
                  onClick={() => jurisdiction === null ? undefined : setJurisdiction(null)}
                >
                  Global core
                </JurisdictionChip>

                {JURISDICTIONS.map((item) => (
                  <JurisdictionChip
                    key={item.key}
                    active={jurisdiction === item.key}
                    onClick={() => setJurisdiction(item.key)}
                  >
                    {item.label}
                  </JurisdictionChip>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.055] p-5">
                {!overlayJurisdiction ? (
                  <div>
                    <div className="text-sm font-semibold">Global core selected</div>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                      National liability, road-use, authorization and enforcement
                      rules are intentionally kept out of the common system map.
                    </p>
                  </div>
                ) : (
                  <JurisdictionOverlay
                    jurisdiction={overlayJurisdiction}
                    nodes={overlayNodes}
                    onSelect={setSelected}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 text-xs leading-5 text-[#10264a]/40">
          Prototype data is normalized from the uploaded AV/ADS Safety &
          Regulation Map. Repeated UNECE rows are represented once per unique
          instrument or concept. Jurisdictions marked as scaffolded are part of
          the information architecture but do not yet contain a researched legal
          node set.
        </div>
      </main>
    </div>
  );
}

function Territory({
  territory,
  nodes,
  visibleIds,
  selectedId,
  onSelect,
}: {
  territory: (typeof CLUSTERS)[number];
  nodes: SystemNode[];
  visibleIds: Set<string>;
  selectedId: string | null;
  onSelect: (node: SystemNode) => void;
}) {
  const spans: Record<CoreClusterId, string> = {
    automation: "xl:col-span-3",
    functional: "xl:col-span-6",
    intended: "xl:col-span-3",
    cyber: "xl:col-span-6",
    assurance: "xl:col-span-3",
    unece: "xl:col-span-3",
  };

  const tones: Record<CoreClusterId, string> = {
    automation: "bg-[#eef3f8]",
    functional: "bg-[#e8f0f8]",
    intended: "bg-[#f7edd7]",
    cyber: "bg-[#e7f1ed]",
    assurance: "bg-[#f2eaf4]",
    unece: "bg-[#e8e8ee]",
  };

  const ordered = orderNodes(territory.id, nodes);

  return (
    <section
      className={`${spans[territory.id]} relative rounded-[24px] border border-[#10264a]/8 p-5 ${tones[territory.id]}`}
    >
      <div className="mb-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/35">
          Regulatory territory
        </div>
        <h2 className="mt-1 font-serif text-xl font-semibold">
          {territory.title}
        </h2>
        <p className="mt-2 max-w-xl text-xs leading-5 text-[#10264a]/45">
          {territory.description}
        </p>
      </div>

      <div className="space-y-2">
        {ordered.map((node, index) => {
          const next = ordered[index + 1];
          const edge = next
            ? EDGES.find(
                (item) =>
                  item.from === node.id &&
                  item.to === next.id &&
                  visibleIds.has(item.from) &&
                  visibleIds.has(item.to)
              )
            : undefined;

          return (
            <div key={node.id} className="relative">
              <NodeButton
                node={node}
                active={selectedId === node.id}
                onClick={() => onSelect(node)}
              />

              {edge && (
                <div className="flex min-h-8 items-center gap-2 pl-5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/48">
                  <span
                    className={
                      edge.kind === "related"
                        ? "tracking-[0.22em] text-[#147c73]"
                        : "text-base leading-none text-[#147c73]"
                    }
                  >
                    {edge.kind === "related"
                      ? "···"
                      : edge.kind === "framework"
                        ? "┃"
                        : "↓"}
                  </span>
                  {edge.label && <span>{edge.label}</span>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NodeButton({
  node,
  active,
  onClick,
}: {
  node: SystemNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div className="group/node relative z-10 hover:z-[70] focus-within:z-[70]">
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${
          active
            ? "border-[#147c73]/45 bg-white shadow-[0_12px_25px_rgba(16,38,74,.08)]"
            : "border-[#10264a]/8 bg-white/75 hover:-translate-y-0.5 hover:border-[#10264a]/20 hover:bg-white"
        }`}
      >
        <div>
          <div className="font-semibold">{node.name}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/35">
            {NODE_TYPE_LABELS[node.nodeType]}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {node.learning && (
            <span className="hidden rounded-full border border-[#b97512]/20 bg-[#fff8e8] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9a6513] sm:inline-flex">
              Explain
            </span>
          )}
        </div>
      </button>

      {node.learning ? (
        <ExplainTooltip note={node.learning} title={`What is ${node.name}?`} />
      ) : null}
    </div>
  );
}

function NodeDrawer({
  node,
  onClose,
  onSelect,
}: {
  node: SystemNode;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const relatedIds = EDGES.filter(
    (edge) => edge.from === node.id || edge.to === node.id
  ).map((edge) => (edge.from === node.id ? edge.to : edge.from));

  const related = relatedIds
    .map((id) => NODES.find((item) => item.id === id))
    .filter((item): item is SystemNode => Boolean(item));

  return (
    <div className="sticky top-[73px] max-h-[calc(100vh-73px)] overflow-y-auto p-6">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">
            {NODE_TYPE_LABELS[node.nodeType]}
          </div>
          <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
            {node.name}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#10264a]/10 text-lg text-[#10264a]/45 transition hover:bg-[#fbf7ef]"
          aria-label="Close node detail"
        >
          ×
        </button>
      </div>

      {node.learning ? (
        <ExplainDetails note={node.learning} title={node.name} />
      ) : null}

      <DetailBlock label="What it is" text={node.whatItIs} />
      <DetailBlock label="Issued by" text={node.issuingBody} />
      <DetailBlock label="Geographic reach" text={node.geography} />
      <DetailBlock label="Legal effect" text={node.legalEffect} />

      <div className="mt-6 rounded-2xl bg-[#f2eadc] p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b97512]">
          Remember
        </div>
        <p className="mt-2 text-sm leading-6 text-[#10264a]/70">
          {node.takeaway}
        </p>
      </div>

      {related.length > 0 && (
        <div className="mt-6">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/35">
            Connected pieces
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {related.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelect(item.id)}
                className="rounded-full border border-[#10264a]/10 bg-white px-3 py-2 text-xs font-semibold transition hover:border-[#147c73]/30 hover:text-[#147c73]"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {node.source && (
        <a
          href={node.source}
          target="_blank"
          rel="noreferrer"
          className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#147c73] underline decoration-[#147c73]/30 underline-offset-4"
        >
          Official source <span>↗</span>
        </a>
      )}
    </div>
  );
}

function JurisdictionOverlay({
  jurisdiction,
  nodes,
  onSelect,
}: {
  jurisdiction: (typeof JURISDICTIONS)[number];
  nodes: SystemNode[];
  onSelect: (node: SystemNode) => void;
}) {
  const parent = jurisdiction.parent
    ? JURISDICTIONS.find((item) => item.key === jurisdiction.parent)
    : null;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/35">
        {parent && (
          <>
            <span>{parent.label} layer</span>
            <span>→</span>
          </>
        )}
        <span>{jurisdiction.label}</span>
        <span>·</span>
        <span>{jurisdiction.level}</span>
      </div>

      <div className="mt-2 flex items-center gap-3">
        <h3 className="font-serif text-2xl font-semibold">
          {jurisdiction.label}
        </h3>
        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] ${
            nodes.length > 0
              ? "bg-[#77c7bd]/15 text-[#9ce0d6]"
              : "bg-white/8 text-white/35"
          }`}
        >
          {nodes.length > 0 ? `${nodes.length} seeded nodes` : "Research pending"}
        </span>
      </div>

      {nodes.length > 0 ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              onClick={() => onSelect(node)}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 text-left transition hover:bg-white/[0.11]"
            >
              <div className="font-semibold">{node.name}</div>
              <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/35">
                {NODE_TYPE_LABELS[node.nodeType]}
              </div>
              <p className="mt-2 text-xs leading-5 text-white/48">
                {node.takeaway}
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl border border-dashed border-white/12 p-4">
          <p className="max-w-2xl text-sm leading-6 text-white/48">
            The jurisdiction is already part of the Atlas information
            architecture, but its national legal nodes have not yet been mapped
            into this prototype.
          </p>

          {jurisdiction.sourceNote && (
            <p className="mt-3 max-w-2xl text-xs leading-5 text-white/42">
              {jurisdiction.sourceNote}
            </p>
          )}

          {jurisdiction.sourceHints && jurisdiction.sourceHints.length > 0 && (
            <div className="mt-4">
              <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#9ce0d6]/70">
                Source inventory already identified
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {jurisdiction.sourceHints.map((source) => (
                  <span
                    key={source}
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/55"
                  >
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}

          {parent && (
            <div className="mt-3 inline-flex rounded-full bg-white/[0.06] px-3 py-2 text-xs text-white/45">
              Structure reserved: {parent.label} supranational layer →{" "}
              {jurisdiction.label} national layer
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DetailBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-6">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/35">
        {label}
      </div>
      <p className="mt-2 text-sm leading-6 text-[#10264a]/65">{text}</p>
    </div>
  );
}

function ModeButton({
  active = false,
  label,
  icon,
  soon = false,
}: {
  active?: boolean;
  label: string;
  icon: string;
  soon?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={soon}
      className={`rounded-full border px-4 py-2.5 text-sm font-semibold ${
        active
          ? "border-[#147c73]/30 bg-[#e7f1ed] text-[#147c73]"
          : "border-[#10264a]/10 bg-white text-[#10264a]/45"
      } ${soon ? "cursor-not-allowed opacity-55" : ""}`}
    >
      <span className="mr-2">{icon}</span>
      {label}
      {soon && (
        <span className="ml-2 text-[9px] uppercase tracking-[0.1em]">Soon</span>
      )}
    </button>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
        active
          ? "bg-[#10264a] text-white"
          : "border border-[#10264a]/10 bg-[#fbf7ef] text-[#10264a]/50 hover:border-[#10264a]/20"
      }`}
    >
      {children}
    </button>
  );
}

function JurisdictionChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
        active
          ? "border-[#77c7bd]/40 bg-[#77c7bd]/15 text-[#a9e8df]"
          : "border-white/10 bg-white/[0.04] text-white/50 hover:bg-white/[0.08] hover:text-white/75"
      }`}
    >
      {children}
    </button>
  );
}

function LegendLine({ symbol, text }: { symbol: string; text: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#10264a]/8 py-2 last:border-0">
      <span className="w-8 text-center font-serif text-lg text-[#147c73]">
        {symbol}
      </span>
      <span className="text-[#10264a]/60">{text}</span>
    </div>
  );
}

function orderNodes(cluster: CoreClusterId, nodes: SystemNode[]) {
  const order: Record<CoreClusterId, string[]> = {
    automation: ["sae-j3016"],
    functional: ["iso-26262", "hara", "sec", "asil"],
    intended: ["sotif", "iso-pas-8800"],
    cyber: ["iso-sae-21434", "un-r155", "iso-24089", "un-r156"],
    assurance: ["safety-case", "ul-4600"],
    unece: ["wp29", "agreement-1958", "un-regulations", "un-r157"],
  };

  const index = new Map(order[cluster].map((id, i) => [id, i]));

  return [...nodes].sort(
    (a, b) => (index.get(a.id) ?? 999) - (index.get(b.id) ?? 999)
  );
}
