import "server-only";

import { geoBounds, geoMercator, geoPath } from "d3-geo";
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
  };
};

type WorldTopology = Topology<{
  countries: GeometryCollection;
}>;

const WIDTH = 840;
const HEIGHT = 560;
const EUROPE_BOUNDS: Polygon = {
  type: "Polygon",
  coordinates: [
    [
      [-26, 33],
      [-26, 72.5],
      [46, 72.5],
      [46, 33],
      [-26, 33],
    ],
  ],
};

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
  return east >= -28 && west <= 48 && north >= 32 && south <= 74;
}

function isProfileAvailable(item: JurisdictionMapPoint) {
  const status = (item.profileStatus ?? item.mapStatus ?? "").toLowerCase();
  return visibleProfileStatuses.has(status);
}

function withCoreJurisdictions(
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

  jurisdictions.forEach((jurisdiction) => {
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
  const mappedJurisdictions = withCoreJurisdictions(
    jurisdictions,
    copy.fallbackNames,
  );
  const topology = world as unknown as WorldTopology;
  const countries = feature(
    topology,
    topology.objects.countries,
  ) as unknown as FeatureCollection<Geometry>;
  const projection = geoMercator()
    .fitExtent(
      [
        [24, 22],
        [WIDTH - 24, HEIGHT - 22],
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
    <div className="overflow-hidden border border-[#10264a]/15 bg-[#dceae5]">
      <div className="relative aspect-[3/2] w-full">
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
              const labelOnLeft = x > WIDTH - 135;
              const profileLabel = `${copy.openProfile}: ${item.name}`;

              return (
                <a
                  aria-label={profileLabel}
                  className="atlas-map-link"
                  href={`/${item.slug}`}
                  key={item.slug}
                >
                  <title>{`${item.name} — ${
                    available
                      ? copy.profileAvailable
                      : copy.coverageDeveloping
                  }`}</title>
                  <circle
                    className="atlas-map-hit-area"
                    cx={x}
                    cy={y}
                    r="21"
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
                    x={x + (labelOnLeft ? -15 : 15)}
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
