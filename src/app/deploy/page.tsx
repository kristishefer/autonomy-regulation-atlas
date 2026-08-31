import Link from "next/link";

const pathwayGates = [
  {
    number: "01",
    title: "Vehicle & system scope",
    body: "What exactly is being deployed, and which legal categories and regulatory layers apply to that operating model?",
  },
  {
    number: "02",
    title: "Product & vehicle approval",
    body: "Which product-approval or vehicle-approval route applies, and what does that approval actually establish?",
  },
  {
    number: "03",
    title: "Road-use authorization",
    body: "What legal basis allows driverless operation on public roads, and which authority or process controls access?",
  },
  {
    number: "04",
    title: "Operating area & ODD",
    body: "Is operation limited by an approved area, route, operational design domain, permit condition or other geographic constraint?",
  },
  {
    number: "05",
    title: "Human & remote roles",
    body: "Which human roles remain legally relevant — driver, technical supervisor, remote operator, remote assistant or another responsible person?",
  },
  {
    number: "06",
    title: "Registration, insurance & responsibility",
    body: "Which registration, insurance and responsibility rules attach to the vehicle and operating model before road use?",
  },
  {
    number: "07",
    title: "Operational & post-market duties",
    body: "Which ongoing obligations apply to incidents, reporting, software, cybersecurity, monitoring or continued compliance?",
  },
  {
    number: "08",
    title: "Commercial service layer",
    body: "If the deployment carries passengers commercially, which transport-service, licensing or local operating rules add another layer?",
  },
] as const;

const statusLanguage = [
  "Framework identified",
  "Approval required",
  "Permit-specific",
  "No express rule identified",
  "Unclear",
  "Research pending",
] as const;

