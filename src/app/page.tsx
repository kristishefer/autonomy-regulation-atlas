const jurisdictions = [
  {
    name: "Netherlands",
    code: "NL",
    status: "Limited deployment framework",
    focus: "Testing, exemptions, remote operations",
  },
  {
    name: "Germany",
    code: "DE",
    status: "L4 legal framework",
    focus: "Technical supervision, operating areas",
  },
  {
    name: "United Kingdom",
    code: "UK",
    status: "Automated Vehicles Act",
    focus: "Authorisation, liability, user roles",
  },
  {
    name: "California",
    code: "US-CA",
    status: "Commercial driverless deployment",
    focus: "DMV permits, CPUC, incident reporting",
  },
  {
    name: "China",
    code: "CN",
    status: "Evolving national and local regimes",
    focus: "Testing, demonstrations, commercial pilots",
  },
];

const questions = [
  "Can the vehicle operate without a driver?",
  "Is remote assistance or remote driving permitted?",
  "Who is legally responsible during operation?",
  "What authorisation is required?",
  "What insurance obligations apply?",
  "What incidents must be reported?",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f7f4] text-[#171717]">
      <header className="border-b border-black/10 bg-[#f7f7f4]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <div className="text-sm font-semibold tracking-tight">
            Autonomy Regulation Atlas
          </div>

          <nav className="hidden gap-8 text-sm text-black/60 md:flex">
            <a href="#jurisdictions" className="hover:text-black">
              Jurisdictions
            </a>
            <a href="#questions" className="hover:text-black">
              Regulatory questions
            </a>
            <a href="#about" className="hover:text-black">
              About
            </a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="max-w-4xl">
          <div className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-black/45">
            Autonomous mobility · regulation · operational impact
          </div>

          <h1 className="text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Regulation translated
            <br />
            into operational reality.
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">
            A jurisdiction-by-jurisdiction atlas of the rules governing
            driverless operation, remote assistance, liability, authorisation,
            insurance and incident reporting.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#jurisdictions"
              className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
            >
              Explore jurisdictions
            </a>
            <a
              href="#questions"
              className="rounded-full border border-black/15 px-6 py-3 text-sm font-medium"
            >
              See regulatory questions
            </a>
          </div>
        </div>
      </section>

      <section
        id="jurisdictions"
        className="border-y border-black/10 bg-white"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                MVP coverage
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Jurisdictions
              </h2>
            </div>

            <div className="hidden text-sm text-black/45 sm:block">
              5 jurisdictions
            </div>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {jurisdictions.map((item) => (
              <article
                key={item.code}
                className="min-h-64 bg-white p-7 transition hover:bg-[#fafaf8]"
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl font-semibold">{item.code}</span>
                  <span className="text-xs text-black/35">View →</span>
                </div>

                <h3 className="mt-12 text-xl font-semibold">{item.name}</h3>

                <p className="mt-2 text-sm leading-6 text-black/55">
                  {item.status}
                </p>

                <div className="mt-7 border-t border-black/10 pt-4 text-xs leading-5 text-black/40">
                  {item.focus}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="questions" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
              Operational lens
            </div>

            <h2 className="mt-3 max-w-md text-3xl font-semibold leading-tight tracking-tight">
              Not just what the law says. What it means for deployment.
            </h2>
          </div>

          <div className="divide-y divide-black/10 border-y border-black/10">
            {questions.map((question, index) => (
              <div
                key={question}
                className="grid grid-cols-[40px_1fr] gap-4 py-5"
              >
                <span className="text-sm text-black/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium">{question}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#171717] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              About the Atlas
            </div>

            <p className="mt-5 text-2xl leading-10 tracking-tight text-white/90">
              Built for teams that need to understand whether an autonomous
              mobility product can actually be deployed — and under whose
              responsibility.
            </p>
          </div>

          <div className="mt-20 border-t border-white/15 pt-6 text-xs text-white/35">
            Autonomy Regulation Atlas
          </div>
        </div>
      </section>
    </main>
  );
}