import type { Locale } from "@/app/i18n/locale";

export type HomeQuestionDemoCopy = {
  eyebrow: string;
  title: string;
  body: string;
  questionsLabel: string;
  previewLabel: string;
  layersLabel: string;
  questions: [
    { label: string; frame: string },
    { label: string; frame: string },
    { label: string; frame: string },
    { label: string; frame: string },
  ];
  layers: Array<{
    id: "jurisdictions" | "compare" | "system-map" | "sources";
    label: string;
    body: string;
    linkLabel: string;
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
  easterEgg: {
    ariaLabel: string;
    intro: string;
    dog: string;
    fox: string;
    cat: string;
    cloud: string;
    cloudLabel: string;
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
      title: "From question to a traceable answer",
      body: "Start with a real deployment question. Atlas exposes the legal gateway, system relationships, cross-jurisdiction differences and the exact evidence behind the conclusion.",
      questionsLabel: "Choose a regulatory question",
      previewLabel: "Selected question",
      layersLabel: "The Atlas research route",
      questions: [
        {
          label: "Can it operate without a driver?",
          frame: "Driverless capability is only the starting fact. Atlas identifies the legal gateway for road use, the authorized operating domain, every legally relevant human role and the evidence supporting the answer.",
        },
        {
          label: "What approval is required?",
          frame: "“Approval” can refer to different legal objects. Atlas separates product or type approval from testing permission, road-use authorization, registration and any permission required for the service itself.",
        },
        {
          label: "Who remains legally responsible?",
          frame: "Responsibility is mapped actor by actor and event by event. Atlas distinguishes the owner or holder, manufacturer, permit holder, driver and remote human roles instead of collapsing them into a generic operator.",
        },
        {
          label: "What happens after an incident?",
          frame: "An incident opens several separate questions: immediate operational duties, notification and reporting, evidence preservation, regulatory consequences and potential liability.",
        },
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Jurisdictions",
          body: "Identify the applicable legal route, official terminology, territorial scope and whether it governs testing or operation.",
          linkLabel: "Inspect legal gateways",
        },
        {
          id: "system-map",
          label: "System Map",
          body: "Connect the approval object, operating conditions, human roles, responsible actors and fallback duties.",
          linkLabel: "Map the regulatory system",
        },
        {
          id: "compare",
          label: "Compare",
          body: "Test the same question without treating different approvals, operating domains or human roles as equivalent.",
          linkLabel: "Test non-equivalence",
        },
        {
          id: "sources",
          label: "Sources",
          body: "Resolve every material conclusion to the exact provision, legal status, source language and review date.",
          linkLabel: "Verify the evidence chain",
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
    easterEgg: {
      ariaLabel: "Hidden notes",
      intro: "Four signatures are hidden in the Atlas.",
      dog: "For the one who finds a way through the hard problems.",
      fox: "For the one who makes the difficult road feel lighter.",
      cat: "For the one who turns complexity into structure.",
      cloud: "For the one who made the path possible.",
      cloudLabel: "Cloud",
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
      title: "Von der Frage zur belegbaren Antwort",
      body:
        "Beginnen Sie mit einer realen Einsatzfrage. Atlas legt den Rechtsweg, die Systemzusammenhänge, die Unterschiede zwischen Rechtsordnungen und die genauen Belege für die Schlussfolgerung offen.",
      questionsLabel: "Regulatorische Frage auswählen",
      previewLabel: "Ausgewählte Frage",
      layersLabel: "Der Rechercheweg im Atlas",
      questions: [
        {
          label: "Kann das System ohne Fahrer betrieben werden?",
          frame: "Technische Fahrerlosigkeit ist nur der Ausgangspunkt. Atlas ermittelt den Rechtsweg für die Straßennutzung, den genehmigten Betriebsbereich, jede rechtlich relevante menschliche Rolle und die Belege für die Antwort.",
        },
        {
          label: "Welche Genehmigung ist erforderlich?",
          frame: "„Genehmigung“ kann unterschiedliche Rechtsobjekte bezeichnen. Atlas trennt Produkt- oder Typgenehmigung von Erprobungserlaubnis, Erlaubnis zur Straßennutzung, Zulassung und einer etwaigen Genehmigung der Dienstleistung.",
        },
        {
          label: "Wer bleibt rechtlich verantwortlich?",
          frame: "Verantwortung wird nach Akteur und Ereignis zugeordnet. Atlas unterscheidet Halter, Hersteller, Genehmigungsinhaber, Fahrer und Remote-Rollen, statt sie unter einem allgemeinen „Betreiber“ zusammenzufassen.",
        },
        {
          label: "Was geschieht nach einem Vorfall?",
          frame: "Ein Vorfall löst mehrere getrennte Fragen aus: unmittelbare betriebliche Pflichten, Meldung und Berichterstattung, Beweissicherung, regulatorische Folgen und mögliche Haftung.",
        },
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Rechtsordnungen",
          body:
            "Ermitteln Sie den anwendbaren Rechtsweg, die amtliche Terminologie, den räumlichen Geltungsbereich und ob er Erprobung oder Betrieb betrifft.",
          linkLabel: "Rechtswege prüfen",
        },
        {
          id: "system-map",
          label: "Systemkarte",
          body:
            "Verbinden Sie Genehmigungsgegenstand, Betriebsbedingungen, menschliche Rollen, verantwortliche Akteure und Rückfallpflichten.",
          linkLabel: "Regulierungssystem abbilden",
        },
        {
          id: "compare",
          label: "Vergleich",
          body:
            "Vergleichen Sie dieselbe Frage, ohne unterschiedliche Genehmigungen, Betriebsbereiche oder menschliche Rollen gleichzusetzen.",
          linkLabel: "Nichtgleichwertigkeit prüfen",
        },
        {
          id: "sources",
          label: "Quellen",
          body:
            "Führen Sie jede wesentliche Schlussfolgerung auf genaue Vorschrift, Rechtsstatus, Ausgangssprache und Prüfdaten zurück.",
          linkLabel: "Belegkette prüfen",
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
    easterEgg: {
      ariaLabel: "Verborgene Notizen",
      intro: "Vier Signaturen sind im Atlas verborgen.",
      dog: "Für den Menschen, der einen Weg durch die schwierigsten Probleme findet.",
      fox: "Für den Menschen, der schwierige Wege leichter macht.",
      cat: "Für den Menschen, der aus Komplexität Struktur entstehen lässt.",
      cloud: "Für den Menschen, der diesen Weg möglich gemacht hat.",
      cloudLabel: "Wolke",
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
      title: "Van vraag naar herleidbaar antwoord",
      body:
        "Begin met een echte implementatievraag. Atlas maakt de juridische route, de systeemrelaties, de verschillen tussen jurisdicties en het precieze bewijs achter de conclusie zichtbaar.",
      questionsLabel: "Kies een regelgevingsvraag",
      previewLabel: "Geselecteerde vraag",
      layersLabel: "De onderzoeksroute van Atlas",
      questions: [
        {
          label: "Kan het systeem zonder bestuurder worden ingezet?",
          frame: "Bestuurderloze technische capaciteit is slechts het beginpunt. Atlas bepaalt de juridische route voor weggebruik, het toegestane operationele gebied, elke juridisch relevante menselijke rol en het bewijs voor het antwoord.",
        },
        {
          label: "Welke goedkeuring is vereist?",
          frame: "‘Goedkeuring’ kan naar verschillende juridische objecten verwijzen. Atlas scheidt product- of typegoedkeuring van testtoestemming, toestemming voor weggebruik, registratie en eventuele toestemming voor de dienst zelf.",
        },
        {
          label: "Wie blijft juridisch verantwoordelijk?",
          frame: "Verantwoordelijkheid wordt per actor en per gebeurtenis in kaart gebracht. Atlas onderscheidt eigenaar of houder, fabrikant, vergunninghouder, bestuurder en menselijke rollen op afstand, in plaats van ze samen te voegen tot één generieke operator.",
        },
        {
          label: "Wat gebeurt er na een incident?",
          frame: "Een incident opent meerdere afzonderlijke vragen: directe operationele plichten, melding en rapportage, bewaring van bewijs, gevolgen voor de vergunning en mogelijke aansprakelijkheid.",
        },
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Jurisdicties",
          body:
            "Bepaal de toepasselijke juridische route, officiële terminologie, territoriale reikwijdte en of deze testen of operationeel gebruik regelt.",
          linkLabel: "Juridische routes bekijken",
        },
        {
          id: "system-map",
          label: "Systeemkaart",
          body:
            "Verbind het goedkeuringsobject, de operationele voorwaarden, menselijke rollen, verantwoordelijke actoren en fallback-plichten.",
          linkLabel: "Regelgevingssysteem uitwerken",
        },
        {
          id: "compare",
          label: "Vergelijken",
          body:
            "Toets dezelfde vraag zonder verschillende goedkeuringen, operationele gebieden of menselijke rollen als gelijkwaardig te behandelen.",
          linkLabel: "Niet-gelijkwaardigheid toetsen",
        },
        {
          id: "sources",
          label: "Bronnen",
          body:
            "Herleid elke materiële conclusie tot de exacte bepaling, juridische status, brontaal en controledatum.",
          linkLabel: "Bewijsketen controleren",
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
    easterEgg: {
      ariaLabel: "Verborgen notities",
      intro: "Vier signaturen zijn in de Atlas verborgen.",
      dog: "Voor degene die een weg vindt door de moeilijkste problemen.",
      fox: "Voor degene die een moeilijke weg lichter maakt.",
      cat: "Voor degene die complexiteit omzet in structuur.",
      cloud: "Voor degene die het pad mogelijk heeft gemaakt.",
      cloudLabel: "Wolk",
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
      title: "От вопроса — к проверяемому выводу",
      body:
        "Начните с реального вопроса о запуске. Atlas показывает правовой механизм, системные связи, различия между юрисдикциями и точные основания итогового вывода.",
      questionsLabel: "Выберите регуляторный вопрос",
      previewLabel: "Выбранный вопрос",
      layersLabel: "Маршрут исследования в Atlas",
      questions: [
        {
          label: "Может ли система работать без водителя?",
          frame: "Техническая возможность движения без водителя — только исходный факт. Atlas определяет правовой механизм допуска к дорогам, разрешённую территорию эксплуатации, каждую юридически значимую человеческую роль и доказательства для ответа.",
        },
        {
          label: "Какое разрешение требуется?",
          frame: "Слово «разрешение» может обозначать разные правовые объекты. Atlas отделяет одобрение продукции или типа от разрешения на испытания, допуска к дорогам, регистрации и отдельного разрешения на оказание услуги.",
        },
        {
          label: "Кто сохраняет юридическую ответственность?",
          frame: "Ответственность исследуется отдельно для каждого участника и каждого события. Atlas различает собственника или владельца, изготовителя, держателя разрешения, водителя и дистанционные человеческие роли, не объединяя их в абстрактного «оператора».",
        },
        {
          label: "Что происходит после инцидента?",
          frame: "Инцидент запускает несколько отдельных вопросов: немедленные эксплуатационные обязанности, уведомление и отчётность, сохранение доказательств, регуляторные последствия и возможная ответственность.",
        },
      ],
      layers: [
        {
          id: "jurisdictions",
          label: "Юрисдикции",
          body:
            "Определите применимый правовой механизм, официальную терминологию, территориальный охват и относится ли режим к испытаниям или эксплуатации.",
          linkLabel: "Проверить правовые механизмы",
        },
        {
          id: "system-map",
          label: "Системная карта",
          body:
            "Свяжите объект разрешения, условия эксплуатации, человеческие роли, ответственных участников и обязанности при отказе системы.",
          linkLabel: "Собрать регуляторную систему",
        },
        {
          id: "compare",
          label: "Сравнение",
          body:
            "Сопоставьте один вопрос, не признавая автоматически эквивалентными разные разрешения, территории эксплуатации и человеческие роли.",
          linkLabel: "Проверить неэквивалентность",
        },
        {
          id: "sources",
          label: "Источники",
          body:
            "Свяжите каждый существенный вывод с точным положением, юридическим статусом, языком источника и датой проверки.",
          linkLabel: "Проверить цепочку оснований",
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
    easterEgg: {
      ariaLabel: "Скрытые заметки",
      intro: "В Atlas скрыты четыре подписи.",
      dog: "Для того, кто находит путь сквозь самые трудные задачи.",
      fox: "Для того, кто делает трудный путь легче.",
      cat: "Для того, кто превращает сложность в структуру.",
      cloud: "Для того, кто сделал этот путь возможным.",
      cloudLabel: "Облако",
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
