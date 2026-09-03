import type { Metadata } from "next";

import {
  GLOSSARY_ENTRIES,
  resolveLearningSource,
} from "@/app/explore/learning-data";
import {
  TERM_STATUS_LABELS,
  getJurisdictionTerms,
} from "@/app/explore/regulatory-terminology";
import { getCommonUiCopy } from "@/app/i18n/global-ui-copy";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const metadata: Metadata = {
  title: "Glossary | Atlas Learning",
  description: "A source-backed projection of Atlas concepts, technical terms and jurisdiction-native terminology.",
};

export default async function GlossaryPage() {
  const locale = await getRequestLocale();
  const common = getCommonUiCopy(locale);

  return (
    <main>
      <section className="border-b border-[#10264a]/10">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-12 sm:px-8 sm:pb-16 lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">Shared knowledge projection</p>
          <h1 className="mt-4 font-serif text-5xl font-semibold leading-none tracking-[-0.045em] sm:text-6xl">{common.glossary}</h1>
          <p className="mt-6 max-w-3xl text-base leading-7 text-[#10264a]/65">Universal analytical concepts and official technical terms are shown with their scope and sources. Jurisdiction-native vocabulary is mapped without assuming literal legal equivalence.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="divide-y divide-[#10264a]/10 border-y border-[#10264a]/12">
          {GLOSSARY_ENTRIES.map((entry) => {
            const definition = entry.item.atlasDefinition;
            const sourceIds = entry.item.sourceIds;
            const officialDefinitionRefs =
              entry.kind === "term" ? entry.item.officialDefinitionRefs : [];
            const officialTerms = entry.kind === "concept" && entry.item.id === "odd"
              ? getJurisdictionTerms([
                  "nl-operationeel-domein",
                  "de-betriebsbereich",
                ])
              : [];
            return (
              <article className="grid gap-5 py-7 lg:grid-cols-[0.72fr_1.28fr] lg:gap-12" id={entry.id} key={`${entry.kind}-${entry.id}`}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.13em] text-[#147c73]">{entry.kind === "concept" ? "Atlas concept" : "Technical term"}</p>
                  <h2 className="mt-2 font-serif text-2xl font-semibold">{entry.label}</h2>
                </div>
                <div>
                  <p className="text-sm leading-6 text-[#10264a]/68">{definition}</p>
                  {officialTerms.length ? (
                    <div className="mt-4 border-l-2 border-[#b97512] pl-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8b5a10]">Jurisdiction-native terms · related, not automatically equivalent</p>
                      {officialTerms.map((term) => (
                        <p className="mt-2 text-xs leading-5 text-[#10264a]/62" key={term.id}><span className="font-semibold text-[#10264a]" lang={term.originalLanguage.tag}>{term.officialTerm}</span> · {term.jurisdiction === "germany" ? "Germany" : "Netherlands"} · {TERM_STATUS_LABELS[term.termStatus]} · {term.englishGloss}</p>
                      ))}
                    </div>
                  ) : null}
                  {entry.item.commonConfusions.length ? (
                    <details className="group mt-4 border-t border-[#10264a]/10 pt-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-xs font-semibold text-[#8b5a10] focus-visible:ring-2 focus-visible:ring-[#b97512]">
                        <span>{common.commonConfusion}</span><span aria-hidden="true" className="text-base transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <ul className="mt-3 space-y-2">
                        {entry.item.commonConfusions.map((item) => <li className="text-xs leading-5 text-[#10264a]/60" key={typeof item === "string" ? item : item.title}>— {typeof item === "string" ? item : `${item.title}: ${item.body}`}</li>)}
                      </ul>
                    </details>
                  ) : null}
                  {officialDefinitionRefs.length ? (
                    <div className="mt-4 space-y-2">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#10264a]/45">Official definition basis</p>
                      {officialDefinitionRefs.map((reference) => {
                        const source = resolveLearningSource(reference.sourceId);
                        return (
                          <p className="text-[11px] leading-5 text-[#10264a]/58" key={`${entry.id}-${reference.sourceId}`}>
                            {reference.context}: {" "}
                            <a className="rounded-sm font-semibold text-[#147c73] underline decoration-[#147c73]/25 underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512]" href={source.url} rel="noreferrer" target="_blank">{source.shortTitle} · {source.category} · {source.status} ↗</a>
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      {[...new Set(sourceIds)].map((id) => {
                        const source = resolveLearningSource(id);
                        return <a className="rounded-sm text-[11px] font-semibold text-[#147c73] underline decoration-[#147c73]/25 underline-offset-4 focus-visible:ring-2 focus-visible:ring-[#b97512]" href={source.url} key={id} rel="noreferrer" target="_blank">{source.shortTitle} · {source.category} · {source.status} ↗</a>;
                      })}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
