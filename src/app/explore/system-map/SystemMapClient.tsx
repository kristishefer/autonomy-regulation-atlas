"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ExplainDetails, ExplainTooltip } from "@/app/explore/Explain";
import {
  LEARNING_CONCEPTS,
  getLearningNote,
  type LearningNote,
} from "@/app/explore/learning-concepts";
import {
  JURISDICTION_PROFILES,
  getRegulatorySource,
  legalStatusLabel,
  type JurisdictionProfile,
  type StatusTone,
} from "@/app/explore/regulatory-data";
import {
  CLUSTERS,
  EDGES,
  JURISDICTION_CONTEXT_BINDINGS,
  NODES,
  NODE_TYPE_LABELS,
  REGULATORY_CONCEPTS,
  type CoreClusterId,
  type RegulatoryConceptId,
  type SystemMapContextJurisdiction,
  type SystemNode,
} from "./system-map-data";

type LegalFilter = "all" | "binding" | "voluntary" | "depends";
const CORE_NODES = NODES.filter((node) => node.cluster);
const CONTEXT_PROFILES = (["germany", "netherlands"] as const)
  .map((slug) => JURISDICTION_PROFILES.find((profile) => profile.slug === slug))
  .filter((profile): profile is JurisdictionProfile => Boolean(profile));

const contextToneClasses: Record<StatusTone, string> = {
  positive: "border-[#77c7bd]/35 bg-[#77c7bd]/12 text-[#a9e8df]",
  conditional: "border-[#e5b363]/35 bg-[#e5b363]/12 text-[#f1c780]",
  neutral: "border-white/14 bg-white/[0.06] text-white/72",
  watch: "border-[#e5b363]/35 bg-[#e5b363]/12 text-[#f1c780]",
};

