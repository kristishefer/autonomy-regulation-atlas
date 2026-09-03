"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

import styles from "./AtlasHeroWorld.module.css";

type AnchorId = "question" | "jurisdiction" | "rule" | "source" | "system" | "scope" | "status";

type AtlasHeroWorldProps = {
  body: string;
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
};

type AnchorDefinition = {
  depth: "major" | "context";
  id: AnchorId;
  label: string;
  mobileX: number;
  mobileY: number;
  x: number;
  y: number;
};

type SignaturePoint = readonly [restX: number, restY: number, shapeX: number, shapeY: number, size: number];

type SignatureCluster = {
  id: "fox" | "cat" | "dog";
  label: string;
  mobileX: number;
  mobileY: number;
  paths: readonly string[];
  points: readonly SignaturePoint[];
  x: number;
  y: number;
};

const anchors: readonly AnchorDefinition[] = [
  { id: "question", label: "QUESTION", x: 52, y: 48, mobileX: 16, mobileY: 49, depth: "major" },
  { id: "jurisdiction", label: "JURISDICTION", x: 68, y: 20, mobileX: 39, mobileY: 32, depth: "major" },
  { id: "rule", label: "RULE", x: 76, y: 45, mobileX: 58, mobileY: 46, depth: "major" },
  { id: "source", label: "SOURCE", x: 91, y: 59, mobileX: 84, mobileY: 63, depth: "major" },
  { id: "system", label: "SYSTEM", x: 60, y: 76, mobileX: 31, mobileY: 80, depth: "context" },
  { id: "scope", label: "SCOPE", x: 78, y: 79, mobileX: 65, mobileY: 84, depth: "context" },
  { id: "status", label: "STATUS", x: 92, y: 28, mobileX: 87, mobileY: 34, depth: "context" },
];

const orbitPaths = {
  desktop: [
    "M38 38C55 -9 94 -8 116 25",
    "M39 57C59 24 86 32 114 68",
    "M41 72C64 105 98 99 115 56",
    "M72 -13C105 11 113 61 103 111",
  ],
  mobile: [
    "M-15 34C20 -10 79 -3 116 27",
    "M-9 58C28 29 70 36 116 69",
    "M-12 79C29 108 82 102 116 60",
    "M72 -12C108 13 112 66 101 112",
  ],
} as const;

const secondaryPaths = {
  desktop: [
    "M44 20C59 7 78 9 92 25",
    "M49 88C66 67 87 68 104 84",
    "M58 8C76 20 95 41 108 79",
    "M46 63C59 51 74 56 85 69",
    "M82 13C94 28 99 49 98 75",
  ],
  mobile: [
    "M2 22C27 7 54 10 78 25",
    "M8 91C32 70 69 70 96 88",
    "M42 5C72 20 92 48 104 82",
    "M4 66C25 52 53 57 71 71",
    "M70 12C90 31 97 52 96 78",
  ],
} as const;

const relationships = [
  { id: "question-rule", nodes: ["question", "rule"] as const, phase: "a", desktop: "M52 48C61 57 68 36 76 45", mobile: "M16 49C31 60 46 38 58 46" },
  { id: "jurisdiction-rule", nodes: ["jurisdiction", "rule"] as const, phase: "a", desktop: "M68 20C71 28 75 35 76 45", mobile: "M39 32C47 33 55 38 58 46" },
  { id: "rule-source", nodes: ["rule", "source"] as const, phase: "a", desktop: "M76 45C82 45 86 57 91 59", mobile: "M58 46C68 46 77 61 84 63" },
  { id: "question-system", nodes: ["question", "system"] as const, phase: "b", desktop: "M52 48C53 62 56 72 60 76", mobile: "M16 49C18 67 25 77 31 80" },
  { id: "system-scope", nodes: ["system", "scope"] as const, phase: "b", desktop: "M60 76C68 66 73 82 78 79", mobile: "M31 80C43 70 57 88 65 84" },
  { id: "scope-source", nodes: ["scope", "source"] as const, phase: "b", desktop: "M78 79C85 76 88 65 91 59", mobile: "M65 84C76 80 79 67 84 63" },
  { id: "rule-status", nodes: ["rule", "status"] as const, phase: "quiet", desktop: "M76 45C82 35 88 30 92 28", mobile: "M58 46C70 38 81 35 87 34" },
] as const;

