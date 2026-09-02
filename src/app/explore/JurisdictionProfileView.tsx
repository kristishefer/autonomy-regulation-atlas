import Link from "next/link";

import { DeploymentReality } from "@/app/explore/DeploymentReality";
import { ExplainDetails } from "@/app/explore/Explain";
import {
  LEARNING_CONCEPTS,
  getLearningNote,
} from "@/app/explore/learning-concepts";
import {
  getRegulatorySource,
  legalStatusLabel,
  type JurisdictionProfile,
  type LegalStatus,
  type SourceReference,
  type SourceType,
  type StatusTone,
} from "@/app/explore/regulatory-data";
import { getCommonUiCopy, type CommonUiCopy } from "@/app/i18n/global-ui-copy";
import { LanguageNotice } from "@/app/i18n/LanguageNotice";
import { LanguageSwitcher } from "@/app/i18n/LanguageSwitcher";
import type { Locale } from "@/app/i18n/locale";

const toneClasses: Record<StatusTone, string> = {
  positive: "border-[#147c73]/20 bg-[#e7f1ed] text-[#11665f]",
  conditional: "border-[#b97512]/20 bg-[#f7edd7] text-[#8f5f13]",
  neutral: "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/72",
  watch: "border-[#b97512]/20 bg-[#fff8e8] text-[#8f5f13]",
};

const answerAccentClasses: Record<StatusTone, string> = {
  positive: "border-[#147c73]",
  conditional: "border-[#b97512]",
  neutral: "border-[#10264a]/45",
  watch: "border-[#b97512]",
};

const sourceTypeLabels: Record<SourceType, string> = {
  official_legislation: "Legislation",
  official_regulation: "Regulation",
  official_guidance: "Official guidance",
  regulator_material: "Regulator material",
  legislative_history: "Legislative history",
  court_decision: "Court decision",
  eu_legislation: "EU legislation",
};

const sourceStatusLabels: Record<LegalStatus, string> = {
  in_force: "In force",
  adopted_not_yet_effective: "Adopted · not yet effective",
  proposed: "Proposed",
  draft: "Draft",
  guidance: "Guidance",
  legislative_history: "Legislative history",
  case_law: "Case law",
};

