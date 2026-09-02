import type { Locale } from "@/app/i18n/locale";

type HomeCopy = {
  nav: {
    deploy: string;
    jurisdictions: string;
    landscape: string;
    learn: string;
    method: string;
  };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    body: string;
    atlaslings: string;
    atlaslingsSub: string;
  };
  modes: {
    title: string;
    deployTitle: string;
    deployBody: string;
    deployCta: string;
    exploreTitle: string;
    exploreBody: string;
    exploreCta: string;
    learnTitle: string;
    learnBody: string;
    learnCta: string;
  };
  map: {
    eyebrow: string;
    title: string;
    body: string;
    scopeNote: string;
    additionalProfiles: string;
  };
  puzzle: {
    eyebrow: string;
    title: string;
    body: string;
    reveal: string;
    answer: string;
    secondaryOne: string;
    secondaryOneConcept: string;
    secondaryTwo: string;
    secondaryTwoConcept: string;
  };
  method: {
    eyebrow: string;
    title: string;
    body: string;
    steps: [string, string, string, string];
  };
  ui: {
    language: string;
    primaryNavigation: string;
    map: {
      ariaLabel: string;
      openProfile: string;
      profileAvailable: string;
      coverageDeveloping: string;
      profilesOnMap: string;
      disclaimer: string;
      fallbackNames: {
        netherlands: string;
        germany: string;
        "united-kingdom": string;
        russia: string;
      };
    };
    footerTagline: string;
  };
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    nav: {
      deploy: "Deploy",
      jurisdictions: "Jurisdictions",
      landscape: "System Map",
      learn: "Learn",
      method: "Method",
    },
    hero: {
      eyebrow: "Law × autonomy × real-world deployment",
      line1: "One technology",
      line2: "Many legal worlds",
      line3: "Atlas connects the pieces",
      body: "Explore the regulatory landscape for autonomous mobility — and apply source-backed analysis to real deployment questions across jurisdictions, approvals, human roles, operating conditions and primary sources.",
      atlaslings: "Meet the Atlaslings",
      atlaslingsSub: "Three guides. One regulatory map.",
    },
    modes: {
      title: "How do you want to use the Atlas?",
      deployTitle: "Understand the path to deployment",
      deployBody: "Apply the Atlas to a real scenario: see which regulatory layers, approvals, operating conditions and unresolved questions matter.",
      deployCta: "Open Deploy",
      exploreTitle: "Navigate the regulatory landscape",
      exploreBody: "Explore jurisdictions, regulatory layers, standards, institutions and primary sources — and see how the pieces connect.",
      exploreCta: "Open the System Map",
      learnTitle: "Understand how the pieces fit together",
      learnBody: "Learn autonomous-mobility regulation through concepts, puzzles and real examples grounded in jurisdictions and sources.",
      learnCta: "Start learning",
    },
    map: {
      eyebrow: "Interactive Atlas",
      title: "Same technology, different legal answers",
      body: "Choose a beacon to open its jurisdiction profile. Locations and coverage states come from the Atlas database, so the map grows with the research.",
      scopeNote: "The geographic view remains Europe-focused. Moscow is a discovery marker for the Russia profile, not an EPR operating area.",
      additionalProfiles: "All jurisdiction profiles",
    },
    puzzle: {
      eyebrow: "Learn with Cat",
      title: "Type approved. Why can’t it just drive?",
      body: "Product approval and permission to operate on public roads answer different legal questions.",
      reveal: "Reveal the regulatory hinge",
      answer: "Type approval can establish that a vehicle or automated driving system satisfies an applicable product-approval regime. It does not, by itself, settle every road-traffic, operator, authorization or geographic condition for deployment. The operating jurisdiction supplies that next layer.",
      secondaryOne: "Nobody is in the driver’s seat. Did the legal driver disappear?",
      secondaryOneConcept: "ADS · driver · remote human",
      secondaryTwo: "Remote driving and remote assistance sound similar. Are they legally the same?",
      secondaryTwoConcept: "Remote operations",
    },
    method: {
      eyebrow: "Source-backed by design",
      title: "Follow every conclusion back to the source",
      body: "Atlas separates what a source says from how it is interpreted and what that interpretation changes for real-world operation. Primary sources remain in their original language.",
      steps: [
        "Source proposition",
        "Atlas legal interpretation",
        "Operational impact",
        "Exact source",
      ],
    },
    ui: {
      language: "Language",
      primaryNavigation: "Primary navigation",
      map: {
        ariaLabel: "Atlas jurisdiction map",
        openProfile: "Open jurisdiction profile",
        profileAvailable: "Profile available",
        coverageDeveloping: "Coverage developing",
        profilesOnMap: "Profiles on map",
        disclaimer:
          "Geographic boundaries are shown for orientation and do not express a legal position on status or sovereignty. Basemap geometry: Natural Earth via world-atlas.",
        fallbackNames: {
          netherlands: "Netherlands",
          germany: "Germany",
          "united-kingdom": "United Kingdom",
          russia: "Russia",
        },
      },
      footerTagline:
        "One technology · many legal worlds · one connected map",
    },
  },
  de: {
    nav: {
      deploy: "Einsatz",
      jurisdictions: "Rechtsordnungen",
      landscape: "Systemkarte",
      learn: "Lernen",
      method: "Methodik",
    },
    hero: {
      eyebrow: "Recht × autonome Mobilität × Einsatz in der Praxis",
      line1: "Eine Technologie",
      line2: "Unterschiedliche Rechtsordnungen",
      line3: "Atlas zeigt die Zusammenhänge",
      body:
        "Erkunden Sie, wie autonome Mobilität in verschiedenen Rechtsordnungen reguliert wird, und nutzen Sie quellenbasierte Analysen für konkrete Einsatzfragen: Welche Genehmigungen sind erforderlich, welche menschlichen Rollen bestehen, wo darf das System betrieben werden und welche Anforderungen gelten fort?",
      atlaslings: "Die Atlaslings",
      atlaslingsSub: "Drei Begleiter. Drei Wege durch die Regulierung.",
    },
    modes: {
      title: "Wo möchten Sie beginnen?",
      deployTitle: "Den Weg zum Einsatz nachvollziehen",
      deployBody:
        "Prüfen Sie ein konkretes Szenario und erkennen Sie, welche Regelungsebenen, Genehmigungen, Betriebsbedingungen und offenen Rechtsfragen für den Einsatz entscheidend sind.",
      deployCta: "Szenario prüfen",
      exploreTitle: "Die Regulierungslandschaft als System verstehen",
      exploreBody:
        "Erkunden Sie Rechtsordnungen, Regelungsebenen, Standards, Behörden und Primärquellen — und ihre Zusammenhänge.",
      exploreCta: "Systemkarte öffnen",
      learnTitle: "Verstehen, wie die Elemente zusammenwirken",
      learnBody:
        "Erschließen Sie zentrale Begriffe anhand von Rechtsvorschriften, Standards und realen Fällen, deren Sachverhalt amtlich festgestellt wurde.",
      learnCta: "Lernpfad starten",
    },
    map: {
      eyebrow: "Interaktive Karte",
      title: "Eine Technologie — unterschiedliche rechtliche Rahmen",
      body:
        "Wählen Sie eine Markierung, um das Profil einer Rechtsordnung zu öffnen. Die Karte zeigt, welche Rechtsordnungen bereits untersucht wurden und wie weit die Abdeckung reicht.",
      scopeNote:
        "Die geografische Ansicht bleibt auf Europa ausgerichtet. Moskau ist ein Einstiegspunkt zum Russland-Profil und kein EPR-Betriebsgebiet.",
      additionalProfiles: "Alle Rechtsordnungsprofile",
    },
    puzzle: {
      eyebrow: "Die Katze erklärt",
      title:
        "Typgenehmigung erteilt. Warum darf das Fahrzeug trotzdem nicht einfach auf die Straße?",
      body:
        "Typgenehmigung und rechtliche Zulässigkeit des Betriebs auf öffentlichen Straßen beantworten unterschiedliche Fragen.",
      reveal: "Zeigen, was noch fehlt",
      answer:
        "Eine Typgenehmigung kann bestätigen, dass ein Fahrzeug oder ADS die einschlägigen technischen Anforderungen erfüllt. Sie berechtigt jedoch nicht automatisch zum Betrieb auf öffentlichen Straßen. Je nach Rechtsordnung können zusätzliche Genehmigungen, ein festgelegter Betriebsbereich, Zulassung, Versicherung und weitere straßenverkehrsrechtliche Voraussetzungen erforderlich sein.",
      secondaryOne:
        "Niemand sitzt auf dem Fahrersitz. Bedeutet das auch rechtlich, dass es keinen Fahrer gibt?",
      secondaryOneConcept: "ADS · Fahrerrolle · menschliche Aufsicht",
      secondaryTwo:
        "Remote Driving und Remote Assistance klingen ähnlich. Sind sie rechtlich dasselbe?",
      secondaryTwoConcept: "Remote Operations",
    },
    method: {
      eyebrow: "Quellenbasiert und nachvollziehbar",
      title: "Von der Schlussfolgerung zur konkreten Quelle",
      body:
        "Atlas trennt, was eine Quelle ausdrücklich sagt, wie wir sie rechtlich einordnen und welche praktische Bedeutung daraus folgt. Jede wesentliche Aussage lässt sich bis zur offiziellen Quelle zurückverfolgen; Primärquellen bleiben in der Originalsprache.",
      steps: [
        "Aussage der Quelle",
        "Rechtliche Einordnung durch Atlas",
        "Praktische Bedeutung",
        "Offizielle Quelle",
      ],
    },
    ui: {
      language: "Sprache",
      primaryNavigation: "Hauptnavigation",
      map: {
        ariaLabel: "Atlas-Karte der Rechtsordnungen",
        openProfile: "Profil der Rechtsordnung öffnen",
        profileAvailable: "Profil verfügbar",
        coverageDeveloping: "Abdeckung im Aufbau",
        profilesOnMap: "Profile auf der Karte",
        disclaimer:
          "Geografische Grenzen dienen nur der Orientierung und stellen keine rechtliche Position zum Status von Gebieten oder zur Souveränität dar. Kartengrundlage: Natural Earth über world-atlas.",
        fallbackNames: {
          netherlands: "Niederlande",
          germany: "Deutschland",
          "united-kingdom": "Vereinigtes Königreich",
          russia: "Russland",
        },
      },
      footerTagline:
        "Eine Technologie · unterschiedliche Rechtsordnungen · eine verknüpfte Karte",
    },
  },
  nl: {
    nav: {
      deploy: "Inzet",
      jurisdictions: "Jurisdicties",
      landscape: "Systeemkaart",
      learn: "Leren",
      method: "Methodiek",
    },
    hero: {
      eyebrow: "Recht × autonome mobiliteit × inzet in de praktijk",
      line1: "Eén technologie",
      line2: "Verschillende rechtsstelsels",
      line3: "Atlas laat de samenhang zien",
      body:
        "Ontdek hoe autonome mobiliteit in verschillende jurisdicties wordt gereguleerd en gebruik analyse op basis van officiële bronnen voor concrete vragen over inzet: welke toestemmingen zijn nodig, welke menselijke rollen blijven bestaan, waar mag het systeem worden gebruikt en welke regels blijven gelden?",
      atlaslings: "Maak kennis met de Atlaslings",
      atlaslingsSub: "Drie gidsen. Drie routes door de regelgeving.",
    },
    modes: {
      title: "Waar wilt u beginnen?",
      deployTitle: "Breng de route naar inzet in kaart",
      deployBody:
        "Pas Atlas toe op een concreet scenario en zie welke regelgevingslagen, vergunningen, operationele voorwaarden en open rechtsvragen bepalend zijn.",
      deployCta: "Scenario onderzoeken",
      exploreTitle: "Bekijk de regelgeving als samenhangend systeem",
      exploreBody:
        "Verken jurisdicties, regelgevingslagen, normen, bevoegde instanties en primaire bronnen — en hun onderlinge verband.",
      exploreCta: "Systeemkaart openen",
      learnTitle: "Begrijp hoe de onderdelen samenhangen",
      learnBody:
        "Leer kernbegrippen aan de hand van wetgeving, normen en reële zaken waarvan de feiten officieel zijn vastgesteld.",
      learnCta: "Leerpad starten",
    },
    map: {
      eyebrow: "Interactieve kaart",
      title: "Eén technologie — verschillende juridische kaders",
      body:
        "Kies een markering om het profiel van een jurisdictie te openen. De kaart laat zien welke jurisdicties al zijn onderzocht en hoe ver de dekking reikt.",
      scopeNote:
        "De geografische weergave blijft op Europa gericht. Moskou is een toegangspunt tot het Rusland-profiel en geen EPR-exploitatiegebied.",
      additionalProfiles: "Alle jurisdictieprofielen",
    },
    puzzle: {
      eyebrow: "De kat legt uit",
      title:
        "Typegoedkeuring verleend. Waarom mag het voertuig dan nog niet zomaar de openbare weg op?",
      body:
        "Typegoedkeuring en toestemming voor gebruik op de openbare weg beantwoorden verschillende juridische vragen.",
      reveal: "Bekijk wat nog ontbreekt",
      answer:
        "Een typegoedkeuring kan bevestigen dat een voertuig of ADS aan de toepasselijke technische eisen voldoet. Zij geeft op zichzelf nog geen recht op gebruik op de openbare weg. Afhankelijk van de jurisdictie kunnen aanvullende vergunningen, een afzonderlijk goedgekeurd gebied, registratie, verzekering en andere verkeersrechtelijke voorwaarden vereist zijn.",
      secondaryOne:
        "Er zit niemand op de bestuurdersstoel. Betekent dit juridisch ook dat er geen bestuurder is?",
      secondaryOneConcept: "ADS · bestuurder · menselijk toezicht",
      secondaryTwo:
        "Besturing op afstand en assistentie op afstand klinken vergelijkbaar. Zijn ze juridisch hetzelfde?",
      secondaryTwoConcept: "Besturing en ondersteuning op afstand",
    },
    method: {
      eyebrow: "Gebaseerd op officiële bronnen",
      title: "Van conclusie naar concrete bron",
      body:
        "Atlas maakt zichtbaar wat de bron zelf zegt, hoe wij die juridisch duiden en wat dat in de praktijk betekent. Elke wezenlijke conclusie is herleidbaar tot een officiële bron; primaire bronnen blijven in de oorspronkelijke taal.",
      steps: [
        "Wat de bron zegt",
        "Juridische duiding door Atlas",
        "Betekenis in de praktijk",
        "Officiële bron",
      ],
    },
    ui: {
      language: "Taal",
      primaryNavigation: "Hoofdnavigatie",
      map: {
        ariaLabel: "Atlas-kaart van jurisdicties",
        openProfile: "Jurisdictieprofiel openen",
        profileAvailable: "Profiel beschikbaar",
        coverageDeveloping: "Dekking in ontwikkeling",
        profilesOnMap: "Profielen op de kaart",
        disclaimer:
          "Geografische grenzen zijn uitsluitend ter oriëntatie weergegeven en geven geen juridisch standpunt weer over status of soevereiniteit. Kaartgeometrie: Natural Earth via world-atlas.",
        fallbackNames: {
          netherlands: "Nederland",
          germany: "Duitsland",
          "united-kingdom": "Verenigd Koninkrijk",
          russia: "Rusland",
        },
      },
      footerTagline:
        "Eén technologie · verschillende rechtsstelsels · één verbonden kaart",
    },
  },
  ru: {
    nav: {
      deploy: "Запуск",
      jurisdictions: "Юрисдикции",
      landscape: "Карта регулирования",
      learn: "Обучение",
      method: "Методология",
    },
    hero: {
      eyebrow: "Право × автономный транспорт × реальное внедрение",
      line1: "Одна технология",
      line2: "Разные правовые режимы",
      line3: "Atlas собирает картину целиком",
      body:
        "Исследуйте, как регулируется автономный транспорт в разных странах, и находите ответы на практические вопросы запуска: какие разрешения нужны, кто выполняет функции водителя, где может работать система и на какие первичные источники опирается вывод.",
      atlaslings: "Проводники Atlas",
      atlaslingsSub: "Три героя. Три способа разобраться в регулировании.",
    },
    modes: {
      title: "С чего вы хотите начать?",
      deployTitle: "Разобрать путь к запуску",
      deployBody:
        "Выберите реальный сценарий и посмотрите, какие нормы, разрешения, условия эксплуатации и открытые вопросы определяют возможность запуска.",
      deployCta: "Разобрать сценарий",
      exploreTitle: "Увидеть систему регулирования целиком",
      exploreBody:
        "Исследуйте юрисдикции, уровни регулирования, стандарты, органы и первичные источники — и связи между ними.",
      exploreCta: "Открыть карту регулирования",
      learnTitle: "Понять, как всё работает",
      learnBody:
        "Разбирайте ключевые понятия на примерах из законодательства, стандартов и реальных ситуаций, обстоятельства которых установлены официальными органами.",
      learnCta: "Начать обучение",
    },
    map: {
      eyebrow: "Карта юрисдикций",
      title: "Одна технология — разные правовые режимы",
      body:
        "Выберите страну, чтобы открыть её профиль регулирования. Карта показывает, какие юрисдикции уже исследованы и насколько полно.",
      scopeNote:
        "Географическая карта по-прежнему ориентирована на Европу. Москва — точка перехода к профилю России, а не территория действия ЭПР.",
      additionalProfiles: "Все профили юрисдикций",
    },
    puzzle: {
      eyebrow: "Кот объясняет",
      title:
        "Одобрение типа получено. Почему всё равно нельзя просто выехать на дорогу?",
      body:
        "Одобрение типа и право на эксплуатацию на дорогах — разные юридические вопросы.",
      reveal: "Показать, чего ещё не хватает",
      answer:
        "Одобрение типа подтверждает, что транспортное средство или ADS соответствует применимым техническим требованиям. Но само по себе оно не даёт права эксплуатировать систему на дорогах. В зависимости от юрисдикции могут потребоваться отдельное разрешение, утверждённая зона эксплуатации, регистрация, страхование и соблюдение иных требований дорожного законодательства.",
      secondaryOne:
        "В салоне никого нет. Значит ли это, что с точки зрения права водителя тоже нет?",
      secondaryOneConcept: "ADS · водитель · человеческий контроль",
      secondaryTwo:
        "Удалённое управление и дистанционная помощь — одно и то же с точки зрения права?",
      secondaryTwoConcept: "Дистанционные функции",
    },
    method: {
      eyebrow: "Выводы с опорой на источники",
      title: "От вывода — к конкретному источнику",
      body:
        "Atlas отделяет то, что прямо следует из источника, от нашей юридической интерпретации и практических последствий. Каждый существенный вывод можно проверить по официальному тексту; первичные источники приводятся на языке оригинала.",
      steps: [
        "Что прямо следует из источника",
        "Юридическая интерпретация Atlas",
        "Что это значит на практике",
        "Официальный источник",
      ],
    },
    ui: {
      language: "Язык",
      primaryNavigation: "Основная навигация",
      map: {
        ariaLabel: "Карта юрисдикций Atlas",
        openProfile: "Открыть профиль юрисдикции",
        profileAvailable: "Профиль доступен",
        coverageDeveloping: "Исследование продолжается",
        profilesOnMap: "Профилей на карте",
        disclaimer:
          "Границы показаны только для ориентации и не выражают позицию Atlas относительно статуса территорий или суверенитета. Картографическая основа: Natural Earth via world-atlas.",
        fallbackNames: {
          netherlands: "Нидерланды",
          germany: "Германия",
          "united-kingdom": "Великобритания",
          russia: "Россия",
        },
      },
      footerTagline:
        "Одна технология · разные правовые режимы · единая карта связей",
    },
  },
};
