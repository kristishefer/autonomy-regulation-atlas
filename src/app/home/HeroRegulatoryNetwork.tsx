"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

const viewBox = { width: 640, height: 430 };

const nodes = [
  { id: "question", x: 208, y: 126, label: "QUESTION", labelX: -27, labelY: -18, kind: "core", drift: "a", delay: 470 },
  { id: "jurisdiction", x: 348, y: 70, label: "JURISDICTION", labelX: -39, labelY: -20, kind: "context", drift: "a", delay: 540 },
  { id: "system", x: 214, y: 306, label: "SYSTEM", labelX: -20, labelY: 27, kind: "context", drift: "b", delay: 520 },
  { id: "scope", x: 366, y: 302, label: "SCOPE", labelX: -15, labelY: 27, kind: "context", drift: "b", delay: 760, quiet: true },
  { id: "rule", x: 462, y: 154, label: "RULE", labelX: -12, labelY: -19, kind: "core", drift: "c", delay: 700 },
  { id: "status", x: 564, y: 100, label: "STATUS", labelX: -18, labelY: -18, kind: "context", drift: "c", delay: 820, quiet: true },
  { id: "source", x: 544, y: 286, label: "SOURCE", labelX: -20, labelY: 31, kind: "evidence", drift: "c", delay: 780 },
  { id: "secondary", x: 474, y: 360, label: "", labelX: 0, labelY: 0, kind: "secondary", drift: "b", delay: 900 },
] as const;

type NetworkNodeId = (typeof nodes)[number]["id"] | "origin";

const relationships = [
  { id: "origin-question", nodes: ["origin", "question"], d: "M78 216C116 186 154 150 208 126", weight: "primary", delay: 220, drift: "a" },
  { id: "origin-system", nodes: ["origin", "system"], d: "M78 216C122 248 162 286 214 306", weight: "secondary", delay: 310, drift: "b" },
  { id: "origin-jurisdiction", nodes: ["origin", "jurisdiction"], d: "M78 216C154 88 248 108 348 70", weight: "background", delay: 390, drift: "a" },
  { id: "question-jurisdiction", nodes: ["question", "jurisdiction"], d: "M208 126C252 116 296 84 348 70", weight: "secondary", delay: 610, drift: "a", moment: "a" },
  { id: "question-system", nodes: ["question", "system"], d: "M208 126C182 184 188 248 214 306", weight: "background", delay: 650, drift: "b", moment: "b" },
  { id: "question-rule", nodes: ["question", "rule"], d: "M208 126C298 178 376 112 462 154", weight: "primary", delay: 690, drift: "a", moment: "a" },
  { id: "jurisdiction-scope", nodes: ["jurisdiction", "scope"], d: "M348 70C316 144 330 238 366 302", weight: "secondary", delay: 730, drift: "b", moment: "b" },
  { id: "jurisdiction-rule", nodes: ["jurisdiction", "rule"], d: "M348 70C390 86 420 122 462 154", weight: "background", delay: 770, drift: "c" },
  { id: "system-scope", nodes: ["system", "scope"], d: "M214 306C264 272 316 324 366 302", weight: "secondary", delay: 800, drift: "b", moment: "b" },
  { id: "rule-status", nodes: ["rule", "status"], d: "M462 154C498 142 524 112 564 100", weight: "background", delay: 830, drift: "c" },
  { id: "rule-source", nodes: ["rule", "source"], d: "M462 154C512 184 520 236 544 286", weight: "primary", delay: 860, drift: "c", moment: "a" },
  { id: "scope-source", nodes: ["scope", "source"], d: "M366 302C422 330 486 254 544 286", weight: "background", delay: 900, drift: "c" },
  { id: "source-question", nodes: ["source", "question"], d: "M544 286C430 382 264 286 208 126", weight: "background", delay: 940, drift: "b" },
  { id: "secondary-source", nodes: ["secondary", "source"], d: "M474 360C500 342 520 314 544 286", weight: "background", delay: 980, drift: "c" },
] as const;

