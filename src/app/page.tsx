import Image from "next/image";
import Link from "next/link";

import { EuropeJurisdictionMap } from "@/app/home/EuropeJurisdictionMap";
import type { JurisdictionMapPoint } from "@/app/home/EuropeJurisdictionMap";
import {
  homeCopy,
  localeLabels,
  locales,
  normalizeLocale,
  type Locale,
} from "@/app/home/home-i18n";
import { supabase } from "@/app/lib/supabase";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

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

type JurisdictionTranslation = {
  jurisdiction_id: number;
  name: string | null;
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

async function translateJurisdictions(
  jurisdictions: JurisdictionMapPoint[],
  locale: Locale,
) {
  if (locale === "en" || jurisdictions.length === 0) {
    return jurisdictions;
  }

  const { data, error } = await supabase
    .from("jurisdiction_translations")
    .select("jurisdiction_id, name")
    .eq("locale", locale)
    .eq("published", true)
    .in(
      "jurisdiction_id",
      jurisdictions.map((jurisdiction) => jurisdiction.id),
    );

  if (error) {
    console.warn("Failed to load jurisdiction translations:", error.message);
    return jurisdictions;
  }

  const translationMap = new Map(
    ((data ?? []) as JurisdictionTranslation[]).map((translation) => [
      translation.jurisdiction_id,
      translation.name,
    ]),
  );

  return jurisdictions.map((jurisdiction) => ({
    ...jurisdiction,
    name: translationMap.get(jurisdiction.id) ?? jurisdiction.name,
  }));
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const t = homeCopy[locale];
  const { data, error } = await supabase
    .from("jurisdictions")
    .select(
      "id, name, code, slug, map_lat, map_lng, map_status, profile_status",
    )
    .order("name");

  if (error) {
    console.warn("Failed to load jurisdiction map data:", error.message);
  }

  const baseJurisdictions = ((data ?? []) as JurisdictionRow[])
    .map(toMapPoint)
    .filter((item): item is JurisdictionMapPoint => item !== null);
  const jurisdictions = await translateJurisdictions(
    baseJurisdictions,
    locale,
  );

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#10264a]"
      lang={locale}
    >
      <header className="sticky top-0 z-50 border-b border-[#10264a]/10 bg-[#fbf7ef]/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-10">
          <Link
            className="flex min-w-0 items-center gap-3"
            href={`/?lang=${locale}`}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#10264a]/20 font-serif text-base font-semibold">
              A
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.08em] sm:inline lg:text-sm">
              Autonomy Regulation Atlas
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-6 text-sm text-[#10264a]/55 lg:flex"
            >
              <Link className="transition hover:text-[#10264a]" href="/deploy">
                {t.nav.deploy}
              </Link>
              <a className="transition hover:text-[#10264a]" href="#map">
                {t.nav.jurisdictions}
              </a>
              <Link
                className="transition hover:text-[#10264a]"
                href="/explore/system-map"
              >
                {t.nav.landscape}
              </Link>
              <a className="transition hover:text-[#10264a]" href="#learn">
                {t.nav.learn}
              </a>
              <a className="transition hover:text-[#10264a]" href="#method">
                {t.nav.method}
              </a>
            </nav>

            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <section className="relative border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pb-20 lg:pt-16">
          <div className="flex flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              <span className="block">{t.hero.line1}</span>
              <span className="block">{t.hero.line2}</span>
              <span className="block text-[#b97512]">{t.hero.line3}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#10264a]/65 sm:text-lg sm:leading-8">
              {t.hero.body}
            </p>
          </div>

          <div className="rounded-[32px] border border-[#10264a]/10 bg-[#f3ecdf] p-4 shadow-[0_24px_70px_rgba(16,38,74,0.06)] sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-5 px-1">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                  {t.hero.atlaslings}
                </p>
                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  {t.modes.title}
                </h2>
              </div>
              <p className="hidden max-w-40 text-right text-xs leading-5 text-[#10264a]/45 sm:block">
                {t.hero.atlaslingsSub}
              </p>
            </div>

            <div className="grid gap-3">
              <GuideLink
                body={t.modes.deployBody}
                cta={t.modes.deployCta}
                href="/deploy"
                image="/atlaslings/dog.png"
                name="Deploy"
                title={t.modes.deployTitle}
                tone="blue"
              />
              <GuideLink
                body={t.modes.exploreBody}
                cta={t.modes.exploreCta}
                href="/explore/system-map"
                image="/atlaslings/fox.png"
                name="Explore"
                title={t.modes.exploreTitle}
                tone="green"
              />
              <GuideLink
                body={t.modes.learnBody}
                cta={t.modes.learnCta}
                href="/learn"
                image="/atlaslings/cat.png"
                name="Learn"
                title={t.modes.learnTitle}
                tone="gold"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-20 border-b border-[#10264a]/15 bg-[#edf0e7]"
        id="map"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-9 grid gap-5 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                {t.map.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                {t.map.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#10264a]/65 lg:justify-self-end">
              {t.map.body}
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

      <section
        className="scroll-mt-20 border-b border-[#10264a]/10 bg-[#fbf7ef]"
        id="learn"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
            <article className="relative overflow-hidden rounded-[32px] border border-[#10264a]/10 bg-[#f6ecd3] p-7 sm:p-10">
              <div className="grid min-h-[360px] gap-8 sm:grid-cols-[1fr_230px] sm:items-center">
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b97512]">
                    {t.puzzle.eyebrow}
                  </p>
                  <h2 className="mt-5 max-w-3xl font-serif text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                    {t.puzzle.title}
                  </h2>
                  <p className="mt-6 max-w-xl text-base leading-7 text-[#10264a]/60">
                    {t.puzzle.body}
                  </p>

                  <details className="atlas-puzzle mt-8 border-y border-[#10264a]/15 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-serif text-lg font-semibold">
                      {t.puzzle.reveal}
                      <span className="text-2xl font-normal text-[#b97512]" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 border-l border-[#b97512] pl-4 text-sm leading-7 text-[#10264a]/65">
                      {t.puzzle.answer}
                    </p>
                  </details>
                </div>

                <div className="flex items-end justify-center self-stretch">
                  <Image
                    alt="Learn Atlasling"
                    className="max-h-[285px] w-full object-contain object-bottom"
                    height={360}
                    loading="eager"
                    src="/atlaslings/cat.png"
                    width={360}
                  />
                </div>
              </div>
            </article>

            <div className="grid gap-5">
              <SmallPuzzle
                concept={t.puzzle.secondaryOneConcept}
                number="02"
                question={t.puzzle.secondaryOne}
              />
              <SmallPuzzle
                concept={t.puzzle.secondaryTwoConcept}
                number="03"
                question={t.puzzle.secondaryTwo}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="scroll-mt-20 bg-white"
        id="method"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                {t.method.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em]">
                {t.method.title}
              </h2>
              <p className="mt-5 text-sm leading-6 text-[#10264a]/60">
                {t.method.body}
              </p>
            </div>

            <ol className="grid border-y border-[#10264a]/15 sm:grid-cols-2 xl:grid-cols-4">
              {t.method.steps.map((step, index) => (
                <li
                  className="relative min-h-36 border-b border-[#10264a]/15 p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(3)]:border-b-0 xl:border-b-0 xl:[&:nth-child(2)]:border-r xl:last:border-r-0"
                  key={step}
                >
                  <span className="font-mono text-[10px] text-[#b97512]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-10 font-serif text-lg font-semibold leading-6">
                    {step}
                  </p>
                  {index < t.method.steps.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="absolute right-4 top-5 text-[#10264a]/30"
                    >
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#fbf7ef]/15 bg-[#0b1c36] text-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="font-serif text-2xl font-semibold">
              Autonomy Regulation Atlas
            </p>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#fbf7ef]/55">
              One technology · many legal worlds · one connected map
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#fbf7ef]/65">
            <Link href="/deploy">{t.nav.deploy}</Link>
            <Link href="/explore/system-map">{t.nav.landscape}</Link>
            <a href="#map">{t.nav.jurisdictions}</a>
            <a href="#method">{t.nav.method}</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <details className="atlas-language group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-3 py-2 text-xs font-semibold tracking-[0.08em] shadow-sm transition hover:border-[#10264a]/30 sm:px-4 sm:py-2.5">
        <span aria-hidden="true" className="text-sm">
          ◎
        </span>
        <span className="hidden sm:inline">Language</span>
        <strong>{localeLabels[locale]}</strong>
        <span className="text-[#10264a]/35" aria-hidden="true">
          ⌄
        </span>
      </summary>

      <div className="absolute right-0 top-[48px] z-[80] grid min-w-[150px] overflow-hidden rounded-2xl border border-[#10264a]/10 bg-white p-1.5 shadow-[0_18px_45px_rgba(16,38,74,.16)]">
        {locales.map((item) => (
          <Link
            aria-current={item === locale ? "page" : undefined}
            className={`rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f2eadc] ${
              item === locale
                ? "font-semibold text-[#147c73]"
                : "text-[#10264a]/65"
            }`}
            href={`/?lang=${item}`}
            key={item}
          >
            {localeLabels[item]}
          </Link>
        ))}
      </div>
    </details>
  );
}

function GuideLink({
  href,
  image,
  name,
  title,
  body,
  cta,
  tone,
}: {
  href: string;
  image: string;
  name: "Deploy" | "Explore" | "Learn";
  title: string;
  body: string;
  cta: string;
  tone: "blue" | "green" | "gold";
}) {
  const tones = {
    blue: {
      bg: "bg-[#e9f0fa]",
      border: "border-[#295ca8]/14",
      text: "text-[#295ca8]",
    },
    green: {
      bg: "bg-[#e7f1ed]",
      border: "border-[#147c73]/14",
      text: "text-[#147c73]",
    },
    gold: {
      bg: "bg-[#f7edd7]",
      border: "border-[#c98518]/14",
      text: "text-[#b97512]",
    },
  } as const;
  const color = tones[tone];

  return (
    <Link
      className={`group grid min-h-[142px] grid-cols-[92px_1fr] items-center gap-4 rounded-[24px] border p-3 transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,38,74,.08)] sm:grid-cols-[125px_1fr] sm:gap-5 sm:p-4 ${color.bg} ${color.border}`}
      href={href}
    >
      <div className="flex h-[112px] items-center justify-center overflow-visible">
        <Image
          alt={`${name} Atlasling`}
          className="max-h-[112px] w-full object-contain"
          height={360}
          priority
          src={image}
          width={360}
        />
      </div>

      <div className="min-w-0">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.14em] ${color.text}`}>
          {name}
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-semibold leading-tight sm:text-2xl">
          {title}
        </h3>
        <p className="mt-2 text-xs leading-5 text-[#10264a]/55 sm:text-sm">
          {body}
        </p>
        <p className={`mt-2 text-xs font-semibold sm:text-sm ${color.text}`}>
          {cta}{" "}
          <span className="inline-block transition group-hover:translate-x-1" aria-hidden="true">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

function SmallPuzzle({
  number,
  question,
  concept,
}: {
  number: string;
  question: string;
  concept: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#10264a]/10 bg-white p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#b97512]">
        Puzzle {number}
      </p>
      <h3 className="mt-7 font-serif text-2xl font-semibold leading-snug">
        {question}
      </h3>
      <p className="mt-7 border-t border-[#10264a]/10 pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#10264a]/35">
        {concept}
      </p>
    </article>
  );
}
