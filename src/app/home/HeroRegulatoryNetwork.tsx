"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

const viewBox = { width: 720, height: 460 };

const nodes = [
  { id: "question", x: 194, y: 198, label: "QUESTION", labelX: -29, labelY: -22, kind: "core", delay: 680 },
  { id: "jurisdiction", x: 326, y: 108, label: "JURISDICTION", labelX: -40, labelY: -22, kind: "context", delay: 960 },
  { id: "system", x: 276, y: 330, label: "SYSTEM", labelX: -21, labelY: 30, kind: "context", delay: 1020 },
  { id: "scope", x: 428, y: 352, label: "SCOPE", labelX: -16, labelY: 29, kind: "context", delay: 1240, quiet: true },
  { id: "rule", x: 474, y: 176, label: "RULE", labelX: -13, labelY: -22, kind: "core", delay: 1060 },
  { id: "status", x: 608, y: 108, label: "STATUS", labelX: -19, labelY: -20, kind: "context", delay: 1320, quiet: true },
  { id: "source", x: 590, y: 294, label: "SOURCE", labelX: -21, labelY: 34, kind: "evidence", delay: 1200 },
  { id: "secondary", x: 520, y: 404, label: "", labelX: 0, labelY: 0, kind: "secondary", delay: 1380 },
] as const;

type NetworkNode = (typeof nodes)[number];
type NetworkNodeId = NetworkNode["id"];
type Point = { x: number; y: number };
type AnchorId = NetworkNodeId | "cloudAnchor" | "edgeUpper" | "edgeLower";

