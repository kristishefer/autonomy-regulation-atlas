import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { EuropeJurisdictionMap } from "@/app/home/EuropeJurisdictionMap";
import type { JurisdictionMapPoint } from "@/app/home/EuropeJurisdictionMap";
import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

type JurisdictionRow = {
  id: number;
  name: string;
  code: string;
  slug: string;
  map_lat: number | string | null;
  map_lng: number | string | null;
  map_status: string | null;
  profile_status: string | null;
};

const hiddenMapStatuses = new Set(["disabled", "hidden"]);

function toMapPoint(row: JurisdictionRow): JurisdictionMapPoint | null {
  if (row.map_lat === null || row.map_lng === null) {
    return null;
  }

  const mapLat = Number(row.map_lat);
  const mapLng = Number(row.map_lng);
  const mapStatus = row.map_status?.toLowerCase() ?? null;

  if (
    !Number.isFinite(mapLat) ||
    !Number.isFinite(mapLng) ||
    mapLat < 33 ||
    mapLat > 72.5 ||
    mapLng < -26 ||
    mapLng > 46 ||
    (mapStatus && hiddenMapStatuses.has(mapStatus))
  ) {
    return null;
  }

  return {
    id: row.id,
    name: row.name,
    code: row.code,
    slug: row.slug,
    mapLat,
    mapLng,
    mapStatus: row.map_status,
    profileStatus: row.profile_status,
  };
}

const modes = [
  {
    number: "01",
    atlasling: "Dog",
    title: "We want to deploy",
    description:
      "Start with the operating jurisdiction, then trace the approvals, operator duties and deployment conditions that matter on the ground.",
    href: "#jurisdiction-map",
    action: "Enter the deployment map",
    accent: "#b97512",
  },
  {
    number: "02",
    atlasling: "Fox",
    title: "I need the regulatory landscape",
    description:
      "Explore how standards, approvals, institutions and legal regimes connect before they reach a real deployment.",
    href: "/explore/system-map",
    action: "Open the System Map",
    accent: "#147c73",
  },
  {
    number: "03",
    atlasling: "Cat",
    title: "I want to learn",
    description:
      "Work through the regulatory puzzles that make autonomous mobility different from ordinary product compliance.",
    href: "#learning-puzzle",
    action: "Try the featured puzzle",
    accent: "#10264a",
  },
] as const;

const methodology = [
  "Source proposition",
  "Atlas legal interpretation",
  "Operational impact",
  "Exact source",
] as const;

