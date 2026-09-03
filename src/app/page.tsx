import Image from "next/image";
import Link from "next/link";

import { JURISDICTION_PROFILES } from "@/app/explore/regulatory-data";
import { HeroRegulatoryNetwork } from "@/app/home/HeroRegulatoryNetwork";
import { homeCopy } from "@/app/home/home-i18n";
import { HomepageReveal } from "@/app/home/HomepageReveal";
import { JurisdictionNavigator } from "@/app/home/JurisdictionNavigator";
import { RegulatoryQuestionExplorer } from "@/app/home/RegulatoryQuestionExplorer";
import { getRequestLocale } from "@/app/i18n/request-locale";

export const dynamic = "force-dynamic";

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
      className="min-h-screen overflow-hidden bg-[#fbf7ef] text-[#10264a]"
      lang={locale}
    >
      <section className="relative border-b border-[#10264a]/10">
        <div className="atlas-hero-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <HeroRegulatoryNetwork />
        <div className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 lg:px-10 lg:pb-20 lg:pt-16">
          <div className="flex max-w-4xl min-w-0 flex-col justify-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
              {t.hero.eyebrow}
            </p>

            <h1 className="mt-5 max-w-3xl break-words hyphens-auto font-serif text-5xl font-semibold leading-[0.96] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              <span className="block">{t.hero.line1}</span>
              <span className="block">{t.hero.line2}</span>
              <span className="block text-[#b97512]">{t.hero.line3}</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#10264a]/65 sm:text-lg sm:leading-8">
              {t.hero.body}
            </p>
          </div>
        </div>
      </section>

      <HomepageReveal className="border-b border-[#10264a]/10 bg-[#f3ecdf]">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-12">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
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
              tone="gold"
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
        className="scroll-mt-20 border-b border-[#10264a]/15 bg-[#edf0e7]"
        id="map"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                {t.navigator.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                {t.navigator.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#10264a]/65 lg:justify-self-end">
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
        className="scroll-mt-20 border-b border-[#10264a]/10 bg-[#fbf7ef]"
        id="questions"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mb-8 grid gap-5 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#147c73]">
                {t.questionDemo.eyebrow}
              </p>
              <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] sm:text-5xl">
                {t.questionDemo.title}
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-[#10264a]/65 lg:justify-self-end">
              {t.questionDemo.body}
            </p>
          </div>

          <RegulatoryQuestionExplorer copy={t.questionDemo} />
        </div>
      </HomepageReveal>

      <HomepageReveal
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
      </HomepageReveal>

      <footer className="border-t border-[#fbf7ef]/15 bg-[#0b1c36] text-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 py-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <p className="font-serif text-2xl font-semibold">
              Autonomy Regulation Atlas
            </p>
            <p className="mt-2 max-w-xl text-xs leading-5 text-[#fbf7ef]/55">
              {t.ui.footerTagline}
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
  tone: "green" | "gold";
}) {
  const tones = {
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
      className={`atlas-primary-entry group grid min-h-[190px] grid-cols-[1fr_112px] items-center gap-4 rounded-[24px] border p-5 outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 sm:min-h-[220px] sm:grid-cols-[1fr_156px] sm:p-7 ${color.bg} ${color.border}`}
      href={href}
    >
      <div className="flex min-w-0 self-stretch flex-col justify-center">
        <h3 className={`font-serif text-3xl font-semibold sm:text-4xl ${color.text}`}>
          {name}
        </h3>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#10264a]/60">
          {body}
        </p>
        <p className={`mt-6 text-sm font-semibold ${color.text}`}>
          {action}{" "}
          <span className="atlas-entry-action-arrow inline-block" aria-hidden="true">
            →
          </span>
        </p>
      </div>

      <div className="flex h-[142px] items-end justify-center overflow-visible sm:h-[174px]">
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
      className="atlas-deploy-entry group relative mx-auto mt-5 grid max-w-3xl grid-cols-[82px_1fr] items-center gap-4 rounded-[20px] border border-[#295ca8]/12 bg-[#e9f0fa] px-4 py-3 outline-none focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 sm:grid-cols-[104px_1fr_auto] sm:gap-5 sm:px-5"
      href="/deploy"
    >
      <div className="relative top-2 flex h-[82px] items-end justify-center sm:h-[88px]">
        <Image
          alt=""
          className="atlas-entry-mascot max-h-[82px] w-full object-contain object-bottom sm:max-h-[88px]"
          height={360}
          priority
          src="/atlaslings/dog.png"
          width={360}
        />
      </div>

      <div className="min-w-0 py-1">
        <h3 className="font-serif text-lg font-semibold text-[#295ca8] sm:text-xl">
          {title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[#10264a]/58 sm:text-sm">
          {body}
        </p>
      </div>

      <p className="col-start-2 pb-1 text-xs font-semibold text-[#295ca8] sm:col-start-auto sm:pb-0 sm:text-sm">
        {action}{" "}
        <span className="atlas-entry-action-arrow inline-block" aria-hidden="true">
          →
        </span>
      </p>
    </Link>
  );
}
