"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import styles from "./AtlasHeroWorld.module.css";

type AnchorId = "question" | "jurisdiction" | "rule" | "source" | "system" | "scope" | "status";
type MascotId = "fox" | "cat" | "dog";

type AtlasHeroWorldProps = {
  body: string;
  eyebrow: string;
  line1: string;
  line2: string;
  line3: string;
};

type AnchorDefinition = {
  id: AnchorId;
  label: string;
  depth: "major" | "context";
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
};

type MascotCluster = {
  id: MascotId;
  label: string;
  x: number;
  y: number;
  mobileX: number;
  mobileY: number;
};

const anchors: readonly AnchorDefinition[] = [
  { id: "question", label: "QUESTION", depth: "major", x: 54, y: 43, mobileX: 18, mobileY: 49 },
  { id: "jurisdiction", label: "JURISDICTION", depth: "major", x: 72, y: 22, mobileX: 45, mobileY: 29 },
  { id: "rule", label: "RULE", depth: "major", x: 75, y: 44, mobileX: 61, mobileY: 48 },
  { id: "source", label: "SOURCE", depth: "major", x: 91, y: 57, mobileX: 86, mobileY: 65 },
  { id: "system", label: "SYSTEM", depth: "context", x: 66, y: 12, mobileX: 33, mobileY: 15 },
  { id: "scope", label: "SCOPE", depth: "context", x: 77, y: 70, mobileX: 64, mobileY: 82 },
  { id: "status", label: "STATUS", depth: "context", x: 94, y: 31, mobileX: 89, mobileY: 37 },
];

const mascotClusters: readonly MascotCluster[] = [
  { id: "fox", label: "Fox constellation", x: 50, y: 72, mobileX: 23, mobileY: 89 },
  { id: "cat", label: "Cat constellation", x: 68, y: 80, mobileX: 51, mobileY: 91 },
  { id: "dog", label: "Dog constellation", x: 87, y: 72, mobileX: 80, mobileY: 89 },
];

const starField = Array.from({ length: 132 }, (_, index) => {
  const x = 35 + ((index * 37 + 11) % 70);
  const y = 2 + ((index * 53 + 19) % 94);
  const size = [0.7, 0.9, 1.1, 1.4, 1.8, 2.2][index % 6];
  const depth = index % 11 === 0 ? "near" : index % 4 === 0 ? "mid" : "far";
  return { x, y, size, depth, shimmer: index % 17 === 0 || index % 29 === 0 } as const;
});

const clusterStars = Array.from({ length: 26 }, (_, index) => {
  const restX = 8 + ((index * 31 + 7) % 84);
  const restY = 8 + ((index * 47 + 13) % 82);
  const gatherX = 20 + ((index * 23 + 17) % 60);
  const gatherY = 13 + ((index * 29 + 9) % 72);
  const size = [1.2, 1.5, 1.8, 2.1, 2.6][index % 5];
  return { restX, restY, gatherX, gatherY, size } as const;
});

function Anchor({ anchor, active, onActive }: { anchor: AnchorDefinition; active: AnchorId | null; onActive: (id: AnchorId | null) => void }) {
  const className = [
    styles.anchor,
    styles[anchor.id],
    styles[anchor.depth],
    active === anchor.id ? styles.anchorActive : "",
    active && active !== anchor.id ? styles.anchorMuted : "",
  ].filter(Boolean).join(" ");

  const style = {
    "--anchor-x": `${anchor.x}%`,
    "--anchor-y": `${anchor.y}%`,
    "--anchor-mobile-x": `${anchor.mobileX}%`,
    "--anchor-mobile-y": `${anchor.mobileY}%`,
  } as CSSProperties;

  return (
    <div
      aria-label={anchor.label}
      className={className}
      onBlur={() => onActive(null)}
      onFocus={() => onActive(anchor.id)}
      onMouseEnter={() => onActive(anchor.id)}
      onMouseLeave={() => onActive(null)}
      role="img"
      style={style}
      tabIndex={0}
    >
      <span className={styles.anchorBloom} />
      <span className={`${styles.anchorRing} ${styles.anchorRingOuter}`} />
      <span className={`${styles.anchorRing} ${styles.anchorRingInner}`} />
      <span className={styles.anchorCore} />
      <span className={styles.anchorGlint} />
      <span className={styles.anchorLabel}>{anchor.label}</span>
    </div>
  );
}

