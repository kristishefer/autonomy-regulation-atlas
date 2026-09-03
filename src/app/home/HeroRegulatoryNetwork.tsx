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
  | "source";
type FixedAnchorId =
  | "cloudAnchor"
  | "upperHorizon"
  | "rightHorizon"
  | "lowerHorizon"
  | "northField"
  | "eastField"
  | "southField";
type AnchorId = NetworkNodeId | FixedAnchorId;
type NodeKind = "question" | "jurisdiction" | "rule" | "evidence" | "context";
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
  shimmer?: boolean;
  luminous?: boolean;
  nearNode?: "question" | "source";
  delay: number;
  duration: number;
};

type FaintCluster = {
  path: string;
  points: readonly (Point & { r: number })[];
  delay: number;
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
  clusters: readonly FaintCluster[];
  cloud: CloudComposition;
};

type CurveOffset = { c1: Point; c2: Point };

const desktopComposition: NetworkComposition = {
  name: "desktop",
  viewBox: { width: 960, height: 600 },
  nodes: [
    { id: "question", x: 210, y: 300, label: "QUESTION", labelX: -38, labelY: -38, labelTier: "primary", kind: "question", delay: 610 },
    { id: "jurisdiction", x: 382, y: 132, label: "JURISDICTION", labelX: -48, labelY: -30, labelTier: "secondary", kind: "jurisdiction", delay: 850, ringRadius: 12 },
    { id: "system", x: 338, y: 454, label: "SYSTEM", labelX: -24, labelY: 34, labelTier: "tertiary", kind: "context", delay: 980, ringRadius: 8 },
    { id: "rule", x: 520, y: 270, label: "RULE", labelX: -15, labelY: -30, labelTier: "secondary", kind: "rule", delay: 1010, ringRadius: 10 },
    { id: "scope", x: 588, y: 470, label: "SCOPE", labelX: -18, labelY: 35, labelTier: "tertiary", kind: "context", delay: 1160, ringRadius: 8.5 },
    { id: "status", x: 770, y: 148, label: "STATUS", labelX: -21, labelY: -27, labelTier: "tertiary", kind: "context", delay: 1230, ringRadius: 7.5 },
    { id: "source", x: 750, y: 356, label: "SOURCE", labelX: -24, labelY: 43, labelTier: "secondary", kind: "evidence", delay: 1110, ringRadius: 12 },
  ],
  fixedAnchors: {
    cloudAnchor: { x: 54, y: 316 },
    upperHorizon: { x: 970, y: 94 },
    rightHorizon: { x: 976, y: 326 },
    lowerHorizon: { x: 968, y: 534 },
    northField: { x: 570, y: 50 },
    eastField: { x: 886, y: 242 },
    southField: { x: 445, y: 552 },
  },
  relationships: [
    { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 104, y: 286 }, c2: { x: 154, y: 287 }, weight: "cloud", delay: 390 },
    { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 252, y: 242 }, c2: { x: 314, y: 145 }, weight: "secondary", delay: 780, moment: "a" },
    { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 238, y: 382 }, c2: { x: 288, y: 446 }, weight: "background", delay: 870, moment: "b" },
    { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 320, y: 360 }, c2: { x: 414, y: 216 }, weight: "primary", delay: 910, moment: "a" },
    { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 438, y: 137 }, c2: { x: 488, y: 214 }, weight: "secondary", delay: 980, moment: "a" },
    { id: "jurisdiction-scope", from: "jurisdiction", to: "scope", nodes: ["jurisdiction", "scope"], c1: { x: 414, y: 292 }, c2: { x: 506, y: 426 }, weight: "background", delay: 1050 },
    { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 430, y: 398 }, c2: { x: 514, y: 505 }, weight: "secondary", delay: 1100, moment: "b" },
    { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 606, y: 226 }, c2: { x: 687, y: 152 }, weight: "secondary", delay: 1130 },
    { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 612, y: 283 }, c2: { x: 669, y: 352 }, weight: "primary", delay: 1170, moment: "a" },
    { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 650, y: 488 }, c2: { x: 694, y: 398 }, weight: "background", delay: 1210, moment: "b" },
    { id: "source-question-lower", from: "source", to: "question", nodes: ["source", "question"], c1: { x: 644, y: 640 }, c2: { x: 340, y: 626 }, weight: "orbit", delay: 1370 },
    { id: "question-status-upper", from: "question", to: "status", nodes: ["question", "status"], c1: { x: 306, y: -54 }, c2: { x: 650, y: -30 }, weight: "orbit", delay: 1440 },
    { id: "jurisdiction-upper-horizon", from: "jurisdiction", to: "upperHorizon", nodes: ["jurisdiction", "status"], c1: { x: 608, y: 24 }, c2: { x: 836, y: 42 }, weight: "orbit", delay: 1510 },
    { id: "status-horizon", from: "status", to: "upperHorizon", nodes: ["status"], c1: { x: 844, y: 130 }, c2: { x: 918, y: 104 }, weight: "continuation", delay: 1540 },
    { id: "source-horizon", from: "source", to: "rightHorizon", nodes: ["source"], c1: { x: 832, y: 334 }, c2: { x: 914, y: 320 }, weight: "continuation", delay: 1570 },
    { id: "scope-lower-horizon", from: "scope", to: "lowerHorizon", nodes: ["scope"], c1: { x: 734, y: 530 }, c2: { x: 862, y: 554 }, weight: "ambient", delay: 1590 },
    { id: "north-jurisdiction", from: "northField", to: "jurisdiction", nodes: ["jurisdiction"], c1: { x: 514, y: 52 }, c2: { x: 434, y: 88 }, weight: "ambient", delay: 1460 },
    { id: "east-source", from: "eastField", to: "source", nodes: ["source"], c1: { x: 844, y: 266 }, c2: { x: 798, y: 322 }, weight: "ambient", delay: 1500 },
    { id: "south-system", from: "southField", to: "system", nodes: ["system"], c1: { x: 414, y: 534 }, c2: { x: 370, y: 486 }, weight: "ambient", delay: 1560 },
  ],
  latentPoints: [
    { x: 214, y: 72, r: 0.8, depth: "far", delay: 1370, duration: 9.8 },
    { x: 292, y: 38, r: 1.3, depth: "middle", delay: 1400, duration: 11.4 },
    { x: 354, y: 76, r: 1.8, depth: "near", shimmer: true, luminous: true, delay: 1430, duration: 8.7 },
    { x: 465, y: 34, r: 0.7, depth: "far", delay: 1460, duration: 12.1 },
    { x: 570, y: 50, r: 1.2, depth: "middle", delay: 1410, duration: 10.8 },
    { x: 652, y: 30, r: 0.7, depth: "far", delay: 1490, duration: 11.8 },
    { x: 835, y: 52, r: 1.1, depth: "middle", delay: 1450, duration: 9.4 },
    { x: 910, y: 87, r: 0.65, depth: "far", delay: 1520, duration: 12.4 },
    { x: 254, y: 190, r: 0.75, depth: "far", nearNode: "question", delay: 1390, duration: 10.6 },
    { x: 316, y: 292, r: 1.2, depth: "middle", delay: 1440, duration: 9.9 },
    { x: 424, y: 222, r: 0.7, depth: "far", delay: 1510, duration: 11.6 },
    { x: 576, y: 164, r: 1.25, depth: "middle", shimmer: true, delay: 1460, duration: 7.6 },
    { x: 654, y: 258, r: 0.75, depth: "far", delay: 1540, duration: 10.2 },
    { x: 830, y: 236, r: 1.65, depth: "near", shimmer: true, luminous: true, delay: 1480, duration: 10.7 },
    { x: 910, y: 214, r: 0.8, depth: "far", delay: 1580, duration: 11.3 },
    { x: 894, y: 312, r: 1.1, depth: "middle", delay: 1520, duration: 9.5 },
    { x: 282, y: 390, r: 0.7, depth: "far", delay: 1450, duration: 12.3 },
    { x: 420, y: 354, r: 1.25, depth: "middle", delay: 1500, duration: 10.1 },
    { x: 602, y: 334, r: 0.8, depth: "far", delay: 1570, duration: 11.7 },
    { x: 678, y: 410, r: 0.8, depth: "far", nearNode: "source", delay: 1600, duration: 9.8 },
    { x: 824, y: 444, r: 1.7, depth: "near", shimmer: true, delay: 1540, duration: 8.9 },
    { x: 918, y: 420, r: 0.7, depth: "far", delay: 1620, duration: 12.5 },
    { x: 222, y: 520, r: 1.1, depth: "middle", delay: 1510, duration: 10.4 },
    { x: 352, y: 560, r: 0.75, depth: "far", delay: 1580, duration: 11.9 },
    { x: 445, y: 552, r: 1.55, depth: "near", shimmer: true, delay: 1530, duration: 11.2 },
    { x: 612, y: 556, r: 0.75, depth: "far", delay: 1630, duration: 9.7 },
    { x: 748, y: 540, r: 1.2, depth: "middle", delay: 1570, duration: 10.9 },
    { x: 892, y: 560, r: 0.85, depth: "far", delay: 1660, duration: 12.6 },
  ],
  clusters: [
    { path: "M812 82C842 60 882 64 908 94", points: [{ x: 816, y: 80, r: 1.1 }, { x: 858, y: 63, r: 0.65 }, { x: 906, y: 94, r: 1.35 }], delay: 1490 },
    { path: "M724 512C770 492 824 500 858 534", points: [{ x: 724, y: 512, r: 0.7 }, { x: 792, y: 496, r: 1.1 }, { x: 858, y: 534, r: 0.8 }], delay: 1580 },
  ],
  cloud: {
    haze: { x: 54, y: 316, rx: 104, ry: 78 },
    arcs: ["M-18 344C24 268 98 250 170 286", "M10 372C64 324 122 324 188 354"],
    latent: [{ x: 20, y: 286, r: 0.75 }, { x: 91, y: 356, r: 0.65 }],
    companions: [{ x: 30, y: 300, r: 2.25 }, { x: 62, y: 342, r: 1.5 }, { x: 108, y: 286, r: 1.15 }],
  },
};

