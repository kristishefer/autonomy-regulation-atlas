export const metadata = {
  title: "Terms of Use | Autonomy Regulation Atlas",
  description: "Terms governing use of the Autonomy Regulation Atlas.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <a href="/" className="text-sm text-black/50 hover:text-black">
          ← Autonomy Regulation Atlas
        </a>

        <h1 className="mt-10 text-4xl font-semibold tracking-[-0.03em]">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-black/45">Effective 31 August 2026</p>

        <div className="mt-12 space-y-10 text-[15px] leading-7 text-black/70">
          <section>
            <h2 className="text-lg font-semibold text-black">1. Purpose of the Atlas</h2>
            <p className="mt-3">
              Autonomy Regulation Atlas provides general regulatory information,
              explanatory material and comparative analysis concerning autonomous
              mobility. It is provided for informational and research purposes only.
              It is not legal advice and does not create a lawyer-client relationship.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">2. Ownership and reserved rights</h2>
            <p className="mt-3">
              Unless otherwise stated, original Atlas commentary, taxonomy,
              selection and arrangement of regulatory materials, annotations,
              learning content, graphics, interface elements, data models and
              source code are protected by applicable intellectual-property laws.
              Copyright © 2026 Kristina Shefer. All rights reserved.
            </p>
            <p className="mt-3">
              To the extent available under applicable law, rights are also reserved
              in the original selection and arrangement of the Atlas database and in
              any sui generis database right arising from substantial investment in
              obtaining, verifying or presenting its contents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">3. Permitted use</h2>
            <p className="mt-3">
              You may access and use the publicly available Atlas for personal,
              academic, journalistic and internal professional reference. Limited
              quotations of original Atlas text are permitted where lawful, with
              reasonable attribution to “Autonomy Regulation Atlas” and, where
              practical, a link to the relevant Atlas page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">4. Restricted use</h2>
            <p className="mt-3">
              Except where permitted by applicable law or with prior permission, you
              may not reproduce or redistribute a substantial part of the Atlas;
              create a competing or substitute regulatory dataset from Atlas content;
              commercially republish Atlas commentary or learning materials; or use
              automated extraction, scraping or similar techniques to obtain all or a
              substantial part of the Atlas database. Repeated or systematic extraction
              of insubstantial parts may also be restricted where applicable law so
              provides.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">5. Official and third-party materials</h2>
            <p className="mt-3">
              The Atlas does not claim ownership of legislation, regulatory
              instruments, official publications, standards, source documents,
              quotations, trademarks or other third-party materials. Those materials
              remain subject to the rights, licences, terms and exceptions applicable
              to them. Links to third-party sources are provided for reference.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">6. Accuracy and currency</h2>
            <p className="mt-3">
              Regulatory regimes change and may depend on facts, vehicle configuration,
              operational design domain, permits and local implementation. The Atlas
              aims to identify sources and explain their operational significance, but
              no representation is made that every page is complete, current or suitable
              for a particular deployment decision. Primary sources and qualified legal
              advice should be checked before acting.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">7. Mandatory legal rights</h2>
            <p className="mt-3">
              Nothing in these Terms excludes rights or exceptions that cannot lawfully
              be restricted, including applicable quotation, research, teaching,
              text-and-data-mining and database exceptions. Third-party software used
              by the Atlas remains governed by its own licences.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-black">8. Changes</h2>
            <p className="mt-3">
              These Terms may be updated as the Atlas develops. The effective date at
              the top of this page identifies the current version.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