export default function DeployPage() {
  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#10264a]">
      <header className="border-b border-[#10264a]/10 bg-[#fbf7ef]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:px-10">
          <Link className="flex items-center gap-3" href="/">
            <span className="grid size-10 place-items-center rounded-full border border-[#10264a]/20 font-serif text-base font-semibold">
              A
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.08em] sm:inline lg:text-sm">
              Autonomy Regulation Atlas
            </span>
          </Link>

          <div className="flex items-center gap-5 text-sm text-[#10264a]/55">
            <Link className="transition hover:text-[#10264a]" href="/">
              Home
            </Link>
            <Link
              className="transition hover:text-[#10264a]"
              href="/explore/system-map"
            >
              System Map
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-[#10264a]/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_0.72fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#295ca8]">
              Deploy · apply the Atlas
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-6xl">
              Understand the regulatory path to deployment
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#10264a]/65">
              Deploy is a regulatory scoping view. It applies the Atlas to a
              concrete operating scenario so you can see which legal layers,
              approvals, operating conditions and unresolved questions need to
              be examined before real-world operation.
            </p>
          </div>

          <aside className="rounded-[28px] border border-[#295ca8]/15 bg-[#e9f0fa] p-7 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#295ca8]">
              What this is — and is not
            </p>
            <p className="mt-5 font-serif text-2xl font-semibold leading-tight">
              A structured starting point, not a GO / NO-GO verdict
            </p>
            <p className="mt-4 text-sm leading-6 text-[#10264a]/62">
              Atlas does not decide whether a company should enter a market and
              does not replace jurisdiction-specific legal advice. It structures
              the regulatory problem, makes the source trail visible and surfaces
              the questions that still require resolution.
            </p>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[0.62fr_1.38fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
                Current MVP scenario
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight">
                Driverless passenger vehicle
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <ScenarioFact label="Road environment" value="Public roads" />
              <ScenarioFact label="In-vehicle driver" value="None" />
              <ScenarioFact label="Initial coverage" value="Netherlands + Germany" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-[#edf0e7]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
            The job of Deploy
          </p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">
            Turn a broad market question into a researchable legal pathway
          </h2>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <PurposeCard
              number="01"
              title="Scope the question"
              body="Turn ‘can this operate here?’ into a defined vehicle, operating model, road environment and jurisdictional question."
            />
            <PurposeCard
              number="02"
              title="Trace the pathway"
              body="Connect product rules, road-use authorization, human roles, operating conditions and ongoing obligations instead of reading them in isolation."
            />
            <PurposeCard
              number="03"
              title="Surface the next questions"
              body="Distinguish what is established from what is permit-specific, unclear, not expressly regulated or still under research."
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-[#fbf7ef]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#295ca8]">
                Regulatory pathway
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em]">
                The questions Atlas checks
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[#10264a]/60 lg:justify-self-end">
              This is not a universal eight-step legal checklist. Jurisdictions
              use different legal architectures, so Atlas treats these as gates
              and questions that can connect, overlap or become permit-specific.
            </p>
          </div>

          <ol className="mt-10 grid border-y border-[#10264a]/15 md:grid-cols-2 xl:grid-cols-4">
            {pathwayGates.map((gate) => (
              <li
                className="min-h-[230px] border-b border-[#10264a]/15 p-6 md:border-r md:[&:nth-child(2n)]:border-r-0 xl:[&:nth-child(2n)]:border-r xl:[&:nth-child(4n)]:border-r-0 xl:[&:nth-last-child(-n+4)]:border-b-0"
                key={gate.number}
              >
                <span className="font-mono text-[10px] text-[#b97512]">
                  {gate.number}
                </span>
                <h3 className="mt-8 font-serif text-xl font-semibold leading-snug">
                  {gate.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-[#10264a]/58">
                  {gate.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
              Initial coverage
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em]">
              Start with one scenario, compare legal architectures
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#10264a]/60">
              The first Deploy pathway is intentionally narrow. Netherlands and
              Germany are the research pair for the same driverless passenger
              vehicle scenario; broader vehicle types and jurisdictions come
              later.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <JurisdictionCard
              code="NL"
              href="/netherlands"
              name="Netherlands"
              status="Partial profile available"
            />
            <JurisdictionCard
              code="DE"
              href="/germany"
              name="Germany"
              status="Pathway research in progress"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-[#10264a]/10 bg-[#f3ecdf]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#b97512]">
                Status language
              </p>
              <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em]">
                Describe the regulatory state, not a business verdict
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {statusLanguage.map((status) => (
                <div
                  className="border-l border-[#b97512] bg-white/60 px-5 py-4 font-serif text-lg font-semibold"
                  key={status}
                >
                  {status}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1c36] text-[#fbf7ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e0a74a]">
              The outcome
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em]">
              Questions to resolve before deployment
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-[#fbf7ef]/58">
              Deploy should end with a structured next-research agenda, not a
              single green or red answer.
            </p>
          </div>

          <ol className="grid gap-3">
            <QuestionRow
              number="01"
              text="Which authorization route applies to this vehicle and operating model in the selected jurisdiction?"
            />
            <QuestionRow
              number="02"
              text="Which conditions attach to the operating area, ODD and any remote human role?"
            />
            <QuestionRow
              number="03"
              text="Which obligations remain outside the vehicle-approval layer and must be resolved before operation?"
            />
          </ol>
        </div>
      </section>

      <footer className="border-t border-[#fbf7ef]/10 bg-[#0b1c36] text-[#fbf7ef]/55">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs leading-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <span>Autonomy Regulation Atlas · Deploy</span>
          <span>Regulatory scoping and research support · not legal advice</span>
        </div>
      </footer>
    </main>
  );
}

function ScenarioFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[#147c73] bg-[#edf0e7] px-5 py-5">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/42">
        {label}
      </p>
      <p className="mt-2 font-serif text-xl font-semibold">{value}</p>
    </div>
  );
}

function PurposeCard({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-[24px] border border-[#10264a]/10 bg-white p-6">
      <span className="font-mono text-[10px] text-[#b97512]">{number}</span>
      <h3 className="mt-7 font-serif text-2xl font-semibold">{title}</h3>
      <p className="mt-4 text-sm leading-6 text-[#10264a]/58">{body}</p>
    </article>
  );
}

function JurisdictionCard({
  code,
  name,
  status,
  href,
}: {
  code: string;
  name: string;
  status: string;
  href: string;
}) {
  return (
    <Link
      className="group rounded-[24px] border border-[#10264a]/10 bg-[#fbf7ef] p-6 transition hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(16,38,74,.08)]"
      href={href}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-[0.15em] text-[#147c73]">
          {code}
        </span>
        <span className="text-sm transition group-hover:translate-x-1">→</span>
      </div>
      <h3 className="mt-8 font-serif text-3xl font-semibold">{name}</h3>
      <p className="mt-3 text-sm text-[#10264a]/52">{status}</p>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.12em] text-[#295ca8]">
        Open jurisdiction profile
      </p>
    </Link>
  );
}

function QuestionRow({ number, text }: { number: string; text: string }) {
  return (
    <li className="grid grid-cols-[44px_1fr] gap-4 border-t border-[#fbf7ef]/15 py-5 first:border-t-0">
      <span className="font-mono text-[10px] text-[#e0a74a]">{number}</span>
      <p className="font-serif text-xl font-semibold leading-snug text-[#fbf7ef]">
        {text}
      </p>
    </li>
  );
}
