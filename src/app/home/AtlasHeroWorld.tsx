"use client";

import { useState } from "react";
import type { CSSProperties, PointerEvent } from "react";

import styles from "./AtlasHeroWorld.module.css";

type AnchorId =
  | "question"
  | "rule"
  | "jurisdiction"
  | "source"
  | "system"
  | "scope"
  | "status";

type AtlasHeroWorldProps = {
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
  body: string;
};

type AnchorDefinition = {
  id: AnchorId;
  label: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
  depth: "near" | "middle";
};

const anchors: readonly AnchorDefinition[] = [
  { id: "question", label: "QUESTION", x: 52, y: 46, mobileX: 18, mobileY: 48, depth: "near" },
  { id: "jurisdiction", label: "JURISDICTION", x: 66, y: 20, mobileX: 39, mobileY: 34, depth: "near" },
  { id: "rule", label: "RULE", x: 73, y: 44, mobileX: 56, mobileY: 43, depth: "near" },
  { id: "source", label: "SOURCE", x: 89, y: 57, mobileX: 82, mobileY: 61, depth: "near" },
  { id: "system", label: "SYSTEM", x: 61, y: 73, mobileX: 31, mobileY: 78, depth: "middle" },
  { id: "scope", label: "SCOPE", x: 78, y: 75, mobileX: 63, mobileY: 82, depth: "middle" },
  { id: "status", label: "STATUS", x: 90, y: 25, mobileX: 85, mobileY: 32, depth: "middle" },
];

const majorCurves = {
  desktop: [
    "M43 30C57.5 -7 90 -3.5 113.5 27",
    "M46.2 51C62.5 30 78.2 36.8 106.8 67",
    "M43 71C63 104 94 101 112.5 57",
    "M79 -5C101.5 13 108.5 52 103.5 103",
  ],
  mobile: [
    "M-12 36C22 -9 72 -2 112 30",
    "M2 55C34 34 61 38 111 68",
    "M-8 76C28 107 79 101 112 61",
    "M74 -8C106 18 109 58 101 108",
  ],
} as const;

const relationships = [
  {
    id: "question-rule",
    nodes: ["question", "rule"] as const,
    moment: "a",
    desktop: "M52 46C60.8 54 65.5 33.5 73 44",
    mobile: "M18 48C34 57 43 34 56 43",
  },
  {
    id: "jurisdiction-rule",
    nodes: ["jurisdiction", "rule"] as const,
    moment: "a",
    desktop: "M66 20C69 27 71.9 33 73 44",
    mobile: "M39 34C46 34 54 37 56 43",
  },
  {
    id: "rule-source",
    nodes: ["rule", "source"] as const,
    moment: "a",
    desktop: "M73 44C78.8 44 83 55.5 89 57",
    mobile: "M56 43C67 42 74 59 82 61",
  },
  {
    id: "question-system",
    nodes: ["question", "system"] as const,
    moment: "b",
    desktop: "M52 46C54.6 60 57.1 69 61 73",
    mobile: "M18 48C20 65 26 74 31 78",
  },
  {
    id: "system-scope",
    nodes: ["system", "scope"] as const,
    moment: "b",
    desktop: "M61 73C67.8 64.5 73 77 78 75",
    mobile: "M31 78C43 69 54 86 63 82",
  },
  {
    id: "scope-source",
    nodes: ["scope", "source"] as const,
    moment: "b",
    desktop: "M78 75C83.1 72.5 85.3 62 89 57",
    mobile: "M63 82C74 80 76 65 82 61",
  },
  {
    id: "rule-status",
    nodes: ["rule", "status"] as const,
    moment: "none",
    desktop: "M73 44C79 33 85.1 27 90 25",
    mobile: "M56 43C67 36 78 33 85 32",
  },
] as const;