const mobileComposition: NetworkComposition = {
  name: "mobile",
  viewBox: { width: 420, height: 330 },
  nodes: [
    { id: "question", x: 108, y: 168, label: "QUESTION", labelX: -34, labelY: -28, labelTier: "primary", kind: "question", delay: 610 },
    { id: "jurisdiction", x: 205, y: 62, label: "JURISDICTION", labelX: -43, labelY: -22, labelTier: "secondary", kind: "jurisdiction", delay: 850, ringRadius: 9.5 },
    { id: "system", x: 175, y: 274, label: "SYSTEM", labelX: -21, labelY: 27, labelTier: "tertiary", kind: "context", delay: 970, ringRadius: 6.5 },
    { id: "rule", x: 240, y: 160, label: "RULE", labelX: -14, labelY: -22, labelTier: "secondary", kind: "rule", delay: 1010, ringRadius: 8 },
    { id: "scope", x: 282, y: 282, label: "SCOPE", labelX: -17, labelY: 27, labelTier: "tertiary", kind: "context", delay: 1140, ringRadius: 6.5 },
    { id: "status", x: 349, y: 65, label: "STATUS", labelX: -19, labelY: -20, labelTier: "tertiary", kind: "context", delay: 1220, ringRadius: 6 },
    { id: "source", x: 340, y: 218, label: "SOURCE", labelX: -21, labelY: 31, labelTier: "secondary", kind: "evidence", delay: 1100, ringRadius: 9.5 },
  ],
  fixedAnchors: {
    cloudAnchor: { x: 26, y: 180 },
    upperHorizon: { x: 428, y: 48 },
    rightHorizon: { x: 430, y: 188 },
    lowerHorizon: { x: 430, y: 310 },
    northField: { x: 277, y: 20 },
    eastField: { x: 398, y: 136 },
    southField: { x: 220, y: 322 },
  },
  relationships: [
    { id: "cloud-question", from: "cloudAnchor", to: "question", nodes: ["question"], c1: { x: 54, y: 163 }, c2: { x: 78, y: 161 }, weight: "cloud", delay: 390 },
    { id: "question-jurisdiction", from: "question", to: "jurisdiction", nodes: ["question", "jurisdiction"], c1: { x: 132, y: 130 }, c2: { x: 166, y: 68 }, weight: "secondary", delay: 780, moment: "a" },
    { id: "question-system", from: "question", to: "system", nodes: ["question", "system"], c1: { x: 121, y: 225 }, c2: { x: 150, y: 268 }, weight: "background", delay: 870, moment: "b" },
    { id: "question-rule", from: "question", to: "rule", nodes: ["question", "rule"], c1: { x: 157, y: 203 }, c2: { x: 202, y: 132 }, weight: "primary", delay: 910, moment: "a" },
    { id: "jurisdiction-rule", from: "jurisdiction", to: "rule", nodes: ["jurisdiction", "rule"], c1: { x: 225, y: 76 }, c2: { x: 237, y: 124 }, weight: "secondary", delay: 970, moment: "a" },
    { id: "system-scope", from: "system", to: "scope", nodes: ["system", "scope"], c1: { x: 214, y: 248 }, c2: { x: 250, y: 301 }, weight: "secondary", delay: 1080, moment: "b" },
    { id: "rule-status", from: "rule", to: "status", nodes: ["rule", "status"], c1: { x: 279, y: 137 }, c2: { x: 320, y: 78 }, weight: "secondary", delay: 1120 },
    { id: "rule-source", from: "rule", to: "source", nodes: ["rule", "source"], c1: { x: 282, y: 166 }, c2: { x: 305, y: 211 }, weight: "primary", delay: 1160, moment: "a" },
    { id: "scope-source", from: "scope", to: "source", nodes: ["scope", "source"], c1: { x: 305, y: 285 }, c2: { x: 324, y: 244 }, weight: "background", delay: 1200, moment: "b" },
    { id: "source-question-lower", from: "source", to: "question", nodes: ["source", "question"], c1: { x: 292, y: 356 }, c2: { x: 168, y: 350 }, weight: "orbit", delay: 1370 },
    { id: "question-status-upper", from: "question", to: "status", nodes: ["question", "status"], c1: { x: 156, y: -34 }, c2: { x: 296, y: -18 }, weight: "orbit", delay: 1440 },
    { id: "status-horizon", from: "status", to: "upperHorizon", nodes: ["status"], c1: { x: 379, y: 60 }, c2: { x: 408, y: 49 }, weight: "continuation", delay: 1500 },
    { id: "source-horizon", from: "source", to: "rightHorizon", nodes: ["source"], c1: { x: 374, y: 206 }, c2: { x: 407, y: 190 }, weight: "continuation", delay: 1530 },
  ],
  latentPoints: [
    { x: 145, y: 24, r: 0.75, depth: "far", delay: 1370, duration: 10.5 },
    { x: 277, y: 20, r: 1.1, depth: "middle", delay: 1420, duration: 11.7 },
    { x: 322, y: 28, r: 0.65, depth: "far", delay: 1450, duration: 9.8 },
    { x: 268, y: 112, r: 1.4, depth: "near", luminous: true, delay: 1400, duration: 12.2 },
    { x: 390, y: 118, r: 0.75, depth: "far", delay: 1490, duration: 10.4 },
    { x: 398, y: 136, r: 1.1, depth: "middle", delay: 1510, duration: 11.9 },
    { x: 148, y: 232, r: 0.7, depth: "far", delay: 1440, duration: 10.8 },
    { x: 214, y: 230, r: 1.1, depth: "middle", delay: 1490, duration: 9.6 },
    { x: 302, y: 202, r: 0.65, depth: "far", delay: 1530, duration: 11.4 },
    { x: 392, y: 256, r: 1.2, depth: "near", delay: 1550, duration: 10.2 },
    { x: 124, y: 312, r: 0.7, depth: "far", delay: 1480, duration: 11.6 },
    { x: 220, y: 322, r: 1.3, depth: "near", delay: 1520, duration: 10.9 },
    { x: 332, y: 314, r: 0.75, depth: "far", delay: 1580, duration: 12.1 },
    { x: 402, y: 302, r: 1.05, depth: "middle", delay: 1600, duration: 9.7 },
  ],
  clusters: [
    { path: "M328 104C350 90 376 94 396 114", points: [{ x: 329, y: 104, r: 0.7 }, { x: 362, y: 92, r: 0.55 }, { x: 396, y: 114, r: 0.8 }], delay: 1460 },
  ],
  cloud: {
    haze: { x: 26, y: 180, rx: 60, ry: 48 },
    arcs: ["M-12 196C10 150 55 140 96 160", "M0 214C32 185 67 184 105 205"],
    latent: [{ x: 7, y: 158, r: 0.6 }, { x: 55, y: 207, r: 0.55 }],
    companions: [{ x: 14, y: 165, r: 1.7 }, { x: 35, y: 198, r: 1.15 }, { x: 65, y: 158, r: 0.9 }],
  },
};