const origin = { id: "origin" as const, x: 78, y: 216 };
const proximityNodes = [origin, ...nodes];

export function HeroRegulatoryNetwork() {
  const [activeNode, setActiveNode] = useState<NetworkNodeId | null>(null);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * viewBox.width;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * viewBox.height;
    let nearestNode: NetworkNodeId | null = null;
    let nearestDistance = 52;

    for (const node of proximityNodes) {
      const distance = Math.hypot(pointerX - node.x, pointerY - node.y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestNode = node.id;
      }
    }

    if (activeNode !== nearestNode) {
      setActiveNode(nearestNode);
    }
  }

  return (
    <div className="atlas-hero-network-shell" aria-hidden="true">
      <svg
        className="atlas-hero-network"
        data-active-node={activeNode ?? undefined}
        fill="none"
        onPointerLeave={() => {
          if (activeNode) setActiveNode(null);
        }}
        onPointerMove={handlePointerMove}
        viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect className="atlas-network-pointer-field" height={viewBox.height} width={viewBox.width} />
        <g className="atlas-network-system">
          <g className="atlas-network-origin">
            <path className="atlas-network-origin-orbit" d="M64 208A16 16 0 1 1 86 231" />
            <circle className="atlas-network-origin-core" cx={origin.x} cy={origin.y} r="4" />
          </g>

          <g className="atlas-network-relationships">
            {relationships.map((relationship) => {
              const isRelated = activeNode
                ? relationship.nodes.includes(activeNode as never)
                : false;
              const moment = "moment" in relationship ? relationship.moment : "none";

              return (
                <g
                  className={`atlas-network-relationship atlas-network-moment-${moment} atlas-network-relationship-${isRelated ? "related" : activeNode ? "muted" : "rest"}`}
                  data-connects={relationship.nodes.join(" ")}
                  key={relationship.id}
                >
                  <path
                    className={`atlas-network-line atlas-network-line-${relationship.weight} atlas-network-line-drift-${relationship.drift}`}
                    d={relationship.d}
                    pathLength="1"
                    style={{ "--atlas-line-delay": `${relationship.delay}ms` } as CSSProperties}
                  />
                </g>
              );
            })}
          </g>

          {nodes.map((node) => {
            const isActive = node.id === activeNode;
            const isMuted = Boolean(activeNode && !isActive);

            return (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                <g className={`atlas-network-drift atlas-network-drift-${node.drift}`}>
                  <g
                    className={`atlas-network-node atlas-network-node-${node.kind} ${isActive ? "atlas-network-node-active" : ""} ${isMuted ? "atlas-network-node-muted" : ""}`}
                    data-node-id={node.id}
                    style={{ "--atlas-node-delay": `${node.delay}ms` } as CSSProperties}
                  >
                    {node.kind === "evidence" ? (
                      <>
                        <circle className="atlas-network-node-halo" r="21" />
                        <circle className="atlas-network-node-ring" r="11" />
                        <circle className="atlas-network-node-core" r="3.5" />
                      </>
                    ) : node.kind === "context" ? (
                      <>
                        <circle className="atlas-network-node-ring" r={node.id === "jurisdiction" ? 10 : 8} />
                        <circle className="atlas-network-node-dot" r="1.7" />
                      </>
                    ) : node.kind === "secondary" ? (
                      <circle className="atlas-network-node-secondary" r="2.2" />
                    ) : (
                      <circle className="atlas-network-node-core" r={node.id === "question" ? 5.5 : 4.5} />
                    )}
                    {node.label ? (
                      <text
                        className={`atlas-network-label ${"quiet" in node && node.quiet ? "atlas-network-label-quiet" : ""}`}
                        x={node.labelX}
                        y={node.labelY}
                      >
                        {node.label}
                      </text>
                    ) : null}
                    <circle className="atlas-network-hit" r="40" />
                  </g>
                </g>
              </g>
            );
          })}

          <circle
            className="atlas-network-hit atlas-network-origin-hit"
            cx={origin.x}
            cy={origin.y}
            r="44"
          />
        </g>
      </svg>
    </div>
  );
}
