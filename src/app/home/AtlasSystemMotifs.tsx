export function ExplorePathMotif() {
  return (
    <svg
      aria-hidden="true"
      className="atlas-explore-path"
      fill="none"
      viewBox="0 0 250 180"
    >
      <path className="atlas-motif-line" d="M18 118C76 42 128 144 218 58" />
      <path className="atlas-explore-route" d="M18 118C76 42 128 144 218 58" pathLength="1" />
      <circle className="atlas-motif-halo" cx="218" cy="58" r="13" />
      <circle className="atlas-motif-node atlas-motif-node-filled" cx="18" cy="118" r="4" />
      <circle className="atlas-motif-node atlas-motif-node-open" cx="92" cy="86" r="6" />
      <circle className="atlas-motif-node atlas-motif-node-faint" cx="143" cy="49" r="2.4" />
      <circle className="atlas-motif-node atlas-motif-node-open" cx="155" cy="101" r="4" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="218" cy="58" r="4.5" />
    </svg>
  );
}

export function LearnStructureMotif() {
  return (
    <svg
      aria-hidden="true"
      className="atlas-learn-structure"
      fill="none"
      viewBox="0 0 240 170"
    >
      <g className="atlas-cat-relationships">
        <path className="atlas-motif-line atlas-cat-line" d="M29 58C70 24 98 28 119 42" />
        <path className="atlas-motif-line atlas-cat-line" d="M119 42C152 42 174 54 202 72" />
        <path className="atlas-motif-line atlas-cat-line" d="M29 58C45 94 68 122 98 139" />
        <path className="atlas-motif-line atlas-cat-line" d="M98 139C130 124 152 119 179 126" />
        <path className="atlas-motif-line atlas-cat-line atlas-cat-line-selected" d="M119 42C144 76 159 100 179 126" />
      </g>

      <g className="atlas-cat-node atlas-cat-node-concept" transform="translate(29 58)">
        <circle className="atlas-motif-node atlas-motif-node-filled" r="4.5" />
        <text className="atlas-cat-label atlas-cat-label-primary" x="-13" y="-14">
          CONCEPT
        </text>
      </g>
      <g className="atlas-cat-node atlas-cat-node-rule" transform="translate(119 42)">
        <circle className="atlas-motif-node atlas-motif-node-open" r="7" />
        <circle className="atlas-motif-node-dot" r="1.5" />
        <text className="atlas-cat-label atlas-cat-label-primary" x="-10" y="-14">
          RULE
        </text>
      </g>
      <g className="atlas-cat-node atlas-cat-node-application" transform="translate(202 72)">
        <circle className="atlas-motif-node atlas-motif-node-open" r="5" />
        <text className="atlas-cat-label" x="-27" y="-14">
          APPLICATION
        </text>
      </g>
      <g className="atlas-cat-node atlas-cat-node-context" transform="translate(98 139)">
        <circle className="atlas-motif-node atlas-motif-node-faint" r="2.8" />
      </g>
      <g className="atlas-cat-node atlas-cat-node-source" transform="translate(179 126)">
        <circle className="atlas-motif-halo" r="15" />
        <circle className="atlas-motif-node atlas-motif-node-open" r="7" />
        <circle className="atlas-motif-node-dot" r="2" />
        <text className="atlas-cat-label atlas-cat-label-primary" x="-15" y="24">
          SOURCE
        </text>
      </g>
    </svg>
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
      <path className="atlas-deploy-route" d="M26 52H96C138 52 150 24 212 24" pathLength="1" />
      <circle className="atlas-motif-halo" cx="212" cy="24" r="12" />
      <circle className="atlas-motif-node atlas-motif-node-filled" cx="20" cy="52" r="4.5" />
      <circle className="atlas-motif-node atlas-motif-node-open" cx="96" cy="52" r="6" />
      <circle className="atlas-motif-node atlas-motif-node-active" cx="212" cy="24" r="4" />
      <circle className="atlas-motif-node atlas-motif-node-faint" cx="212" cy="80" r="3.5" />
    </svg>
  );
}
