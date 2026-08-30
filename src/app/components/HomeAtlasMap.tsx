import { supabase } from "@/app/lib/supabase";
import type { Locale } from "@/app/lib/home-i18n";
import {
  EUROPE_COUNTRIES,
  EUROPE_VIEW,
} from "@/app/lib/atlas-geo";

type Jurisdiction = {
  id: number;
  name: string;
  code: string;
  slug: string;
  map_lat: number | null;
  map_lng: number | null;
  map_status: string | null;
  profile_status: string | null;
  short_description: string | null;
};

type Translation = {
  jurisdiction_id: number;
  name: string | null;
  short_description: string | null;
};

const MAP_COPY = {
  en: {
    eyebrow: "Interactive Atlas",
    title1: "Same technology",
    title2: "Different legal answers",
    body: "Explore the regulatory landscape through real jurisdictions. Select a beacon to open the jurisdiction profile.",
    mapLabel: "Jurisdiction map",
    choose: "Choose a jurisdiction",
    mapped: "mapped jurisdictions",
    partial: "Partial coverage",
    pending: "Research in progress",
  },
  ru: {
    eyebrow: "Интерактивный Atlas",
    title1: "Одна технология",
    title2: "Разные правовые ответы",
    body: "Исследуйте регуляторный ландшафт через реальные юрисдикции. Нажмите на маяк, чтобы открыть профиль страны.",
    mapLabel: "Карта юрисдикций",
    choose: "Выберите юрисдикцию",
    mapped: "юрисдикций на карте",
    partial: "Частичное покрытие",
    pending: "Исследование в процессе",
  },
  fr: {
    eyebrow: "Atlas interactif",
    title1: "Une même technologie",
    title2: "Des réponses juridiques différentes",
    body: "Explorez le paysage réglementaire par juridiction. Sélectionnez un repère pour ouvrir le profil du pays.",
    mapLabel: "Carte des juridictions",
    choose: "Choisissez une juridiction",
    mapped: "juridictions cartographiées",
    partial: "Couverture partielle",
    pending: "Recherche en cours",
  },
  de: {
    eyebrow: "Interaktiver Atlas",
    title1: "Dieselbe Technologie",
    title2: "Unterschiedliche Rechtsantworten",
    body: "Erkunden Sie die regulatorische Landschaft nach Jurisdiktion. Wählen Sie einen Wegpunkt, um das Länderprofil zu öffnen.",
    mapLabel: "Jurisdiktionskarte",
    choose: "Jurisdiktion auswählen",
    mapped: "kartierte Jurisdiktionen",
    partial: "Teilweise abgedeckt",
    pending: "Recherche läuft",
  },
  nl: {
    eyebrow: "Interactieve Atlas",
    title1: "Dezelfde technologie",
    title2: "Andere juridische antwoorden",
    body: "Verken het regelgevingslandschap via echte jurisdicties. Selecteer een baken om het landenprofiel te openen.",
    mapLabel: "Jurisdictiekaart",
    choose: "Kies een jurisdictie",
    mapped: "jurisdicties in kaart",
    partial: "Gedeeltelijke dekking",
    pending: "Onderzoek loopt",
  },
  es: {
    eyebrow: "Atlas interactivo",
    title1: "La misma tecnología",
    title2: "Respuestas jurídicas diferentes",
    body: "Explora el panorama regulatorio por jurisdicción. Selecciona un punto para abrir el perfil del país.",
    mapLabel: "Mapa de jurisdicciones",
    choose: "Elige una jurisdicción",
    mapped: "jurisdicciones mapeadas",
    partial: "Cobertura parcial",
    pending: "Investigación en curso",
  },
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title1: string;
    title2: string;
    body: string;
    mapLabel: string;
    choose: string;
    mapped: string;
    partial: string;
    pending: string;
  }
>;

