"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { CSSProperties, PointerEvent } from "react";

type Point = { x: number; y: number };
type NetworkNodeId =
  | "question"
  | "jurisdiction"
  | "system"
  | "scope"
  | "rule"
  | "status"
  | "source"
  | "secondary";
type FixedAnchorId =
  | "cloudAnchor"
  | "edgeUpper"
  | "edgeLower"
  | "ambientUpper"
  | "ambientUpperFar"
  | "ambientCore"
  | "ambientRight"
  | "ambientLower"
  | "ambientLowerFar";
type AnchorId = NetworkNodeId | FixedAnchorId;
type NodeKind = "question" | "core" | "context" | "evidence" | "secondary";
type LabelTier = "primary" | "secondary" | "tertiary";
type RelationshipWeight =
  | "cloud"
  | "primary"
  | "secondary"
  | "background"
  | "ambient"
  | "orbit"
  | "continuation";

type NetworkNode = {
  id: NetworkNodeId;
  x: number;
  y: number;
  label: string;
  labelX: number;
  labelY: number;
  labelTier: LabelTier;
  kind: NodeKind;
  delay: number;
  ringRadius?: number;
};

type Relationship = {
  id: string;
  from: AnchorId;
  to: AnchorId;
  nodes: readonly NetworkNodeId[];
  c1: Point;
  c2: Point;
  weight: RelationshipWeight;
  delay: number;
  moment?: "a" | "b";
};

type LatentPoint = Point & {
  r: number;
  depth: "far" | "middle" | "near";
  shimmer: boolean;
  luminous?: boolean;
  delay: number;
  duration: number;
};

type CloudComposition = {
  haze: Point & { rx: number; ry: number };
  arcs: readonly [string, string];
  latent: readonly (Point & { r: number })[];
  companions: readonly (Point & { r: number })[];
};

type NetworkComposition = {
  name: "desktop" | "mobile";
  viewBox: { width: number; height: number };
  nodes: readonly NetworkNode[];
  fixedAnchors: Record<FixedAnchorId, Point>;
  relationships: readonly Relationship[];
  latentPoints: readonly LatentPoint[];
  cloud: CloudComposition;
};

