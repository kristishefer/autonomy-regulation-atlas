import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import { JurisdictionProfileView } from "@/app/explore/JurisdictionProfileView";
import { getJurisdictionProfile } from "@/app/explore/regulatory-data";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function JurisdictionPage({ params }: PageProps) {
  const { slug } = await params;
  const curatedProfile = getJurisdictionProfile(slug);

  if (curatedProfile) {
    return <JurisdictionProfileView profile={curatedProfile} />;
  }

  const { data: jurisdiction, error: jurisdictionError } = await supabase
    .from("jurisdictions")
    .select("id, name, code, slug")
    .eq("slug", slug)
    .single();

  if (jurisdictionError || !jurisdiction) {
    notFound();
  }

  const [{ data: claimsData }, { data: topicsData }] = await Promise.all([
    supabase
      .from("claims")
      .select(
        `
        id,
        claim_text,
        operational_impact,
        topic_id,
        normalized_status,
        confidence,
        reviewed_at
        `
      )
      .eq("jurisdiction_id", jurisdiction.id)
      .eq("published", true)
      .eq("research_status", "verified")
      .order("id"),
    supabase.from("topics").select("id, name, slug").order("id"),
  ]);

  const claims = claimsData ?? [];

  const topics = topicsData ?? [];

  const claimIds = claims.map((claim) => claim.id);

  let claimSources: {
    claim_id: number;
    source_id: number;
    support_type: string | null;
    provision: string | null;
  }[] = [];

  if (claimIds.length > 0) {
    const { data } = await supabase
      .from("claim_sources")
      .select("claim_id, source_id, support_type, provision")
      .in("claim_id", claimIds);

    claimSources = data ?? [];
  }

  const sourceIds = [
    ...new Set(claimSources.map((item) => item.source_id)),
  ];

  let sources: {
    id: number;
    title: string;
    official_url: string | null;
    authority: string | null;
    source_type: string | null;
    status: string | null;
    effective_at: string | null;
    last_checked: string | null;
  }[] = [];

  if (sourceIds.length > 0) {
    const { data } = await supabase
      .from("sources")
      .select(
        `
        id,
        title,
        official_url,
        authority,
        source_type,
        status,
        effective_at,
        last_checked
        `
      )
      .in("id", sourceIds);

    sources = data ?? [];
  }

  const topicMap = new Map(
    topics.map((topic) => [topic.id, topic])
  );

  const sourceMap = new Map(
    sources.map((source) => [source.id, source])
  );

  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Autonomy Regulation Atlas
          </Link>

          <span className="text-sm text-black/45">
            {jurisdiction.code}
          </span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-16 pt-16 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="max-w-4xl">
          <Link
            href="/"
            className="text-xs font-medium uppercase tracking-[0.16em] text-black/40"
          >
            ← Jurisdictions
          </Link>

          <div className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
            {jurisdiction.code} · Regulatory profile
          </div>

          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            {jurisdiction.name}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-black/55">
            Regulatory conditions affecting autonomous vehicle deployment,
            remote operations, responsibility, authorisation and operational
            compliance.
          </p>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                Regulatory analysis
              </div>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Operational questions
              </h2>
            </div>

            <div className="text-sm text-black/40">
              {claims.length}{" "}
              {claims.length === 1 ? "finding" : "findings"}
            </div>
          </div>

          {claims.length === 0 ? (
            <div className="rounded-2xl border border-black/10 p-8 text-black/50">
              No regulatory claims have been published for this jurisdiction yet.
            </div>
          ) : (
            <div className="space-y-5">
              {claims.map((claim) => {
                const topic = topicMap.get(claim.topic_id);

                const links = claimSources.filter(
                  (item) => item.claim_id === claim.id
                );

                return (
                  <article
                    key={claim.id}
                    className="rounded-2xl border border-black/10 bg-[#fafaf8] p-7 lg:p-9"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {topic && (
                        <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium">
                          {topic.name}
                        </span>
                      )}

                      {claim.normalized_status && (
                        <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
                          {claim.normalized_status}
                        </span>
                      )}

                      {claim.confidence && (
                        <span className="text-xs text-black/35">
                          Confidence: {claim.confidence}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-6 max-w-4xl text-xl font-semibold leading-8">
                      {claim.claim_text}
                    </h3>

                    {claim.operational_impact && (
                      <div className="mt-7 border-l-2 border-black pl-5">
                        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                          Operational impact
                        </div>

                        <p className="mt-2 max-w-4xl leading-7 text-black/70">
                          {claim.operational_impact}
                        </p>
                      </div>
                    )}

                    {links.length > 0 && (
                      <div className="mt-8 border-t border-black/10 pt-6">
                        <div className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-black/35">
                          Sources
                        </div>

                        <div className="space-y-4">
                          {links.map((link, index) => {
                            const source = sourceMap.get(link.source_id);

                            if (!source) {
                              return null;
                            }

                            return (
                              <div
                                key={`${claim.id}-${source.id}-${index}`}
                                className="text-sm leading-6"
                              >
                                <div className="font-medium">
                                  {source.official_url ? (
                                    <a
                                      href={source.official_url}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="underline decoration-black/25 underline-offset-4 hover:decoration-black"
                                    >
                                      {source.title}
                                    </a>
                                  ) : (
                                    source.title
                                  )}
                                </div>

                                <div className="mt-1 text-black/45">
                                  {source.authority}

                                  {link.provision
                                    ? ` · ${link.provision}`
                                    : ""}

                                  {link.support_type
                                    ? ` · ${link.support_type}`
                                    : ""}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {claim.reviewed_at && (
                      <div className="mt-7 text-xs text-black/30">
                        Last reviewed: {claim.reviewed_at}
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <footer className="mx-auto max-w-7xl px-6 py-10 text-xs text-black/35 lg:px-10">
        Autonomy Regulation Atlas · Regulatory information for operational
        analysis
      </footer>
    </main>
  );
}
