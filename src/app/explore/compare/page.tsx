import Link from "next/link";

import {
  COMPARE_GROUPS,
  JURISDICTION_PROFILES,
  getRegulatorySource,
  type ConfidenceStatus,
  type RegulatoryConclusion,
  type StatusTone,
} from "@/app/explore/regulatory-data";

const toneClasses: Record<StatusTone, string> = {
  positive: "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  conditional: "border-[#b97512]/25 bg-[#f7edd7] text-[#8f5f13]",
  neutral: "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/72",
  watch: "border-[#b97512]/25 bg-[#fff8e8] text-[#8f5f13]",
};

const confidenceLabels: Record<ConfidenceStatus, string> = {
  established: "Established from identified sources",
  unclear: "Unclear",
  not_identified: "Not identified in the stated search scope",
};

export default function ComparePage() {
  const profiles = JURISDICTION_PROFILES;
  const jurisdictionColumns = {
    gridTemplateColumns: `repeat(${profiles.length}, minmax(250px, 1fr))`,
  };

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
            <Link className="text-[#147c73]" href="/explore/compare">
              Compare
            </Link>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-25" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-18">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
            Jurisdiction comparison
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl">
            Same deployment question, different legal architecture
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#10264a]/60">
            Compare structured conclusions across a shared set of regulatory dimensions. Status, scope, uncertainty and exact legal basis stay attached to every answer.
          </p>

          <div className="mt-9 grid gap-px overflow-hidden rounded-[22px] border border-[#10264a]/10 bg-[#10264a]/10 sm:grid-cols-3">
            <MethodItem label="Not identified" body="The stated official-source search did not identify a rule. It does not mean no rule exists." />
            <MethodItem label="Unclear" body="The available authority does not support a binary conclusion; the reason remains visible." />
            <MethodItem label="Scope first" body="A status is read with its vehicle, automation, road, use-case and human-role scope." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="overflow-x-auto pb-4">
          <div className="min-w-[680px]">
            <div className="grid gap-3 border-b border-[#10264a]/12 pb-5 pl-[198px]">
              <div className="grid gap-3" style={jurisdictionColumns}>
                {profiles.map((profile) => (
                  <Link
                    className="group border-l border-[#147c73]/35 pl-4"
                    href={`/${profile.slug}`}
                    key={profile.slug}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#10264a]/38">
                      {profile.code}
                    </span>
                    <span className="mt-1 block font-serif text-2xl font-semibold group-hover:text-[#147c73]">
                      {profile.name} ↗
                    </span>
                  </Link>
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
                              conclusion={profile.conclusions[field.id]}
                              key={profile.slug}
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
      </section>

      <footer className="border-t border-[#10264a]/10 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-9 text-xs leading-5 text-[#10264a]/45 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <span>Current-law comparison · sources last checked 31 Aug 2026</span>
          <span>Atlas analysis is regulatory information, not legal advice</span>
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

function ConclusionCell({ conclusion }: { conclusion: RegulatoryConclusion }) {
  return (
    <article className="rounded-[18px] border border-[#10264a]/10 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${toneClasses[conclusion.tone]}`}>
          {conclusion.status}
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/34">
          {confidenceLabels[conclusion.confidenceStatus]}
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#10264a]/68">{conclusion.summary}</p>
      <p className="mt-4 border-t border-[#10264a]/8 pt-3 text-[11px] leading-5 text-[#10264a]/45">
        <strong className="text-[#10264a]/62">Scope:</strong> {conclusion.scopeLabel}
      </p>

      {conclusion.uncertaintyReason ? (
        <p className="mt-2 text-[11px] leading-5 text-[#8f5f13]">
          <strong>Why unclear:</strong> {conclusion.uncertaintyReason}
        </p>
      ) : null}
      {conclusion.searchScope ? (
        <p className="mt-2 text-[11px] leading-5 text-[#8f5f13]">
          <strong>Search scope:</strong> {conclusion.searchScope}
        </p>
      ) : null}

      {conclusion.atlasAnalysis ? (
        <details className="mt-3 border-t border-[#10264a]/8 pt-3">
          <summary className="cursor-pointer list-none text-[11px] font-semibold text-[#147c73]">
            Atlas interpretation +
          </summary>
          <p className="mt-2 text-[11px] leading-5 text-[#10264a]/52">
            {conclusion.atlasAnalysis}
          </p>
        </details>
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
