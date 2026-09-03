export function ExplorePathMotif() {
  return (
    <svg
      aria-hidden="true"
      className="atlas-explore-path"
      fill="none"
      viewBox="0 0 250 180"
    >
      <path className="atlas-motif-line" d="M18 118C76 42 128 144 218 58" />
      <path className="atlas-explore-route" d="M18 118C76 42 128 144 218 58" />
      <circle className="atlas-motif-node" cx="18" cy="118" r="4" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="92" cy="86" r="5" />
      <circle className="atlas-motif-node" cx="155" cy="101" r="4" />
      <circle className="atlas-motif-node" cx="218" cy="58" r="5" />
    </svg>
  );
}

export function LearnStructureMotif() {
  return (
    <div aria-hidden="true" className="atlas-learn-structure">
      {[["01", "CONCEPT"], ["02", "RULE"], ["03", "SOURCE"]].map(([index, label]) => (
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
      <path className="atlas-motif-line" d="M26 52H96M96 52C138 52 150 24 212 24M96 52C138 52 150 80 212 80" />
      <path className="atlas-deploy-route" d="M26 52H96C138 52 150 24 212 24" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="20" cy="52" r="5" />
      <circle className="atlas-motif-node" cx="96" cy="52" r="4" />
      <circle className="atlas-motif-node" cx="212" cy="24" r="4" />
      <circle className="atlas-motif-node" cx="212" cy="80" r="4" />
    </svg>
  );
}
