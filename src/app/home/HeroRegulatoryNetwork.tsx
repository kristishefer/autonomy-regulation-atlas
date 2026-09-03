export function HeroRegulatoryNetwork() {
  return (
    <div className="atlas-hero-network-shell" aria-hidden="true">
      <svg
        className="atlas-hero-network"
        fill="none"
        viewBox="0 0 640 430"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="atlas-network-system">
          <g className="atlas-network-origin">
            <circle className="atlas-network-origin-field" cx="84" cy="116" r="23" />
            <circle className="atlas-network-origin-ring" cx="84" cy="116" r="13" />
            <circle className="atlas-network-origin-core" cx="84" cy="116" r="4" />
          </g>
          <path
            className="atlas-network-line atlas-network-line-primary atlas-network-line-1"
            d="M84 116H226L318 54H488"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-secondary atlas-network-line-2"
            d="M84 116L172 234H318L414 166H558"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-background atlas-network-line-3"
            d="M172 234L250 352H414L558 286"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-background atlas-network-line-4"
            d="M318 54V234L414 352V166"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-secondary atlas-network-line-5"
            d="M226 116L318 234L488 54L558 166V286"
            pathLength="1"
          />

          <g className="atlas-network-node atlas-network-node-2">
            <circle cx="226" cy="116" r="8" />
          </g>
          <g className="atlas-network-node atlas-network-node-3">
            <circle cx="318" cy="54" r="8" />
            <circle className="atlas-network-node-ring" cx="318" cy="54" r="16" />
          </g>
          <g className="atlas-network-node atlas-network-node-4">
            <circle cx="488" cy="54" r="7" />
          </g>
          <g className="atlas-network-node atlas-network-node-5">
            <circle cx="172" cy="234" r="8" />
          </g>
          <g className="atlas-network-node atlas-network-node-6">
            <circle cx="318" cy="234" r="11" />
            <circle className="atlas-network-node-ring" cx="318" cy="234" r="21" />
          </g>
          <g className="atlas-network-node atlas-network-node-7">
            <circle cx="414" cy="166" r="8" />
          </g>
          <g className="atlas-network-node atlas-network-node-8">
            <circle cx="558" cy="166" r="9" />
            <circle className="atlas-network-node-ring" cx="558" cy="166" r="18" />
          </g>
          <g className="atlas-network-node atlas-network-node-9">
            <circle cx="250" cy="352" r="7" />
          </g>
          <g className="atlas-network-node atlas-network-node-10">
            <circle cx="414" cy="352" r="8" />
          </g>
          <g className="atlas-network-node atlas-network-node-11">
            <circle cx="558" cy="286" r="10" />
            <circle className="atlas-network-node-ring" cx="558" cy="286" r="19" />
          </g>

          <text className="atlas-network-label" x="214" y="101">
            RULE
          </text>
          <text className="atlas-network-label" x="427" y="154">
            STATUS
          </text>
          <text className="atlas-network-label" x="522" y="316">
            SOURCE
          </text>
        </g>
      </svg>
    </div>
  );
}