const fixedAnchors: Record<Exclude<AnchorId, NetworkNodeId>, Point> = {
  cloudAnchor: { x: 98, y: 224 },
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
  { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 130, y: 212 }, c2: { x: 160, y: 206 }, weight: "cloud", delay: 460 },
  { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 236, y: 184 }, c2: { x: 280, y: 124 }, weight: "secondary", delay: 900, moment: "a" },
  { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 190, y: 250 }, c2: { x: 228, y: 312 }, weight: "background", delay: 960, moment: "b" },
  { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 286, y: 248 }, c2: { x: 388, y: 126 }, weight: "primary", delay: 990, moment: "a" },
  { id: "jurisdiction-scope", from: "jurisdiction", to: "scope", nodes: ["jurisdiction", "scope"], c1: { x: 304, y: 190 }, c2: { x: 366, y: 308 }, weight: "secondary", delay: 1080 },
  { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 374, y: 114 }, c2: { x: 428, y: 156 }, weight: "background", delay: 1110, moment: "a" },
  { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 326, y: 294 }, c2: { x: 382, y: 372 }, weight: "secondary", delay: 1150, moment: "b" },
  { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 522, y: 166 }, c2: { x: 558, y: 122 }, weight: "background", delay: 1190 },
  { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 530, y: 204 }, c2: { x: 550, y: 268 }, weight: "primary", delay: 1220, moment: "a" },
  { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 484, y: 372 }, c2: { x: 538, y: 284 }, weight: "background", delay: 1260 },
  { id: "source-question", from: "source", to: "question", nodes: ["source", "question"], c1: { x: 460, y: 426 }, c2: { x: 252, y: 350 }, weight: "orbit", delay: 1320 },
  { id: "question-status-arc", from: "question", to: "status", nodes: ["question", "status"], c1: { x: 310, y: 24 }, c2: { x: 530, y: 22 }, weight: "orbit", delay: 1400 },
  { id: "secondary-source", from: "secondary", to: "source", nodes: ["secondary", "source"], c1: { x: 548, y: 382 }, c2: { x: 572, y: 330 }, weight: "background", delay: 1360 },
  { id: "status-edge", from: "status", to: "edgeUpper", nodes: ["status"], c1: { x: 650, y: 110 }, c2: { x: 690, y: 144 }, weight: "continuation", delay: 1440 },
  { id: "source-edge", from: "source", to: "edgeLower", nodes: ["source"], c1: { x: 642, y: 286 }, c2: { x: 684, y: 332 }, weight: "continuation", delay: 1480 },
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
  { x: 168, y: 72, r: 1.15, depth: "far", mobile: false, shimmer: false, delay: 1110, duration: 11.2 },
  { x: 206, y: 55, r: 1.6, depth: "middle", mobile: true, shimmer: false, delay: 1180, duration: 10.4 },
  { x: 390, y: 48, r: 2, depth: "near", mobile: true, shimmer: true, delay: 1080, duration: 12.6 },
  { x: 431, y: 68, r: 0.9, depth: "far", mobile: false, shimmer: false, delay: 1260, duration: 10.2 },
  { x: 650, y: 42, r: 1.7, depth: "near", mobile: false, shimmer: true, delay: 1210, duration: 9.4 },
  { x: 681, y: 139, r: 1.45, depth: "middle", mobile: true, shimmer: false, delay: 1160, duration: 10.8 },
  { x: 706, y: 166, r: 0.85, depth: "far", mobile: false, shimmer: false, delay: 1300, duration: 12.8 },
  { x: 655, y: 228, r: 1.55, depth: "near", mobile: true, shimmer: true, delay: 1190, duration: 13.7 },
  { x: 704, y: 280, r: 1.05, depth: "far", mobile: false, shimmer: false, delay: 1280, duration: 11.5 },
  { x: 510, y: 428, r: 1.75, depth: "near", mobile: true, shimmer: true, delay: 1240, duration: 10.8 },
  { x: 548, y: 444, r: 0.8, depth: "far", mobile: false, shimmer: false, delay: 1340, duration: 9.2 },
  { x: 354, y: 420, r: 1.25, depth: "middle", mobile: true, shimmer: false, delay: 1210, duration: 12.1 },
  { x: 171, y: 382, r: 1.35, depth: "middle", mobile: false, shimmer: false, delay: 1290, duration: 8.9 },
  { x: 112, y: 342, r: 0.95, depth: "far", mobile: true, shimmer: false, delay: 1360, duration: 10.9 },
  { x: 684, y: 410, r: 1.45, depth: "middle", mobile: false, shimmer: false, delay: 1320, duration: 11.8 },
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
        <defs>
          <radialGradient id="atlas-network-question-light">
            <stop offset="0" stopColor="#a9bbc8" stopOpacity="0.44" />
            <stop offset="0.38" stopColor="#a9bbc8" stopOpacity="0.18" />
            <stop offset="1" stopColor="#d8e1e7" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atlas-network-source-light">
            <stop offset="0" stopColor="#d8e1e7" stopOpacity="0.58" />
            <stop offset="0.34" stopColor="#a9bbc8" stopOpacity="0.22" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="atlas-network-cloud-light">
            <stop offset="0" stopColor="#faf9f5" stopOpacity="0.64" />
            <stop offset="0.44" stopColor="#eff4f6" stopOpacity="0.34" />
            <stop offset="1" stopColor="#eff4f6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="atlas-network-orbit-line" gradientUnits="userSpaceOnUse" x1="180" x2="635" y1="180" y2="270">
            <stop offset="0" stopColor="#6f83a6" stopOpacity="0" />
            <stop offset="0.2" stopColor="#6f83a6" stopOpacity="0.44" />
            <stop offset="0.72" stopColor="#a9bbc8" stopOpacity="0.4" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect className="atlas-network-pointer-field" height={viewBox.height} width={viewBox.width} />
        <g className="atlas-network-system">
          <g className="atlas-network-cloud">
            <ellipse className="atlas-network-cloud-haze" cx="98" cy="224" fill="url(#atlas-network-cloud-light)" rx="72" ry="51" />
            <path className="atlas-network-cloud-arc" d="M42 242C69 199 112 185 157 202" />
            <path className="atlas-network-cloud-arc atlas-network-cloud-arc-faint" d="M66 261C96 232 126 228 165 242" />
            <circle className="atlas-network-cloud-latent atlas-network-cloud-latent-one" cx="66" cy="244" r="0.85" />
            <circle className="atlas-network-cloud-latent atlas-network-cloud-latent-two" cx="146" cy="220" r="0.7" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-one" cx="76" cy="213" r="2.1" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-two" cx="101" cy="241" r="1.45" />
            <circle className="atlas-network-cloud-companion atlas-network-cloud-companion-three" cx="126" cy="207" r="1.1" />
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
                className={`atlas-network-latent atlas-network-latent-${point.depth} ${point.shimmer ? "atlas-network-latent-shimmer" : ""} ${point.mobile ? "" : "atlas-network-latent-mobile-hide"}`}
                cx={point.x}
                cy={point.y}
                key={`${point.x}-${point.y}`}
                r={point.r}
                style={
                  {
                    "--atlas-latent-delay": `${point.delay}ms`,
                    "--atlas-latent-duration": `${point.duration}s`,
                    "--atlas-latent-shimmer-delay": `${1.2 + ((index * 1.7) % 6.5)}s`,
                    "--atlas-latent-opacity": point.depth === "near" ? 0.46 : point.depth === "middle" ? 0.3 : 0.17,
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
                        <circle className="atlas-network-node-halo atlas-network-node-source-halo" fill="url(#atlas-network-source-light)" r="32" />
                        <circle className="atlas-network-node-core atlas-network-node-source-core" r="4.4" />
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
                        {node.id === "question" ? (
                          <circle className="atlas-network-node-halo atlas-network-node-question-halo" fill="url(#atlas-network-question-light)" r="27" />
                        ) : null}
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
