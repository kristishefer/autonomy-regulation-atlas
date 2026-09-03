"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { ExplainDetails, ExplainTooltip } from "@/app/explore/Explain";
import {
  LEARNING_CONCEPTS,
  getLearningNote,
  type LearningConceptId,
  type LearningNote,
} from "@/app/explore/learning-concepts";
import {
  JURISDICTION_PROFILES,
  getRegulatorySource,
  legalStatusLabel,
  type CompareFieldId,
  type JurisdictionProfile,
  type JurisdictionSlug,
  type StatusTone,
} from "@/app/explore/regulatory-data";
import { getCommonUiCopy } from "@/app/i18n/global-ui-copy";
import { LanguageNotice } from "@/app/i18n/LanguageNotice";
import type { Locale } from "@/app/i18n/locale";
import { useLocale } from "@/app/i18n/LocaleProvider";
import {
  APPLICABILITY_MECHANISM_LABELS,
  APPLICABILITY_STATUS_LABELS,
  getNodeApplicability,
  type ApplicabilityJurisdiction,
  type ApplicabilityStatus,
  type JurisdictionApplicability,
} from "./applicability-data";
import {
  CLUSTERS,
  EDGES,
  getSystemMapDimensions,
  JURISDICTION_CONTEXT_BINDINGS,
  NODES,
  NODE_TYPE_LABELS,
  REGULATORY_CONCEPTS,
  type CoreClusterId,
  type RegulatoryConceptId,
  type SystemNode,
} from "./system-map-data";

type LegalFilter = "all" | "pathway" | "voluntary" | "outside" | "pending";
type ContextSlug = ApplicabilityJurisdiction;

type ContextBinding = {
  conceptId: RegulatoryConceptId;
  fieldId: CompareFieldId;
  sectionId?: string;
  learningConceptId?: LearningConceptId;
};

const CORE_NODES = NODES.filter((node) => node.cluster);
const CONTEXT_ORDER: ContextSlug[] = [
  "germany",
  "netherlands",
  "united-states",
  "united-kingdom",
  "russia",
];

const CONTEXT_LABELS: Record<ContextSlug, string> = {
  germany: "Germany",
  netherlands: "Netherlands",
  "united-states": "United States · federal + California",
  "united-kingdom": "Great Britain",
  russia: "Russia · passenger VATS EPR",
};

const CONTEXT_PROFILES = CONTEXT_ORDER.map((slug) =>
  JURISDICTION_PROFILES.find((profile) => profile.slug === slug),
).filter((profile): profile is JurisdictionProfile => Boolean(profile));

const GENERIC_CONTEXT_BINDINGS: ContextBinding[] = [
  {
    conceptId: "road-access",
    fieldId: "deployment_regime",
    learningConceptId: "testing-vs-deployment",
  },
  {
    conceptId: "vehicle-approval",
    fieldId: "approval_routes",
    learningConceptId: "type-approval",
  },
  {
    conceptId: "operating-domain",
    fieldId: "operating_scope_model",
    learningConceptId: "odd",
  },
  { conceptId: "human-roles", fieldId: "primary_human_role" },
  { conceptId: "traffic-rules", fieldId: "traffic_rules_model" },
  {
    conceptId: "safety-assurance",
    fieldId: "safety_assurance_model",
    learningConceptId: "safety-case-evidence",
  },
  { conceptId: "operations", fieldId: "holder_operator_duties" },
  { conceptId: "data-incidents", fieldId: "incident_event_reporting" },
  { conceptId: "liability-insurance", fieldId: "av_liability_model" },
];

const contextToneClasses: Record<StatusTone, string> = {
  positive: "border-[#77c7bd]/35 bg-[#77c7bd]/12 text-[#a9e8df]",
  conditional: "border-[#e5b363]/35 bg-[#e5b363]/12 text-[#f1c780]",
  neutral: "border-white/14 bg-white/[0.06] text-white/72",
  watch: "border-[#e5b363]/35 bg-[#e5b363]/12 text-[#f1c780]",
};

