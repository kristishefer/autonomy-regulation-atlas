"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

const viewBox = { width: 720, height: 460 };

const nodes = [
  { id: "question", x: 194, y: 198, label: "QUESTION", labelX: -29, labelY: -20, kind: "core", delay: 500 },
  { id: "jurisdiction", x: 326, y: 108, label: "JURISDICTION", labelX: -40, labelY: -21, kind: "context", delay: 590 },
  { id: "system", x: 276, y: 330, label: "SYSTEM", labelX: -21, labelY: 29, kind: "context", delay: 620 },
  { id: "scope", x: 428, y: 352, label: "SCOPE", labelX: -16, labelY: 28, kind: "context", delay: 800, quiet: true },
  { id: "rule", x: 474, y: 176, label: "RULE", labelX: -13, labelY: -21, kind: "core", delay: 720 },
  { id: "status", x: 608, y: 108, label: "STATUS", labelX: -19, labelY: -19, kind: "context", delay: 880, quiet: true },
  { id: "source", x: 590, y: 294, label: "SOURCE", labelX: -21, labelY: 32, kind: "evidence", delay: 840 },
  { id: "secondary", x: 520, y: 404, label: "", labelX: 0, labelY: 0, kind: "secondary", delay: 960 },
] as const;

type NetworkNode = (typeof nodes)[number];
type NetworkNodeId = NetworkNode["id"];
type Point = { x: number; y: number };
type AnchorId = NetworkNodeId | "cloudAnchor" | "edgeUpper" | "edgeLower";

const fixedAnchors: Record<Exclude<AnchorId, NetworkNodeId>, Point> = {
  cloudAnchor: { x: 76, y: 224 },
  edgeUpper: { x: 724, y: 176 },
  edgeLower: { x: 724, y: 344 },
};

const nodeById = new Map<NetworkNodeId, NetworkNode>(nodes.map((node) => [node.id, node]));

type Relationship = {
  id: string;
  from: AnchorId;
  to: AnchorId;
  nodes: readonly NetworkNodeId[];
  c1: Point;
  c2: Point;
  weight: "cloud" | "primary" | "secondary" | "background" | "orbit" | "continuation";
  delay: number;
  moment?: "a" | "b";
};

const relationships: readonly Relationship[] = [
  { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 112, y: 212 }, c2: { x: 150, y: 206 }, weight: "cloud", delay: 300 },
  { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 236, y: 184 }, c2: { x: 280, y: 124 }, weight: "secondary", delay: 620, moment: "a" },
  { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 190, y: 250 }, c2: { x: 228, y: 312 }, weight: "background", delay: 680, moment: "b" },
  { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 286, y: 248 }, c2: { x: 388, y: 126 }, weight: "primary", delay: 710, moment: "a" },
  { id: "jurisdiction-scope", from: "jurisdiction", to: "scope", nodes: ["jurisdiction", "scope"], c1: { x: 304, y: 190 }, c2: { x: 366, y: 308 }, weight: "secondary", delay: 760 },
  { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 374, y: 114 }, c2: { x: 428, y: 156 }, weight: "background", delay: 790, moment: "a" },
  { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 326, y: 294 }, c2: { x: 382, y: 372 }, weight: "secondary", delay: 830, moment: "b" },
  { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 522, y: 166 }, c2: { x: 558, y: 122 }, weight: "background", delay: 860 },
  { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 530, y: 204 }, c2: { x: 550, y: 268 }, weight: "primary", delay: 890, moment: "a" },
  { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 484, y: 372 }, c2: { x: 538, y: 284 }, weight: "background", delay: 920 },
  { id: "source-question", from: "source", to: "question", nodes: ["source", "question"], c1: { x: 460, y: 426 }, c2: { x: 252, y: 350 }, weight: "orbit", delay: 960 },
  { id: "secondary-source", from: "secondary", to: "source", nodes: ["secondary", "source"], c1: { x: 548, y: 382 }, c2: { x: 572, y: 330 }, weight: "background", delay: 990 },
  { id: "status-edge", from: "status", to: "edgeUpper", nodes: ["status"], c1: { x: 650, y: 110 }, c2: { x: 690, y: 144 }, weight: "continuation", delay: 1040 },
  { id: "source-edge", from: "source", to: "edgeLower", nodes: ["source"], c1: { x: 642, y: 286 }, c2: { x: 684, y: 332 }, weight: "continuation", delay: 1080 },
] as const;

type RelationshipId = string;