const drift = {
  question: { period: 17, phase: 0.3, x: 7.2, y: 5 },
  jurisdiction: { period: 22, phase: 1.4, x: 5, y: 6 },
  system: { period: 19, phase: 2.1, x: 5.8, y: 4.5 },
  scope: { period: 24, phase: 0.8, x: 4.6, y: 5.4 },
  rule: { period: 14.5, phase: 2.8, x: 8.2, y: 4.8 },
  status: { period: 21, phase: 1.9, x: 4.2, y: 5 },
  source: { period: 18.5, phase: 3.6, x: 6.8, y: 5.8 },
} satisfies Record<NetworkNodeId, { period: number; phase: number; x: number; y: number }>;

const arcBreathing: Record<string, { period: number; phase: number; c1: Point; c2: Point }> = {
  "source-question-lower": { period: 22, phase: 0.4, c1: { x: 6, y: -14 }, c2: { x: -8, y: 10 } },
  "question-status-upper": { period: 18, phase: 1.6, c1: { x: -9, y: 12 }, c2: { x: 9, y: -10 } },
  "jurisdiction-upper-horizon": { period: 26, phase: 2.8, c1: { x: 8, y: -9 }, c2: { x: -7, y: 8 } },
};

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
  if (id in composition.fixedAnchors) return composition.fixedAnchors[id as FixedAnchorId];
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
  curveOffset?: CurveOffset,
) {
  const fromBase = basePoint(composition, relationship.from);
  const toBase = basePoint(composition, relationship.to);
  const fromOffset = offsets[relationship.from as NetworkNodeId] ?? { x: 0, y: 0 };
  const toOffset = offsets[relationship.to as NetworkNodeId] ?? { x: 0, y: 0 };
  const from = { x: fromBase.x + fromOffset.x, y: fromBase.y + fromOffset.y };
  const to = { x: toBase.x + toOffset.x, y: toBase.y + toOffset.y };
  const c1 = { x: relationship.c1.x + fromOffset.x + (curveOffset?.c1.x ?? 0), y: relationship.c1.y + fromOffset.y + (curveOffset?.c1.y ?? 0) };
  const c2 = { x: relationship.c2.x + toOffset.x + (curveOffset?.c2.x ?? 0), y: relationship.c2.y + toOffset.y + (curveOffset?.c2.y ?? 0) };
  return `M${formatPoint(from)}C${formatPoint(c1)} ${formatPoint(c2)} ${formatPoint(to)}`;
}