export default async function Home() {
  const { data, error } = await supabase
    .from("jurisdictions")
    .select(
      "id, name, code, slug, map_lat, map_lng, map_status, profile_status",
    )
    .order("name");

  if (error) {
    console.warn("Failed to load jurisdiction map data:", error.message);
  }

  const jurisdictions = ((data ?? []) as JurisdictionRow[])
    .map(toMapPoint)
    .filter((item): item is JurisdictionMapPoint => item !== null);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#10264a]">
      <header className="border-b border-[#10264a]/15 bg-[#fbf7ef]/95">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-12">
          <Link
            className="font-serif text-lg font-semibold tracking-[-0.02em]"
            href="/"
          >
            Autonomy Regulation Atlas
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.14em] md:flex"
          >
            <a className="transition-colors hover:text-[#147c73]" href="#modes">
              Choose a path
            </a>
            <a
              className="transition-colors hover:text-[#147c73]"
              href="#jurisdiction-map"
            >
              Jurisdiction map
            </a>
            <Link
              className="transition-colors hover:text-[#147c73]"
              href="/explore/system-map"
            >
              System Map
            </Link>
          </nav>

          <details className="atlas-language relative">
            <summary className="cursor-pointer list-none border border-[#10264a]/20 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]">
              EN <span aria-hidden="true">⌄</span>
            </summary>
            <div className="absolute right-0 z-20 mt-2 w-52 border border-[#10264a]/20 bg-[#fbf7ef] p-3 shadow-[6px_6px_0_#10264a]">
              <p className="mb-3 text-[10px] uppercase tracking-[0.14em] text-[#10264a]/55">
                Interface language
              </p>
              <div
                aria-label="Language selector"
                className="grid grid-cols-3 gap-px bg-[#10264a]/15"
                role="group"
              >
                {[
                  ["EN", "English"],
                  ["RU", "Russian"],
                  ["FR", "French"],
                  ["DE", "German"],
                  ["NL", "Dutch"],
                  ["ES", "Spanish"],
                ].map(([code, label]) => (
                  <button
                    aria-current={code === "EN" ? "true" : undefined}
                    className="bg-[#fbf7ef] px-2 py-2 text-[11px] font-semibold disabled:cursor-not-allowed disabled:text-[#10264a]/45 [&[aria-current=true]]:bg-[#10264a] [&[aria-current=true]]:text-[#fbf7ef]"
                    disabled={code !== "EN"}
                    key={code}
                    title={code === "EN" ? label : `${label} interface in preparation`}
                    type="button"
                  >
                    {code}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[10px] leading-4 text-[#10264a]/55">
                Primary sources remain in their original language
              </p>
            </div>
          </details>
        </div>
      </header>

      <section className="relative border-b border-[#10264a]/15">
        <div className="atlas-hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:px-12 lg:pb-28 lg:pt-24">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#147c73] sm:text-xs">
              LAW × AUTONOMY × REAL-WORLD DEPLOYMENT
            </p>
            <h1 className="mt-8 max-w-5xl font-serif text-[clamp(3.4rem,7.3vw,7.2rem)] font-semibold leading-[0.86] tracking-[-0.055em]">
              <span className="block">One technology</span>
              <span className="block text-[#147c73]">Many legal worlds</span>
              <span className="block text-[clamp(2.45rem,5vw,5rem)] lg:whitespace-nowrap">
                Atlas connects the pieces
              </span>
            </h1>
            <p className="mt-9 max-w-3xl text-base leading-7 text-[#10264a]/72 sm:text-lg sm:leading-8">
              Atlas connects technical capability and regulatory requirements
              to the approvals, operating conditions and responsibilities that
              make autonomous mobility lawful in a particular jurisdiction.
            </p>
          </div>

          <aside className="self-end border-l-2 border-[#b97512] pl-6 lg:mb-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#b97512]">
              The deployment question
            </p>
            <p className="mt-4 font-serif text-2xl leading-8 tracking-[-0.025em]">
              What must be true before the system can operate here?
            </p>
            <div className="mt-7 space-y-3 text-xs uppercase tracking-[0.13em] text-[#10264a]/62">
              <p>Technical capability</p>
              <div className="h-7 w-px bg-[#10264a]/30" aria-hidden="true" />
              <p>Regulatory requirements</p>
              <div className="h-7 w-px bg-[#10264a]/30" aria-hidden="true" />
              <p className="font-bold text-[#147c73]">Lawful deployment</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24" id="modes">
        <div className="grid gap-6 border-b border-[#10264a]/15 pb-8 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b97512]">
              Three ways into the Atlas
            </p>
            <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
              Start with what you need to do
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#10264a]/62">
            The Atlaslings mark distinct tasks. They are guides to the work,
            not decoration.
          </p>
        </div>

        <div className="grid lg:grid-cols-3">
          {modes.map((mode) => (
            <Link
              className="atlas-mode group relative min-h-[380px] border-b border-[#10264a]/15 py-8 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
              href={mode.href}
              key={mode.title}
              style={{ "--mode-accent": mode.accent } as CSSProperties}
            >
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-xs text-[#10264a]/45">{mode.number}</span>
                <span
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: mode.accent }}
                >
                  {mode.atlasling}
                </span>
              </div>

              {mode.atlasling === "Fox" ? (
                <Image
                  alt="Fox Atlasling pointing the way into the regulatory landscape"
                  className="absolute right-2 top-12 h-24 w-24 object-contain object-bottom sm:h-32 sm:w-32 lg:right-4 lg:top-14 lg:h-36 lg:w-36"
                  height={1254}
                  priority
                  src="/atlaslings/fox-explore-seated.png"
                  width={1254}
                />
              ) : null}

              <div className="absolute inset-x-0 bottom-8 lg:inset-x-8 lg:first:left-0">
                <h3 className="max-w-xs font-serif text-3xl font-semibold leading-[1.05] tracking-[-0.035em]">
                  {mode.title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-6 text-[#10264a]/65">
                  {mode.description}
                </p>
                <span className="mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.14em] transition-[gap] group-hover:gap-5">
                  {mode.action} <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#10264a]/15 bg-[#edf0e7]" id="jurisdiction-map">
        <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#147c73]">
                Deployment geography
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                Jurisdiction changes the route to the road
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#10264a]/65 lg:justify-self-end">
              Choose a beacon to open its jurisdiction profile. Locations and
              coverage states come from the Atlas database, so the map grows
              with the research.
            </p>
          </div>

          <EuropeJurisdictionMap jurisdictions={jurisdictions} />

          <p className="mt-4 text-[10px] leading-4 text-[#10264a]/45">
            Geographic boundaries are shown for orientation and do not express
            a legal position on status or sovereignty. Basemap geometry: Natural
            Earth via world-atlas.
          </p>
        </div>
      </section>

      <section className="bg-[#10264a] text-[#fbf7ef]" id="learning-puzzle">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[360px_1fr] lg:px-12 lg:py-24">
          <div className="relative min-h-[300px] border border-[#fbf7ef]/18 bg-[#fbf7ef]/5">
            <p className="absolute left-5 top-5 z-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#e1a249]">
              Cat asks the next question
            </p>
            <Image
              alt="Cat Atlasling presenting a regulatory puzzle"
              className="absolute inset-x-0 bottom-0 mx-auto h-[270px] w-[270px] object-contain object-bottom"
              height={1254}
              loading="eager"
              src="/atlaslings/cat-explain.png"
              width={1254}
            />
          </div>

          <div className="self-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e1a249]">
              Featured learning puzzle
            </p>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Type approved. Why can’t it just drive?
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#fbf7ef]/70">
              Product approval and permission to operate on public roads answer
              different legal questions. Open the missing layer.
            </p>

            <details className="atlas-puzzle mt-10 max-w-3xl border-y border-[#fbf7ef]/22 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl font-semibold">
                Reveal the regulatory hinge
                <span className="text-2xl font-normal text-[#e1a249]" aria-hidden="true">+</span>
              </summary>
              <div className="mt-5 border-l border-[#e1a249] pl-5 text-sm leading-7 text-[#fbf7ef]/72">
                Type approval can establish that a vehicle or automated driving
                system satisfies an applicable product-approval regime. It does
                not, by itself, settle every road-traffic, operator,
                authorization or geographic condition for deployment. The
                operating jurisdiction supplies that next layer.
              </div>
            </details>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24" id="methodology">
        <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#147c73]">
              Methodology and trust
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
              Follow the reasoning back to the source
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-[#10264a]/65">
              Atlas separates what a source says from how it is interpreted and
              what that interpretation changes for real-world operation.
              Primary sources remain in their original language.
            </p>
          </div>

          <ol className="grid border-y border-[#10264a]/18 sm:grid-cols-2 xl:grid-cols-4">
            {methodology.map((item, index) => (
              <li
                className="relative min-h-40 border-b border-[#10264a]/18 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(3)]:border-b-0 xl:border-b-0 xl:[&:nth-child(2)]:border-r xl:last:border-r-0"
                key={item}
              >
                <span className="font-mono text-[10px] text-[#b97512]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-12 font-serif text-xl font-semibold leading-6">
                  {item}
                </p>
                {index < methodology.length - 1 ? (
                  <span
                    className="absolute right-4 top-5 text-[#10264a]/35"
                    aria-hidden="true"
                  >
                    →
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-[#fbf7ef]/15 bg-[#0b1c36] text-[#fbf7ef]">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <p className="font-serif text-2xl font-semibold">Autonomy Regulation Atlas</p>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#fbf7ef]/55">
              Connecting autonomy law, technical assurance and lawful deployment
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#fbf7ef]/65">
            <Link href="/explore/system-map">System Map</Link>
            <a href="#jurisdiction-map">Jurisdictions</a>
            <a href="#methodology">Methodology</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
