import Link from "next/link";

import { ExplainDetails } from "@/app/explore/Explain";
import {
  LEARNING_CONCEPTS,
  getLearningNote,
} from "@/app/explore/learning-concepts";
import {
  getRegulatorySource,
  legalStatusLabel,
  type JurisdictionProfile,
  type SourceReference,
  type StatusTone,
} from "@/app/explore/regulatory-data";

const toneClasses: Record<StatusTone, string> = {
  positive: "border-[#147c73]/20 bg-[#e7f1ed] text-[#11665f]",
  conditional: "border-[#b97512]/20 bg-[#f7edd7] text-[#8f5f13]",
  neutral: "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/72",
  watch: "border-[#b97512]/20 bg-[#fff8e8] text-[#8f5f13]",
};

export function JurisdictionProfileView({
  profile,
}: {
  profile: JurisdictionProfile;
}) {
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

          <nav className="flex items-center gap-4 text-xs font-semibold text-[#10264a]/55 sm:gap-6 sm:text-sm">
            <Link className="transition hover:text-[#10264a]" href="/explore/system-map">
              System Map
            </Link>
            <Link className="transition hover:text-[#10264a]" href="/explore/compare">
              Compare
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 pb-14 pt-10 sm:px-8 lg:px-10 lg:pb-20 lg:pt-14">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/40">
            <Link className="hover:text-[#147c73]" href="/">
              Explorer
            </Link>
            <span aria-hidden="true">/</span>
            <span>Jurisdictions</span>
            <span aria-hidden="true">/</span>
            <span>{profile.code}</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_310px] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                Regulatory profile
              </p>
              <h1 className="mt-3 font-serif text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                {profile.name}
              </h1>
              <p className="mt-5 max-w-3xl text-sm leading-6 text-[#10264a]/55">
                {profile.scenario}
              </p>
            </div>

            <div className="border-l border-[#147c73]/35 pl-5">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#147c73]">
                Current-law review
              </div>
              <p className="mt-2 text-sm leading-6 text-[#10264a]/60">
                {profile.verifiedLabel}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-5xl border-y border-[#10264a]/15 py-7 font-serif text-2xl font-semibold leading-snug tracking-[-0.02em] sm:text-3xl">
            {profile.primaryMessage}
          </div>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-18">
          <SectionHeading
            eyebrow="Regulatory snapshot"
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
                  <p className="mt-5 border-t border-[#10264a]/10 pt-4 text-xs leading-5 text-[#10264a]/45">
                    <strong className="text-[#10264a]/60">Scope:</strong>{" "}
                    {item.scope}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-[#edf0e7]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[300px_1fr] lg:px-10 lg:py-18">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
              Regulatory architecture
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em]">
              Separate layers, separate legal questions
            </h2>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden rounded-[24px] border border-[#10264a]/10 bg-[#10264a]/10 md:grid-cols-2">
              {profile.architectureLayers.map((layer) => (
                <div className="bg-[#fbf7ef] p-6" key={layer.label}>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b97512]">
                    {layer.label}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#10264a]/65">
                    {layer.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 border-l-2 border-[#147c73] pl-5 font-serif text-xl font-semibold leading-8">
              {profile.architectureConclusion}
            </p>
          </div>
        </div>
      </section>

      <div>
        {profile.sections.map((section, index) => (
          <section
            className={`border-b border-[#10264a]/10 ${index % 2 === 0 ? "bg-[#fbf7ef]" : "bg-white"}`}
            id={section.id}
            key={section.id}
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-18">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                  {String(index + 1).padStart(2, "0")} · {section.eyebrow}
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-[-0.03em]">
                  {section.title}
                </h2>

                {section.explain?.map((conceptId) => {
                  const concept = LEARNING_CONCEPTS[conceptId];
                  return (
                    <ExplainDetails
                      deeperHref={concept.deeperHref}
                      key={conceptId}
                      note={getLearningNote(conceptId, profile.slug)}
                      title={concept.name}
                    />
                  );
                })}
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
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b97512]">
                      Key takeaway
                    </div>
                    <p className="mt-2 font-serif text-lg font-semibold leading-7">
                      {section.takeaway}
                    </p>
                  </div>
                ) : null}

                <SourceBasis references={section.sources} />
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="bg-[#10264a] text-[#fbf7ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.75fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#77c7bd]">
              What this means for deployment
            </p>
            <div className="mt-6 space-y-5">
              {profile.deploymentConclusion.map((paragraph, index) => (
                <p
                  className={
                    index === profile.deploymentConclusion.length - 1
                      ? "font-serif text-2xl font-semibold leading-9 text-white"
                      : "max-w-3xl text-base leading-7 text-white/62"
                  }
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/12 bg-white/[0.055] p-6">
            <h2 className="font-serif text-2xl font-semibold">Questions for the deployment team</h2>
            <ol className="mt-6 space-y-4">
              {profile.practicalQuestions.map((question, index) => (
                <li className="grid grid-cols-[28px_1fr] gap-3 text-sm leading-6 text-white/65" key={question}>
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

      <OfficialSources profile={profile} />

      <footer className="border-t border-[#10264a]/10 bg-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-9 text-xs text-[#10264a]/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>Autonomy Regulation Atlas · Regulatory information for operational analysis</span>
          <Link className="font-semibold text-[#147c73]" href="/explore/compare">
            Compare jurisdictions →
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
      <summary className="cursor-pointer list-none text-xs font-semibold text-[#147c73]">
        Legal basis and exact sources +
      </summary>
      <ul className="mt-4 space-y-3">
        {references.map((reference, index) => {
          const source = getRegulatorySource(reference.sourceId);
          return (
            <li className="text-xs leading-5 text-[#10264a]/55" key={`${reference.sourceId}-${reference.provision ?? index}`}>
              <a
                className="font-semibold text-[#10264a]/72 underline decoration-[#10264a]/20 underline-offset-4 hover:decoration-[#10264a]"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.shortTitle}
              </a>
              {reference.provision ? ` · ${reference.provision}` : ""}
              <span className="ml-2 text-[#10264a]/35">
                {legalStatusLabel(source.legalStatus)}
              </span>
            </li>
          );
        })}
      </ul>
    </details>
  );
}

function OfficialSources({ profile }: { profile: JurisdictionProfile }) {
  const sources = profile.sourceIds.map(getRegulatorySource);
  const currentLaw = sources.filter((source) => source.legalStatus === "in_force");
  const interpretative = sources.filter((source) => source.legalStatus !== "in_force");

  return (
    <section className="bg-white" id="official-sources">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <SectionHeading eyebrow="Official sources" title="Trace the analysis to authority" />
        <p className="mt-5 max-w-3xl text-sm leading-6 text-[#10264a]/55">
          Binding instruments and interpretative materials are kept separate. Links point to official publishers; primary texts remain in their original language.
        </p>

        <div className="mt-9 grid gap-8 lg:grid-cols-[1fr_0.55fr]">
          <SourceGroup sources={currentLaw} title="Current law" />
          <SourceGroup sources={interpretative} title="Interpretative material" />
        </div>
      </div>
    </section>
  );
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
      <h3 className="border-b border-[#10264a]/12 pb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#10264a]/40">
        {title}
      </h3>
      {sources.length === 0 ? (
        <p className="mt-4 text-sm text-[#10264a]/40">No separate material in this category.</p>
      ) : (
        <ul className="divide-y divide-[#10264a]/10">
          {sources.map((source) => (
            <li className="py-5" key={source.id}>
              <a
                className="font-serif text-lg font-semibold underline decoration-[#147c73]/25 underline-offset-4 hover:decoration-[#147c73]"
                href={source.url}
                rel="noreferrer"
                target="_blank"
              >
                {source.title} ↗
              </a>
              <p className="mt-2 text-xs leading-5 text-[#10264a]/45">
                {source.authority} · {source.statusLabel} · checked 31 Aug 2026
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