function curveOffsetFor(id: string, time: number, scale: number): CurveOffset | undefined {
  const settings = arcBreathing[id];
  if (!settings) return undefined;
  const radians = (time / (settings.period * 1000)) * Math.PI * 2 + settings.phase;
  const secondary = radians * 0.71 + settings.phase * 0.5;
  return {
    c1: { x: Math.sin(radians) * settings.c1.x * scale, y: Math.cos(secondary) * settings.c1.y * scale },
    c2: { x: Math.cos(radians * 0.87) * settings.c2.x * scale, y: Math.sin(secondary * 1.09) * settings.c2.y * scale },
  };
}

function motionOffset(id: NetworkNodeId, time: number, scale: number): Point {
  const settings = drift[id];
  const radians = (time / (settings.period * 1000)) * Math.PI * 2;
  return {
    x: Math.sin(radians + settings.phase) * settings.x * scale,
    y: Math.cos(radians * 0.83 + settings.phase * 1.3) * settings.y * scale,
  };
}

function semanticMomentFor(id: NetworkNodeId): "a" | "b" | "both" | "none" {
  if (id === "question" || id === "source") return "both";
  if (id === "jurisdiction" || id === "rule") return "a";
  if (id === "system" || id === "scope") return "b";
  return "none";
}

function NetworkNodeMarker({ node, gradientPrefix, activeNode }: { node: NetworkNode; gradientPrefix: string; activeNode: NetworkNodeId | null }) {
  const isActive = node.id === activeNode;
  const isMuted = Boolean(activeNode && !isActive);
  const moment = semanticMomentFor(node.id);

  return (
    <g
      className={`atlas-network-node atlas-network-node-${node.kind} atlas-network-marker-${node.id} ${isActive ? "atlas-network-node-active" : ""} ${isMuted ? "atlas-network-node-muted" : ""}`}
      data-node-id={node.id}
      style={{ "--atlas-node-delay": `${node.delay}ms` } as CSSProperties}
    >
      {moment !== "none" ? <circle className={`atlas-network-moment-halo atlas-network-node-moment-${moment}`} r={node.kind === "question" ? 28 : node.kind === "evidence" ? 23 : 18} /> : null}
      {node.kind === "question" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-question-halo" fill={`url(#${gradientPrefix}-question-light)`} r="62" />
          <circle className="atlas-network-node-question-orbit" r="17" />
          <circle className="atlas-network-node-core atlas-network-node-question-core" r="6.4" />
          <circle className="atlas-network-node-inner-mark" cx="2.4" cy="-2.1" r="1.25" />
        </>
      ) : node.kind === "evidence" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-source-halo" fill={`url(#${gradientPrefix}-source-light)`} r="52" />
          <circle className="atlas-network-node-source-orbit" r={node.ringRadius ?? 12} />
          <circle className="atlas-network-node-core atlas-network-node-source-core" r="4.8" />
        </>
      ) : node.kind === "rule" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-rule-halo" fill={`url(#${gradientPrefix}-rule-light)`} r="34" />
          <circle className="atlas-network-node-rule-orbit" r={node.ringRadius ?? 10} />
          <circle className="atlas-network-node-core atlas-network-node-rule-core" r="4.2" />
        </>
      ) : node.kind === "jurisdiction" ? (
        <>
          <circle className="atlas-network-node-halo atlas-network-node-jurisdiction-halo" fill={`url(#${gradientPrefix}-jurisdiction-light)`} r="38" />
          <circle className="atlas-network-node-ring atlas-network-node-jurisdiction-ring" r={node.ringRadius ?? 12} />
          <circle className="atlas-network-node-dot atlas-network-node-jurisdiction-dot" r="1.9" />
        </>
      ) : (
        <>
          <circle className="atlas-network-node-ring" r={node.ringRadius ?? 8} />
          <circle className="atlas-network-node-dot" r="1.45" />
        </>
      )}
      <text className={`atlas-network-label atlas-network-label-${node.labelTier}`} x={node.labelX} y={node.labelY}>{node.label}</text>
      <circle className="atlas-network-hit" r="46" />
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
      const scale = isMobile ? 0.25 : 1;
      for (const node of composition.nodes) {
        const offset = motionOffset(node.id, time, scale);
        offsets[node.id] = offset;
        nodeMotionRefs.current[node.id]?.setAttribute("transform", `translate(${offset.x.toFixed(2)} ${offset.y.toFixed(2)})`);
      }
      for (const relationship of composition.relationships) {
        const curveOffset = curveOffsetFor(relationship.id, time, isMobile ? 0.4 : 1);
        relationshipRefs.current[relationship.id]?.setAttribute("d", pathFor(composition, relationship, offsets, curveOffset));
      }
      frame = window.requestAnimationFrame(render);
    }

    function resetGeometry() {
      for (const node of composition.nodes) nodeMotionRefs.current[node.id]?.removeAttribute("transform");
      for (const relationship of composition.relationships) relationshipRefs.current[relationship.id]?.setAttribute("d", pathFor(composition, relationship));
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
    if (isMobile || !window.matchMedia("(hover: hover) and (pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const pointerX = ((event.clientX - bounds.left) / bounds.width) * composition.viewBox.width;
    const pointerY = ((event.clientY - bounds.top) / bounds.height) * composition.viewBox.height;
    let nearestNode: NetworkNodeId | null = null;
    let nearestDistance = 66;
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
        onPointerLeave={() => activeNode && setActiveNode(null)}
        onPointerMove={handlePointerMove}
        viewBox={`0 0 ${composition.viewBox.width} ${composition.viewBox.height}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id={`${gradientPrefix}-field-light`}><stop offset="0" stopColor="#f8fbfc" stopOpacity="0.9" /><stop offset="0.42" stopColor="#dfeaf0" stopOpacity="0.42" /><stop offset="1" stopColor="#93a9bc" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${gradientPrefix}-question-light`}><stop offset="0" stopColor="#fffaf0" stopOpacity="0.96" /><stop offset="0.24" stopColor="#e6c98f" stopOpacity="0.58" /><stop offset="0.62" stopColor="#c9954f" stopOpacity="0.18" /><stop offset="1" stopColor="#c9954f" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${gradientPrefix}-source-light`}><stop offset="0" stopColor="#f6f3fb" stopOpacity="0.82" /><stop offset="0.32" stopColor="#b9b4d1" stopOpacity="0.46" /><stop offset="1" stopColor="#7779a2" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${gradientPrefix}-rule-light`}><stop offset="0" stopColor="#edf9f7" stopOpacity="0.74" /><stop offset="0.38" stopColor="#86bbb3" stopOpacity="0.4" /><stop offset="1" stopColor="#4f8f82" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${gradientPrefix}-jurisdiction-light`}><stop offset="0" stopColor="#f2f7fa" stopOpacity="0.7" /><stop offset="0.38" stopColor="#9cb6ca" stopOpacity="0.38" /><stop offset="1" stopColor="#6484a3" stopOpacity="0" /></radialGradient>
          <radialGradient id={`${gradientPrefix}-cloud-light`}><stop offset="0" stopColor="#fffdf8" stopOpacity="0.8" /><stop offset="0.4" stopColor="#eef4f6" stopOpacity="0.48" /><stop offset="1" stopColor="#b8cad5" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${gradientPrefix}-orbit-line`} gradientUnits="userSpaceOnUse" x1="130" x2={composition.viewBox.width - 20} y1="150" y2={composition.viewBox.height - 90}><stop offset="0" stopColor="#7892aa" stopOpacity="0" /><stop offset="0.18" stopColor="#7892aa" stopOpacity="0.5" /><stop offset="0.72" stopColor="#a9bbc8" stopOpacity="0.46" /><stop offset="1" stopColor="#a9bbc8" stopOpacity="0" /></linearGradient>
        </defs>

        <rect className="atlas-network-pointer-field" height={composition.viewBox.height} width={composition.viewBox.width} />
        <g className="atlas-network-system">
          <g className="atlas-network-field-lights">
            <ellipse className="atlas-network-field-light atlas-network-field-light-one" cx={composition.viewBox.width * 0.7} cy={composition.viewBox.height * 0.44} fill={`url(#${gradientPrefix}-field-light)`} rx={composition.viewBox.width * 0.25} ry={composition.viewBox.height * 0.32} />
            <ellipse className="atlas-network-field-light atlas-network-field-light-two" cx={composition.viewBox.width * 0.91} cy={composition.viewBox.height * 0.7} fill={`url(#${gradientPrefix}-field-light)`} rx={composition.viewBox.width * 0.18} ry={composition.viewBox.height * 0.24} />
          </g>

          <g className="atlas-network-cloud">
            <ellipse className="atlas-network-cloud-haze" cx={composition.cloud.haze.x} cy={composition.cloud.haze.y} fill={`url(#${gradientPrefix}-cloud-light)`} rx={composition.cloud.haze.rx} ry={composition.cloud.haze.ry} />
            {composition.cloud.arcs.map((path, index) => <path className={`atlas-network-cloud-arc ${index === 1 ? "atlas-network-cloud-arc-faint" : ""}`} d={path} key={path} />)}
            {composition.cloud.latent.map((point, index) => <circle className={`atlas-network-cloud-latent atlas-network-cloud-latent-${index + 1}`} cx={point.x} cy={point.y} key={`${point.x}-${point.y}`} r={point.r} />)}
            {composition.cloud.companions.map((point, index) => <circle className={`atlas-network-cloud-companion atlas-network-cloud-companion-${index + 1}`} cx={point.x} cy={point.y} key={`${point.x}-${point.y}`} r={point.r} />)}
          </g>

          <g className="atlas-network-relationships">
            {composition.relationships.map((relationship) => {
              const isRelated = visibleActiveNode ? relationship.nodes.includes(visibleActiveNode) : false;
              return (
                <g className={`atlas-network-relationship atlas-network-moment-${relationship.moment ?? "none"} atlas-network-relationship-${isRelated ? "related" : visibleActiveNode ? "muted" : "rest"}`} data-connects={relationship.nodes.join(" ")} key={relationship.id}>
                  <path
                    className={`atlas-network-line atlas-network-line-${relationship.weight}`}
                    d={pathFor(composition, relationship)}
                    pathLength="1"
                    ref={(element) => { relationshipRefs.current[relationship.id] = element; }}
                    style={{ "--atlas-line-delay": `${relationship.delay}ms`, ...(relationship.weight === "orbit" ? { stroke: `url(#${gradientPrefix}-orbit-line)` } : {}) } as CSSProperties}
                  />
                </g>
              );
            })}
          </g>

          <g className="atlas-network-secondary-clusters">
            {composition.clusters.map((cluster, index) => (
              <g className="atlas-network-secondary-cluster" key={cluster.path} style={{ "--atlas-cluster-delay": `${cluster.delay}ms` } as CSSProperties}>
                <path d={cluster.path} />
                {cluster.points.map((point) => <circle cx={point.x} cy={point.y} key={`${index}-${point.x}`} r={point.r} />)}
              </g>
            ))}
          </g>

          <g className="atlas-network-latent-field">
            {composition.latentPoints.map((point, index) => (
              <g key={`${point.x}-${point.y}`}>
                {point.luminous ? <circle className="atlas-network-latent-light" cx={point.x} cy={point.y} r={point.r * 6} style={{ "--atlas-latent-delay": `${point.delay}ms` } as CSSProperties} /> : null}
                <circle
                  className={`atlas-network-latent atlas-network-latent-${point.depth} ${point.shimmer ? "atlas-network-latent-shimmer" : ""} ${point.nearNode ? `atlas-network-latent-near-${point.nearNode}` : ""}`}
                  cx={point.x}
                  cy={point.y}
                  r={point.r}
                  style={{ "--atlas-latent-delay": `${point.delay}ms`, "--atlas-latent-duration": `${point.duration}s`, "--atlas-latent-shimmer-delay": `${2.1 + ((index * 1.7) % 6.8)}s`, "--atlas-latent-opacity": point.depth === "near" ? 0.58 : point.depth === "middle" ? 0.36 : 0.18 } as CSSProperties}
                />
              </g>
            ))}
          </g>

          {composition.nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <g className="atlas-network-node-motion" ref={(element) => { nodeMotionRefs.current[node.id] = element; }}>
                <NetworkNodeMarker activeNode={visibleActiveNode} gradientPrefix={gradientPrefix} node={node} />
              </g>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
