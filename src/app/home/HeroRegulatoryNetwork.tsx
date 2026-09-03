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
            <circle className="atlas-network-origin-field" cx="84" cy="122" r="23" />
            <circle className="atlas-network-origin-ring" cx="84" cy="122" r="13" />
            <circle className="atlas-network-origin-core" cx="84" cy="122" r="4" />
          </g>
          <path
            className="atlas-network-line atlas-network-line-primary atlas-network-line-1"
            d="M84 122C142 72 174 102 226 96S288 54 336 54"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-secondary atlas-network-line-2"
            d="M84 122C154 190 234 220 336 236S424 190 480 160"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-background atlas-network-line-3"
            d="M226 96C304 142 398 112 480 160"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-background atlas-network-line-4"
            d="M336 236C420 288 488 302 560 298"
            pathLength="1"
          />
          <path
            className="atlas-network-line atlas-network-line-secondary atlas-network-line-5"
            d="M480 160C520 204 546 248 560 298"
            pathLength="1"
          />

          <g className="atlas-network-node atlas-network-node-2">
            <circle cx="226" cy="96" r="7" />
          </g>
          <g className="atlas-network-node atlas-network-node-3">
            <circle cx="336" cy="54" r="7" />
            <circle className="atlas-network-node-ring" cx="336" cy="54" r="15" />
          </g>
          <g className="atlas-network-node atlas-network-node-4">
            <circle cx="336" cy="236" r="9" />
          </g>
          <g className="atlas-network-node atlas-network-node-5">
            <circle cx="480" cy="160" r="8" />
            <circle className="atlas-network-node-ring" cx="480" cy="160" r="17" />
          </g>
          <g className="atlas-network-node atlas-network-node-6">
            <circle cx="560" cy="298" r="8" />
          </g>

          <text className="atlas-network-label" x="210" y="80">
            RULE
          </text>
          <text className="atlas-network-label" x="530" y="324">
            SOURCE
          </text>
        </g>
      </svg>
    </div>
  );
}
