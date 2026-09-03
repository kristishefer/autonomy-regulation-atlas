import type { Locale } from "@/app/i18n/locale";

export type HomeQuestionDemoCopy = {
  eyebrow: string;
  title: string;
  body: string;
  questionsLabel: string;
  previewLabel: string;
  layersLabel: string;
  questions: [string, string, string, string];
  layers: Array<{
    id: "jurisdictions" | "compare" | "system-map" | "sources";
    label: string;
    body: string;
    linkLabel?: string;
  }>;
};

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
  navigator: {
    eyebrow: string;
    title: string;
    body: string;
    tabsLabel: string;
    scopeLabel: string;
    overviewLabel: string;
    snapshotLabel: string;
    openProfile: string;
    compareJurisdictions: string;
  };
  questionDemo: HomeQuestionDemoCopy;
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
      atlaslings: "Use the Atlas",
      atlaslingsSub: "Three guides. One regulatory map.",
    },
    modes: {
      title: "How do you want to use the Atlas?",
      deployTitle: "Working on a concrete deployment?",
      deployBody: "Use Atlas for a specific deployment or market-access scenario.",
      deployCta: "Start with Deploy",
      exploreTitle: "Navigate the regulatory landscape",
      exploreBody: "Research jurisdictions, compare regulatory systems and trace how the pieces connect.",
      exploreCta: "Explore the Atlas",
      learnTitle: "Understand how the pieces fit together",
      learnBody: "Build regulatory fluency through concepts, standards and source-backed examples.",
      learnCta: "Go to Learning",
    },
    map: {
      eyebrow: "Interactive Atlas",
      title: "Same technology, different legal answers",
      body: "Choose a beacon to open its jurisdiction profile. The geographic map stays deliberately coherent; profiles outside the current European frame remain available in the profile list below.",
      scopeNote: "The map is a navigation surface, not a map of permit, EPR or operating-area boundaries. Russia and the United States remain available as profiles without being represented by an artificial point inside the European frame.",
      additionalProfiles: "All jurisdiction profiles",
    },
    navigator: {
      eyebrow: "Jurisdiction navigator",
      title: "Explore jurisdictions",
      body: "See how legal pathways differ across regulatory systems.",
      tabsLabel: "Choose a jurisdiction",
      scopeLabel: "Profile scope",
      overviewLabel: "Regulatory overview",
      snapshotLabel: "At a glance",
      openProfile: "Open profile",
      compareJurisdictions: "Compare jurisdictions",
    },
    questionDemo: {
      eyebrow: "Connected research paths",
      title: "Follow a regulatory question",
      body: "See how one question can be investigated through connected Atlas layers.",
      questionsLabel: "Choose a regulatory question",
      previewLabel: "Selected question",
      layersLabel: "Choose an Atlas layer",
      questions: [
        "Can it operate without a driver?",
        "What approval is required?",
        "Who remains legally responsible?",
        "What happens after an incident?",
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Jurisdictions",
          body: "See the source-native legal pathway in each jurisdiction.",
          linkLabel: "Explore jurisdictions",
        },
        {
          id: "compare",
          label: "Compare",
          body: "Compare the same regulatory question across jurisdictions.",
          linkLabel: "Compare this question",
        },
        {
          id: "system-map",
          label: "System Map",
          body: "Understand how the relevant legal, technical and regulatory concepts connect.",
          linkLabel: "Open System Map",
        },
        {
          id: "sources",
          label: "Sources",
          body: "Trace the conclusion to the underlying authority and legal status.",
        },
      ],
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
      atlaslings: "Atlas nutzen",
      atlaslingsSub: "Drei Begleiter. Drei Wege durch die Regulierung.",
    },
    modes: {
      title: "Wo möchten Sie beginnen?",
      deployTitle: "Arbeiten Sie an einem konkreten Einsatz?",
      deployBody:
        "Nutzen Sie Atlas für ein konkretes Einsatz- oder Marktzugangsszenario.",
      deployCta: "Mit Deploy beginnen",
      exploreTitle: "Die Regulierungslandschaft als System verstehen",
      exploreBody:
        "Erforschen und vergleichen Sie Rechtsordnungen und verfolgen Sie ihre regulatorischen Zusammenhänge.",
      exploreCta: "Atlas erkunden",
      learnTitle: "Verstehen, wie die Elemente zusammenwirken",
      learnBody:
        "Erschließen Sie Regulierung durch Begriffe, Standards und quellenbasierte Beispiele.",
      learnCta: "Zum Lernbereich",
    },
    map: {
      eyebrow: "Interaktive Karte",
      title: "Eine Technologie — unterschiedliche rechtliche Rahmen",
      body:
        "Wählen Sie eine Markierung, um das Profil einer Rechtsordnung zu öffnen. Rechtsordnungen außerhalb des aktuellen europäischen Kartenausschnitts bleiben in der Profilliste darunter verfügbar.",
      scopeNote:
        "Die Karte dient der Navigation und zeigt keine Genehmigungs-, EPR- oder Betriebsgebietsgrenzen. Russland und die Vereinigten Staaten bleiben als Profile verfügbar, ohne durch einen künstlichen Punkt im europäischen Kartenausschnitt dargestellt zu werden.",
      additionalProfiles: "Alle Rechtsordnungsprofile",
    },
    navigator: {
      eyebrow: "Navigator für Rechtsordnungen",
      title: "Rechtsordnungen erkunden",
      body:
        "Sehen Sie, wie sich rechtliche Wege zwischen Regulierungssystemen unterscheiden.",
      tabsLabel: "Rechtsordnung auswählen",
      scopeLabel: "Umfang des Profils",
      overviewLabel: "Regulatorischer Überblick",
      snapshotLabel: "Auf einen Blick",
      openProfile: "Profil öffnen",
      compareJurisdictions: "Rechtsordnungen vergleichen",
    },
    questionDemo: {
      eyebrow: "Verknüpfte Recherchewege",
      title: "Einer regulatorischen Frage folgen",
      body:
        "Sehen Sie, wie sich eine Frage über die verbundenen Ebenen von Atlas untersuchen lässt.",
      questionsLabel: "Regulatorische Frage auswählen",
      previewLabel: "Ausgewählte Frage",
      layersLabel: "Atlas-Ebene auswählen",
      questions: [
        "Kann das System ohne Fahrer betrieben werden?",
        "Welche Genehmigung ist erforderlich?",
        "Wer bleibt rechtlich verantwortlich?",
        "Was geschieht nach einem Vorfall?",
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Rechtsordnungen",
          body:
            "Sehen Sie den Rechtsweg mit den amtlichen Begriffen der jeweiligen Rechtsordnung.",
          linkLabel: "Rechtsordnungen erkunden",
        },
        {
          id: "compare",
          label: "Vergleich",
          body:
            "Vergleichen Sie dieselbe regulatorische Frage über mehrere Rechtsordnungen hinweg.",
          linkLabel: "Diese Frage vergleichen",
        },
        {
          id: "system-map",
          label: "Systemkarte",
          body:
            "Verstehen Sie, wie die einschlägigen rechtlichen, technischen und regulatorischen Begriffe zusammenhängen.",
          linkLabel: "Systemkarte öffnen",
        },
        {
          id: "sources",
          label: "Quellen",
          body:
            "Verfolgen Sie die Schlussfolgerung bis zur zugrunde liegenden Autorität und ihrem Rechtsstatus.",
        },
      ],
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
      atlaslings: "Gebruik de Atlas",
      atlaslingsSub: "Drie gidsen. Drie routes door de regelgeving.",
    },
    modes: {
      title: "Waar wilt u beginnen?",
      deployTitle: "Werkt u aan een concrete inzet?",
      deployBody:
        "Gebruik Atlas voor een specifiek inzet- of markttoegangsscenario.",
      deployCta: "Start met Deploy",
      exploreTitle: "Bekijk de regelgeving als samenhangend systeem",
      exploreBody:
        "Onderzoek en vergelijk jurisdicties en volg hoe de regelgevingsonderdelen samenhangen.",
      exploreCta: "Verken de Atlas",
      learnTitle: "Begrijp hoe de onderdelen samenhangen",
      learnBody:
        "Bouw regelgevingskennis op met begrippen, normen en brongebonden voorbeelden.",
      learnCta: "Naar Learning",
    },
    map: {
      eyebrow: "Interactieve kaart",
      title: "Eén technologie — verschillende juridische kaders",
      body:
        "Kies een markering om het profiel van een jurisdictie te openen. Jurisdicties buiten het huidige Europese kaartvenster blijven beschikbaar in de profielenlijst eronder.",
      scopeNote:
        "De kaart is een navigatiemiddel en toont geen grenzen van vergunningen, EPR's of operationele gebieden. Rusland en de Verenigde Staten blijven als profiel beschikbaar zonder een kunstmatige locatiepunt in de Europese kaart.",
      additionalProfiles: "Alle jurisdictieprofielen",
    },
    navigator: {
      eyebrow: "Jurisdictienavigator",
      title: "Verken jurisdicties",
      body:
        "Bekijk hoe juridische routes verschillen tussen regelgevingsstelsels.",
      tabsLabel: "Kies een jurisdictie",
      scopeLabel: "Reikwijdte van het profiel",
      overviewLabel: "Regelgevend overzicht",
      snapshotLabel: "In één oogopslag",
      openProfile: "Profiel openen",
      compareJurisdictions: "Jurisdicties vergelijken",
    },
    questionDemo: {
      eyebrow: "Verbonden onderzoeksroutes",
      title: "Volg een regelgevingsvraag",
      body:
        "Bekijk hoe één vraag via de verbonden Atlas-lagen kan worden onderzocht.",
      questionsLabel: "Kies een regelgevingsvraag",
      previewLabel: "Geselecteerde vraag",
      layersLabel: "Kies een Atlas-laag",
      questions: [
        "Kan het systeem zonder bestuurder worden ingezet?",
        "Welke goedkeuring is vereist?",
        "Wie blijft juridisch verantwoordelijk?",
        "Wat gebeurt er na een incident?",
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Jurisdicties",
          body:
            "Bekijk het juridische traject met de officiële termen van elke jurisdictie.",
          linkLabel: "Jurisdicties verkennen",
        },
        {
          id: "compare",
          label: "Vergelijken",
          body:
            "Vergelijk dezelfde regelgevingsvraag tussen jurisdicties.",
          linkLabel: "Deze vraag vergelijken",
        },
        {
          id: "system-map",
          label: "Systeemkaart",
          body:
            "Begrijp hoe de relevante juridische, technische en regelgevingsbegrippen samenhangen.",
          linkLabel: "Systeemkaart openen",
        },
        {
          id: "sources",
          label: "Bronnen",
          body:
            "Herleid de conclusie tot de onderliggende autoriteit en juridische status.",
        },
      ],
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
      deploy: "Сценарий",
      jurisdictions: "Юрисдикции",
      landscape: "Система регулирования",
      learn: "Разобраться",
      method: "Метод",
    },
    hero: {
      eyebrow: "Регулирование автономной мобильности — от нормы к реальному сценарию",
      line1: "Одна технология",
      line2: "Разные правовые системы",
      line3: "Atlas показывает, как они устроены",
      body:
        "Atlas помогает понять, как в разных юрисдикциях устроено регулирование автономной мобильности: какие уровни права применяются, какие разрешения нужны, какие роли сохраняются за человеком, где допустима эксплуатация и на каких официальных источниках основан каждый вывод.",
      atlaslings: "Используйте Atlas",
      atlaslingsSub: "Три режима работы с одной системой регулирования.",
    },
    modes: {
      title: "Что вы хотите сделать?",
      deployTitle: "Работаете над конкретным сценарием запуска?",
      deployBody:
        "Используйте Atlas для конкретного сценария эксплуатации или выхода на рынок.",
      deployCta: "Начать с Deploy",
      exploreTitle: "Понять систему регулирования",
      exploreBody:
        "Исследуйте и сравнивайте юрисдикции и прослеживайте связи между элементами регулирования.",
      exploreCta: "Исследовать Atlas",
      learnTitle: "Разобраться в ключевых понятиях",
      learnBody:
        "Разберитесь в регулировании через понятия, стандарты и примеры с опорой на источники.",
      learnCta: "Перейти в Learning",
    },
    map: {
      eyebrow: "Юрисдикции",
      title: "Одна технология — разные правовые ответы",
      body:
        "Выберите отметку на карте, чтобы открыть профиль юрисдикции. На карту вынесены только профили, которые корректно помещаются в текущую европейскую рамку; остальные доступны в списке ниже.",
      scopeNote:
        "Карта нужна для навигации и не показывает границы конкретных разрешений, ЭПР или зон эксплуатации. Россия и США доступны в списке профилей и не обозначаются условной точкой внутри европейской карты.",
      additionalProfiles: "Все профили",
    },
    navigator: {
      eyebrow: "Навигатор по юрисдикциям",
      title: "Изучить юрисдикции",
      body:
        "Сравните, как различаются правовые пути в разных системах регулирования.",
      tabsLabel: "Выберите юрисдикцию",
      scopeLabel: "Охват профиля",
      overviewLabel: "Обзор регулирования",
      snapshotLabel: "Кратко",
      openProfile: "Открыть профиль",
      compareJurisdictions: "Сравнить юрисдикции",
    },
    questionDemo: {
      eyebrow: "Связанные пути исследования",
      title: "Проследить регуляторный вопрос",
      body:
        "Посмотрите, как один вопрос исследуется через связанные уровни Atlas.",
      questionsLabel: "Выберите регуляторный вопрос",
      previewLabel: "Выбранный вопрос",
      layersLabel: "Выберите уровень Atlas",
      questions: [
        "Может ли система работать без водителя?",
        "Какое разрешение требуется?",
        "Кто сохраняет юридическую ответственность?",
        "Что происходит после инцидента?",
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Юрисдикции",
          body:
            "Посмотрите правовой путь в каждой юрисдикции с её официальной терминологией.",
          linkLabel: "Изучить юрисдикции",
        },
        {
          id: "compare",
          label: "Сравнение",
          body:
            "Сравните один и тот же регуляторный вопрос в разных юрисдикциях.",
          linkLabel: "Сравнить этот вопрос",
        },
        {
          id: "system-map",
          label: "Системная карта",
          body:
            "Разберитесь, как связаны соответствующие правовые, технические и регуляторные понятия.",
          linkLabel: "Открыть системную карту",
        },
        {
          id: "sources",
          label: "Источники",
          body:
            "Проследите вывод до первичного источника и его юридического статуса.",
        },
      ],
    },
    puzzle: {
      eyebrow: "Разобраться с Cat",
      title:
        "Одобрение типа есть. Почему этого недостаточно для выезда на дорогу?",
      body:
        "Техническое одобрение и право эксплуатации на дорогах отвечают на разные юридические вопросы.",
      reveal: "Показать следующий правовой уровень",
      answer:
        "Одобрение типа может подтверждать соответствие транспортного средства или ADS применимому техническому режиму. Но само по себе оно не решает вопросы допуска к дорогам, условий эксплуатации, роли оператора, географии, регистрации или страхования. Эти требования определяются применимой юрисдикцией и конкретным режимом.",
      secondaryOne:
        "В салоне никого нет. Означает ли это, что право тоже не видит никакой человеческой роли?",
      secondaryOneConcept: "ADS · водитель · дистанционные роли",
      secondaryTwo:
        "Remote driving и удалённая поддержка — это одна юридическая роль?",
      secondaryTwoConcept: "Дистанционные роли",
    },
    method: {
      eyebrow: "Каждый вывод — к источнику",
      title: "От правового вывода к официальному тексту",
      body:
        "Atlas отдельно показывает, что прямо следует из источника, как мы это юридически интерпретируем и что это меняет для эксплуатации. Официальные термины и первичные источники сохраняются на языке оригинала.",
      steps: [
        "Позиция источника",
        "Юридический анализ Atlas",
        "Практическое значение",
        "Официальный источник",
      ],
    },
    ui: {
      language: "Язык",
      primaryNavigation: "Основная навигация",
      map: {
        ariaLabel: "Карта юрисдикций Atlas",
        openProfile: "Открыть профиль",
        profileAvailable: "Профиль готов",
        coverageDeveloping: "Исследование продолжается",
        profilesOnMap: "профиля на карте",
        disclaimer:
          "Границы показаны только для ориентации и не выражают позицию Atlas относительно статуса территорий или суверенитета. Картографическая основа: Natural Earth через world-atlas.",
        fallbackNames: {
          netherlands: "Нидерланды",
          germany: "Германия",
          "united-kingdom": "Великобритания",
          russia: "Россия",
        },
      },
      footerTagline:
        "Одна технология · разные правовые системы · единая карта регулирования",
    },
  },
};
