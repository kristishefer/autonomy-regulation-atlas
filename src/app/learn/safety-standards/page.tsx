import type { Metadata } from "next";
import Link from "next/link";

import { getKnowledgeConcept, getLearningPath } from "@/app/explore/learning-data";
import { LearningBreadcrumb } from "@/app/learn/LearningComponents";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const metadata: Metadata = {
  title: "Safety & Standards | Atlas Learning",
  description: "Six connected units explaining ADS safety assurance, standards, scenario-based assessment and evidence.",
};

export default async function SafetyStandardsPage() {
  const locale = await getRequestLocale();
  const path = getLearningPath("safety-standards");
  if (!path) throw new Error("Missing Safety & Standards Learning path");
  return (
    <main>
      <section className="border-b border-[#10264a]/10">
        <div className="mx-auto max-w-6xl px-5 pb-14 pt-10 sm:px-8 sm:pb-16 sm:pt-14 lg:px-10">
          <LearningBreadcrumb locale={locale} />
          <p className="mt-9 text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">Learning path 02</p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl">{path.title}</h1>
          <p className="mt-6 max-w-3xl font-serif text-2xl leading-9 text-[#10264a]/78">{path.coreQuestion}</p>
          <p className="mt-5 max-w-3xl text-base leading-7 text-[#10264a]/62">{path.description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10">
        <ol className="border-y border-[#10264a]/12">
          {path.conceptIds.map((id, index) => {
            const concept = getKnowledgeConcept(id);
            return (
              <li className="border-b border-[#10264a]/10 last:border-b-0" key={id}>
                <Link className="group grid gap-4 py-7 outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] sm:grid-cols-[70px_1fr_auto] sm:items-center" href={`/learn/safety-standards/${concept.slug}`}>
                  <span className="font-mono text-sm font-semibold text-[#b97512]">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-serif text-2xl font-semibold group-hover:text-[#147c73] sm:text-3xl">{concept.title}</span>
                    <span className="mt-2 block max-w-2xl text-sm leading-6 text-[#10264a]/58">{concept.coreQuestion}</span>
                  </span>
                  <span className="text-sm font-semibold text-[#147c73]">Open unit →</span>
                </Link>
              </li>
            );
          })}
        </ol>
        <aside className="mt-10 border-l-2 border-[#b97512] pl-5 text-sm leading-6 text-[#10264a]/62">
          <strong className="text-[#10264a]">Reading principle:</strong> a concept is not a standard, a standard is not law, and technical evidence is not automatically permission to operate.
        </aside>
      </section>
    </main>
  );
}
