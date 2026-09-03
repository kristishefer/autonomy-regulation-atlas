import Link from "next/link";

import {
  COMPARE_GROUPS,
  JURISDICTION_PROFILES,
  getRegulatorySource,
  type ConfidenceStatus,
  type RegulatoryConclusion,
  type StatusTone,
} from "@/app/explore/regulatory-data";
import {
  getCommonUiCopy,
  getCompareUiCopy,
  getMethodologyStatusCopy,
  type CommonUiCopy,
  type CompareUiCopy,
  type MethodologyStatusCopy,
} from "@/app/i18n/global-ui-copy";
import { LanguageNotice } from "@/app/i18n/LanguageNotice";
import { getRequestLocale } from "@/app/i18n/request-locale";

const toneClasses: Record<StatusTone, string> = {
  positive: "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  conditional: "border-[#b97512]/25 bg-[#f7edd7] text-[#8f5f13]",
  neutral: "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/72",
  watch: "border-[#b97512]/25 bg-[#fff8e8] text-[#8f5f13]",
};

export default async function ComparePage() {
  const locale = await getRequestLocale();
  const common = getCommonUiCopy(locale);
  const compare = getCompareUiCopy(locale);
  const methodology = getMethodologyStatusCopy(locale);
  const profiles = JURISDICTION_PROFILES;
  const profileNames = profiles.map(
    (profile) => profile.localizedNames?.[locale] ?? profile.name,
  );
  const jurisdictionColumns = {
    gridTemplateColumns: `repeat(${profiles.length}, minmax(250px, 1fr))`,
  };
  const comparisonCanvas = {
    minWidth: `${198 + profiles.length * 262}px`,
  };

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <LanguageNotice locale={locale} />

      <section className="relative overflow-hidden border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
            {compare.eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl break-words hyphens-auto font-serif text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl">
            {compare.title}
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#10264a]/60">
            {compare.intro}
          </p>

          <div className="mt-9 grid gap-px overflow-hidden rounded-[22px] border border-[#10264a]/10 bg-[#10264a]/10 sm:grid-cols-3">
            <MethodItem label={methodology.notIdentified} body={compare.notIdentifiedBody} />
            <MethodItem label={methodology.unclear} body={compare.unclearBody} />
            <MethodItem label={methodology.scopeFirst} body={compare.scopeFirstBody} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <nav
          aria-label={common.compareJurisdictions}
          className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-[#147c73]"
        >
          {profiles.map((profile, index) => (
            <a
              className="rounded-sm underline decoration-[#147c73]/25 underline-offset-4 outline-none hover:decoration-[#147c73] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-2"
              href={`#compare-${profile.slug}`}
              key={profile.slug}
            >
              {profileNames[index]} · {profile.code}
            </a>
          ))}
        </nav>

        <p className="mb-3 flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#147c73] sm:hidden">
          <span>{compare.swipe}</span>
          <span className="text-base" aria-hidden="true">
            →
          </span>
        </p>

        <div className="relative">
          <div
            aria-label={`${common.compareJurisdictions}: ${profileNames.join(", ")}`}
            className="overflow-x-auto pb-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#147c73]"
            tabIndex={0}
          >
            <div style={comparisonCanvas}>
            <div className="grid gap-3 border-b border-[#10264a]/12 pb-5 pl-[198px]">
              <div className="grid gap-3" style={jurisdictionColumns}>
                {profiles.map((profile, index) => (
                  <div
                    className="group border-l border-[#147c73]/35 pl-4"
                    id={`compare-${profile.slug}`}
                    key={profile.slug}
                  >
                    <Link href={`/${profile.slug}`}>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/38">
                        {profile.code}
                      </span>
                      <span className="mt-1 block font-serif text-2xl font-semibold group-hover:text-[#147c73]">
                        {profileNames[index]} ↗
                      </span>
                      <span className="mt-2 block text-[10px] leading-4 text-[#10264a]/45">
                        Selected scenario · {profile.selectedScenario.label}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="divide-y divide-[#10264a]/12">
              {COMPARE_GROUPS.map((group, groupIndex) => (
                <section className="py-10" key={group.id}>
                  <div className="mb-7 grid grid-cols-[182px_1fr] gap-4">
                    <div>
                      <span className="font-mono text-[10px] text-[#b97512]">
                        {String(groupIndex + 1).padStart(2, "0")}
                      </span>
                      <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight">
                        {group.title}
                      </h2>
                    </div>
                    <p className="max-w-2xl self-end text-xs leading-5 text-[#10264a]/48">
                      {group.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {group.fields.map((field) => (
                      <div className="grid grid-cols-[182px_1fr] gap-4" key={field.id}>
                        <h3 className="pt-5 text-xs font-semibold leading-5 text-[#10264a]/55">
                          {field.label}
                        </h3>
                        <div className="grid gap-3" style={jurisdictionColumns}>
                          {profiles.map((profile) => (
                            <ConclusionCell
                              common={common}
                              compare={compare}
                              conclusion={profile.conclusions[field.id]}
                              key={profile.slug}
                              methodology={methodology}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
            </div>
          </div>

          <div
            className="pointer-events-none absolute top-0 right-0 bottom-4 w-12 bg-gradient-to-l from-[#fbf7ef] via-[#fbf7ef]/80 to-transparent sm:hidden"
            aria-hidden="true"
          />
        </div>
      </section>

      <footer className="border-t border-[#10264a]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-9 text-xs leading-5 text-[#10264a]/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>{compare.footerLeft}</span>
          <span>{compare.footerRight}</span>
        </div>
      </footer>
    </main>
  );
}

function MethodItem({ label, body }: { label: string; body: string }) {
  return (
    <div className="bg-white/70 p-5">
      <h2 className="text-xs font-semibold text-[#147c73]">{label}</h2>
      <p className="mt-2 text-xs leading-5 text-[#10264a]/52">{body}</p>
    </div>
  );
}

function ConclusionCell({
  common,
  compare,
  conclusion,
  methodology,
}: {
  common: CommonUiCopy;
  compare: CompareUiCopy;
  conclusion: RegulatoryConclusion;
  methodology: MethodologyStatusCopy;
}) {
  const confidenceLabels: Record<ConfidenceStatus, string> = {
    established: methodology.establishedLong,
    unclear: methodology.unclear,
    not_identified: methodology.notIdentifiedLong,
  };
  const status = localizeStatus(conclusion.status, methodology);

  return (
    <article className="rounded-[18px] border border-[#10264a]/10 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneClasses[conclusion.tone]}`}>
          {status}
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/34">
          {confidenceLabels[conclusion.confidenceStatus]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#10264a]/68">{conclusion.summary}</p>
      <p className="mt-4 border-t border-[#10264a]/8 pt-3 text-[11px] leading-5 text-[#10264a]/45">
        <strong className="text-[#10264a]/62">{common.scope}:</strong> {conclusion.scopeLabel}
      </p>

      {conclusion.uncertaintyReason ? (
        <p className="mt-2 text-[11px] leading-5 text-[#8f5f13]">
          <strong>{methodology.whyUnclear}:</strong> {conclusion.uncertaintyReason}
        </p>
      ) : null}
      {conclusion.searchScope ? (
        <p className="mt-2 text-[11px] leading-5 text-[#8f5f13]">
          <strong>{methodology.searchScope}:</strong> {conclusion.searchScope}
        </p>
      ) : null}

      {conclusion.atlasAnalysis ? (
        <details className="mt-3 border-t border-[#10264a]/8 pt-3">
          <summary className="cursor-pointer list-none text-[11px] font-semibold text-[#147c73]">
            {compare.atlasInterpretation} +
          </summary>
          <p className="mt-2 text-[11px] leading-5 text-[#10264a]/52">
            {conclusion.atlasAnalysis}
          </p>
        </details>
      ) : null}

      {conclusion.regimeComponents?.length ? (
        <details className="mt-3 border-t border-[#10264a]/8 pt-3">
          <summary className="cursor-pointer list-none text-[11px] font-semibold text-[#147c73]">
            Regime-component status +
          </summary>
          <ul className="mt-2 space-y-2 text-[10px] leading-4 text-[#10264a]/52">
            {conclusion.regimeComponents.map((component) => (
              <li key={`${component.component}-${component.provision ?? component.sourceId ?? "status"}`}>
                <strong className="text-[#10264a]/68">{component.component}:</strong>{" "}
                {formatComponentStatus(component.legalStatus)}
                {component.effectiveFrom ? ` · from ${component.effectiveFrom}` : ""}
                {component.note ? ` · ${component.note}` : ""}
              </li>
            ))}
          </ul>
        </details>
      ) : null}

      {conclusion.review.stale ? (
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8f5f13]">
          Review required · {conclusion.review.reviewMethod.replaceAll("_", " ")}
        </p>
      ) : null}

      <ul className="mt-3 space-y-1.5">
        {conclusion.legalBasis.map((reference, index) => {
          const source = getRegulatorySource(reference.sourceId);
          return (
            <li className="text-[10px] leading-4 text-[#10264a]/42" key={`${reference.sourceId}-${reference.provision ?? index}`}>
              <a
                className="font-semibold underline decoration-[#147c73]/25 underline-offset-2 hover:decoration-[#147c73]"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.shortTitle}
              </a>
              {reference.provision ? ` · ${reference.provision}` : ""}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function localizeStatus(
  status: string,
  methodology: MethodologyStatusCopy,
) {
  const statusCopy: Record<string, string> = {
    Conditional: methodology.conditional,
    "Experimental only": methodology.experimentalOnly,
    "Not identified": methodology.notIdentified,
    "Not required": methodology.notRequired,
    Permitted: methodology.permitted,
    Required: methodology.required,
    Unclear: methodology.unclear,
  };

  return statusCopy[status] ?? status;
}

function formatComponentStatus(status: string) {
  return status.replaceAll("_", " ").replace(/^./, (character) =>
    character.toUpperCase(),
  );
}
