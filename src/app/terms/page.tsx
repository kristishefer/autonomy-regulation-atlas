import { LanguageNotice } from "@/app/i18n/LanguageNotice";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const metadata = {
  title: "Terms of Use | Autonomy Regulation Atlas",
  description: "Terms governing use and reuse of Autonomy Regulation Atlas.",
};

export default async function TermsPage() {
  const locale = await getRequestLocale();

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <LanguageNotice locale={locale} variant="terms" />

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
          Legal
        </p>
        <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-sm text-[#10264a]/45">
          Effective 31 August 2026
        </p>

        <div className="mt-12 space-y-10 text-[15px] leading-7 text-[#10264a]/70">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              1. Purpose
            </h2>
            <p className="mt-3">
              Autonomy Regulation Atlas provides general regulatory information,
              explanatory material and comparative analysis concerning autonomous
              mobility. It is intended for informational, research and educational
              use. It is not legal advice and does not create a lawyer-client
              relationship.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              2. Original Atlas materials
            </h2>
            <p className="mt-3">
              Unless otherwise stated, original Atlas commentary, taxonomy,
              regulatory classifications, annotations, data models, learning
              content, original graphics and mascots, interface elements, source
              code, and the original selection and arrangement of regulatory
              materials are protected by applicable intellectual-property laws.
              Copyright © 2026 Kristina Shefer. All rights reserved.
            </p>
            <p className="mt-3">
              To the extent available under applicable law, rights are also
              reserved in the Atlas database, including any sui generis database
              right arising from substantial investment in obtaining, verifying or
              presenting its contents.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              3. Permitted use
            </h2>
            <p className="mt-3">
              You may access and read the publicly available Atlas for personal,
              academic, journalistic, educational and internal professional
              reference. Limited quotation of original Atlas text is permitted
              where lawful, with reasonable attribution to “Autonomy Regulation
              Atlas” and, where practical, a link to the relevant Atlas page.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              4. Restricted reuse
            </h2>
            <p className="mt-3">
              Except where permitted by applicable law or with prior permission,
              you may not reproduce or redistribute a substantial part of the
              Atlas; commercially republish original Atlas commentary, learning
              content, graphics or mascots; create a competing or substitute
              regulatory dataset substantially derived from Atlas content; or use
              automated extraction, scraping or similar techniques to obtain or
              re-use all or a substantial part of the Atlas database.
            </p>
            <p className="mt-3">
              Repeated or systematic extraction or re-use of insubstantial parts may
              also be restricted where applicable database law so provides.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              5. Automated extraction and text and data mining
            </h2>
            <p className="mt-3">
              To the extent the rightsholder is legally entitled to reserve rights
              against text and data mining or automated extraction, those rights are
              expressly reserved. This does not restrict any mandatory exception or
              limitation that applies under applicable law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              6. Official and third-party materials
            </h2>
            <p className="mt-3">
              The Atlas does not claim ownership of legislation, regulatory
              instruments, official publications, standards, source documents,
              third-party quotations, trademarks, software or other materials owned
              by third parties. Those materials remain subject to the rights,
              licences, terms and legal exceptions applicable to them. Links to
              external sources are provided for reference.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              7. Accuracy and currency
            </h2>
            <p className="mt-3">
              Regulatory regimes change and may depend on vehicle configuration,
              operational design domain, permits, local implementation and other
              facts. The Atlas aims to identify primary sources and explain their
              operational significance, but users should verify current primary
              sources and obtain qualified advice before relying on Atlas content for
              a deployment or legal decision.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              8. Mandatory legal rights
            </h2>
            <p className="mt-3">
              Nothing in these Terms excludes or restricts rights, exceptions or
              limitations that cannot lawfully be excluded, including applicable
              quotation, criticism, review, research, teaching, parody,
              text-and-data-mining and database exceptions where they apply.
              Third-party software used by the Atlas remains governed by its own
              licences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#10264a]">
              9. Changes
            </h2>
            <p className="mt-3">
              These Terms may be updated as the Atlas develops. The effective date
              shown above identifies the current version.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
