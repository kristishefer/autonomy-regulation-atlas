import "server-only";

import {
  geoBounds,
  geoConicConformal,
  geoPath,
} from "d3-geo";
import type { Feature, FeatureCollection, Geometry, Polygon } from "geojson";
import { feature } from "topojson-client";
import type { GeometryCollection, Topology } from "topojson-specification";
import world from "world-atlas/countries-50m.json";

export type JurisdictionMapPoint = {
  id: number;
  name: string;
  code: string;
  slug: string;
  mapLat: number;
  mapLng: number;
  mapStatus: string | null;
  profileStatus: string | null;
};

export type JurisdictionMapCopy = {
  ariaLabel: string;
  openProfile: string;
  profileAvailable: string;
  coverageDeveloping: string;
  profilesOnMap: string;
  fallbackNames: {
    netherlands: string;
    germany: string;
    "united-kingdom": string;
    russia: string;
  };
};

type WorldTopology = Topology<{
  countries: GeometryCollection;
}>;

const WIDTH = 840;
const HEIGHT = 540;

/**
 * The homepage map is a navigation surface, not a legal operating-area map.
 * Keep its geographic frame coherent instead of placing remote discovery
 * markers (for example Moscow for a Russia-wide EPR profile) inside it.
 */
const EUROPE_BOUNDS: Polygon = {
  type: "Polygon",
  coordinates: [
    [
      [-14, 35],
      [-14, 64],
      [32, 64],
      [32, 35],
      [-14, 35],
    ],
  ],
};

const MAP_PROFILE_SLUGS = new Set([
  "netherlands",
  "germany",
  "united-kingdom",
]);

const CORE_JURISDICTIONS: JurisdictionMapPoint[] = [
  {
    id: -1,
    name: "Netherlands",
    code: "NL",
    slug: "netherlands",
    mapLat: 52.1326,
    mapLng: 5.2913,
    mapStatus: "active",
    profileStatus: "ready",
  },
  {
    id: -2,
    name: "Germany",
    code: "DE",
    slug: "germany",
    mapLat: 51.1657,
    mapLng: 10.4515,
    mapStatus: "active",
    profileStatus: "ready",
  },
  {
    id: -3,
    name: "United Kingdom",
    code: "GB",
    slug: "united-kingdom",
    mapLat: 53.2,
    mapLng: -2.5,
    mapStatus: "active",
    profileStatus: "ready",
  },
];

const visibleProfileStatuses = new Set([
  "active",
  "available",
  "complete",
  "live",
  "published",
  "ready",
]);

function isInEuropeWindow(item: Feature<Geometry>) {
  const [[west, south], [east, north]] = geoBounds(item);
  return east >= -16 && west <= 34 && north >= 33 && south <= 66;
}

function isProfileAvailable(item: JurisdictionMapPoint) {
  const status = (item.profileStatus ?? item.mapStatus ?? "").toLowerCase();
  return visibleProfileStatuses.has(status);
}

function withMappedProfiles(
  jurisdictions: JurisdictionMapPoint[],
  fallbackNames: JurisdictionMapCopy["fallbackNames"],
) {
  const bySlug = new Map(
    CORE_JURISDICTIONS.map((jurisdiction) => [
      jurisdiction.slug,
      {
        ...jurisdiction,
        name: fallbackNames[jurisdiction.slug as keyof typeof fallbackNames],
      },
    ]),
  );

  jurisdictions
    .filter((jurisdiction) => MAP_PROFILE_SLUGS.has(jurisdiction.slug))
    .forEach((jurisdiction) => {
      const fallback = bySlug.get(jurisdiction.slug);
      bySlug.set(
        jurisdiction.slug,
        fallback ? { ...jurisdiction, name: fallback.name } : jurisdiction,
      );
    });

  return Array.from(bySlug.values());
}

