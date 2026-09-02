import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { LEARNING_PATHS, LEARNING_SEED_META } from "@/app/explore/learning-data";
import { getCommonUiCopy, getLearningUiCopy } from "@/app/i18n/global-ui-copy";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const metadata: Metadata = {
  title: "Learning | Autonomy Regulation Atlas",
  description: "Guided regulatory learning paths connecting technical concepts, evidence, jurisdiction context and primary sources.",
};

const plannedPaths = [
  ["01", "Automation & Human Roles", "Who performs the driving task, fallback and legally relevant human roles?"],
  ["03", "Approval & Road Access", "How product approval and public-road permission remain separate regulatory gates."],
  ["04", "Operations & Oversight", "How operating organizations, supervisors and continuing duties shape deployment."],
  ["05", "Data, Incidents & Enforcement", "How evidence changes once an ADS is operating in the real world."],
  ["06", "Liability & Insurance", "How responsibility and financial protection are allocated after harm."],
] as const;

export default async function LearningPage() {
  const locale = await getRequestLocale();
  const common = getCommonUiCopy(locale);
  const learning = getLearningUiCopy(locale);
  const path = LEARNING_PATHS[0];
  return (
    <main>
      <section className="relative border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[1fr_280px] lg:items-end lg:px-10 lg:pb-20 lg:pt-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">Atlas Learning</p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">Learn the architecture behind lawful deployment</h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#10264a]/65 sm:text-lg sm:leading-8">Follow concepts from their technical meaning through standards, evidence, jurisdiction-specific legal effect and exact primary sources.</p>
          </div>
          <Image alt="Atlas Cat, the Learning guide" className="mx-auto h-auto w-48 object-contain lg:w-60" height={360} priority src="/atlaslings/cat.png" width={320} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">Learning paths</p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em]">Regulatory questions, not a course catalogue</h2>
            <p className="mt-5 text-sm leading-6 text-[#10264a]/62">Each path reuses the same concepts, sources and jurisdiction overlays you encounter in Explorer and Explain.</p>
          </div>
          <div className="border-y border-[#10264a]/12">
            <Link className="group grid gap-4 border-b border-[#10264a]/10 py-7 outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] sm:grid-cols-[56px_1fr_auto] sm:items-center" href={`/learn/${path.slug}`}>
              <span className="font-mono text-xs font-semibold text-[#b97512]">02</span>
              <span>
                <span className="block font-serif text-3xl font-semibold group-hover:text-[#147c73]">{path.title}</span>
                <span className="mt-2 block max-w-2xl text-sm leading-6 text-[#10264a]/60">{path.description}</span>
              </span>
              <span className="text-sm font-semibold text-[#147c73]">{learning.startPath} →</span>
            </Link>
            {plannedPaths.map(([number, title, description]) => (
              <div className="grid gap-3 border-b border-[#10264a]/10 py-6 last:border-b-0 sm:grid-cols-[56px_1fr_auto] sm:items-center" key={title}>
                <span className="font-mono text-xs font-semibold text-[#10264a]/32">{number}</span>
                <span>
                  <span className="block font-serif text-xl font-semibold text-[#10264a]/62">{title}</span>
                  <span className="mt-1 block text-xs leading-5 text-[#10264a]/45">{description}</span>
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#10264a]/35">{learning.planned}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#10264a]/10 bg-[#10264a] text-[#fbf7ef]">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9ce0d6]">Shared knowledge layer</p>
            <h2 className="mt-3 max-w-3xl font-serif text-3xl font-semibold">Concept → official term → legal effect → primary source</h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-white/62">The glossary is a projection of the same knowledge objects—not a parallel list of simplified definitions.</p>
          </div>
          <Link className="inline-flex w-fit rounded-sm border border-white/25 px-5 py-3 text-sm font-semibold text-[#9ce0d6] outline-none hover:border-[#9ce0d6] focus-visible:ring-2 focus-visible:ring-[#f1c780]" href="/learn/glossary">{common.open} {common.glossary} →</Link>
        </div>
      </section>
      <p className="mx-auto max-w-7xl px-5 py-5 text-[10px] text-[#10264a]/42 sm:px-8 lg:px-10">Knowledge seed v{LEARNING_SEED_META.schemaVersion} · source status verified {LEARNING_SEED_META.lastVerified}</p>
    </main>
  );
}