const latentPoints = [
  [45, 11, 1, "far"], [50, 7, 1.5, "middle"], [57, 13, 0.8, "far"],
  [61, 6, 1, "far"], [69, 10, 2, "near"], [77, 7, 0.8, "far"],
  [84, 13, 1.3, "middle"], [94, 8, 0.7, "far"], [103, 16, 1.4, "middle"],
  [47, 27, 0.7, "far"], [55, 31, 1.2, "middle"], [62, 29, 0.8, "far"],
  [70, 24, 1.4, "near"], [78, 33, 0.7, "far"], [86, 30, 1.1, "middle"],
  [97, 35, 0.8, "far"], [44, 58, 0.8, "far"], [49, 65, 1.4, "middle"],
  [58, 57, 0.7, "far"], [66, 63, 1.8, "near"], [74, 56, 0.8, "far"],
  [83, 66, 1.2, "middle"], [96, 61, 0.7, "far"], [104, 70, 1.4, "middle"],
  [46, 84, 0.8, "far"], [54, 91, 1.2, "middle"], [64, 86, 0.7, "far"],
  [72, 93, 1.7, "near"], [82, 87, 0.8, "far"], [91, 92, 1.3, "middle"],
  [100, 84, 0.7, "far"], [108, 91, 1.1, "middle"],
] as const;

const shimmerIndices = new Set([4, 12, 19, 23, 27, 31]);

function AnchorMark({ anchor, active }: { anchor: AnchorDefinition; active: AnchorId | null }) {
  const className = [
    styles.anchor,
    styles[anchor.id],
    styles[anchor.depth],
    active === anchor.id ? styles.anchorFocused : "",
    active && active !== anchor.id ? styles.anchorReceded : "",
  ].filter(Boolean).join(" ");
  const style = {
    "--anchor-x": `${anchor.x}%`,
    "--anchor-y": `${anchor.y}%`,
    "--anchor-mobile-x": `${anchor.mobileX}%`,
    "--anchor-mobile-y": `${anchor.mobileY}%`,
  } as CSSProperties;

  return (
    <div className={className} data-world-anchor={anchor.id} style={style}>
      <span className={styles.anchorHalo} />
      {anchor.id === "question" ? (
        <>
          <span className={`${styles.fragment} ${styles.fragmentWide}`} />
          <span className={`${styles.fragment} ${styles.fragmentTight}`} />
          <span className={styles.anchorCore} />
          <span className={styles.anchorGlint} />
        </>
      ) : anchor.id === "rule" ? (
        <>
          <span className={`${styles.fragment} ${styles.ruleLens}`} />
          <span className={styles.ruleSweep} />
          <span className={styles.anchorCore} />
        </>
      ) : anchor.id === "jurisdiction" ? (
        <>
          <span className={`${styles.fragment} ${styles.jurisdictionOrbit}`} />
          <span className={styles.jurisdictionMeridian} />
          <span className={styles.anchorCore} />
        </>
      ) : anchor.id === "source" ? (
        <>
          <span className={`${styles.fragment} ${styles.sourceOrbitOne}`} />
          <span className={`${styles.fragment} ${styles.sourceOrbitTwo}`} />
          <span className={styles.anchorCore} />
        </>
      ) : (
        <>
          <span className={`${styles.fragment} ${styles.satelliteRing}`} />
          <span className={styles.anchorCore} />
        </>
      )}
      <span className={styles.anchorLabel}>{anchor.label}</span>
    </div>
  );
}