const drift = {
  question: { period: 19, phase: 0.3, x: 3.2, y: 2.2 },
  jurisdiction: { period: 23, phase: 1.4, x: 2.4, y: 3.1 },
  system: { period: 21, phase: 2.1, x: 2.8, y: 2.4 },
  scope: { period: 25, phase: 0.8, x: 2.2, y: 2.8 },
  rule: { period: 17, phase: 2.8, x: 3.5, y: 2.1 },
  status: { period: 24, phase: 1.9, x: 1.9, y: 2.5 },
  source: { period: 22, phase: 3.6, x: 3.1, y: 2.7 },
  secondary: { period: 26, phase: 2.4, x: 1.7, y: 2.1 },
} satisfies Record<NetworkNodeId, { period: number; phase: number; x: number; y: number }>;

const latentPoints = [
  { x: 132, y: 84, r: 1.7, mobile: false, shimmer: true, delay: 1120, duration: 9.7 },
  { x: 184, y: 66, r: 1.1, mobile: true, shimmer: false, delay: 1180, duration: 11.2 },
  { x: 390, y: 48, r: 1.8, mobile: true, shimmer: true, delay: 1080, duration: 12.4 },
  { x: 426, y: 62, r: 1, mobile: false, shimmer: false, delay: 1240, duration: 10.2 },
  { x: 654, y: 46, r: 1.4, mobile: false, shimmer: true, delay: 1200, duration: 8.6 },
  { x: 682, y: 142, r: 1.8, mobile: true, shimmer: false, delay: 1130, duration: 10.8 },
  { x: 706, y: 158, r: 0.9, mobile: false, shimmer: true, delay: 1290, duration: 12.8 },
  { x: 650, y: 228, r: 1.2, mobile: true, shimmer: true, delay: 1160, duration: 7.9 },
  { x: 700, y: 272, r: 1.5, mobile: false, shimmer: false, delay: 1260, duration: 11.5 },
  { x: 510, y: 428, r: 1.6, mobile: true, shimmer: true, delay: 1220, duration: 10.6 },
  { x: 544, y: 442, r: 0.9, mobile: false, shimmer: false, delay: 1320, duration: 9.2 },
  { x: 354, y: 420, r: 1.3, mobile: true, shimmer: false, delay: 1190, duration: 12.1 },
  { x: 162, y: 370, r: 1.6, mobile: false, shimmer: true, delay: 1270, duration: 8.9 },
  { x: 102, y: 334, r: 1, mobile: true, shimmer: false, delay: 1340, duration: 10.9 },
  { x: 686, y: 408, r: 1.7, mobile: false, shimmer: true, delay: 1300, duration: 11.8 },
] as const;

function basePoint(id: AnchorId): Point {
  if (id in fixedAnchors) return fixedAnchors[id as keyof typeof fixedAnchors];

  const node = nodeById.get(id as NetworkNodeId);
  if (!node) throw new Error(`Unknown network anchor: ${id}`);
  return node;
}

function formatPoint(point: Point) {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
}

function pathFor(
  relationship: Relationship,
  offsets: Partial<Record<NetworkNodeId, Point>> = {},
) {
  const fromBase = basePoint(relationship.from);
  const toBase = basePoint(relationship.to);
  const fromOffset = offsets[relationship.from as NetworkNodeId] ?? { x: 0, y: 0 };
  const toOffset = offsets[relationship.to as NetworkNodeId] ?? { x: 0, y: 0 };
  const from = { x: fromBase.x + fromOffset.x, y: fromBase.y + fromOffset.y };
  const to = { x: toBase.x + toOffset.x, y: toBase.y + toOffset.y };
  const c1 = { x: relationship.c1.x + fromOffset.x, y: relationship.c1.y + fromOffset.y };
  const c2 = { x: relationship.c2.x + toOffset.x, y: relationship.c2.y + toOffset.y };

  return `M${formatPoint(from)}C${formatPoint(c1)} ${formatPoint(c2)} ${formatPoint(to)}`;
}

function motionOffset(nodeId: NetworkNodeId, time: number, scale: number): Point {
  const settings = drift[nodeId];
  const radians = (time / (settings.period * 1000)) * Math.PI * 2;

  return {
    x: Math.sin(radians + settings.phase) * settings.x * scale,
    y: Math.cos(radians * 0.83 + settings.phase * 1.3) * settings.y * scale,
  };
}