const latentPoints = [
  [43, 8, 1.2, "far"], [48, 15, 1.8, "middle"], [53, 5, 0.8, "far"], [58, 11, 1.1, "far"],
  [63, 6, 2.2, "near"], [71, 10, 0.8, "far"], [78, 5, 1.5, "middle"], [85, 12, 0.7, "far"],
  [93, 7, 1.2, "middle"], [102, 14, 1.6, "middle"], [108, 7, 0.8, "far"], [45, 27, 0.8, "far"],
  [51, 31, 1.4, "middle"], [58, 27, 0.7, "far"], [63, 35, 1.1, "middle"], [72, 28, 1.7, "near"],
  [80, 33, 0.8, "far"], [87, 27, 1.2, "middle"], [97, 36, 0.8, "far"], [105, 31, 1.5, "middle"],
  [42, 52, 0.8, "far"], [47, 61, 1.7, "middle"], [55, 57, 0.7, "far"], [62, 64, 2.1, "near"],
  [69, 58, 0.8, "far"], [74, 66, 1.4, "middle"], [83, 55, 0.7, "far"], [88, 69, 1.3, "middle"],
  [98, 64, 0.8, "far"], [106, 72, 1.6, "middle"], [44, 82, 0.8, "far"], [51, 91, 1.4, "middle"],
  [58, 85, 0.7, "far"], [66, 93, 1.9, "near"], [73, 87, 0.8, "far"], [82, 94, 1.5, "middle"],
  [90, 88, 0.7, "far"], [98, 95, 1.3, "middle"], [107, 86, 0.8, "far"], [111, 47, 1.1, "middle"],
  [57, 43, 0.6, "far"], [70, 48, 0.9, "middle"], [84, 43, 0.6, "far"], [100, 50, 1.1, "middle"],
] as const;

const shimmerPoints = new Set([4, 9, 15, 23, 29, 33, 37, 41]);

const signatureClusters: readonly SignatureCluster[] = [
  {
    id: "fox", label: "Fox constellation", x: 82, y: 13, mobileX: 73, mobileY: 7,
    paths: ["M18 26Q27 10 38 31", "M62 31Q75 10 82 28", "M28 45L50 68L72 45", "M73 59Q95 60 84 79"],
    points: [[12, 47, 18, 26, 3], [39, 8, 38, 31, 2], [72, 14, 62, 31, 2.5], [109, 43, 82, 28, 3], [29, 78, 28, 45, 2], [65, 63, 72, 45, 2.5], [91, 84, 50, 68, 3], [119, 65, 84, 79, 1.8]],
  },
  {
    id: "cat", label: "Cat constellation", x: 88, y: 76, mobileX: 76, mobileY: 78,
    paths: ["M22 34L31 17L41 34", "M59 34L70 17L78 36", "M30 47L50 69L72 47", "M72 62Q91 60 89 80"],
    points: [[12, 34, 22, 34, 2.5], [35, 9, 31, 17, 2], [68, 12, 41, 34, 3], [112, 32, 70, 17, 2], [27, 76, 78, 36, 2.5], [61, 63, 30, 47, 1.8], [90, 84, 72, 47, 3], [119, 67, 50, 69, 2], [79, 28, 89, 80, 1.8]],
  },
  {
    id: "dog", label: "Dog constellation", x: 63, y: 84, mobileX: 28, mobileY: 88,
    paths: ["M18 31Q28 20 38 38", "M62 38Q73 20 82 32", "M30 46L49 69", "M49 69L70 46", "M40 72Q57 83 76 70"],
    points: [[10, 48, 18, 31, 2], [33, 11, 38, 38, 2.5], [69, 14, 62, 38, 2], [109, 40, 82, 32, 3], [24, 78, 30, 46, 2], [61, 64, 70, 46, 2.5], [91, 83, 49, 69, 3], [118, 65, 40, 72, 1.8], [78, 27, 76, 70, 2]],
  },
];

