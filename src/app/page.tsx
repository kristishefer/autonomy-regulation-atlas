import HomeAtlasMap from "@/app/components/HomeAtlasMap";
import {
  homeCopy,
  localeLabels,
  locales,
  normalizeLocale,
  type Locale,
} from "@/app/lib/home-i18n";

type PageProps = {
  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const locale = normalizeLocale(params.lang);
  const t = homeCopy[locale];

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <header className="sticky top-0 z-50 border-b border-[#10264a]/10 bg-[#fbf7ef]/94 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-6 py-4 lg:px-10">
          <a href={`/?lang=${locale}`} className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#10264a]/20 font-serif text-base font-semibold">
              A
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.08em]">
              Autonomy Regulation Atlas
            </span>
          </a>

          <div className="flex items-center gap-5">
            <nav className="hidden items-center gap-6 text-sm text-[#10264a]/55 lg:flex">
              <a href="/explore/system-map" className="transition hover:text-[#10264a]">
                Explore
              </a>
              <a href="#map" className="transition hover:text-[#10264a]">
                {t.nav.jurisdictions}
              </a>
              <a href="#learn" className="transition hover:text-[#10264a]">
                {t.nav.learn}
              </a>
              <a href="#method" className="transition hover:text-[#10264a]">
                {t.nav.method}
              </a>
            </nav>

            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-16 pt-12 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 lg:pb-20 lg:pt-16">
        <div className="flex flex-col justify-center">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
            {t.hero.eyebrow}
          </div>

          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            {stripHeadingPeriod(t.hero.line1)}
            <br />
            {stripHeadingPeriod(t.hero.line2)}
            <br />
            <span className="text-[#c98518]">
              {stripHeadingPeriod(t.hero.line3)}
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-[#10264a]/65">
            {t.hero.body}
          </p>

          <p className="mt-7 max-w-xl text-sm leading-6 text-[#10264a]/45">
            Product approval, road access, human roles, safety standards and
            national operating rules sit in different layers. Atlas connects
            those layers without pretending they are the same thing.
          </p>
        </div>

        <div className="rounded-[32px] border border-[#10264a]/10 bg-[#f3ecdf] p-5 shadow-[0_24px_70px_rgba(16,38,74,0.06)] sm:p-6">
          <div className="mb-5">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#10264a]/40">
              {t.hero.atlaslings}
            </div>
            <h2 className="mt-2 font-serif text-2xl font-semibold">
              {stripHeadingPeriod(t.modes.title)}
            </h2>
          </div>

          <div className="grid gap-3">
            <GuideLink
              href="#map"
              image="/atlaslings/dog.png"
              name="Deploy"
              kicker={t.modes.deployKicker}
              title={t.modes.deployTitle}
              body={t.modes.deployBody}
              cta={t.modes.deployCta}
              tone="blue"
            />

            <GuideLink
              href="/explore/system-map"
              image="/atlaslings/fox-explore-seated.png"
              name="Explore"
              kicker={t.modes.exploreKicker}
              title={t.modes.exploreTitle}
              body={t.modes.exploreBody}
              cta={t.modes.exploreCta}
              tone="green"
            />

            <GuideLink
              href="#learn"
              image="/atlaslings/cat-explain.png"
              name="Learn"
              kicker={t.modes.learnKicker}
              title={t.modes.learnTitle}
              body={t.modes.learnBody}
              cta={t.modes.learnCta}
              tone="gold"
            />
          </div>
        </div>
      </section>

      <HomeAtlasMap locale={locale} />

      <section
        id="learn"
        className="scroll-mt-20 border-b border-[#10264a]/10 bg-[#fbf7ef]"
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[1.45fr_0.55fr]">
            <article className="relative overflow-hidden rounded-[32px] border border-[#10264a]/10 bg-[#f6ecd3] p-8 sm:p-10">
              <div className="grid min-h-[340px] gap-8 sm:grid-cols-[1fr_230px] sm:items-center">
                <div className="relative z-10">
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b97512]">
                    {t.puzzles.eyebrow}
                  </div>

                  <div className="mt-5 font-serif text-4xl font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
                    The AV has type approval
                    <br />
                    Why can the road still be closed?
                  </div>

                  <p className="mt-6 max-w-xl text-base leading-7 text-[#10264a]/60">
                    {t.puzzles.body}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#b97512]">
                    Explore this puzzle <span>→</span>
                  </div>
                </div>

                <div className="flex items-end justify-center self-stretch">
                  <img
                    src="/atlaslings/cat-explain.png"
                    alt="Learn Atlasling"
                    className="max-h-[285px] w-full object-contain object-bottom"
                  />
                </div>
              </div>
            </article>

            <div className="grid gap-5">
              <SmallPuzzle
                number="02"
                question="Nobody is in the driver's seat. Did the legal driver disappear?"
                concept="ADS · driver · remote human"
              />

              <SmallPuzzle
                number="03"
                question="Remote driving and remote assistance sound similar. Are they legally the same?"
                concept="Remote operations"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="scroll-mt-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[300px_1fr] lg:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#10264a]/40">
                {t.method.eyebrow}
              </div>
              <h2 className="mt-3 font-serif text-3xl font-semibold">
                {stripHeadingPeriod(t.method.title)}
              </h2>
            </div>

            <div className="grid gap-2 sm:grid-cols-4">
              {t.method.steps.map((step, index) => (
                <div
                  key={step}
                  className="rounded-2xl border border-[#10264a]/10 bg-[#fbf7ef] p-4"
                >
                  <div className="text-xs text-[#10264a]/30">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-sm font-semibold">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#10264a]/10 bg-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-xs text-[#10264a]/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <span>Autonomy Regulation Atlas</span>
          <span>One technology · many legal worlds · one connected map</span>
        </div>
      </footer>
    </main>
  );
}

function stripHeadingPeriod(value: string) {
  return value.replace(/\.$/, "");
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <details className="group relative">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-[#10264a]/15 bg-white px-4 py-2.5 text-xs font-semibold tracking-[0.08em] shadow-sm transition hover:border-[#10264a]/30">
        <span className="text-sm">◎</span>
        <span className="hidden sm:inline">Language</span>
        <strong>{localeLabels[locale]}</strong>
        <span className="text-[#10264a]/35">⌄</span>
      </summary>

      <div className="absolute right-0 top-[50px] z-[80] grid min-w-[150px] overflow-hidden rounded-2xl border border-[#10264a]/10 bg-white p-1.5 shadow-[0_18px_45px_rgba(16,38,74,.16)]">
        {locales.map((item) => (
          <a
            key={item}
            href={`/?lang=${item}`}
            className={`rounded-xl px-3 py-2.5 text-sm transition hover:bg-[#f2eadc] ${
              item === locale
                ? "font-semibold text-[#147c73]"
                : "text-[#10264a]/65"
            }`}
          >
            {localeLabels[item]}
          </a>
        ))}
      </div>
    </details>
  );
}

function GuideLink({
  href,
  image,
  name,
  kicker,
  title,
  body,
  cta,
  tone,
}: {
  href: string;
  image: string;
  name: string;
  kicker: string;
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
  };

  const color = tones[tone];

  return (
    <a
      href={href}
      className={`group grid min-h-[150px] grid-cols-[118px_1fr] items-center gap-5 rounded-[24px] border p-4 transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,38,74,.08)] sm:grid-cols-[145px_1fr] ${color.bg} ${color.border}`}
    >
      <div className="flex h-[122px] items-center justify-center overflow-visible">
        <img
          src={image}
          alt={`${name} Atlasling`}
          className="max-h-[122px] w-full object-contain"
        />
      </div>

      <div className="min-w-0">
        <div className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${color.text}`}>
          {name} · {kicker}
        </div>

        <h3 className="mt-2 font-serif text-xl font-semibold leading-tight sm:text-2xl">
          {stripHeadingPeriod(title)}
        </h3>

        <p className="mt-2 max-w-xl text-sm leading-5 text-[#10264a]/55">
          {body}
        </p>

        <div className={`mt-3 text-sm font-semibold ${color.text}`}>
          {cta}{" "}
          <span className="inline-block transition group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </a>
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
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-[#c98518]">
        Puzzle {number}
      </div>
      <h3 className="mt-7 font-serif text-2xl font-semibold leading-snug">
        {question}
      </h3>
      <div className="mt-7 border-t border-[#10264a]/10 pt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#10264a]/35">
        {concept}
      </div>
    </article>
  );
}