function MascotConstellation({ cluster }: { cluster: MascotCluster }) {
  const style = {
    "--cluster-x": `${cluster.x}%`,
    "--cluster-y": `${cluster.y}%`,
    "--cluster-mobile-x": `${cluster.mobileX}%`,
    "--cluster-mobile-y": `${cluster.mobileY}%`,
  } as CSSProperties;

  return (
    <div aria-label={cluster.label} className={`${styles.mascotCluster} ${styles[cluster.id]}`} role="img" style={style} tabIndex={0}>
      <span className={styles.clusterGlow} />
      <span className={styles.clusterSilhouette} />
      <svg aria-hidden="true" className={styles.clusterOrbit} viewBox="0 0 100 100">
        <path d="M8 64C24 18 72 11 95 49" />
        <path d="M15 82C37 57 71 60 91 78" />
      </svg>
      {clusterStars.map((star, index) => (
        <i
          className={styles.clusterStar}
          key={`${cluster.id}-${index}`}
          style={{
            "--star-rest-x": `${star.restX}%`,
            "--star-rest-y": `${star.restY}%`,
            "--star-gather-x": `${star.gatherX}%`,
            "--star-gather-y": `${star.gatherY}%`,
            "--star-size": `${star.size}px`,
            "--star-delay": `${(index % 8) * 18}ms`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}

export function AtlasHeroWorld({ body, eyebrow, line1, line2, line3 }: AtlasHeroWorldProps) {
  const [activeAnchor, setActiveAnchor] = useState<AnchorId | null>(null);

  return (
    <section className={styles.hero}>
      <div aria-hidden="true" className={styles.atmosphere}>
        <span className={`${styles.haze} ${styles.hazeIvory}`} />
        <span className={`${styles.haze} ${styles.hazeBlue}`} />
        <span className={`${styles.haze} ${styles.hazeDeep}`} />
        <span className={`${styles.haze} ${styles.hazeTeal}`} />
        <span className={`${styles.haze} ${styles.hazeViolet}`} />
        <span className={`${styles.lightPocket} ${styles.lightPocketOne}`} />
        <span className={`${styles.lightPocket} ${styles.lightPocketTwo}`} />
        <span className={`${styles.lightPocket} ${styles.lightPocketThree}`} />
      </div>

      <div className={styles.world}>
        <svg aria-hidden="true" className={styles.geometry} preserveAspectRatio="none" viewBox="0 0 1000 720">
          <defs>
            <linearGradient id="hero-orbit-main" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#d9b876" stopOpacity="0.06" />
              <stop offset="0.28" stopColor="#e2b65b" stopOpacity="0.72" />
              <stop offset="0.55" stopColor="#83b9c4" stopOpacity="0.72" />
              <stop offset="0.82" stopColor="#789bc0" stopOpacity="0.7" />
              <stop offset="1" stopColor="#8e83b6" stopOpacity="0.12" />
            </linearGradient>
            <linearGradient id="hero-orbit-fine" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#8fb1c8" stopOpacity="0.08" />
              <stop offset="0.45" stopColor="#f7fbfb" stopOpacity="0.72" />
              <stop offset="1" stopColor="#6689a9" stopOpacity="0.24" />
            </linearGradient>
            <filter id="hero-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <g className={styles.largeOrbits}>
            <path d="M350 188C510 -8 840 -12 1034 182" />
            <path d="M373 352C518 199 744 225 1036 444" />
            <path d="M355 516C515 744 822 728 1033 471" />
            <path d="M560 -55C906 104 946 506 790 774" />
          </g>

          <g className={styles.fineStructure}>
            <path d="M409 235C553 106 754 93 931 241" />
            <path d="M438 579C578 457 774 469 957 611" />
            <path d="M468 83C641 185 809 335 937 611" />
            <path d="M419 445C570 364 746 391 868 522" />
            <path d="M682 68C829 185 900 349 874 584" />
            <path d="M509 330C618 281 714 291 796 360" />
          </g>

          <g className={styles.semanticPaths}>
            <path className={styles.semanticA} d="M540 310C609 378 692 282 750 316" />
            <path className={styles.semanticA} d="M720 159C741 204 754 252 750 316" />
            <path className={styles.semanticA} d="M750 316C827 314 873 395 910 410" />
            <path className={styles.semanticB} d="M540 310C533 419 601 500 662 506" />
            <path className={styles.semanticB} d="M662 506C722 465 766 514 792 503" />
            <path className={styles.semanticB} d="M792 503C842 482 884 442 910 410" />
            <path className={styles.semanticQuiet} d="M750 316C817 259 876 225 940 223" />
          </g>
        </svg>

        <div aria-hidden="true" className={styles.starField}>
          {starField.map((star, index) => (
            <i
              className={`${styles.star} ${styles[star.depth]} ${star.shimmer ? styles.shimmer : ""}`}
              key={`field-${index}`}
              style={{
                "--field-x": `${star.x}%`,
                "--field-y": `${star.y}%`,
                "--field-size": `${star.size}px`,
                "--field-delay": `${(index % 19) * -0.7}s`,
              } as CSSProperties}
            />
          ))}
        </div>

        <div aria-hidden="true" className={`${styles.deepCluster} ${styles.deepClusterOne}`}>
          <i /><i /><i /><i /><i /><span />
        </div>
        <div aria-hidden="true" className={`${styles.deepCluster} ${styles.deepClusterTwo}`}>
          <i /><i /><i /><i /><span />
        </div>
        <div aria-hidden="true" className={`${styles.deepCluster} ${styles.deepClusterThree}`}>
          <i /><i /><i /><i /><i /><span />
        </div>

        <div aria-hidden="true" className={styles.cloudSignature} data-cloud-signature>
          <span className={styles.cloudBloom} />
          <i className={styles.cloudOne} />
          <i className={styles.cloudTwo} />
          <i className={styles.cloudThree} />
        </div>

        {mascotClusters.map((cluster) => <MascotConstellation cluster={cluster} key={cluster.id} />)}
        {anchors.map((anchor) => <Anchor active={activeAnchor} anchor={anchor} key={anchor.id} onActive={setActiveAnchor} />)}
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
          <div aria-hidden="true" className={styles.copyConstellation}>
            <i /><i /><i /><span />
          </div>
        </div>
      </div>

      <div aria-hidden="true" className={styles.handoff}>
        <span className={styles.handoffWave} />
        <i /><i /><i /><i /><i /><i /><i />
      </div>
    </section>
  );
}