function AnchorMark({ active, anchor }: { active: AnchorId | null; anchor: AnchorDefinition }) {
  const className = [styles.anchor, styles[anchor.id], styles[anchor.depth], active === anchor.id ? styles.anchorFocused : "", active && active !== anchor.id ? styles.anchorReceded : ""].filter(Boolean).join(" ");
  const style = { "--anchor-x": `${anchor.x}%`, "--anchor-y": `${anchor.y}%`, "--anchor-mobile-x": `${anchor.mobileX}%`, "--anchor-mobile-y": `${anchor.mobileY}%` } as CSSProperties;

  return (
    <div aria-hidden="true" className={className} data-world-anchor={anchor.id} style={style}>
      <span className={styles.anchorAtmosphere} />
      <span className={`${styles.anchorOrbit} ${styles.anchorOrbitOuter}`} />
      <span className={`${styles.anchorOrbit} ${styles.anchorOrbitInner}`} />
      <span className={styles.anchorCore} />
      {anchor.depth === "major" ? <span className={styles.anchorSpark} /> : null}
      <span className={styles.anchorLabel}>{anchor.label}</span>
    </div>
  );
}

function AtlaslingCluster({ cluster }: { cluster: SignatureCluster }) {
  const style = { "--cluster-x": `${cluster.x}%`, "--cluster-y": `${cluster.y}%`, "--cluster-mobile-x": `${cluster.mobileX}%`, "--cluster-mobile-y": `${cluster.mobileY}%` } as CSSProperties;

  return (
    <div aria-label={cluster.label} className={`${styles.atlaslingCluster} ${styles[cluster.id]}`} data-atlasling-cluster={cluster.id} role="img" style={style} tabIndex={0}>
      <span className={styles.clusterAura} />
      <svg aria-hidden="true" className={styles.clusterLines} viewBox="0 0 132 96">
        {cluster.paths.map((path) => <path className={styles.clusterArc} d={path} key={path} />)}
      </svg>
      {cluster.points.map(([restX, restY, shapeX, shapeY, size], index) => (
        <i
          className={styles.clusterPoint}
          key={`${cluster.id}-${index}`}
          style={{ "--cluster-point-size": `${size}px`, "--rest-x": `${restX}px`, "--rest-y": `${restY}px`, "--shape-dx": `${shapeX - restX}px`, "--shape-dy": `${shapeY - restY}px` } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function AtlasHeroWorld({ body, eyebrow, line1, line2, line3 }: AtlasHeroWorldProps) {
  const [activeAnchor, setActiveAnchor] = useState<AnchorId | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    let next: AnchorId | null = null;
    let nearest = 8;

    for (const anchor of anchors) {
      const distance = Math.hypot(x - anchor.x, (y - anchor.y) * 1.18);
      if (distance < nearest) {
        nearest = distance;
        next = anchor.id;
      }
    }
    if (next !== activeAnchor) setActiveAnchor(next);
  }

  return (
    <section className={styles.hero}>
      <div className={styles.world} data-active-anchor={activeAnchor ?? undefined} onPointerLeave={() => setActiveAnchor(null)} onPointerMove={handlePointerMove}>
        <div aria-hidden="true" className={styles.atmosphericCanvas}>
          <span className={`${styles.haze} ${styles.hazeDawn}`} />
          <span className={`${styles.haze} ${styles.hazeBlue}`} />
          <span className={`${styles.haze} ${styles.hazeTeal}`} />
          <span className={`${styles.haze} ${styles.hazeViolet}`} />
          <span className={styles.worldLens} />
        </div>

        <svg aria-hidden="true" className={styles.trajectoryField} preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="atlas-world-orbit-v2" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#dce8ec" stopOpacity="0" /><stop offset="0.24" stopColor="#8aa2b7" stopOpacity="0.68" /><stop offset="0.62" stopColor="#6687a3" stopOpacity="0.76" /><stop offset="1" stopColor="#d8e5e9" stopOpacity="0" /></linearGradient>
            <linearGradient id="atlas-world-fine-v2" x1="0" x2="1"><stop offset="0" stopColor="#b8cbd4" stopOpacity="0" /><stop offset="0.46" stopColor="#7795aa" stopOpacity="0.48" /><stop offset="1" stopColor="#b9cbd4" stopOpacity="0" /></linearGradient>
            <linearGradient id="atlas-world-relation-v2" x1="0" x2="1"><stop offset="0" stopColor="#b98747" stopOpacity="0.45" /><stop offset="0.48" stopColor="#3f9388" stopOpacity="0.76" /><stop offset="1" stopColor="#74769f" stopOpacity="0.58" /></linearGradient>
          </defs>

          <g className={styles.desktopGeometry}>
            {orbitPaths.desktop.map((path, index) => <path className={`${styles.orbitPath} ${styles[`orbit${index + 1}`] ?? ""}`} d={path} key={path} />)}
            {secondaryPaths.desktop.map((path, index) => <path className={`${styles.secondaryPath} ${styles[`secondary${index + 1}`] ?? ""}`} d={path} key={path} />)}
            {relationships.map((relationship) => (
              <path className={`${styles.relationship} ${styles[`phase${relationship.phase.toUpperCase()}`] ?? ""} ${activeAnchor ? (relationship.nodes.includes(activeAnchor as never) ? styles.related : styles.unrelated) : ""}`} d={relationship.desktop} key={relationship.id} />
            ))}
          </g>

          <g className={styles.mobileGeometry}>
            {orbitPaths.mobile.map((path, index) => <path className={`${styles.orbitPath} ${styles[`orbit${index + 1}`] ?? ""}`} d={path} key={path} />)}
            {secondaryPaths.mobile.map((path) => <path className={styles.secondaryPath} d={path} key={path} />)}
            {relationships.map((relationship) => <path className={styles.relationship} d={relationship.mobile} key={relationship.id} />)}
          </g>
        </svg>

        <div aria-hidden="true" className={styles.latentField}>
          {latentPoints.map(([x, y, size, depth], index) => (
            <i className={`${styles.latentPoint} ${styles[depth]} ${shimmerPoints.has(index) ? styles.shimmer : ""}`} key={`${x}-${y}`} style={{ "--point-delay": `${(index * 0.83) % 9}s`, "--point-period": `${7.5 + (index % 7) * 0.9}s`, "--point-size": `${size}px`, "--point-x": `${x}%`, "--point-y": `${y}%` } as CSSProperties} />
          ))}
        </div>

        <div aria-hidden="true" className={`${styles.deepCluster} ${styles.deepClusterOne}`}><i /><i /><i /><i /><span /></div>
        <div aria-hidden="true" className={`${styles.deepCluster} ${styles.deepClusterTwo}`}><i /><i /><i /><span /></div>

        <div aria-hidden="true" className={styles.cloudSignature} data-cloud-signature>
          <span className={styles.cloudLight} />
          <i className={styles.cloudCompanionOne} />
          <i className={styles.cloudCompanionTwo} />
          <i className={styles.cloudCompanionThree} />
        </div>

        {signatureClusters.map((cluster) => <AtlaslingCluster cluster={cluster} key={cluster.id} />)}
        {anchors.map((anchor) => <AnchorMark active={activeAnchor} anchor={anchor} key={anchor.id} />)}
      </div>

      <div className={styles.copyShell}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.headline}><span>{line1}</span><span>{line2}</span><span>{line3}</span></h1>
          <p className={styles.body}>{body}</p>
        </div>
      </div>

      <div aria-hidden="true" className={styles.handoffField}>
        <span className={styles.handoffArcOne} /><span className={styles.handoffArcTwo} /><i /><i /><i /><i /><i /><i />
      </div>
    </section>
  );
}