export function EuropeJurisdictionMap({
  jurisdictions,
  copy,
}: {
  jurisdictions: JurisdictionMapPoint[];
  copy: JurisdictionMapCopy;
}) {
  const mappedJurisdictions = withMappedProfiles(
    jurisdictions,
    copy.fallbackNames,
  );
  const topology = world as unknown as WorldTopology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as unknown as FeatureCollection<Geometry>;

  const projection = geoConicConformal()
    .parallels([38, 62])
    .rotate([-9, 0])
    .center([0, 50])
    .fitExtent(
      [
        [30, 24],
        [WIDTH - 30, HEIGHT - 24],
      ],
      EUROPE_BOUNDS,
    )
    .clipExtent([
      [0, 0],
      [WIDTH, HEIGHT],
    ]);

  const path = geoPath(projection);
  const mapCountries = countries.features.filter(
    (country) =>
      isInEuropeWindow(country) && country.properties?.name !== "Greenland",
  );

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#10264a]/15 bg-[#dceae5] shadow-[0_18px_45px_rgba(16,38,74,.05)]">
      <div className="relative aspect-[14/9] w-full">
        <svg
          aria-label={copy.ariaLabel}
          className="h-full w-full"
          role="img"
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        >
          <rect fill="#dceae5" height={HEIGHT} width={WIDTH} />

          <g aria-hidden="true">
            {mapCountries.map((country, index) => {
              const countryPath = path(country);
              return countryPath ? (
                <path
                  className="atlas-map-country"
                  d={countryPath}
                  key={`${country.id ?? "country"}-${index}`}
                />
              ) : null;
            })}
          </g>

          <g>
            {mappedJurisdictions.map((item) => {
              const projected = projection([item.mapLng, item.mapLat]);
              if (!projected) return null;

              const [x, y] = projected;
              const available = isProfileAvailable(item);
              const labelOnLeft = x > WIDTH - 155;
              const profileLabel = `${copy.openProfile}: ${item.name}`;

              return (
                <a
                  aria-label={profileLabel}
                  className="atlas-map-link"
                  href={`/${item.slug}`}
                  key={item.slug}
                >
                  <title>{`${item.name} — ${
                    available ? copy.profileAvailable : copy.coverageDeveloping
                  }`}</title>
                  <circle
                    className="atlas-map-hit-area"
                    cx={x}
                    cy={y}
                    r="23"
                  />
                  <circle
                    className={
                      available
                        ? "atlas-map-beacon atlas-map-beacon-available"
                        : "atlas-map-beacon atlas-map-beacon-developing"
                    }
                    cx={x}
                    cy={y}
                    r="9"
                  />
                  <circle
                    className="atlas-map-beacon-core"
                    cx={x}
                    cy={y}
                    r="3"
                  />
                  <text
                    className="atlas-map-code"
                    textAnchor={labelOnLeft ? "end" : "start"}
                    x={x + (labelOnLeft ? -16 : 16)}
                    y={y + 4}
                  >
                    {item.code}
                  </text>
                </a>
              );
            })}
          </g>
        </svg>

        {mappedJurisdictions.map((item) => {
          const projected = projection([item.mapLng, item.mapLat]);
          if (!projected) return null;

          const [x, y] = projected;
          const profileLabel = `${copy.openProfile}: ${item.name}`;

          return (
            <a
              aria-label={profileLabel}
              className="absolute z-10 size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#b97512]"
              href={`/${item.slug}`}
              key={`html-hit-${item.slug}`}
              style={{
                left: `${(x / WIDTH) * 100}%`,
                top: `${(y / HEIGHT) * 100}%`,
              }}
              title={profileLabel}
            >
              <span className="sr-only">{profileLabel}</span>
            </a>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#10264a]/15 bg-[#fbf7ef] px-5 py-4 text-[11px] uppercase tracking-[0.14em] text-[#10264a]/60 sm:px-7">
        <span>
          {mappedJurisdictions.length} {copy.profilesOnMap}
        </span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2">
            <span className="size-2 bg-[#147c73]" aria-hidden="true" />
            {copy.profileAvailable}
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="size-2 bg-[#b97512]" aria-hidden="true" />
            {copy.coverageDeveloping}
          </span>
        </span>
      </div>
    </div>
  );
}