const applicabilityToneClasses: Record<ApplicabilityStatus, string> = {
  treaty_participation: "border-[#65789a]/25 bg-[#eef1f6] text-[#526684]",
  applies: "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  implementation_required: "border-[#b97512]/25 bg-[#fff8e8] text-[#8f5f13]",
  implemented: "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  referenced: "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  voluntary_relevance: "border-[#735f8e]/20 bg-[#f2eaf4] text-[#65527c]",
  not_in_pathway: "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/58",
  research_pending: "border-[#b97512]/20 bg-[#fff8e8] text-[#8f5f13]",
};

export default function SystemMapClient() {
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<CoreClusterId | "all">("all");
  const [legalFilter, setLegalFilter] = useState<LegalFilter>("all");
  const [selected, setSelected] = useState<SystemNode | null>(null);
  const [jurisdiction, setJurisdiction] = useState<ContextSlug | null>(null);

  const contextProfile = jurisdiction
    ? CONTEXT_PROFILES.find((profile) => profile.slug === jurisdiction) ?? null
    : null;

  const visibleNodes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return CORE_NODES.filter((node) => {
      if (cluster !== "all" && node.cluster !== cluster) return false;

      const applicability = getNodeApplicability(node, jurisdiction);

      if (q) {
        const haystack = [
          node.name,
          node.issuingBody,
          node.whatItIs,
          node.takeaway,
          node.legalEffect,
          applicability ? APPLICABILITY_STATUS_LABELS[applicability.status] : "",
          applicability?.legalEffect ?? "",
        ]
          .join(" ")
          .toLowerCase();

        if (!haystack.includes(q)) return false;
      }

      if (legalFilter === "all") return true;

      if (!jurisdiction) {
        if (legalFilter === "pathway") {
          return node.nodeType === "regulation" || node.nodeType === "framework";
        }
        if (legalFilter === "voluntary") return node.nodeType === "standard";
        return false;
      }

      if (!applicability) return false;

      if (legalFilter === "pathway") {
        return [
          "treaty_participation",
          "applies",
          "implemented",
          "referenced",
        ].includes(applicability.status);
      }
      if (legalFilter === "voluntary") {
        return applicability.status === "voluntary_relevance";
      }
      if (legalFilter === "outside") {
        return applicability.status === "not_in_pathway";
      }
      if (legalFilter === "pending") {
        return ["implementation_required", "research_pending"].includes(
          applicability.status,
        );
      }

      return true;
    });
  }, [cluster, jurisdiction, legalFilter, query]);

  const visibleIds = new Set(visibleNodes.map((node) => node.id));

  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <LanguageNotice locale={locale} />

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
              See the regulatory system — then see how it reaches a jurisdiction
            </h1>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#10264a]/58">
              The map separates where an instrument originates from the legal
              route through which it matters in a particular jurisdiction. Select
              Germany, the Netherlands, the United States, Great Britain or
              Russia to add jurisdiction-specific legal effect without rewriting
              international instruments as national law.
            </p>

            <div className="mt-5 max-w-3xl rounded-2xl border border-[#b97512]/20 bg-[#fff8e8] px-4 py-3 text-sm leading-6 text-[#10264a]/68">
              <strong className="text-[#8f5f13]">
                International does not mean universally binding.
              </strong>{" "}
              UNECE treaty participation, application of an individual UN
              Regulation, domestic implementation of a UN GTR and regulatory use
              of an ISO or SAE standard are different legal relationships.
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
              <div className="absolute right-0 top-12 z-30 w-[350px] rounded-2xl border border-[#10264a]/10 bg-white p-5 text-sm shadow-[0_18px_45px_rgba(16,38,74,.14)]">
                <LegendLine symbol="→" text="Structural relationship" />
                <LegendLine symbol="━" text="Institutional / legal framework" />
                <LegendLine symbol="···" text="Related engineering / regulatory domain" />
                <p className="mt-4 border-t border-[#10264a]/10 pt-4 text-xs leading-5 text-[#10264a]/50">
                  Node origin and jurisdictional legal effect are separate. When a
                  jurisdiction is selected, status badges describe the second
                  relationship; they do not change what the underlying instrument is.
                </p>
              </div>
            </details>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <ModeButton active label="Explore" icon="🦊" />
          <ModeButton href="/learn" label="Learn" icon="🐱" />
          <ModeButton href="/deploy" label="Apply to deployment" icon="🐶" />
        </div>

        <div className="mt-6 rounded-[24px] border border-[#10264a]/10 bg-white p-4">
          <div className="grid gap-3 xl:grid-cols-[minmax(280px,1fr)_minmax(240px,auto)_auto]">
            <label className="relative">
              <span className="sr-only">Search</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search instruments, standards, concepts..."
                autoComplete="off"
                className="h-11 w-full rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-4 text-sm outline-none transition placeholder:text-[#10264a]/30 focus:border-[#147c73]/50"
              />
            </label>

            <select
              value={jurisdiction ?? "international"}
              onChange={(event) => {
                setJurisdiction(
                  event.target.value === "international"
                    ? null
                    : (event.target.value as ContextSlug),
                );
                setLegalFilter("all");
              }}
              autoComplete="off"
              aria-label="Jurisdiction context"
              className="h-11 rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-3 text-sm outline-none"
            >
              <option value="international">International & shared architecture</option>
              {CONTEXT_ORDER.map((slug) => (
                <option key={slug} value={slug}>
                  {CONTEXT_LABELS[slug]}
                </option>
              ))}
            </select>

            <select
              value={legalFilter}
              onChange={(event) => setLegalFilter(event.target.value as LegalFilter)}
              autoComplete="off"
              aria-label="Legal role filter"
              className="h-11 rounded-xl border border-[#10264a]/10 bg-[#fbf7ef] px-3 text-sm outline-none"
            >
              <option value="all">All legal roles</option>
              <option value="pathway">Legal / treaty pathway</option>
              <option value="voluntary">Voluntary / assurance</option>
              {jurisdiction ? <option value="outside">Outside selected pathway</option> : null}
              {jurisdiction ? <option value="pending">Implementation / research pending</option> : null}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <FilterChip active={cluster === "all"} onClick={() => setCluster("all")}>
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

        {contextProfile ? (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#10264a]/10 bg-[#f1ece2] px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[#10264a]/48">Viewing regulatory architecture for</span>
              <span className="font-semibold">
                {CONTEXT_LABELS[contextProfile.slug as ContextSlug]}
              </span>
              <span className="text-[#10264a]/25">·</span>
              <span className="text-[#10264a]/48">
                international reach + domestic legal gateway + jurisdiction rules
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setJurisdiction(null);
                setLegalFilter("all");
              }}
              className="text-xs font-semibold text-[#147c73]"
            >
              Clear jurisdiction context
            </button>
          </div>
        ) : null}

        <div className="relative mt-6 overflow-visible rounded-[30px] border border-[#10264a]/10 bg-[#f6f0e5]">
          <div
            className={`grid min-h-[690px] transition-[grid-template-columns] duration-300 ${
              selected
                ? "lg:grid-cols-[minmax(0,1fr)_410px]"
                : "lg:grid-cols-[minmax(0,1fr)_0px]"
            }`}
          >
            <div className="min-w-0 p-4 sm:p-6 lg:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#10264a]/35">
                    International instruments & shared technical architecture
                  </div>
                  <div className="mt-1 text-sm text-[#10264a]/50">
                    {visibleNodes.length} of {CORE_NODES.length} nodes visible
                    {contextProfile
                      ? ` · legal effect shown for ${CONTEXT_LABELS[contextProfile.slug as ContextSlug]}`
                      : " · no jurisdiction selected"}
                  </div>
                </div>

                {(query || cluster !== "all" || legalFilter !== "all") && (
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
                    (node) => node.cluster === territory.id,
                  );
                  if (nodes.length === 0) return null;

                  return (
                    <Territory
                      key={territory.id}
                      jurisdiction={jurisdiction}
                      locale={locale}
                      territory={territory}
                      nodes={nodes}
                      visibleIds={visibleIds}
                      selectedId={selected?.id ?? null}
                      onSelect={setSelected}
                    />
                  );
                })}
              </div>

              {visibleNodes.length === 0 ? (
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
              ) : null}
            </div>

            <aside
              className={`border-l border-[#10264a]/10 bg-white transition-opacity duration-200 ${
                selected
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-0"
              }`}
            >
              {selected ? (
                <NodeDrawer
                  jurisdiction={jurisdiction}
                  locale={locale}
                  node={selected}
                  onClose={() => setSelected(null)}
                  onSelect={(id) => {
                    const next = NODES.find((node) => node.id === id);
                    if (next) setSelected(next);
                  }}
                />
              ) : null}
            </aside>
          </div>
        </div>

        <section className="mt-6 rounded-[30px] border border-[#10264a]/10 bg-[#10264a] p-5 text-[#fbf7ef] sm:p-7">
          <div className="grid gap-7 lg:grid-cols-[330px_1fr]">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-[#77c7bd]">
                Jurisdiction regulatory stack
              </div>
              <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight">
                {contextProfile
                  ? `How the system reaches ${CONTEXT_LABELS[contextProfile.slug as ContextSlug]}`
                  : "From international source to domestic legal effect"}
              </h2>
              <p className="mt-4 text-sm leading-6 text-white/62">
                {contextProfile
                  ? "Read international applicability and the jurisdiction's own road-access, approval, human-role, operating and liability rules as one stack. The layers remain legally distinct."
                  : "Start with the instrument's origin, then ask how it reaches a legal order, and only then add the jurisdiction's own authorization and operating rules."}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-2">
                <JurisdictionChip
                  active={jurisdiction === null}
                  onClick={() => {
                    setJurisdiction(null);
                    setLegalFilter("all");
                  }}
                >
                  International architecture
                </JurisdictionChip>
                {CONTEXT_ORDER.map((slug) => (
                  <JurisdictionChip
                    key={slug}
                    active={jurisdiction === slug}
                    onClick={() => {
                      setJurisdiction(slug);
                      setLegalFilter("all");
                    }}
                  >
                    {CONTEXT_LABELS[slug]}
                  </JurisdictionChip>
                ))}
              </div>

              <div className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.055] p-5">
                {!contextProfile || !jurisdiction ? (
                  <InternationalContextLayer />
                ) : (
                  <JurisdictionContextLayer
                    jurisdiction={jurisdiction}
                    locale={locale}
                    profile={contextProfile}
                  />
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-5 text-xs leading-5 text-[#10264a]/42">
          The System Map does not infer legal effect from an instrument&apos;s name,
          issuing body or international origin. Binding effect, treaty pathway,
          implementation and regulatory references are stored as
          jurisdiction-specific relationships. Unresearched relationships remain
          visible as research pending.
        </div>
      </main>
    </div>
  );
}

function Territory({
  jurisdiction,
  locale,
  territory,
  nodes,
  visibleIds,
  selectedId,
  onSelect,
}: {
  jurisdiction: ContextSlug | null;
  locale: Locale;
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
        <h2 className="mt-1 font-serif text-xl font-semibold">{territory.title}</h2>
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
                  visibleIds.has(item.to),
              )
            : undefined;

          return (
            <div key={node.id} className="relative">
              <NodeButton
                active={selectedId === node.id}
                applicability={getNodeApplicability(node, jurisdiction)}
                locale={locale}
                node={node}
                onClick={() => onSelect(node)}
              />
              {edge ? (
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
                  {edge.label ? <span>{edge.label}</span> : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function NodeButton({
  locale,
  node,
  active,
  applicability,
  onClick,
}: {
  locale: Locale;
  node: SystemNode;
  active: boolean;
  applicability: JurisdictionApplicability | null;
  onClick: () => void;
}) {
  const common = getCommonUiCopy(locale);
  const learningNote = getSystemNodeLearning(node);

  return (
    <div className="group/node relative z-10 hover:z-[70] focus-within:z-[70]">
      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition ${
          active
            ? "border-[#147c73]/45 bg-white shadow-[0_12px_25px_rgba(16,38,74,.08)]"
            : "border-[#10264a]/8 bg-white/75 hover:-translate-y-0.5 hover:border-[#10264a]/20 hover:bg-white"
        }`}
      >
        <div className="min-w-0">
          <div className="font-semibold">{node.name}</div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/35">
            {NODE_TYPE_LABELS[node.nodeType]}
          </div>
          {applicability ? (
            <span
              className={`mt-2 inline-flex max-w-full rounded-full border px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.06em] ${applicabilityToneClasses[applicability.status]}`}
            >
              {shortApplicabilityLabel(applicability.status)}
            </span>
          ) : null}
        </div>

        {learningNote ? (
          <span className="hidden shrink-0 rounded-full border border-[#b97512]/20 bg-[#fff8e8] px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-[#9a6513] sm:inline-flex">
            {common.explain}
          </span>
        ) : null}
      </button>

      {learningNote ? (
        <ExplainTooltip locale={locale} note={learningNote} title={`What is ${node.name}?`} />
      ) : null}
    </div>
  );
}

function NodeDrawer({
  locale,
  node,
  jurisdiction,
  onClose,
  onSelect,
}: {
  locale: Locale;
  node: SystemNode;
  jurisdiction: ContextSlug | null;
  onClose: () => void;
  onSelect: (id: string) => void;
}) {
  const relatedIds = EDGES.filter(
    (edge) => edge.from === node.id || edge.to === node.id,
  ).map((edge) => (edge.from === node.id ? edge.to : edge.from));
  const related = relatedIds
    .map((id) => NODES.find((item) => item.id === id))
    .filter((item): item is SystemNode => Boolean(item));
  const learningNote = getSystemNodeLearning(node);
  const applicability = getNodeApplicability(node, jurisdiction);
  const dimensions = getSystemMapDimensions(node);

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
        <ExplainDetails locale={locale} note={learningNote} title={node.name} />
      ) : null}

      <DetailBlock label="What it is" text={node.whatItIs} />
      <DetailBlock label="Issued by" text={node.issuingBody} />
      <DetailBlock label="Origin / reach" text={node.geography} />
      <DetailBlock label="Instrument-level legal effect" text={node.legalEffect} />

      <div className="mt-6 rounded-2xl border border-[#10264a]/10 bg-[#f8f5ee] p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/40">
          Atlas classification dimensions
        </div>
        <dl className="mt-3 grid gap-2 text-xs leading-5 text-[#10264a]/62">
          <DimensionLine label="Engineering relevance" value={dimensionLabel(dimensions.engineeringRelevance)} />
          <DimensionLine label="Treaty relationship" value={dimensionLabel(dimensions.treatyRelationship)} />
          <DimensionLine label="Domestic implementation" value={dimensionLabel(dimensions.domesticImplementation)} />
          <DimensionLine label="Legal applicability" value={dimensionLabel(dimensions.legalApplicability)} />
          <DimensionLine label="Atlas research status" value={dimensionLabel(dimensions.atlasResearchStatus)} />
        </dl>
      </div>

      {jurisdiction ? (
        <ApplicabilityBlock
          applicability={applicability}
          jurisdictionLabel={CONTEXT_LABELS[jurisdiction]}
        />
      ) : (
        <div className="mt-6 rounded-2xl border border-[#10264a]/10 bg-[#eef1f2] p-4 text-xs leading-5 text-[#10264a]/58">
          Select a jurisdiction to see whether this instrument participates in a
          legal pathway there, requires implementation, is referenced for
          approval or assurance, remains voluntary, or is outside that pathway.
        </div>
      )}

      <div className="mt-6 rounded-2xl bg-[#f2eadc] p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b97512]">
          Remember
        </div>
        <p className="mt-2 text-sm leading-6 text-[#10264a]/70">{node.takeaway}</p>
      </div>

      {related.length > 0 ? (
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
      ) : null}

      {node.source ? (
        <div className="mt-7">
          {node.sourceProvenance ? (
            <p className="mb-2 text-[11px] leading-5 text-[#10264a]/45">
              Source access: {dimensionLabel(node.sourceProvenance.access)} ·
              Treatment: {dimensionLabel(node.sourceProvenance.treatment)}
            </p>
          ) : null}
          <a
            href={node.source}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#147c73] underline decoration-[#147c73]/30 underline-offset-4"
          >
            Instrument source <span>↗</span>
          </a>
        </div>
      ) : null}
    </div>
  );
}

function ApplicabilityBlock({
  applicability,
  jurisdictionLabel,
}: {
  applicability: JurisdictionApplicability | null;
  jurisdictionLabel: string;
}) {
  if (!applicability) {
    return (
      <div className="mt-6 rounded-2xl border border-[#10264a]/10 bg-[#eef1f2] p-5">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/40">
          How this reaches {jurisdictionLabel}
        </div>
        <p className="mt-2 text-sm leading-6 text-[#10264a]/62">
          This node is a concept, methodology or institution rather than a legal
          instrument with a standalone jurisdiction-applicability status.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-[#147c73]/18 bg-[#edf5f2] p-5">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#147c73]">
        How this reaches {jurisdictionLabel}
      </div>
      <span
        className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold ${applicabilityToneClasses[applicability.status]}`}
      >
        {APPLICABILITY_STATUS_LABELS[applicability.status]}
      </span>
      <dl className="mt-4 space-y-3 text-xs leading-5 text-[#10264a]/64">
        <div>
          <dt className="font-semibold text-[#10264a]/78">Mechanism</dt>
          <dd>{APPLICABILITY_MECHANISM_LABELS[applicability.mechanism]}</dd>
        </div>
        <div>
          <dt className="font-semibold text-[#10264a]/78">Legal effect here</dt>
          <dd>{applicability.legalEffect}</dd>
        </div>
        {applicability.versionOrSeries ? (
          <div>
            <dt className="font-semibold text-[#10264a]/78">Version / series</dt>
            <dd>{applicability.versionOrSeries}</dd>
          </div>
        ) : null}
        {applicability.note ? (
          <div>
            <dt className="font-semibold text-[#10264a]/78">Note</dt>
            <dd>{applicability.note}</dd>
          </div>
        ) : null}
      </dl>
      {applicability.source ? (
        <a
          className="mt-4 inline-flex text-xs font-semibold text-[#147c73] underline decoration-[#147c73]/30 underline-offset-4"
          href={applicability.source}
          rel="noreferrer"
          target="_blank"
        >
          Applicability source ↗
        </a>
      ) : null}
    </div>
  );
}

function InternationalContextLayer() {
  return (
    <div>
      <div className="text-sm font-semibold">Three separate questions</div>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-white/62">
        The previous “Universal” view blurred origin and applicability. Atlas now
        treats them as separate relationships.
      </p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        <ArchitectureStep
          number="01"
          title="Where does it originate?"
          body="UNECE, ISO, SAE and other bodies create different kinds of instruments. International origin says nothing by itself about domestic binding force."
        />
        <ArchitectureStep
          number="02"
          title="How does it reach a jurisdiction?"
          body="Treaty participation, application of a UN Regulation, implementation of a UN GTR, incorporation or regulatory reference are different mechanisms."
        />
        <ArchitectureStep
          number="03"
          title="What does domestic law add?"
          body="Road access, operating-area rules, human roles, service authorizations, liability and enforcement remain jurisdiction-specific questions."
        />
      </div>

      <div className="mt-6 border-t border-white/10 pt-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ce0d6]/80">
          Shared comparison questions
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
    </div>
  );
}

function JurisdictionContextLayer({
  locale,
  profile,
  jurisdiction,
}: {
  locale: Locale;
  profile: JurisdictionProfile;
  jurisdiction: ContextSlug;
}) {
  const bindings = getContextBindings(profile.slug);
  const reach = CORE_NODES.map((node) => getNodeApplicability(node, jurisdiction)).filter(
    (item): item is JurisdictionApplicability => Boolean(item),
  );
  const counts = reach.reduce<Partial<Record<ApplicabilityStatus, number>>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9ce0d6]/80">
            International reach + domestic gateway
          </div>
          <h3 className="mt-1 font-serif text-2xl font-semibold">
            {CONTEXT_LABELS[jurisdiction]}
          </h3>
        </div>
        <Link
          className="rounded-sm text-xs font-semibold text-[#9ce0d6] underline decoration-[#9ce0d6]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#9ce0d6] focus-visible:ring-offset-4 focus-visible:ring-offset-[#10264a]"
          href={`/${profile.slug}`}
        >
          Open full jurisdiction profile →
        </Link>
      </div>

      <div className="mt-5 rounded-[18px] border border-white/10 bg-white/[0.05] p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/48">
          International-instrument reach on this map
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(counts).map(([status, count]) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-semibold text-white/72"
              key={status}
            >
              {APPLICABILITY_STATUS_LABELS[status as ApplicabilityStatus]} · {count}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs leading-5 text-white/52">
          Counts describe researched relationships on the current System Map; they
          are not a claim that every relevant instrument for this jurisdiction has
          already been mapped.
        </p>
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

              {learningConcept && learningNote ? (
                <ExplainDetails
                  locale={locale}
                  note={learningNote}
                  tone="dark"
                  title={learningConcept.name}
                />
              ) : null}

              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
                <Link
                  className="rounded-sm text-xs font-semibold text-[#9ce0d6] underline decoration-[#9ce0d6]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#9ce0d6]"
                  href={binding.sectionId ? `/${profile.slug}#${binding.sectionId}` : `/${profile.slug}`}
                >
                  Read jurisdiction analysis →
                </Link>
                {conclusion.legalBasis.slice(0, 3).map((reference, index) => {
                  const source = getRegulatorySource(reference.sourceId);
                  return (
                    <a
                      className="rounded-sm text-xs text-white/60 underline decoration-white/20 underline-offset-4 outline-none hover:text-white focus-visible:ring-2 focus-visible:ring-[#9ce0d6]"
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

function ArchitectureStep({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="border-l border-[#77c7bd]/45 bg-white/[0.045] p-4">
      <div className="text-[10px] font-semibold tracking-[0.14em] text-[#9ce0d6]/70">
        {number}
      </div>
      <h3 className="mt-2 font-serif text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-xs leading-5 text-white/62">{body}</p>
    </article>
  );
}

function getContextBindings(slug: JurisdictionSlug): ContextBinding[] {
  if (slug === "germany") {
    return JURISDICTION_CONTEXT_BINDINGS.germany;
  }
  if (slug === "netherlands") {
    return JURISDICTION_CONTEXT_BINDINGS.netherlands;
  }
  return GENERIC_CONTEXT_BINDINGS;
}

function getRegulatoryConcept(id: RegulatoryConceptId) {
  const concept = REGULATORY_CONCEPTS.find((item) => item.id === id);
  if (!concept) throw new Error(`Missing regulatory concept: ${id}`);
  return concept;
}

function getSystemNodeLearning(node: SystemNode): LearningNote | null {
  if (node.learningConceptId) return getLearningNote(node.learningConceptId);
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
}: {
  active?: boolean;
  href?: string;
  label: string;
  icon: string;
}) {
  const className = `rounded-full border px-4 py-2.5 text-sm font-semibold ${
    active
      ? "border-[#147c73]/30 bg-[#e7f1ed] text-[#147c73]"
      : "border-[#10264a]/10 bg-white text-[#10264a]/45"
  }`;
  const content = (
    <>
      <span className="mr-2">{icon}</span>
      {label}
    </>
  );

  return href ? (
    <Link className={className} href={href}>
      {content}
    </Link>
  ) : (
    <button type="button" className={className}>
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
      <span className="w-8 text-center font-serif text-lg text-[#147c73]">{symbol}</span>
      <span className="text-[#10264a]/60">{text}</span>
    </div>
  );
}

function shortApplicabilityLabel(status: ApplicabilityStatus) {
  const labels: Record<ApplicabilityStatus, string> = {
    treaty_participation: "Treaty pathway",
    applies: "Applies",
    implementation_required: "Implement locally",
    implemented: "Implemented",
    referenced: "Referenced",
    voluntary_relevance: "Voluntary / assurance",
    not_in_pathway: "Outside pathway",
    research_pending: "Research pending",
  };
  return labels[status];
}

function DimensionLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 sm:grid-cols-[130px_1fr]">
      <dt className="font-semibold text-[#10264a]/72">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

function dimensionLabel(value: string) {
  return value.replaceAll("_", " ").replace(/^./, (character) =>
    character.toUpperCase(),
  );
}

function orderNodes(cluster: CoreClusterId, nodes: SystemNode[]) {
  const order: Record<CoreClusterId, string[]> = {
    automation: ["sae-j3016", "odd"],
    functional: ["iso-26262", "hara", "sec", "asil"],
    intended: ["sotif", "iso-pas-8800"],
    cyber: ["iso-sae-21434", "un-r155", "iso-24089", "un-r156"],
    assurance: ["safety-case", "ul-4600", "iso-3450x", "natm"],
    unece: [
      "wp29",
      "agreement-1958",
      "un-regulations",
      "un-r157",
      "agreement-1998",
      "un-gtrs",
    ],
  };
  const index = new Map(order[cluster].map((id, i) => [id, i]));
  return [...nodes].sort(
    (a, b) => (index.get(a.id) ?? 999) - (index.get(b.id) ?? 999),
  );
}
