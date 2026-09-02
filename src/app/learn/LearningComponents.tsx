import Image from "next/image";
import Link from "next/link";

import {
  getJurisdictionOverlay,
  getKnowledgeConcept,
  getKnowledgeStandard,
  getRealCase,
  getStandardsWatchItem,
  resolveLearningSource,
  type JurisdictionOverlay,
  type KnowledgeConcept,
  type KnowledgeStandard,
  type RealCase,
} from "@/app/explore/learning-data";
import {
  getCommonUiCopy,
  getLearningUiCopy,
  getMethodologyStatusCopy,
  type CommonUiCopy,
  type LearningUiCopy,
  type MethodologyStatusCopy,
} from "@/app/i18n/global-ui-copy";
import type { Locale } from "@/app/i18n/locale";

export function ConceptUnit({
  concept,
  locale,
}: {
  concept: KnowledgeConcept;
  locale: Locale;
}) {
  const common = getCommonUiCopy(locale);
  const learning = getLearningUiCopy(locale);
  const methodology = getMethodologyStatusCopy(locale);
  const standards = concept.standardIds.map(getKnowledgeStandard);
  const overlays = concept.levels.applied.jurisdictionOverlayIds.map(
    getJurisdictionOverlay,
  );
  const cases = concept.levels.applied.caseIds
    .map(getRealCase)
    .filter((item) => item.mvpDisplay && item.officiallyEstablished);

  return (
    <main>
      <section className="border-b border-[#10264a]/10">
        <div className="mx-auto max-w-5xl px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10">
          <LearningBreadcrumb current={concept.title} locale={locale} />
          <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
            Safety &amp; Standards
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl">
            {concept.title}
          </h1>
          <p className="mt-6 max-w-3xl font-serif text-2xl leading-9 text-[#10264a]/78">
            {concept.coreQuestion}
          </p>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#10264a]/65">
            {concept.atlasDefinition}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <CatExplains title={concept.title} body={concept.plainEnglish} />

        <LearningLevel open title={learning.essentials} eyebrow="Start here">
          <p className="max-w-3xl text-base leading-7 text-[#10264a]/68">
            {concept.levels.essentials.summary}
          </p>
          <NumberedList items={concept.levels.essentials.keyPoints} />
          <WhyItMatters items={concept.whyItMatters} title={common.whyMattersHere} />
          <Confusions items={concept.commonConfusions} title={common.commonConfusion} />
        </LearningLevel>

        <LearningLevel title={learning.applied} eyebrow="Evidence and regulation">
          <h3 className="font-serif text-2xl font-semibold">How it works</h3>
          <NumberedList items={concept.levels.applied.howItWorks} />

          {concept.id === "safety-assurance" ||
          concept.id === "scenario-based-assessment" ? (
            <NatmArchitecture />
          ) : null}

          <div className="mt-10 border-t border-[#10264a]/10 pt-8">
            <h3 className="font-serif text-2xl font-semibold">
              Regulatory relevance
            </h3>
            <div className="mt-4 space-y-4">
              {concept.levels.applied.regulatoryRelevance.map((item) => (
                <p className="max-w-3xl text-sm leading-6 text-[#10264a]/68" key={item}>
                  {item}
                </p>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {concept.levels.applied.regulatoryExamples.map((example) => (
                <article
                  className="border-l-2 border-[#147c73] bg-[#edf0e7] p-5"
                  key={example.title}
                >
                  <h4 className="font-serif text-xl font-semibold">
                    {example.title}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-[#10264a]/65">
                    {example.takeaway}
                  </p>
                  <SourceLinks ids={example.sourceIds} compact />
                </article>
              ))}
            </div>
          </div>

          <StandardsSection learning={learning} standards={standards} />
          <JurisdictionSection
            common={common}
            learning={learning}
            methodology={methodology}
            overlays={overlays}
          />
          {cases.length ? <RealCases cases={cases} learning={learning} /> : null}
          {concept.levels.applied.caseDisplayNote ? (
            <p className="mt-7 border-l-2 border-[#b97512] pl-4 text-xs leading-5 text-[#10264a]/55">
              {concept.levels.applied.caseDisplayNote}
            </p>
          ) : null}

          <KnowledgeChecks checks={concept.levels.applied.checkYourUnderstanding} title={learning.knowledgeCheck} />
        </LearningLevel>

        <LearningLevel title={learning.deepDive} eyebrow="Trace the reasoning">
          <p className="max-w-3xl text-base leading-7 text-[#10264a]/68">
            {concept.levels.deepDive.summary}
          </p>
          <div className="mt-7 border-y border-[#10264a]/10 py-6">
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#147c73]">
              Topics
            </h3>
            <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {concept.levels.deepDive.topics.map((topic) => (
                <li className="flex gap-3 text-sm leading-6 text-[#10264a]/68" key={topic}>
                  <span aria-hidden="true" className="text-[#b97512]">→</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8">
            <h3 className="font-serif text-2xl font-semibold">{learning.officialReferences}</h3>
            <SourceLinks ids={concept.levels.deepDive.sourceIds} />
          </div>
        </LearningLevel>

        <RelatedConcepts concept={concept} title={learning.relatedConcepts} />
        <p className="mt-8 text-[11px] leading-5 text-[#10264a]/45">
          Content and source status last verified {concept.lastVerified}
        </p>
      </div>
    </main>
  );
}

export function LearningBreadcrumb({
  current,
  locale,
}: {
  current?: string;
  locale: Locale;
}) {
  const common = getCommonUiCopy(locale);

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs font-semibold text-[#10264a]/48">
      <Link className="rounded-sm hover:text-[#147c73] focus-visible:ring-2 focus-visible:ring-[#b97512]" href="/learn">
        {common.learning}
      </Link>
      <span aria-hidden="true">/</span>
      <Link className="rounded-sm hover:text-[#147c73] focus-visible:ring-2 focus-visible:ring-[#b97512]" href="/learn/safety-standards">
        Safety &amp; Standards
      </Link>
      {current ? (
        <>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-[#10264a]/70">{current}</span>
        </>
      ) : null}
    </nav>
  );
}

function LearningLevel({
  children,
  eyebrow,
  open = false,
  title,
}: {
  children: React.ReactNode;
  eyebrow: string;
  open?: boolean;
  title: string;
}) {
  return (
    <details className="group mt-8 border-y border-[#10264a]/12" open={open}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-sm py-6 outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#147c73]">
            {eyebrow}
          </div>
          <h2 className="mt-1 font-serif text-3xl font-semibold">{title}</h2>
        </div>
        <span aria-hidden="true" className="text-2xl font-light text-[#b97512] transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="border-t border-[#10264a]/10 pb-10 pt-8">{children}</div>
    </details>
  );
}

function CatExplains({ title, body }: { title: string; body: string }) {
  return (
    <aside className="grid gap-5 border border-[#b97512]/20 bg-[#fff8e8] p-6 sm:grid-cols-[96px_1fr] sm:items-center sm:p-8">
      <Image
        alt=""
        aria-hidden="true"
        className="h-24 w-24 object-contain"
        height={160}
        src="/atlaslings/cat-explain.png"
        width={160}
      />
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a6513]">Cat explains</p>
        <h2 className="mt-1 font-serif text-2xl font-semibold">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[#10264a]/68">{body}</p>
      </div>
    </aside>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="mt-7 grid gap-4 sm:grid-cols-2">
      {items.map((item, index) => (
        <li className="flex gap-4 border-t border-[#10264a]/10 pt-4 text-sm leading-6 text-[#10264a]/68" key={item}>
          <span className="font-mono text-xs font-semibold text-[#b97512]">{String(index + 1).padStart(2, "0")}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function WhyItMatters({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="mt-10 bg-[#10264a] p-6 text-[#fbf7ef] sm:p-8">
      <h3 className="font-serif text-2xl font-semibold">{title}</h3>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li className="flex gap-3 text-sm leading-6 text-white/70" key={item}>
            <span aria-hidden="true" className="text-[#f1c780]">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Confusions({
  items,
  title,
}: {
  items: { title: string; body: string }[];
  title: string;
}) {
  return (
    <div className="mt-10">
      <h3 className="font-serif text-2xl font-semibold">{title}</h3>
      <div className="mt-5 divide-y divide-[#10264a]/10 border-y border-[#10264a]/10">
        {items.map((item) => (
          <article className="grid gap-2 py-5 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] sm:gap-8" key={item.title}>
            <h4 className="font-semibold text-[#8b5a10]">{item.title}</h4>
            <p className="text-sm leading-6 text-[#10264a]/65">{item.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function NatmArchitecture() {
  const pillars = [
    "Simulation / virtual testing",
    "Track testing",
    "Real-world testing",
    "Audit / assessment",
    "In-service monitoring / reporting",
  ];
  return (
    <aside className="mt-10 border border-[#10264a]/12 bg-[#edf0e7] p-6 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">UNECE NATM architecture</p>
      <h3 className="mt-2 font-serif text-2xl font-semibold">A scenario catalogue supports five validation pillars</h3>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[#10264a]/65">
        The scenario catalogue helps organize the assessment. It supports the evidence architecture; it is not a sixth validation pillar.
      </p>
      <ol className="mt-6 grid gap-px overflow-hidden border border-[#10264a]/10 bg-[#10264a]/10 sm:grid-cols-2 lg:grid-cols-5">
        {pillars.map((pillar, index) => (
          <li className="bg-[#fbf7ef] p-4 text-xs leading-5 text-[#10264a]/68" key={pillar}>
            <span className="mb-2 block font-mono text-[10px] font-semibold text-[#b97512]">P{index + 1}</span>
            {pillar}
          </li>
        ))}
      </ol>
      <SourceLinks ids={["src-unece-natm-2023"]} compact />
    </aside>
  );
}

function StandardsSection({
  learning,
  standards,
}: {
  learning: LearningUiCopy;
  standards: KnowledgeStandard[];
}) {
  if (!standards.length) return null;
  return (
    <section className="mt-12 border-t border-[#10264a]/10 pt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">Standards layer</p>
      <h3 className="mt-2 font-serif text-3xl font-semibold">Standards are evidence, not permission</h3>
      <div className="mt-6 space-y-5">
        {standards.map((standard) => (
          <StandardCard key={standard.id} learning={learning} standard={standard} />
        ))}
      </div>
    </section>
  );
}

function StandardCard({
  learning,
  standard,
}: {
  learning: LearningUiCopy;
  standard: KnowledgeStandard;
}) {
  const source = resolveLearningSource(standard.officialSourceId);
  return (
    <article className="border-l-2 border-[#b97512] pl-5 sm:pl-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="font-serif text-2xl font-semibold">{standard.name}</h4>
          <p className="mt-1 text-xs leading-5 text-[#10264a]/52">{standard.fullTitle}</p>
        </div>
        <span className="border border-[#147c73]/25 bg-[#edf0e7] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#147c73]">
          Current · {standard.currentEdition}
        </span>
      </div>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-[#10264a]/68">{standard.scope}</p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <StandardList items={standard.whatItDoes} title="What it does" />
        <StandardList items={standard.whatItDoesNotDo} title="What it does not do" />
      </div>
      <p className="mt-4 text-sm leading-6 text-[#10264a]/68"><strong className="text-[#10264a]">ADS relevance:</strong> {standard.avRelevance}</p>
      <a className="mt-4 inline-flex rounded-sm text-xs font-semibold text-[#147c73] underline decoration-[#147c73]/30 underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512]" href={source.url} rel="noreferrer" target="_blank">
        {source.shortTitle} · {source.status} ↗
      </a>
      {standard.watchIds.map((id) => {
        const watch = getStandardsWatchItem(id);
        return (
          <details className="group mt-5 border-t border-[#10264a]/10 pt-4" key={id}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-xs font-semibold text-[#8b5a10] focus-visible:ring-2 focus-visible:ring-[#b97512]">
              <span>{learning.standardsWatch} · {watch.title}</span>
              <span aria-hidden="true" className="text-base transition-transform group-open:rotate-45">+</span>
            </summary>
            <div className="mt-3 bg-[#fff8e8] p-4 text-xs leading-5 text-[#10264a]/65">
              <p>{watch.status}</p>
              <p className="mt-2"><strong>Display rule:</strong> {watch.displayRule}</p>
              <SourceLinks ids={watch.sourceIds} compact />
            </div>
          </details>
        );
      })}
    </article>
  );
}

function StandardList({ items, title }: { items: string[]; title: string }) {
  return (
    <div>
      <h5 className="text-xs font-semibold uppercase tracking-[0.12em] text-[#10264a]/55">{title}</h5>
      <ul className="mt-3 space-y-2">
        {items.map((item) => <li className="text-xs leading-5 text-[#10264a]/62" key={item}>— {item}</li>)}
      </ul>
    </div>
  );
}

function JurisdictionSection({
  common,
  learning,
  methodology,
  overlays,
}: {
  common: CommonUiCopy;
  learning: LearningUiCopy;
  methodology: MethodologyStatusCopy;
  overlays: JurisdictionOverlay[];
}) {
  if (!overlays.length) return null;
  return (
    <section className="mt-12 border-t border-[#10264a]/10 pt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">{learning.jurisdictionExamples}</p>
      <h3 className="mt-2 font-serif text-3xl font-semibold">One concept, different legal effect</h3>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {overlays.map((overlay) => (
          <JurisdictionCard
            key={overlay.id}
            methodology={methodology}
            overlay={overlay}
          />
        ))}
      </div>
      <Link className="mt-6 inline-flex rounded-sm text-sm font-semibold text-[#147c73] underline decoration-[#147c73]/25 underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512]" href="/explore/compare">
        {common.compareJurisdictions} →
      </Link>
    </section>
  );
}

function JurisdictionCard({
  methodology,
  overlay,
}: {
  methodology: MethodologyStatusCopy;
  overlay: JurisdictionOverlay;
}) {
  const label = overlay.jurisdictionId === "germany" ? "Germany" : "Netherlands";
  const status = overlay.confidenceStatus === "not_identified" ? methodology.notIdentified : overlay.confidenceStatus === "unclear" ? methodology.unclear : methodology.established;
  return (
    <article className="border border-[#10264a]/12 bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h4 className="font-serif text-2xl font-semibold">{label}</h4>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${overlay.confidenceStatus === "established" ? "text-[#147c73]" : "text-[#8b5a10]"}`}>{status}</span>
      </div>
      <p className="mt-4 text-sm font-medium leading-6 text-[#10264a]/78">{overlay.summary}</p>
      <p className="mt-3 text-xs leading-5 text-[#10264a]/60">{overlay.legalContext}</p>
      <p className="mt-3 border-l border-[#b97512]/50 pl-3 text-xs leading-5 text-[#10264a]/60"><strong>Why the distinction matters:</strong> {overlay.whatIsDifferentHere}</p>
      {overlay.confidenceStatus === "not_identified" ? (
        <p className="mt-3 bg-[#fff8e8] p-3 text-[11px] leading-5 text-[#10264a]/58"><strong>{methodology.searchScope}:</strong> {overlay.searchScope}</p>
      ) : null}
      {overlay.confidenceStatus === "unclear" ? (
        <p className="mt-3 bg-[#fff8e8] p-3 text-[11px] leading-5 text-[#10264a]/58"><strong>{methodology.whyUnclear}:</strong> {overlay.uncertaintyReason}</p>
      ) : null}
      <SourceLinks ids={overlay.sourceIds} compact />
      <Link className="mt-4 inline-flex rounded-sm text-xs font-semibold text-[#147c73] underline decoration-[#147c73]/25 underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512]" href={`/${overlay.jurisdictionId}`}>
        Open {label} profile →
      </Link>
    </article>
  );
}

function RealCases({
  cases,
  learning,
}: {
  cases: RealCase[];
  learning: LearningUiCopy;
}) {
  return (
    <section className="mt-12 border-t border-[#10264a]/10 pt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">{learning.realCase}</p>
      <h3 className="mt-2 font-serif text-3xl font-semibold">Real cases, careful conclusions</h3>
      <div className="mt-6 space-y-6">
        {cases.map((item) => (
          <article className="bg-[#10264a] p-6 text-[#fbf7ef] sm:p-8" key={item.id}>
            <div className="flex flex-wrap justify-between gap-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#9ce0d6]">
              <span>{item.authority}</span><span>{item.date} · {item.jurisdiction}</span>
            </div>
            <h4 className="mt-4 max-w-3xl font-serif text-2xl font-semibold">{item.title}</h4>
            <CaseList items={item.establishedFacts} title={learning.establishedFacts} />
            <CaseList items={item.authorityFindings} title={learning.authorityFindings} />
            <CaseList items={item.atlasRelevance} title={learning.atlasRelevance} />
            <div className="mt-6 border border-[#f1c780]/25 bg-white/[0.05] p-4">
              <CaseList items={item.notToConclude} title={learning.notToConclude} />
            </div>
            <SourceLinks dark ids={item.sourceIds} />
          </article>
        ))}
      </div>
    </section>
  );
}

function CaseList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="mt-6">
      <h5 className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#f1c780]">{title}</h5>
      <ul className="mt-3 space-y-2">
        {items.map((item) => <li className="flex gap-3 text-xs leading-5 text-white/68" key={item}><span aria-hidden="true">—</span><span>{item}</span></li>)}
      </ul>
    </div>
  );
}

function KnowledgeChecks({
  checks,
  title,
}: {
  checks: { question: string; answer: string }[];
  title: string;
}) {
  if (!checks.length) return null;
  return (
    <section className="mt-12 border-t border-[#10264a]/10 pt-8">
      <h3 className="font-serif text-3xl font-semibold">{title}</h3>
      <div className="mt-5 space-y-3">
        {checks.map((check) => (
          <details className="group border border-[#10264a]/12 bg-white" key={check.question}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-5 rounded-sm p-5 text-sm font-semibold leading-6 focus-visible:ring-2 focus-visible:ring-[#b97512]">
              <span>{check.question}</span><span aria-hidden="true" className="text-xl font-light text-[#b97512] transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="border-t border-[#10264a]/10 px-5 py-4 text-sm leading-6 text-[#10264a]/68">{check.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function RelatedConcepts({
  concept,
  title,
}: {
  concept: KnowledgeConcept;
  title: string;
}) {
  return (
    <nav aria-label="Related Learning concepts" className="mt-12 border-t border-[#10264a]/12 pt-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">{title}</p>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        {concept.relatedConceptIds.map((id) => {
          const related = getKnowledgeConcept(id);
          return <Link className="rounded-sm text-sm font-semibold text-[#10264a] underline decoration-[#b97512]/45 underline-offset-4 hover:text-[#147c73] focus-visible:ring-2 focus-visible:ring-[#b97512]" href={`/learn/safety-standards/${related.slug}`} key={id}>{related.title} →</Link>;
        })}
      </div>
    </nav>
  );
}

export function SourceLinks({ compact = false, dark = false, ids }: { compact?: boolean; dark?: boolean; ids: string[] }) {
  const uniqueIds = [...new Set(ids)];
  return (
    <div className={`${compact ? "mt-4" : "mt-6"} flex flex-wrap gap-x-5 gap-y-3`}>
      {uniqueIds.map((id) => {
        const source = resolveLearningSource(id);
        return (
          <a className={`rounded-sm text-xs font-semibold underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512] ${dark ? "text-[#9ce0d6] decoration-[#9ce0d6]/30" : "text-[#147c73] decoration-[#147c73]/30"}`} href={source.url} key={id} rel="noreferrer" target="_blank" title={`${source.category} · ${source.status}`}>
            {source.shortTitle} · {source.category} · {source.status} ↗
          </a>
        );
      })}
    </div>
  );
}
