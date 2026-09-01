import {
  DEPLOYMENT_STATUS_LABELS,
  HUMAN_ONBOARD_LABELS,
  REMOTE_HUMAN_LABELS,
  getDeploymentReality,
  type DeploymentRealityJurisdiction,
  type DeploymentRealityStatus,
} from "@/app/explore/deployment-reality-data";
import { getRegulatorySource } from "@/app/explore/regulatory-data";

const statusClasses: Record<DeploymentRealityStatus, string> = {
  "commercial-operation": "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  "passenger-trial": "border-[#147c73]/25 bg-[#e7f1ed] text-[#11665f]",
  "vehicle-testing": "border-[#b97512]/25 bg-[#f7edd7] text-[#8f5f13]",
  "announced-preparing": "border-[#b97512]/25 bg-[#fff8e8] text-[#8f5f13]",
  "closed-historical": "border-[#10264a]/12 bg-[#eef1f2] text-[#10264a]/72",
};

export function DeploymentReality({
  jurisdiction,
}: {
  jurisdiction: DeploymentRealityJurisdiction;
}) {
  const entries = getDeploymentReality(jurisdiction);

  return (
    <section
      className="scroll-mt-32 border-b border-[#10264a]/10 bg-[#edf0e7]"
      id="deployment-reality"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10 lg:py-18">
        <div className="grid gap-7 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#147c73]">
              Deployment reality
            </p>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.04] tracking-[-0.04em]">
              Who is actually operating here
            </h2>
            <p className="mt-5 text-sm leading-6 text-[#10264a]/68">
              Real projects illustrate how regulatory routes are being used. They
              do not replace the legal analysis or turn one authorization into a
              general rule.
            </p>
          </div>

          <div>
            <p className="max-w-3xl font-serif text-xl font-semibold leading-8">
              Who is actually operating here — and what regulatory route allows
              it?
            </p>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#10264a]/64">
              Human roles, passenger access and operational status are verified
              separately. “Autonomous” in a project name is not treated as proof
              of driverless or commercial operation.
            </p>
          </div>
        </div>

        <div className="mt-10 divide-y divide-[#10264a]/12 border-y border-[#10264a]/15">
          {entries.map((entry) => (
            <article className="grid gap-7 py-9 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-12" key={entry.id}>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClasses[entry.status]}`}
                  >
                    {DEPLOYMENT_STATUS_LABELS[entry.status]}
                  </span>
                  <span className="text-xs font-semibold text-[#10264a]/58">
                    Verified {formatVerifiedDate(entry.lastVerified)}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-2xl font-semibold leading-8 tracking-[-0.025em]">
                  {entry.project}
                </h3>
                <p className="mt-2 text-sm font-semibold text-[#147c73]">
                  {entry.location}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#10264a]/68">
                  {entry.statusDetail}
                </p>

                <dl className="mt-6 divide-y divide-[#10264a]/10 border-t border-[#10264a]/12">
                  <RealityFact label="Operator" value={entry.operator} />
                  <RealityFact label="Vehicle / service" value={entry.vehicleService} />
                  <RealityFact label="Passenger access" value={entry.passengerAccess} />
                  <RealityFact label="Environment" value={entry.roadEnvironment} />
                </dl>
              </div>

              <div>
                <div className="grid gap-px overflow-hidden border border-[#10264a]/12 bg-[#10264a]/10 sm:grid-cols-2">
                  <div className="bg-[#fbf7ef] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/58">
                      Human onboard
                    </p>
                    <p className="mt-2 font-semibold">
                      {HUMAN_ONBOARD_LABELS[entry.humanOnboard]}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#10264a]/62">
                      {entry.humanOnboardDetail}
                    </p>
                  </div>
                  <div className="bg-[#fbf7ef] p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#10264a]/58">
                      Remote human role
                    </p>
                    <p className="mt-2 font-semibold">
                      {REMOTE_HUMAN_LABELS[entry.remoteHumanRole]}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#10264a]/62">
                      {entry.remoteHumanDetail}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-l-2 border-[#147c73] bg-white/55 p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#147c73]">
                    Regulatory route
                  </p>
                  <p className="mt-2 text-sm font-semibold leading-6">
                    {entry.legalRoute}
                  </p>
                  <p className="mt-3 text-xs leading-5 text-[#10264a]/62">
                    <strong className="text-[#10264a]/78">Authority:</strong>{" "}
                    {entry.relevantAuthority}
                  </p>
                </div>

                <div className="mt-5 rounded-[20px] bg-[#f2eadc] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a6513]">
                    Why it matters
                  </p>
                  <p className="mt-2 font-serif text-lg font-semibold leading-7">
                    {entry.whyItMatters}
                  </p>
                </div>

                {entry.uncertaintyNote ? (
                  <p className="mt-4 border-l border-[#b97512]/60 pl-4 text-xs leading-5 text-[#10264a]/65">
                    <strong className="text-[#8f5f13]">Verification limit:</strong>{" "}
                    {entry.uncertaintyNote}
                  </p>
                ) : null}

                <details className="group mt-5 border-t border-[#10264a]/12 pt-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-xs font-semibold text-[#147c73] outline-none focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-4">
                    <span>Primary and authoritative sources</span>
                    <span aria-hidden="true" className="text-lg font-normal transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <ul className="mt-4 space-y-3">
                    {entry.sources.map((source) => (
                      <li className="text-xs leading-5" key={source.url}>
                        <a
                          className="rounded-sm font-semibold underline decoration-[#147c73]/30 underline-offset-4 outline-none hover:decoration-[#147c73] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-2"
                          href={source.url}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {source.title} ↗
                        </a>
                        <span className="ml-2 text-[#10264a]/58">
                          {source.authority}
                        </span>
                      </li>
                    ))}
                    {entry.legalSourceIds?.map((sourceId) => {
                      const source = getRegulatorySource(sourceId);
                      return (
                        <li className="text-xs leading-5" key={source.id}>
                          <a
                            className="rounded-sm font-semibold underline decoration-[#147c73]/30 underline-offset-4 outline-none hover:decoration-[#147c73] focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-2"
                            href={source.url}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {source.title} ↗
                          </a>
                          <span className="ml-2 text-[#10264a]/58">
                            {source.authority} · current law
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RealityFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#10264a]/55">
        {label}
      </dt>
      <dd className="text-sm leading-5 text-[#10264a]/72">{value}</dd>
    </div>
  );
}

function formatVerifiedDate(value: string) {
  const [year, month, day] = value.split("-");
  const monthNames: Record<string, string> = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  return `${Number(day)} ${monthNames[month] ?? month} ${year}`;
}