export default async function HomeAtlasMap({ locale }: { locale: Locale }) {
  const copy = MAP_COPY[locale];

  const { data } = await supabase
    .from("jurisdictions")
    .select(
      "id, name, code, slug, map_lat, map_lng, map_status, profile_status, short_description"
    )
    .eq("published", true)
    .neq("map_status", "hidden")
    .order("name");

  const base = ((data ?? []) as Jurisdiction[]).filter(
    (jurisdiction) =>
      jurisdiction.map_lat !== null && jurisdiction.map_lng !== null
  );

  let translations: Translation[] = [];

  if (locale !== "en" && base.length > 0) {
    const { data: translated } = await supabase
      .from("jurisdiction_translations")
      .select("jurisdiction_id, name, short_description")
      .eq("locale", locale)
      .eq("published", true)
      .in(
        "jurisdiction_id",
        base.map((jurisdiction) => jurisdiction.id)
      );

    translations = (translated ?? []) as Translation[];
  }

  const translationMap = new Map(
    translations.map((translation) => [
      translation.jurisdiction_id,
      translation,
    ])
  );

  const jurisdictions = base.map((jurisdiction) => {
    const translation = translationMap.get(jurisdiction.id);

    return {
      ...jurisdiction,
      displayName: translation?.name ?? jurisdiction.name,
      displayDescription:
        translation?.short_description ?? jurisdiction.short_description,
    };
  });

  const jurisdictionsInView = jurisdictions.filter(
    (jurisdiction) =>
      (jurisdiction.map_lng as number) >= EUROPE_VIEW.minLon &&
      (jurisdiction.map_lng as number) <= EUROPE_VIEW.maxLon &&
      (jurisdiction.map_lat as number) >= EUROPE_VIEW.minLat &&
      (jurisdiction.map_lat as number) <= EUROPE_VIEW.maxLat
  );

  const view = EUROPE_VIEW;
  const countries = EUROPE_COUNTRIES;

  return (
    <section id="map" className="scroll-mt-20 bg-[#10264a] text-[#fbf7ef]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[300px_1fr] lg:items-center">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[#77c7bd]">
              {copy.eyebrow}
            </div>

            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight tracking-[-0.035em]">
              {copy.title1}
              <br />
              {copy.title2}
            </h2>

            <p className="mt-5 text-base leading-7 text-[#fbf7ef]/62">
              {copy.body}
            </p>

            <a
              href="/explore/system-map"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#9ce0d6] transition hover:text-white"
            >
              Explore the regulatory system <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="overflow-hidden rounded-[30px] border border-white/12 bg-[#17345e] shadow-[0_22px_60px_rgba(0,0,0,.14)]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/35">
                  {copy.mapLabel}
                </div>
                <div className="mt-1 font-serif text-xl font-semibold">
                  {copy.choose}
                </div>
              </div>

              <div className="text-xs text-white/38">
                {jurisdictionsInView.length} {copy.mapped}
              </div>
            </div>

            <div className="relative">
              <svg
                viewBox={`0 0 ${view.width} ${view.height}`}
                className="block h-auto w-full"
                role="img"
                aria-label={copy.mapLabel}
              >
                <rect
                  width={view.width}
                  height={view.height}
                  fill="#17345e"
                />

                <g
                  fill="#dfe6df"
                  fillOpacity="0.82"
                  stroke="#385174"
                  strokeWidth="1.15"
                  vectorEffect="non-scaling-stroke"
                >
                  {countries.map((country) => (
                    <path
                      key={country.iso3}
                      d={country.d}
                      fillRule="evenodd"
                    />
                  ))}
                </g>

                {jurisdictionsInView.map((jurisdiction) => {
                  const { x, y } = project(
                    jurisdiction.map_lng as number,
                    jurisdiction.map_lat as number,
                    view
                  );

                  const pending =
                    jurisdiction.profile_status === "research_pending";
                  const markerFill = pending ? "#d89b2b" : "#4fb6aa";
                  const status = pending ? copy.pending : copy.partial;

                  return (
                    <a
                      key={jurisdiction.id}
                      href={`/${jurisdiction.slug}`}
                      aria-label={`${jurisdiction.displayName}: ${status}`}
                      className="group cursor-pointer"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={12}
                        fill="#10264a"
                        stroke={markerFill}
                        strokeWidth={5}
                        className="transition-all group-hover:stroke-white"
                      />

                      <circle
                        cx={x}
                        cy={y}
                        r={4.4}
                        fill={markerFill}
                      />

                      <text
                        x={x + 18}
                        y={y + 4}
                        fill="#fbf7ef"
                        fontSize={15}
                        fontWeight="700"
                        paintOrder="stroke"
                        stroke="#17345e"
                        strokeWidth={5}
                        strokeLinejoin="round"
                      >
                        {jurisdiction.displayName}
                      </text>
                    </a>
                  );
                })}
              </svg>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-white/10 px-6 py-4 text-xs text-white/45">
              {jurisdictionsInView.map((jurisdiction) => (
                <a
                  key={jurisdiction.id}
                  href={`/${jurisdiction.slug}`}
                  className="transition hover:text-white"
                >
                  <span
                    className={`mr-2 inline-block h-2 w-2 rounded-full ${
                      jurisdiction.profile_status === "research_pending"
                        ? "bg-[#d89b2b]"
                        : "bg-[#4fb6aa]"
                    }`}
                  />
                  {jurisdiction.displayName}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function project(
  longitude: number,
  latitude: number,
  view: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
    width: number;
    height: number;
  }
) {
  return {
    x:
      ((longitude - view.minLon) / (view.maxLon - view.minLon)) *
      view.width,
    y:
      ((view.maxLat - latitude) / (view.maxLat - view.minLat)) *
      view.height,
  };
}