export function HeroRegulatoryNetwork() {
  const [activeNode, setActiveNode] = useState<NetworkNodeId | null>(null);
  const nodeMotionRefs = useRef<Partial<Record<NetworkNodeId, SVGGElement | null>>>({});
  const relationshipRefs = useRef<Partial<Record<RelationshipId, SVGPathElement | null>>>({});

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 639px)");
    let frame = 0;

    function render(time: number) {
      const offsets: Partial<Record<NetworkNodeId, Point>> = {};
      const scale = mobile.matches ? 0.45 : 1;

      for (const node of nodes) {
        const offset = motionOffset(node.id, time, scale);
        offsets[node.id] = offset;
        nodeMotionRefs.current[node.id]?.setAttribute(
          "transform",
          `translate(${offset.x.toFixed(2)} ${offset.y.toFixed(2)})`,
        );
      }

      for (const relationship of relationships) {
        relationshipRefs.current[relationship.id]?.setAttribute("d", pathFor(relationship, offsets));
      }

      frame = window.requestAnimationFrame(render);
    }

    function resetGeometry() {
      for (const node of nodes) nodeMotionRefs.current[node.id]?.removeAttribute("transform");
      for (const relationship of relationships) {
        relationshipRefs.current[relationship.id]?.setAttribute("d", pathFor(relationship));
      }
    }

    function updateMotion() {
      window.cancelAnimationFrame(frame);
      if (reducedMotion.matches) resetGeometry();
      else frame = window.requestAnimationFrame(render);
    }

    updateMotion();
    reducedMotion.addEventListener("change", updateMotion);

    return () => {
      window.cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * viewBox.width;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * viewBox.height;
    let nearestNode: NetworkNodeId | null = null;
    let nearestDistance = 54;

    for (const node of nodes) {
      const distance = Math.hypot(pointerX - node.x, pointerY - node.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestNode = node.id;
      }
    }

    if (activeNode !== nearestNode) setActiveNode(nearestNode);
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
          <g className="atlas-network-cloud">
            <ellipse className="atlas-network-cloud-haze" cx="77" cy="224" rx="66" ry="48" />
            <path className="atlas-network-cloud-arc" d="M24 241C52 198 99 183 142 201" />
            <path className="atlas-network-cloud-arc atlas-network-cloud-arc-faint" d="M48 260C84 231 113 228 151 240" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-one" cx="57" cy="215" r="2.1" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-two" cx="81" cy="239" r="1.45" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-three" cx="105" cy="207" r="1.1" />
          </g>

          <g className="atlas-network-relationships">
            {relationships.map((relationship) => {
              const isRelated = activeNode ? relationship.nodes.includes(activeNode) : false;
              const moment = relationship.moment ?? "none";

              return (
                <g
                  className={`atlas-network-relationship atlas-network-moment-${moment} atlas-network-relationship-${isRelated ? "related" : activeNode ? "muted" : "rest"}`}
                  data-connects={relationship.nodes.join(" ")}
                  key={relationship.id}
                >
                  <path
                    className={`atlas-network-line atlas-network-line-${relationship.weight}`}
                    d={pathFor(relationship)}
                    pathLength="1"
                    ref={(element) => {
                      relationshipRefs.current[relationship.id] = element;
                    }}
                    style={{ "--atlas-line-delay": `${relationship.delay}ms` } as CSSProperties}
                  />
                </g>
              );
            })}
          </g>

          <g className="atlas-network-latent-field">
            {latentPoints.map((point, index) => (
              <circle
                className={`atlas-network-latent ${point.shimmer ? "atlas-network-latent-shimmer" : ""} ${point.mobile ? "" : "atlas-network-latent-mobile-hide"}`}
                cx={point.x}
                cy={point.y}
                key={`${point.x}-${point.y}`}
                r={point.r}
                style={
                  {
                    "--atlas-latent-delay": `${point.delay}ms`,
                    "--atlas-latent-duration": `${point.duration}s`,
                    "--atlas-latent-shimmer-delay": `${1.2 + ((index * 1.7) % 6.5)}s`,
                    "--atlas-latent-opacity": index % 3 === 0 ? 0.32 : 0.22,
                  } as CSSProperties
                }
              />
            ))}
          </g>

          {nodes.map((node) => {
            const isActive = node.id === activeNode;
            const isMuted = Boolean(activeNode && !isActive);

            return (
              <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
                <g
                  className="atlas-network-node-motion"
                  ref={(element) => {
                    nodeMotionRefs.current[node.id] = element;
                  }}
                >
                  <g
                    className={`atlas-network-node atlas-network-node-${node.kind} ${isActive ? "atlas-network-node-active" : ""} ${isMuted ? "atlas-network-node-muted" : ""}`}
                    data-node-id={node.id}
                    style={{ "--atlas-node-delay": `${node.delay}ms` } as CSSProperties}
                  >
                    {node.kind === "evidence" ? (
                      <>
                        <circle className="atlas-network-node-halo" r="24" />
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
                      <>
                        {node.id === "question" ? <circle className="atlas-network-node-halo" r="19" /> : null}
                        <circle className="atlas-network-node-core" r={node.id === "question" ? 5.5 : 4.5} />
                      </>
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
        </g>
      </svg>
    </div>
  );
}
