import Image from "next/image";
import Link from "next/link";
import { Manrope, Source_Serif_4 } from "next/font/google";

import { JURISDICTION_PROFILES } from "@/app/explore/regulatory-data";
import {
  DeployDecisionMotif,
  ExplorePathMotif,
  LearnStructureMotif,
} from "@/app/home/AtlasSystemMotifs";
import { AtlasHeroWorld } from "@/app/home/AtlasHeroWorld";
import { FooterEasterEgg } from "@/app/home/FooterEasterEgg";
import { homeCopy } from "@/app/home/home-i18n";
import { HomepageReveal } from "@/app/home/HomepageReveal";
import { JurisdictionNavigator } from "@/app/home/JurisdictionNavigator";
import { RegulatoryQuestionExplorer } from "@/app/home/RegulatoryQuestionExplorer";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const dynamic = "force-dynamic";

const atlasSans = Manrope({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-atlas-sans",
});

const atlasDisplay = Source_Serif_4({
  display: "swap",
  subsets: ["latin", "cyrillic"],
  variable: "--font-atlas-display",
});

const navigatorOrder = [
  "netherlands",
  "germany",
  "united-kingdom",
  "united-states",
  "russia",
] as const;

export default async function Home() {
  const locale = await getRequestLocale();
  const t = homeCopy[locale];
  const fallbackProfileNames: Partial<
    Record<(typeof navigatorOrder)[number], string>
  > = {
    netherlands: t.ui.map.fallbackNames.netherlands,
    germany: t.ui.map.fallbackNames.germany,
    "united-kingdom": t.ui.map.fallbackNames["united-kingdom"],
    russia: t.ui.map.fallbackNames.russia,
  };
  const jurisdictions = navigatorOrder.map((slug) => {
    const profile = JURISDICTION_PROFILES.find((item) => item.slug === slug);

    if (!profile) {
      throw new Error(`Missing jurisdiction profile for homepage navigator: ${slug}`);
    }

    return {
      slug: profile.slug,
      name:
        profile.localizedNames?.[locale] ??
        fallbackProfileNames[slug] ??
        profile.name,
      code: profile.code,
      scope: profile.scopeNote ?? profile.researchCoverage.geographicScope,
      primaryMessage: profile.primaryMessage,
      snapshot: profile.snapshot.slice(0, 2),
    };
  });

  return (
    <main
      className={`${atlasSans.variable} ${atlasDisplay.variable} atlas-home min-h-screen overflow-hidden bg-[var(--atlas-paper)] text-[var(--atlas-ink)]`}
      lang={locale}
    >
      <AtlasHeroWorld
        body={t.hero.body}
        eyebrow={t.hero.eyebrow}
        line1={t.hero.line1}
        line2={t.hero.line2}
        line3={t.hero.line3}
      />

      <HomepageReveal className="atlas-entry-section bg-[var(--atlas-field-warm)]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--atlas-teal)]">
              {t.hero.atlaslings}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
              {t.modes.title}
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <PrimaryGuideLink
              action={t.modes.exploreCta}
              body={t.modes.exploreBody}
              href="/explore/system-map"
              image="/atlaslings/fox.png"
              name="Explore"
              tone="green"
            />
            <PrimaryGuideLink
              action={t.modes.learnCta}
              body={t.modes.learnBody}
              href="/learn"
              image="/atlaslings/cat.png"
              name="Learn"
              tone="blue"
            />
          </div>

          <DeployGuideLink
            action={t.modes.deployCta}
            body={t.modes.deployBody}
            title={t.modes.deployTitle}
          />
        </div>
      </HomepageReveal>

      <HomepageReveal
        className="scroll-mt-20 bg-[var(--atlas-field-blue)]"
        id="map"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atlas-teal)]">
                {t.navigator.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                {t.navigator.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--atlas-ink-muted)] lg:justify-self-end">
              {t.navigator.body}
            </p>
          </div>

          <JurisdictionNavigator
            copy={t.navigator}
            jurisdictions={jurisdictions}
          />
        </div>
      </HomepageReveal>

      <HomepageReveal
        className="atlas-question-section scroll-mt-20 bg-[var(--atlas-field-sage)]"
        id="questions"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atlas-teal)]">
                {t.questionDemo.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                {t.questionDemo.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[var(--atlas-ink-muted)] lg:justify-self-end">
              {t.questionDemo.body}
            </p>
          </div>

          <RegulatoryQuestionExplorer copy={t.questionDemo} />
        </div>
      </HomepageReveal>

      <HomepageReveal
        className="scroll-mt-20 bg-[var(--atlas-paper)]"
        id="method"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atlas-teal)]">
                {t.method.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-none tracking-[-0.04em]">
                {t.method.title}
              </h2>
              <p className="mt-5 text-sm leading-6 text-[var(--atlas-ink-muted)]">
                {t.method.body}
              </p>
            </div>

            <ol className="atlas-method-sequence grid sm:grid-cols-2 xl:grid-cols-4">
              {t.method.steps.map((step, index) => (
                <li
                  className="atlas-method-step relative min-h-28 px-3 py-5 sm:px-5"
                  key={step}
                >
                  <span className="atlas-method-node font-mono text-[10px] text-[var(--atlas-space)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-7 text-base font-semibold leading-6">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </HomepageReveal>

      <footer className="bg-[var(--atlas-footer)] text-[var(--atlas-paper)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="text-2xl font-semibold tracking-[-0.03em]">
              Autonomy Regulation Atlas
            </p>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[rgba(250,249,245,0.55)]">
              {t.ui.footerTagline}
            </p>
            <FooterEasterEgg copy={t.easterEgg} />
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[rgba(250,249,245,0.65)]">
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

function PrimaryGuideLink({
  href,
  image,
  name,
  body,
  action,
  tone,
}: {
  href: string;
  image: string;
  name: "Explore" | "Learn";
  body: string;
  action: string;
  tone: "green" | "blue";
}) {
  const tones = {
    green: {
      bg: "bg-[var(--atlas-field-sage)]",
      border: "border-[rgba(79,143,130,0.16)]",
      text: "text-[var(--atlas-teal)]",
    },
    blue: {
      bg: "bg-[var(--atlas-field-blue)]",
      border: "border-[rgba(111,131,166,0.18)]",
      text: "text-[var(--atlas-space)]",
    },
  } as const;
  const color = tones[tone];

  return (
    <Link
      className={`atlas-primary-entry atlas-${tone === "green" ? "explore" : "learn"}-entry group relative grid min-h-[190px] grid-cols-[1fr_112px] items-center gap-4 rounded-2xl border p-5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-offset-2 sm:min-h-[220px] sm:grid-cols-[1fr_156px] sm:p-7 ${color.bg} ${color.border}`}
      href={href}
    >
      {tone === "green" ? <ExplorePathMotif /> : <LearnStructureMotif />}

      <div className="relative z-10 flex min-w-0 self-stretch flex-col justify-center">
        <h3 className={`font-serif text-3xl font-semibold sm:text-4xl ${color.text}`}>
          {name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-[var(--atlas-ink-muted)]">
          {body}
        </p>
        <p className={`mt-6 text-sm font-semibold ${color.text}`}>
          {action}{" "}
          <span className="atlas-entry-action-arrow inline-block" aria-hidden="true">
            →
          </span>
        </p>
      </div>

      <div className="atlas-entry-character relative -bottom-2 z-10 flex h-[142px] items-end justify-center overflow-visible sm:h-[174px]">
        <Image
          alt=""
          className="atlas-entry-mascot max-h-[138px] w-full object-contain object-bottom sm:max-h-[168px]"
          height={360}
          priority
          src={image}
          width={360}
        />
      </div>
    </Link>
  );
}

function DeployGuideLink({
  action,
  body,
  title,
}: {
  action: string;
  body: string;
  title: string;
}) {
  return (
    <Link
      className="atlas-deploy-entry group relative mx-auto mt-5 grid max-w-3xl grid-cols-[82px_1fr] items-center gap-4 rounded-xl border border-[rgba(86,112,131,0.14)] bg-[var(--atlas-field-blue)] px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-offset-2 sm:grid-cols-[104px_1fr_auto] sm:gap-5 sm:px-5"
      href="/deploy"
    >
      <DeployDecisionMotif />
      <div className="relative z-10 top-2 flex h-[82px] items-end justify-center sm:h-[88px]">
        <Image
          alt=""
          className="atlas-entry-mascot max-h-[82px] w-full object-contain object-bottom sm:max-h-[88px]"
          height={360}
          priority
          src="/atlaslings/dog.png"
          width={360}
        />
      </div>

      <div className="relative z-10 min-w-0 py-1">
        <h3 className="text-lg font-semibold text-[var(--atlas-ink)] sm:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[var(--atlas-ink-muted)] sm:text-sm">
          {body}
        </p>
      </div>

      <p className="relative z-10 col-start-2 pb-1 text-xs font-semibold text-[var(--atlas-teal)] sm:col-start-auto sm:pb-0 sm:text-sm">
        {action}{" "}
        <span className="atlas-entry-action-arrow inline-block" aria-hidden="true">
          →
        </span>
      </p>
    </Link>
  );
}