const desktopComposition: NetworkComposition = {
  name: "desktop",
  viewBox: { width: 860, height: 520 },
  nodes: [
    { id: "question", x: 165, y: 248, label: "QUESTION", labelX: -33, labelY: -29, labelTier: "primary", kind: "question", delay: 720 },
    { id: "jurisdiction", x: 340, y: 118, label: "JURISDICTION", labelX: -44, labelY: -25, labelTier: "secondary", kind: "context", delay: 980, ringRadius: 11 },
    { id: "system", x: 305, y: 385, label: "SYSTEM", labelX: -23, labelY: 31, labelTier: "tertiary", kind: "context", delay: 1080, ringRadius: 8 },
    { id: "scope", x: 522, y: 408, label: "SCOPE", labelX: -17, labelY: 30, labelTier: "tertiary", kind: "context", delay: 1290, ringRadius: 8.5 },
    { id: "rule", x: 445, y: 226, label: "RULE", labelX: -14, labelY: -24, labelTier: "secondary", kind: "core", delay: 1120 },
    { id: "status", x: 680, y: 126, label: "STATUS", labelX: -20, labelY: -23, labelTier: "tertiary", kind: "context", delay: 1360, ringRadius: 7.5 },
    { id: "source", x: 654, y: 334, label: "SOURCE", labelX: -22, labelY: 38, labelTier: "secondary", kind: "evidence", delay: 1240 },
    { id: "secondary", x: 748, y: 444, label: "", labelX: 0, labelY: 0, labelTier: "tertiary", kind: "secondary", delay: 1430 },
  ],
  fixedAnchors: {
    cloudAnchor: { x: 70, y: 250 },
    edgeUpper: { x: 875, y: 150 },
    edgeLower: { x: 875, y: 405 },
    ambientUpper: { x: 278, y: 42 },
    ambientUpperFar: { x: 610, y: 45 },
    ambientCore: { x: 540, y: 255 },
    ambientRight: { x: 815, y: 180 },
    ambientLower: { x: 370, y: 455 },
    ambientLowerFar: { x: 790, y: 365 },
  },
  relationships: [
    { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 100, y: 236 }, c2: { x: 132, y: 240 }, weight: "cloud", delay: 470 },
    { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 214, y: 208 }, c2: { x: 274, y: 132 }, weight: "secondary", delay: 910, moment: "a" },
    { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 194, y: 318 }, c2: { x: 252, y: 374 }, weight: "background", delay: 990, moment: "b" },
    { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 270, y: 305 }, c2: { x: 356, y: 166 }, weight: "primary", delay: 1020, moment: "a" },
    { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 388, y: 118 }, c2: { x: 425, y: 180 }, weight: "background", delay: 1090, moment: "a" },
    { id: "jurisdiction-scope", from: "jurisdiction", to: "scope", nodes: ["jurisdiction", "scope"], c1: { x: 365, y: 246 }, c2: { x: 458, y: 374 }, weight: "secondary", delay: 1160 },
    { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 382, y: 338 }, c2: { x: 462, y: 438 }, weight: "secondary", delay: 1210, moment: "b" },
    { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 530, y: 190 }, c2: { x: 608, y: 126 }, weight: "secondary", delay: 1240 },
    { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 522, y: 248 }, c2: { x: 582, y: 322 }, weight: "primary", delay: 1280, moment: "a" },
    { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 574, y: 428 }, c2: { x: 612, y: 366 }, weight: "background", delay: 1320 },
    { id: "source-question-lower", from: "source", to: "question", nodes: ["source", "question"], c1: { x: 564, y: 522 }, c2: { x: 278, y: 510 }, weight: "orbit", delay: 1390 },
    { id: "question-status-upper", from: "question", to: "status", nodes: ["question", "status"], c1: { x: 260, y: -14 }, c2: { x: 574, y: -2 }, weight: "orbit", delay: 1450 },
    { id: "jurisdiction-edge-upper", from: "jurisdiction", to: "edgeUpper", nodes: ["jurisdiction", "status"], c1: { x: 526, y: 26 }, c2: { x: 756, y: 42 }, weight: "orbit", delay: 1510 },
    { id: "status-edge", from: "status", to: "edgeUpper", nodes: ["status"], c1: { x: 748, y: 114 }, c2: { x: 820, y: 120 }, weight: "continuation", delay: 1540 },
    { id: "source-edge", from: "source", to: "edgeLower", nodes: ["source"], c1: { x: 724, y: 316 }, c2: { x: 808, y: 376 }, weight: "continuation", delay: 1580 },
    { id: "ambient-upper-jurisdiction", from: "ambientUpper", to: "jurisdiction", nodes: ["jurisdiction"], c1: { x: 302, y: 56 }, c2: { x: 320, y: 88 }, weight: "ambient", delay: 1410 },
    { id: "ambient-upper-rule", from: "ambientUpperFar", to: "rule", nodes: ["rule"], c1: { x: 550, y: 76 }, c2: { x: 492, y: 160 }, weight: "ambient", delay: 1480 },
    { id: "ambient-core-source", from: "ambientCore", to: "source", nodes: ["source"], c1: { x: 574, y: 260 }, c2: { x: 608, y: 302 }, weight: "ambient", delay: 1510 },
    { id: "ambient-system-lower", from: "system", to: "ambientLower", nodes: ["system"], c1: { x: 322, y: 420 }, c2: { x: 344, y: 448 }, weight: "ambient", delay: 1550 },
    { id: "ambient-status-right", from: "status", to: "ambientRight", nodes: ["status"], c1: { x: 728, y: 138 }, c2: { x: 772, y: 166 }, weight: "ambient", delay: 1600 },
    { id: "ambient-source-lower", from: "source", to: "ambientLowerFar", nodes: ["source"], c1: { x: 704, y: 356 }, c2: { x: 752, y: 370 }, weight: "ambient", delay: 1640 },
  ],
  latentPoints: [
    { x: 230, y: 58, r: 0.85, depth: "far", shimmer: false, delay: 1440, duration: 11.2 },
    { x: 278, y: 42, r: 1.45, depth: "middle", shimmer: false, delay: 1470, duration: 12.8 },
    { x: 360, y: 72, r: 2, depth: "near", shimmer: true, luminous: true, delay: 1500, duration: 10.6 },
    { x: 470, y: 35, r: 0.75, depth: "far", shimmer: false, delay: 1530, duration: 13.4 },
    { x: 535, y: 64, r: 1.25, depth: "middle", shimmer: false, delay: 1480, duration: 9.8 },
    { x: 610, y: 45, r: 0.9, depth: "far", shimmer: false, delay: 1570, duration: 12.2 },
    { x: 205, y: 180, r: 0.8, depth: "far", shimmer: false, delay: 1460, duration: 11.6 },
    { x: 280, y: 270, r: 1.25, depth: "middle", shimmer: false, delay: 1510, duration: 10.4 },
    { x: 375, y: 285, r: 0.75, depth: "far", shimmer: false, delay: 1590, duration: 12.6 },
    { x: 490, y: 145, r: 1.35, depth: "middle", shimmer: false, delay: 1540, duration: 9.6 },
    { x: 540, y: 255, r: 1.85, depth: "near", shimmer: true, luminous: true, delay: 1490, duration: 13.2 },
    { x: 580, y: 380, r: 0.85, depth: "far", shimmer: false, delay: 1620, duration: 11.8 },
    { x: 730, y: 60, r: 1.25, depth: "middle", shimmer: false, delay: 1550, duration: 10.2 },
    { x: 780, y: 95, r: 0.8, depth: "far", shimmer: false, delay: 1600, duration: 12.4 },
    { x: 815, y: 180, r: 1.7, depth: "near", shimmer: true, delay: 1520, duration: 9.4 },
    { x: 760, y: 245, r: 1.15, depth: "middle", shimmer: false, delay: 1580, duration: 11.4 },
    { x: 825, y: 285, r: 0.85, depth: "far", shimmer: false, delay: 1640, duration: 13.6 },
    { x: 790, y: 365, r: 1.75, depth: "near", shimmer: true, delay: 1560, duration: 12.2 },
    { x: 845, y: 420, r: 0.75, depth: "far", shimmer: false, delay: 1660, duration: 10.8 },
    { x: 160, y: 430, r: 1.2, depth: "middle", shimmer: false, delay: 1530, duration: 11.9 },
    { x: 250, y: 475, r: 0.8, depth: "far", shimmer: false, delay: 1610, duration: 10.5 },
    { x: 370, y: 455, r: 1.6, depth: "near", shimmer: false, delay: 1550, duration: 13.1 },
    { x: 520, y: 480, r: 0.75, depth: "far", shimmer: false, delay: 1670, duration: 12.7 },
    { x: 620, y: 460, r: 1.3, depth: "middle", shimmer: false, delay: 1590, duration: 9.9 },
    { x: 700, y: 490, r: 0.9, depth: "far", shimmer: false, delay: 1680, duration: 11.1 },
    { x: 835, y: 485, r: 1.15, depth: "middle", shimmer: false, delay: 1630, duration: 12.3 },
  ],
  cloud: {
    haze: { x: 70, y: 250, rx: 92, ry: 66 },
    arcs: ["M12 272C42 214 106 196 160 226", "M34 294C78 258 122 252 180 280"],
    latent: [
      { x: 29, y: 232, r: 0.8 },
      { x: 57, y: 280, r: 0.7 },
    ],
    companions: [
      { x: 45, y: 241, r: 2.2 },
      { x: 76, y: 272, r: 1.45 },
      { x: 112, y: 229, r: 1.15 },
    ],
  },
};