export function JurisdictionProfileView({
  locale,
  profile,
}: {
  locale: Locale;
  profile: JurisdictionProfile;
}) {
  const common = getCommonUiCopy(locale);
  const profileName = profile.localizedNames?.[locale] ?? profile.name;

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <header className="sticky top-0 z-50 border-b border-[#10264a]/10 bg-[#fbf7ef]/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
          <Link className="flex items-center gap-3" href="/">
            <span className="grid size-9 place-items-center rounded-full border border-[#10264a]/20 font-serif font-semibold">
              A
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.08em] sm:inline">
              Autonomy Regulation Atlas
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6">
            <nav
              aria-label={common.primaryNavigation}
              className="hidden items-center gap-4 text-xs font-semibold text-[#10264a]/55 sm:flex sm:gap-6 sm:text-sm"
            >
              <Link className="transition hover:text-[#10264a]" href="/explore/system-map">
                {common.systemMap}
              </Link>
              <Link className="transition hover:text-[#10264a]" href="/explore/compare">
                {common.compare}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <LanguageNotice locale={locale} />

      <section className="relative overflow-hidden border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:px-10 lg:pb-20 lg:pt-14">
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/55">
            <Link className="hover:text-[#147c73]" href="/">
              {common.explorer}
            </Link>
            <span aria-hidden="true">/</span>
            <span>{common.jurisdictions}</span>
            <span aria-hidden="true">/</span>
            <span>{profile.code}</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                {common.regulatoryProfile}
              </p>
              <h1 className="mt-3 break-words hyphens-auto font-serif text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                {profileName}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-[#10264a]/65">
                {profile.scenario}
              </p>
            </div>

            <div className="border-l border-[#147c73]/35 pl-5">
              <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#147c73]">
                {common.currentLawReview}
              </div>
              <p className="mt-2 text-sm leading-6 text-[#10264a]/68">
                {profile.verifiedLabel}
              </p>
            </div>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                {common.deploymentAnswer}
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {profile.deploymentAnswers.map((item) => (
                  <article
                    className={`border-l-2 bg-white/55 px-5 py-5 ${answerAccentClasses[item.tone]}`}
                    key={item.label}
                  >
                    <p className="text-xs font-semibold text-[#10264a]/65">
                      {item.label}
                    </p>
                    <p className="mt-2 font-serif text-xl font-semibold leading-7">
                      {item.answer}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-[#10264a]/62">
                      {item.detail}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="border border-[#10264a]/12 bg-[#edf0e7]/70 p-5" aria-label={common.scenario}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#147c73]">
                {common.scenario}
              </p>
              <dl className="mt-3 divide-y divide-[#10264a]/10">
                {profile.scenarioScope.map((item) => (
                  <div className="py-3 first:pt-0 last:pb-0" key={item.label}>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/55">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm font-semibold leading-5">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>

          <div className="mt-8 max-w-5xl border-l-2 border-[#147c73] pl-5 font-serif text-xl font-semibold leading-8 tracking-[-0.015em] sm:text-2xl">
            {profile.primaryMessage}
          </div>
          {profile.scopeNote ? (
            <p className="mt-5 max-w-5xl border-l border-[#b97512]/55 pl-5 text-sm font-semibold leading-6 text-[#10264a]/68">
              <span className="text-[#8f5f13]">Scope:</span> {profile.scopeNote}
            </p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-18">
          <SectionHeading
            eyebrow={common.regulatorySnapshot}
            title="The position for this scenario"
          />

          <div className="mt-8 grid gap-px overflow-hidden rounded-[24px] border border-[#10264a]/10 bg-[#10264a]/10 sm:grid-cols-2 xl:grid-cols-4">
            {profile.snapshot.map((item) => (
              <article className="min-h-48 bg-[#fbf7ef] p-6" key={item.label}>
                <p className="text-xs font-semibold leading-5 text-[#10264a]/55">
                  {item.label}
                </p>
                <div
                  className={`mt-5 inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${toneClasses[item.tone]}`}
                >
                  {item.status}
                </div>
                {item.scope ? (
                  <p className="mt-5 border-t border-[#10264a]/10 pt-4 text-xs leading-5 text-[#10264a]/60">
                    <strong className="text-[#10264a]/75">{common.scope}:</strong>{" "}
                    {item.scope}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <nav
        aria-label={common.onThisPage}
        className="border-b border-[#10264a]/10 bg-[#fbf7ef]/96 lg:sticky lg:top-[69px] lg:z-40 lg:backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 overflow-x-auto px-5 py-4 sm:px-8 lg:px-10">
          <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-[#10264a]/60">
            {common.onThisPage}
          </span>
          <span className="h-5 w-px shrink-0 bg-[#10264a]/15" aria-hidden="true" />
          <div className="flex min-w-max gap-5 pr-5 text-xs font-semibold text-[#10264a]/65">
            {profile.pageNavigation.map((item) => (
              <a
                className="rounded-sm outline-none transition hover:text-[#147c73] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-4"
                href={item.href}
                key={item.href}
              >
                {localizePageNavigation(item.label, common)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section className="border-b border-[#10264a]/10 bg-[#edf0e7]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[260px_1fr] lg:px-10 lg:py-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
              {common.regulatoryArchitecture}
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.035em]">
              Separate layers, separate legal questions
            </h2>
          </div>

          <div>
            <div className="grid gap-3 md:flex md:items-stretch">
              {profile.architectureLayers.map((layer, index) => (
                <div className="contents" key={layer.label}>
                  <div className="border border-[#10264a]/12 bg-[#fbf7ef] p-5 md:flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a6513]">
                      {layer.label}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[#10264a]/65">
                      {layer.body}
                    </p>
                  </div>
                  {index < profile.architectureLayers.length - 1 ? (
                    <div className="grid place-items-center text-[#147c73]" aria-hidden="true">
                      <span className="md:hidden">↓</span>
                      <span className="hidden md:inline">→</span>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
            <p className="mt-5 border-l-2 border-[#147c73] pl-5 text-sm font-semibold leading-6">
              {profile.architectureConclusion}
            </p>
          </div>
        </div>
      </section>

      <div>
        {profile.sections.map((section, index) => (
          <section
            className={`scroll-mt-32 border-b border-[#10264a]/10 ${index % 2 === 0 ? "bg-[#fbf7ef]" : "bg-white"}`}
            id={section.id}
            key={section.id}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-18">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                  {String(index + 1).padStart(2, "0")} · {section.eyebrow}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  {section.title}
                </h2>
              </div>

              <div>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    className="mb-5 max-w-4xl text-base leading-7 text-[#10264a]/68 last:mb-0"
                    key={paragraph}
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-6 grid gap-3 text-sm leading-6 text-[#10264a]/65 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li className="border-l border-[#b97512]/55 pl-4" key={bullet}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.flow ? <RegulatoryFlow steps={section.flow} /> : null}

                {section.takeaway ? (
                  <div className="mt-7 rounded-[22px] bg-[#f2eadc] p-5 sm:p-6">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a6513]">
                      {common.keyTakeaway}
                    </div>
                    <p className="mt-2 font-serif text-lg font-semibold leading-7">
                      {section.takeaway}
                    </p>
                  </div>
                ) : null}

                {section.explain?.map((conceptId) => {
                  const concept = LEARNING_CONCEPTS[conceptId];
                  return (
                    <ExplainDetails
                      deeperHref={concept.deeperHref}
                      key={conceptId}
                      locale={locale}
                      note={getLearningNote(conceptId, profile.slug)}
                      title={concept.name}
                    />
                  );
                })}

                <SourceBasis references={section.sources} />
              </div>
            </div>
          </section>
        ))}
      </div>

      {profile.slug === "netherlands" || profile.slug === "germany" ? (
        <DeploymentReality jurisdiction={profile.slug} />
      ) : null}

      <section className="bg-[#10264a] text-[#fbf7ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.75fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77c7bd]">
              {common.whatMeansDeployment}
            </p>
            <div className="mt-6 space-y-5">
              {profile.deploymentConclusion.map((paragraph, index) => (
                <p
                  className={
                    index === profile.deploymentConclusion.length - 1
                      ? "font-serif text-2xl font-semibold leading-9 text-white"
                      : "max-w-3xl text-base leading-7 text-white/72"
                  }
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/12 bg-white/[0.055] p-6">
            <h2 className="font-serif text-2xl font-semibold">{common.deploymentQuestions}</h2>
            <ol className="mt-6 space-y-4">
              {profile.practicalQuestions.map((question, index) => (
                <li className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-white/75" key={question}>
                  <span className="font-mono text-[10px] text-[#77c7bd]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <OfficialSources common={common} profile={profile} />

      <footer className="border-t border-[#10264a]/10 bg-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-9 text-xs text-[#10264a]/60 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>Autonomy Regulation Atlas · Regulatory information for operational analysis</span>
          <Link className="font-semibold text-[#147c73]" href="/explore/compare">
            {common.compareJurisdictions} →
          </Link>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em]">
        {title}
      </h2>
    </div>
  );
}

function RegulatoryFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="mt-8 grid overflow-hidden rounded-[20px] border border-[#10264a]/10 bg-white sm:grid-cols-2 xl:grid-cols-4">
      {steps.map((step, index) => (
        <li className="relative min-h-28 border-b border-[#10264a]/10 p-4 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 xl:border-b-0 xl:[&:nth-child(2)]:border-r" key={step}>
          <span className="font-mono text-[9px] text-[#b97512]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-5 text-sm font-semibold leading-5">{step}</p>
          {index < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute right-3 top-3 text-[#10264a]/25">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

function SourceBasis({ references }: { references: SourceReference[] }) {
  return (
    <details className="mt-7 border-t border-[#10264a]/10 pt-4">
      <summary className="inline-flex cursor-pointer list-none rounded-sm text-xs font-semibold text-[#147c73] outline-none focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-4">
        Legal basis and exact sources +
      </summary>
      <ul className="mt-4 space-y-3">
        {references.map((reference, index) => {
          const source = getRegulatorySource(reference.sourceId);
          return (
            <li className="text-xs leading-5 text-[#10264a]/65" key={`${reference.sourceId}-${reference.provision ?? index}`}>
              <a
                className="rounded-sm font-semibold text-[#10264a]/80 underline decoration-[#10264a]/25 underline-offset-4 outline-none hover:decoration-[#10264a] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-2"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.shortTitle}
              </a>
              {reference.provision ? ` · ${reference.provision}` : ""}
              <span className="ml-2 text-[#10264a]/55">
                {legalStatusLabel(source.legalStatus)}
              </span>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function OfficialSources({
  common,
  profile,
}: {
  common: CommonUiCopy;
  profile: JurisdictionProfile;
}) {
  const sources = profile.sourceIds.map(getRegulatorySource);
  const currentLaw = sources.filter(
    (source) =>
      source.legalStatus === "in_force" &&
      ["official_legislation", "official_regulation", "eu_legislation"].includes(
        source.type,
      ),
  );
  const futureRules = sources.filter((source) =>
    ["adopted_not_yet_effective", "proposed", "draft"].includes(source.legalStatus),
  );
  const futureRuleIds = new Set(futureRules.map((source) => source.id));
  const interpretative = sources.filter(
    (source) =>
      !futureRuleIds.has(source.id) &&
      (source.type === "regulator_material" ||
        ["guidance", "legislative_history", "case_law"].includes(
          source.legalStatus,
        )),
  );

  return (
    <section className="scroll-mt-32 bg-white" id="official-sources">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-14">
        <SectionHeading eyebrow={common.officialSource} title="Trace the analysis to authority" />
        <p className="mt-5 max-w-3xl text-sm leading-6 text-[#10264a]/65">
          Binding instruments and interpretative materials are kept separate. Links point to official publishers; primary texts remain in their original language.
        </p>

        <details className="group mt-7 border-y border-[#10264a]/12 py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm font-semibold text-[#147c73] outline-none focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-4">
            <span>Open full official source index</span>
            <span aria-hidden="true" className="text-lg font-normal transition-transform group-open:rotate-45">+</span>
          </summary>
          <div className="mt-7 grid gap-8 border-t border-[#10264a]/10 pt-7 lg:grid-cols-3">
            <SourceGroup sources={currentLaw} title="Current law" />
            <SourceGroup sources={interpretative} title="Official guidance & regulator material" />
            <SourceGroup sources={futureRules} title="Future / proposed rules" />
          </div>
        </details>
      </div>
    </section>
  );
}

function localizePageNavigation(label: string, common: CommonUiCopy) {
  const labels: Record<string, string> = {
    "Deployment answer": common.deploymentAnswer,
    "Official sources": common.sources,
    "Regulatory architecture": common.regulatoryArchitecture,
    "Regulatory snapshot": common.regulatorySnapshot,
  };

  return labels[label] ?? label;
}

function SourceGroup({
  sources,
  title,
}: {
  sources: ReturnType<typeof getRegulatorySource>[];
  title: string;
}) {
  return (
    <div>
      <h3 className="border-b border-[#10264a]/12 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#10264a]/60">
        {title}
      </h3>
      {sources.length === 0 ? (
        <p className="mt-4 text-sm text-[#10264a]/60">No separate material in this category.</p>
      ) : (
        <ul className="divide-y divide-[#10264a]/10">
          {sources.map((source) => (
            <li className="py-5" key={source.id}>
              <a
                className="rounded-sm font-serif text-lg font-semibold underline decoration-[#147c73]/25 underline-offset-4 outline-none hover:decoration-[#147c73] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-2"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.title} ↗
              </a>
              <p className="mt-2 text-xs leading-5 text-[#10264a]/62">
                Type: {formatSourceType(source.type)}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#10264a]/62">
                Status: {formatSourceStatus(source.legalStatus, source.statusLabel)}
              </p>
              <p className="mt-1 text-xs leading-5 text-[#10264a]/62">
                {source.authority} · checked {formatSourceDate(source.lastChecked)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatSourceType(type: SourceType) {
  return sourceTypeLabels[type];
}

function formatSourceStatus(status: LegalStatus, detail: string) {
  const label = sourceStatusLabels[status];

  return detail.toLowerCase().startsWith(label.toLowerCase())
    ? detail
    : `${label} — ${detail}`;
}

function formatSourceDate(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);

  return Number.isNaN(parsed.getTime())
    ? value
    : new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "UTC",
      }).format(parsed);
}