export default function SystemMapClient() {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<CoreClusterId | "all">("all");
  const [legalFilter, setLegalFilter] = useState<LegalFilter>("all");
  const [selected, setSelected] = useState<SystemNode | null>(null);
  const [jurisdiction, setJurisdiction] =
    useState<SystemMapContextJurisdiction | null>(null);

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

  const contextProfile = jurisdiction
    ? CONTEXT_PROFILES.find((profile) => profile.slug === jurisdiction) ?? null
    : null;

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
                height={80}
                width={80}
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
              height={332}
              width={305}
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
          <ModeButton href="/learn" label="Learn" icon="🐱" />
          <ModeButton
            href="/deploy"
            label="Apply to deployment"
            icon="🐶"
          />
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
                    : (event.target.value as SystemMapContextJurisdiction)
                )
              }
              autoComplete="off"
              aria-label="Jurisdiction context"
              className="h-11 rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-3 text-sm outline-none"
            >
              <option value="global">Universal</option>
              <option value="germany">Germany</option>
              <option value="netherlands">Netherlands</option>
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

        {contextProfile && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#10264a]/10 bg-[#f1ece2] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[#10264a]/55">Regulatory system</span>
              <span className="font-semibold">{contextProfile.name}</span>
              <span className="text-[#10264a]/25">·</span>
              <span className="text-[#10264a]/55">national context applied to the universal concepts</span>
            </div>
            <button
              type="button"
              onClick={() => setJurisdiction(null)}
              className="text-xs font-semibold text-[#147c73]"
            >
              Return to Universal
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

        {/* REGULATORY CONTEXT LAYER */}
        <section className="mt-6 rounded-[30px] border border-[#10264a]/10 bg-[#10264a] p-5 text-[#fbf7ef] sm:p-7">
          <div className="grid gap-7 lg:grid-cols-[330px_1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#77c7bd]">
                Regulatory system
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
                Universal architecture, national implementation
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/68">
                The universal concepts stay fixed. Choose a jurisdiction to see
                how its current law instantiates each concept without adding
                national-law nodes to the canonical map.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <JurisdictionChip
                  active={jurisdiction === null}
                  onClick={() => jurisdiction === null ? undefined : setJurisdiction(null)}
                >
                  Universal
                </JurisdictionChip>

                {CONTEXT_PROFILES.map((profile) => (
                  <JurisdictionChip
                    key={profile.slug}
                    active={jurisdiction === profile.slug}
                    onClick={() => setJurisdiction(profile.slug)}
                  >
                    {profile.name}
                  </JurisdictionChip>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.055] p-5">
                {!contextProfile ? (
                  <UniversalContextLayer />
                ) : (
                  <JurisdictionContextLayer profile={contextProfile} />
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 text-xs leading-5 text-[#10264a]/40">
          The canonical node map remains universal. Netherlands and Germany are
          applied as context layers using the same reviewed conclusions, scope,
          uncertainty and official sources as their jurisdiction profiles.
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
  const learningNote = getSystemNodeLearning(node);

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
          {learningNote && (
            <span className="hidden rounded-full border border-[#b97512]/20 bg-[#fff8e8] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9a6513] sm:inline-flex">
              Explain
            </span>
          )}
        </div>
      </button>

      {learningNote ? (
        <ExplainTooltip note={learningNote} title={`What is ${node.name}?`} />
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
  const learningNote = getSystemNodeLearning(node);

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

      {learningNote ? (
        <ExplainDetails note={learningNote} title={node.name} />
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

function UniversalContextLayer() {
  return (
    <div>
      <div className="text-sm font-semibold">Universal concepts</div>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
        These questions form the stable regulatory architecture. A jurisdiction
        context answers them with its own legal instruments, authorities and
        authorization routes.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {REGULATORY_CONCEPTS.map((concept) => (
          <article
            className="border-l border-[#77c7bd]/45 bg-white/[0.045] p-4"
            key={concept.id}
          >
            <h3 className="font-serif text-lg font-semibold">{concept.title}</h3>
            <p className="mt-2 text-xs leading-5 text-white/62">
              {concept.description}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function JurisdictionContextLayer({
  profile,
}: {
  profile: JurisdictionProfile;
}) {
  const bindings = JURISDICTION_CONTEXT_BINDINGS[profile.slug];

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ce0d6]/80">
            Universal → national context
          </div>
          <h3 className="mt-1 font-serif text-2xl font-semibold">
            {profile.name}
          </h3>
        </div>
        <Link
          className="rounded-sm text-xs font-semibold text-[#9ce0d6] underline decoration-[#9ce0d6]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#9ce0d6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#10264a]"
          href={`/${profile.slug}`}
        >
          Open full jurisdiction profile →
        </Link>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {bindings.map((binding) => {
          const concept = getRegulatoryConcept(binding.conceptId);
          const conclusion = profile.conclusions[binding.fieldId];
          const learningConcept = binding.learningConceptId
            ? LEARNING_CONCEPTS[binding.learningConceptId]
            : null;
          const learningNote = learningConcept
            ? getLearningNote(learningConcept.id, profile.slug)
            : null;

          return (
            <article
              className="rounded-[20px] border border-white/10 bg-white/[0.06] p-5"
              key={binding.conceptId}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ce0d6]/72">
                    {concept.title}
                  </div>
                  <h4 className="mt-2 font-serif text-xl font-semibold leading-6">
                    {conclusion.label}
                  </h4>
                </div>
                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${contextToneClasses[conclusion.tone]}`}
                >
                  {conclusion.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-6 text-white/72">
                {conclusion.summary}
              </p>
              <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-white/60">
                <strong className="text-white/78">Scope:</strong>{" "}
                {conclusion.scopeLabel}
              </p>

              {learningNote?.terminology?.length ? (
                <p className="mt-3 text-xs leading-5 text-[#9ce0d6]/82">
                  <strong className="text-[#9ce0d6]">
                    Official terminology:
                  </strong>{" "}
                  {learningNote.terminology.map((term, index) => (
                    <span key={term.id}>
                      {index > 0 ? " · " : ""}
                      <span lang={term.originalLanguage.tag}>
                        {term.officialTerm}
                      </span>
                    </span>
                  ))}
                </p>
              ) : null}

              {learningConcept && learningNote ? (
                <ExplainDetails
                  note={learningNote}
                  tone="dark"
                  title={learningConcept.name}
                />
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
                <Link
                  className="rounded-sm text-xs font-semibold text-[#9ce0d6] underline decoration-[#9ce0d6]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#9ce0d6]"
                  href={`/${profile.slug}#${binding.sectionId}`}
                >
                  Read the national analysis →
                </Link>
                {conclusion.legalBasis.map((reference, index) => {
                  const source = getRegulatorySource(reference.sourceId);
                  return (
                    <a
                      className="rounded-sm text-xs text-white/62 underline decoration-white/20 underline-offset-4 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-[#9ce0d6]"
                      href={source.url}
                      key={`${reference.sourceId}-${reference.provision ?? index}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {source.shortTitle}
                      {reference.provision ? ` · ${reference.provision}` : ""}
                      {` · ${legalStatusLabel(source.legalStatus)}`}
                    </a>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function getRegulatoryConcept(id: RegulatoryConceptId) {
  const concept = REGULATORY_CONCEPTS.find((item) => item.id === id);
  if (!concept) {
    throw new Error(`Missing regulatory concept: ${id}`);
  }

  return concept;
}

function getSystemNodeLearning(node: SystemNode): LearningNote | null {
  if (node.learningConceptId) {
    return getLearningNote(node.learningConceptId);
  }

  return node.learning ?? null;
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
  href,
  label,
  icon,
  soon = false,
}: {
  active?: boolean;
  href?: string;
  label: string;
  icon: string;
  soon?: boolean;
}) {
  const className = `rounded-full border px-4 py-2.5 text-sm font-semibold ${
    active
      ? "border-[#147c73]/30 bg-[#e7f1ed] text-[#147c73]"
      : "border-[#10264a]/10 bg-white text-[#10264a]/45"
  } ${soon ? "cursor-not-allowed opacity-55" : ""}`;
  const content = (
    <>
      <span className="mr-2">{icon}</span>
      {label}
      {soon && (
        <span className="ml-2 text-[9px] uppercase tracking-[0.1em]">Soon</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" disabled={soon} className={className}>
      {content}
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