export function AtlasHeroWorld({ eyebrow, line1, line2, line3, body }: AtlasHeroWorldProps) {
  const [activeAnchor, setActiveAnchor] = useState<AnchorId | null>(null);

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    let next: AnchorId | null = null;
    let nearest = 8.5;

    for (const anchor of anchors) {
      const distance = Math.hypot(x - anchor.x, (y - anchor.y) * 1.2);
      if (distance < nearest) {
        nearest = distance;
        next = anchor.id;
      }
    }
    if (next !== activeAnchor) setActiveAnchor(next);
  }

  return (
    <section className={styles.hero}>
      <div
        aria-hidden="true"
        className={styles.world}
        data-active-anchor={activeAnchor ?? undefined}
        onPointerLeave={() => setActiveAnchor(null)}
        onPointerMove={handlePointerMove}
      >
        <div className={`${styles.atmosphere} ${styles.atmosphereBlue}`} />
        <div className={`${styles.atmosphere} ${styles.atmosphereWhite}`} />
        <div className={`${styles.atmosphere} ${styles.atmosphereDeep}`} />

        <svg className={styles.trajectoryField} preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="atlas-world-orbit" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#a9bbc8" stopOpacity="0" />
              <stop offset="0.28" stopColor="#7891aa" stopOpacity="0.48" />
              <stop offset="0.72" stopColor="#9fb4c4" stopOpacity="0.5" />
              <stop offset="1" stopColor="#d9e5eb" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="atlas-world-relation" x1="0" x2="1">
              <stop offset="0" stopColor="#638fa0" stopOpacity="0.34" />
              <stop offset="0.5" stopColor="#4f8f82" stopOpacity="0.72" />
              <stop offset="1" stopColor="#77789e" stopOpacity="0.42" />
            </linearGradient>
          </defs>

          <g className={`${styles.geometry} ${styles.desktopGeometry}`}>
            {majorCurves.desktop.map((path, index) => (
              <path className={`${styles.majorCurve} ${styles[`curve${index + 1}`] ?? ""}`} d={path} key={path} />
            ))}
            {relationships.map((relationship) => (
              <path
                className={`${styles.relationship} ${styles[`moment${relationship.moment.toUpperCase()}`] ?? ""} ${activeAnchor ? (relationship.nodes.includes(activeAnchor as never) ? styles.related : styles.unrelated) : ""}`}
                d={relationship.desktop}
                key={relationship.id}
              />
            ))}
          </g>

          <g className={`${styles.geometry} ${styles.mobileGeometry}`}>
            {majorCurves.mobile.map((path, index) => <path className={`${styles.majorCurve} ${styles[`curve${index + 1}`] ?? ""}`} d={path} key={path} />)}
            {relationships.map((relationship) => (
              <path className={styles.relationship} d={relationship.mobile} key={relationship.id} />
            ))}
          </g>
        </svg>

        <div className={styles.latentField}>
          {latentPoints.map(([x, y, size, depth], index) => (
            <i
              className={`${styles.latentPoint} ${styles[depth]} ${shimmerIndices.has(index) ? styles.shimmer : ""}`}
              key={`${x}-${y}`}
              style={{
                "--point-x": `${x}%`,
                "--point-y": `${y}%`,
                "--point-size": `${size}px`,
                "--point-delay": `${(index * 0.73) % 8}s`,
                "--point-period": `${7 + (index % 6) * 1.1}s`,
              } as CSSProperties}
            />
          ))}
        </div>

        <div className={styles.farClusterOne}><i /><i /><i /><span /></div>
        <div className={styles.farClusterTwo}><i /><i /><i /><span /></div>

        <div className={styles.cloudSignature}>
          <span className={styles.cloudLight} />
          <i className={styles.cloudCompanionOne} />
          <i className={styles.cloudCompanionTwo} />
          <i className={styles.cloudCompanionThree} />
        </div>

        {anchors.map((anchor) => <AnchorMark active={activeAnchor} anchor={anchor} key={anchor.id} />)}
      </div>

      <div className={styles.copyShell}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <h1 className={styles.headline}>
            <span>{line1}</span>
            <span>{line2}</span>
            <span>{line3}</span>
          </h1>
          <p className={styles.body}>{body}</p>
        </div>
      </div>
      <div aria-hidden="true" className={styles.handoff}><i /><i /><i /></div>
    </section>
  );
}