const mobileComposition: NetworkComposition = {
  name: "mobile",
  viewBox: { width: 390, height: 270 },
  nodes: [
    { id: "question", x: 100, y: 144, label: "QUESTION", labelX: -29, labelY: -23, labelTier: "primary", kind: "question", delay: 720 },
    { id: "jurisdiction", x: 188, y: 65, label: "JURISDICTION", labelX: -40, labelY: -20, labelTier: "secondary", kind: "context", delay: 980, ringRadius: 9 },
    { id: "system", x: 164, y: 222, label: "SYSTEM", labelX: -21, labelY: 26, labelTier: "tertiary", kind: "context", delay: 1080, ringRadius: 6.5 },
    { id: "scope", x: 260, y: 230, label: "SCOPE", labelX: -16, labelY: 25, labelTier: "tertiary", kind: "context", delay: 1270, ringRadius: 6.5 },
    { id: "rule", x: 226, y: 138, label: "RULE", labelX: -13, labelY: -19, labelTier: "secondary", kind: "core", delay: 1110 },
    { id: "status", x: 330, y: 62, label: "STATUS", labelX: -18, labelY: -18, labelTier: "tertiary", kind: "context", delay: 1350, ringRadius: 6 },
    { id: "source", x: 315, y: 185, label: "SOURCE", labelX: -20, labelY: 29, labelTier: "secondary", kind: "evidence", delay: 1230 },
    { id: "secondary", x: 366, y: 244, label: "", labelX: 0, labelY: 0, labelTier: "tertiary", kind: "secondary", delay: 1410 },
  ],
  fixedAnchors: {
    cloudAnchor: { x: 35, y: 154 },
    edgeUpper: { x: 400, y: 94 },
    edgeLower: { x: 400, y: 225 },
    ambientUpper: { x: 140, y: 28 },
    ambientUpperFar: { x: 280, y: 22 },
    ambientCore: { x: 268, y: 116 },
    ambientRight: { x: 376, y: 130 },
    ambientLower: { x: 130, y: 258 },
    ambientLowerFar: { x: 350, y: 254 },
  },
  relationships: [
    { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 56, y: 144 }, c2: { x: 78, y: 142 }, weight: "cloud", delay: 470 },
    { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 124, y: 118 }, c2: { x: 151, y: 72 }, weight: "secondary", delay: 900, moment: "a" },
    { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 112, y: 184 }, c2: { x: 138, y: 215 }, weight: "background", delay: 980 },
    { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 145, y: 170 }, c2: { x: 190, y: 116 }, weight: "primary", delay: 1020, moment: "a" },
    { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 207, y: 76 }, c2: { x: 220, y: 112 }, weight: "background", delay: 1080 },
    { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 198, y: 202 }, c2: { x: 232, y: 242 }, weight: "secondary", delay: 1190 },
    { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 264, y: 120 }, c2: { x: 300, y: 74 }, weight: "secondary", delay: 1240 },
    { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 263, y: 146 }, c2: { x: 284, y: 179 }, weight: "primary", delay: 1280, moment: "a" },
    { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 282, y: 232 }, c2: { x: 300, y: 204 }, weight: "background", delay: 1320 },
    { id: "question-source-orbit", from: "question", to: "source", nodes: ["question", "source"], c1: { x: 158, y: 282 }, c2: { x: 280, y: 276 }, weight: "orbit", delay: 1430 },
    { id: "status-edge", from: "status", to: "edgeUpper", nodes: ["status"], c1: { x: 354, y: 63 }, c2: { x: 378, y: 78 }, weight: "continuation", delay: 1490 },
    { id: "source-edge", from: "source", to: "edgeLower", nodes: ["source"], c1: { x: 344, y: 181 }, c2: { x: 374, y: 210 }, weight: "continuation", delay: 1530 },
    { id: "ambient-upper-jurisdiction", from: "ambientUpper", to: "jurisdiction", nodes: ["jurisdiction"], c1: { x: 158, y: 32 }, c2: { x: 174, y: 48 }, weight: "ambient", delay: 1440 },
    { id: "ambient-source-right", from: "source", to: "ambientRight", nodes: ["source"], c1: { x: 338, y: 170 }, c2: { x: 360, y: 143 }, weight: "ambient", delay: 1520 },
  ],
  latentPoints: [
    { x: 140, y: 28, r: 0.8, depth: "far", shimmer: false, delay: 1440, duration: 10.5 },
    { x: 242, y: 30, r: 1.15, depth: "middle", shimmer: false, delay: 1490, duration: 12.4 },
    { x: 300, y: 20, r: 0.7, depth: "far", shimmer: false, delay: 1520, duration: 11.2 },
    { x: 268, y: 116, r: 1.5, depth: "near", shimmer: false, luminous: true, delay: 1470, duration: 13.1 },
    { x: 354, y: 120, r: 0.8, depth: "far", shimmer: false, delay: 1550, duration: 10.7 },
    { x: 376, y: 130, r: 1.2, depth: "middle", shimmer: false, delay: 1580, duration: 12.6 },
    { x: 130, y: 258, r: 0.75, depth: "far", shimmer: false, delay: 1510, duration: 11.8 },
    { x: 210, y: 260, r: 1.2, depth: "middle", shimmer: false, delay: 1560, duration: 10.9 },
    { x: 304, y: 252, r: 0.8, depth: "far", shimmer: false, delay: 1600, duration: 12.3 },
    { x: 350, y: 254, r: 1.35, depth: "near", shimmer: false, delay: 1620, duration: 11.4 },
  ],
  cloud: {
    haze: { x: 35, y: 154, rx: 53, ry: 42 },
    arcs: ["M-4 169C18 130 60 121 92 140", "M8 184C38 160 66 158 101 176"],
    latent: [
      { x: 12, y: 143, r: 0.65 },
      { x: 53, y: 180, r: 0.55 },
    ],
    companions: [
      { x: 22, y: 148, r: 1.65 },
      { x: 41, y: 173, r: 1.15 },
      { x: 65, y: 141, r: 0.9 },
    ],
  },
};

