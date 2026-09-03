export function ExplorePathMotif() {
  return (
    <svg
      aria-hidden="true"
      className="atlas-explore-path"
      fill="none"
      viewBox="0 0 250 180"
    >
      <path className="atlas-motif-line" d="M20 48H84L116 88H208" />
      <path className="atlas-motif-line" d="M84 48V132H158L208 88" />
      <path className="atlas-motif-line atlas-motif-line-faint" d="M116 88L158 24H226" />
      <path className="atlas-explore-route" d="M20 48H84L116 88H208" />
      <circle className="atlas-motif-node" cx="20" cy="48" r="4" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="84" cy="48" r="5" />
      <circle className="atlas-motif-node" cx="116" cy="88" r="4" />
      <circle className="atlas-motif-node" cx="158" cy="24" r="4" />
      <circle className="atlas-motif-node" cx="158" cy="132" r="4" />
      <circle className="atlas-motif-node" cx="208" cy="88" r="5" />
      <circle className="atlas-motif-node" cx="226" cy="24" r="3" />
      <text className="atlas-motif-label" x="16" y="35">
        SCOPE
      </text>
      <text className="atlas-motif-label" x="190" y="108">
        PATH
      </text>
    </svg>
  );
}

export function LearnStructureMotif() {
  return (
    <div aria-hidden="true" className="atlas-learn-structure">
      {[
        ["01", "CONCEPT"],
        ["02", "RULE"],
        ["03", "APPLICATION"],
        ["04", "SOURCE"],
      ].map(([index, label]) => (
        <div className="atlas-learn-layer" key={label}>
          <span>{index}</span>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

export function DeployDecisionMotif() {
  return (
    <svg
      aria-hidden="true"
      className="atlas-deploy-decision"
      fill="none"
      viewBox="0 0 250 104"
    >
      <path className="atlas-motif-line" d="M20 52H90M90 52L142 20H224M90 52L142 84H224" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="20" cy="52" r="5" />
      <circle className="atlas-motif-node" cx="90" cy="52" r="4" />
      <circle className="atlas-motif-node" cx="142" cy="20" r="4" />
      <circle className="atlas-motif-node" cx="142" cy="84" r="4" />
      <circle className="atlas-motif-node" cx="224" cy="20" r="4" />
      <circle className="atlas-motif-node" cx="224" cy="84" r="4" />
      <text className="atlas-motif-label" x="150" y="14">
        PATH A
      </text>
      <text className="atlas-motif-label" x="150" y="101">
        PATH B
      </text>
    </svg>
  );
}