const drift = {
  question: { period: 21, phase: 0.3, x: 3.8, y: 2.5 },
  jurisdiction: { period: 25, phase: 1.4, x: 2.8, y: 3.4 },
  system: { period: 23, phase: 2.1, x: 3.1, y: 2.7 },
  scope: { period: 27, phase: 0.8, x: 2.5, y: 3.1 },
  rule: { period: 19, phase: 2.8, x: 4.2, y: 2.4 },
  status: { period: 26, phase: 1.9, x: 2.2, y: 2.8 },
  source: { period: 24, phase: 3.6, x: 3.6, y: 3.1 },
  secondary: { period: 29, phase: 2.4, x: 1.9, y: 2.3 },
} satisfies Record<NetworkNodeId, { period: number; phase: number; x: number; y: number }>;

function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia("(max-width: 639px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getIsMobile() {
  return window.matchMedia("(max-width: 639px)").matches;
}

function getServerIsMobile() {
  return false;
}

function basePoint(composition: NetworkComposition, id: AnchorId): Point {
  if (id in composition.fixedAnchors) {
    return composition.fixedAnchors[id as FixedAnchorId];
  }

  const node = composition.nodes.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Unknown network anchor: ${id}`);
  return node;
}

function formatPoint(point: Point) {
  return `${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
}

function pathFor(
  composition: NetworkComposition,
  relationship: Relationship,
  offsets: Partial<Record<NetworkNodeId, Point>> = {},
) {
  const fromBase = basePoint(composition, relationship.from);
  const toBase = basePoint(composition, relationship.to);
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

function NetworkNodeMarker({
  node,
  gradientPrefix,
  activeNode,
}: {
  node: NetworkNode;
  gradientPrefix: string;
  activeNode: NetworkNodeId | null;
}) {
  const isActive = node.id === activeNode;
  const isMuted = Boolean(activeNode && !isActive);

  return (
    <g
      className={`atlas-network-node atlas-network-node-${node.kind} atlas-network-marker-${node.id} ${isActive ? "atlas-network-node-active" : ""} ${isMuted ? "atlas-network-node-muted" : ""}`}
      data-node-id={node.id}
      style={{ "--atlas-node-delay": `${node.delay}ms` } as CSSProperties}
    >
      {node.kind === "question" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-question-halo" fill={`url(#${gradientPrefix}-question-light)`} r="49" />
          <circle className="atlas-network-node-lumen" fill={`url(#${gradientPrefix}-question-lumen)`} r="13" />
          <circle className="atlas-network-node-core atlas-network-node-question-core" r="5.8" />
        </>
      ) : node.kind === "evidence" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-source-halo" fill={`url(#${gradientPrefix}-source-light)`} r="39" />
          <circle className="atlas-network-node-core atlas-network-node-source-core" r="4.5" />
        </>
      ) : node.kind === "context" ? (
        <>
          {node.id === "jurisdiction" ? (
            <circle className="atlas-network-node-halo atlas-network-node-jurisdiction-halo" fill={`url(#${gradientPrefix}-context-light)`} r="25" />
          ) : null}
          <circle className="atlas-network-node-ring" r={node.ringRadius ?? 8} />
          <circle className="atlas-network-node-dot" r="1.55" />
        </>
      ) : node.kind === "secondary" ? (
        <circle className="atlas-network-node-secondary" r="2.15" />
      ) : (
        <>
          <circle className="atlas-network-node-rule-halo" r="14" />
          <circle className="atlas-network-node-core atlas-network-node-rule-core" r="4.3" />
        </>
      )}
      {node.label ? (
        <text
          className={`atlas-network-label atlas-network-label-${node.labelTier}`}
          x={node.labelX}
          y={node.labelY}
        >
          {node.label}
        </text>
      ) : null}
      <circle className="atlas-network-hit" r="43" />
    </g>
  );
}

export function HeroRegulatoryNetwork() {
  const isMobile = useSyncExternalStore(subscribeToMobile, getIsMobile, getServerIsMobile);
  const composition = isMobile ? mobileComposition : desktopComposition;
  const [activeNode, setActiveNode] = useState<NetworkNodeId | null>(null);
  const nodeMotionRefs = useRef<Partial<Record<NetworkNodeId, SVGGElement | null>>>({});
  const relationshipRefs = useRef<Record<string, SVGPathElement | null>>({});
  const gradientPrefix = `atlas-network-${composition.name}`;
  const visibleActiveNode = isMobile ? null : activeNode;

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    function render(time: number) {
      const offsets: Partial<Record<NetworkNodeId, Point>> = {};
      const scale = isMobile ? 0.42 : 1;

      for (const node of composition.nodes) {
        const offset = motionOffset(node.id, time, scale);
        offsets[node.id] = offset;
        nodeMotionRefs.current[node.id]?.setAttribute(
          "transform",
          `translate(${offset.x.toFixed(2)} ${offset.y.toFixed(2)})`,
        );
      }

      for (const relationship of composition.relationships) {
        relationshipRefs.current[relationship.id]?.setAttribute(
          "d",
          pathFor(composition, relationship, offsets),
        );
      }

      frame = window.requestAnimationFrame(render);
    }

    function resetGeometry() {
      for (const node of composition.nodes) {
        nodeMotionRefs.current[node.id]?.removeAttribute("transform");
      }
      for (const relationship of composition.relationships) {
        relationshipRefs.current[relationship.id]?.setAttribute(
          "d",
          pathFor(composition, relationship),
        );
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
  }, [composition, isMobile]);

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (
      isMobile ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * composition.viewBox.width;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * composition.viewBox.height;
    let nearestNode: NetworkNodeId | null = null;
    let nearestDistance = 58;

    for (const node of composition.nodes) {
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
        data-active-node={visibleActiveNode ?? undefined}
        data-variant={composition.name}
        fill="none"
        onPointerLeave={() => {
          if (activeNode) setActiveNode(null);
        }}
        onPointerMove={handlePointerMove}
        viewBox={`0 0 ${composition.viewBox.width} ${composition.viewBox.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`${gradientPrefix}-question-light`}>
            <stop offset="0" stopColor="#f7f7f3" stopOpacity="0.74" />
            <stop offset="0.22" stopColor="#dce5eb" stopOpacity="0.42" />
            <stop offset="0.56" stopColor="#a9bbc8" stopOpacity="0.16" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientPrefix}-question-lumen`}>
            <stop offset="0" stopColor="#faf9f5" stopOpacity="0.96" />
            <stop offset="0.38" stopColor="#cdd9e1" stopOpacity="0.52" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientPrefix}-source-light`}>
            <stop offset="0" stopColor="#f7f7f3" stopOpacity="0.6" />
            <stop offset="0.34" stopColor="#d8e1e7" stopOpacity="0.34" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientPrefix}-context-light`}>
            <stop offset="0" stopColor="#eff4f6" stopOpacity="0.4" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${gradientPrefix}-cloud-light`}>
            <stop offset="0" stopColor="#faf9f5" stopOpacity="0.74" />
            <stop offset="0.4" stopColor="#eef3f5" stopOpacity="0.44" />
            <stop offset="1" stopColor="#d8e1e7" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id={`${gradientPrefix}-orbit-line`}
            gradientUnits="userSpaceOnUse"
            x1="120"
            x2={composition.viewBox.width - 25}
            y1="150"
            y2={composition.viewBox.height - 120}
          >
            <stop offset="0" stopColor="#6f83a6" stopOpacity="0" />
            <stop offset="0.18" stopColor="#6f83a6" stopOpacity="0.48" />
            <stop offset="0.7" stopColor="#a9bbc8" stopOpacity="0.44" />
            <stop offset="1" stopColor="#a9bbc8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect className="atlas-network-pointer-field" height={composition.viewBox.height} width={composition.viewBox.width} />
        <g className="atlas-network-system">
          <g className="atlas-network-cloud">
            <ellipse
              className="atlas-network-cloud-haze"
              cx={composition.cloud.haze.x}
              cy={composition.cloud.haze.y}
              fill={`url(#${gradientPrefix}-cloud-light)`}
              rx={composition.cloud.haze.rx}
              ry={composition.cloud.haze.ry}
            />
            {composition.cloud.arcs.map((path, index) => (
              <path
                className={`atlas-network-cloud-arc ${index === 1 ? "atlas-network-cloud-arc-faint" : ""}`}
                d={path}
                key={path}
              />
            ))}
            {composition.cloud.latent.map((point, index) => (
              <circle
                className={`atlas-network-cloud-latent atlas-network-cloud-latent-${index + 1}`}
                cx={point.x}
                cy={point.y}
                key={`${point.x}-${point.y}`}
                r={point.r}
              />
            ))}
            {composition.cloud.companions.map((point, index) => (
              <circle
                className={`atlas-network-cloud-companion atlas-network-cloud-companion-${index + 1}`}
                cx={point.x}
                cy={point.y}
                key={`${point.x}-${point.y}`}
                r={point.r}
              />
            ))}
          </g>

          <g className="atlas-network-relationships">
            {composition.relationships.map((relationship) => {
              const isRelated = visibleActiveNode
                ? relationship.nodes.includes(visibleActiveNode)
                : false;
              const moment = relationship.moment ?? "none";

              return (
                <g
                  className={`atlas-network-relationship atlas-network-moment-${moment} atlas-network-relationship-${isRelated ? "related" : visibleActiveNode ? "muted" : "rest"}`}
                  data-connects={relationship.nodes.join(" ")}
                  key={relationship.id}
                >
                  <path
                    className={`atlas-network-line atlas-network-line-${relationship.weight}`}
                    d={pathFor(composition, relationship)}
                    pathLength="1"
                    ref={(element) => {
                      relationshipRefs.current[relationship.id] = element;
                    }}
                    style={
                      {
                        "--atlas-line-delay": `${relationship.delay}ms`,
                        ...(relationship.weight === "orbit"
                          ? { stroke: `url(#${gradientPrefix}-orbit-line)` }
                          : {}),
                      } as CSSProperties
                    }
                  />
                </g>
              );
            })}
          </g>

          <g className="atlas-network-latent-field">
            {composition.latentPoints.map((point, index) => (
              <g key={`${point.x}-${point.y}`}>
                {point.luminous ? (
                  <circle
                    className="atlas-network-latent-light"
                    cx={point.x}
                    cy={point.y}
                    r={point.r * 5.5}
                    style={{ "--atlas-latent-delay": `${point.delay}ms` } as CSSProperties}
                  />
                ) : null}
                <circle
                  className={`atlas-network-latent atlas-network-latent-${point.depth} ${point.shimmer ? "atlas-network-latent-shimmer" : ""}`}
                  cx={point.x}
                  cy={point.y}
                  r={point.r}
                  style={
                    {
                      "--atlas-latent-delay": `${point.delay}ms`,
                      "--atlas-latent-duration": `${point.duration}s`,
                      "--atlas-latent-shimmer-delay": `${2.4 + ((index * 1.9) % 7.2)}s`,
                      "--atlas-latent-opacity": point.depth === "near" ? 0.54 : point.depth === "middle" ? 0.34 : 0.18,
                    } as CSSProperties
                  }
                />
              </g>
            ))}
          </g>

          {composition.nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <g
                className="atlas-network-node-motion"
                ref={(element) => {
                  nodeMotionRefs.current[node.id] = element;
                }}
              >
                <NetworkNodeMarker
                  activeNode={visibleActiveNode}
                  gradientPrefix={gradientPrefix}
                  node={node}
                />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
