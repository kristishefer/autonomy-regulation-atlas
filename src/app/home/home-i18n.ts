export const locales = ["en", "ru", "fr", "de", "nl", "es"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  fr: "FR",
  de: "DE",
  nl: "NL",
  es: "ES",
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
    statement: string;
    uncertainty: string;
    principles: [
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string },
      { title: string; body: string },
    ];
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
      title: "Built for regulatory clarity",
      body: "Atlas separates what a source says from how it is interpreted and what that interpretation changes for real-world operation. Primary sources remain in their original language.",
      steps: [
        "Source proposition",
        "Atlas legal interpretation",
        "Operational impact",
        "Exact source",
      ],
      statement: "The Atlas does not force legal uncertainty into a yes/no answer.",
      uncertainty: "Where the legal position cannot be established with sufficient confidence, the Atlas says Unclear or Not identified.",
      principles: [
        { title: "Source-traceable", body: "Material conclusions link back to the underlying legal authority." },
        { title: "Status-aware", body: "Current law is separated from proposals, future changes and interpretative materials." },
        { title: "Scenario-specific", body: "“Permitted” always refers to a defined regulatory scenario." },
        { title: "No false certainty", body: "Legal ambiguity remains visible instead of being forced into a category." },
      ],
    },
  },
  ru: {
    nav: {
      deploy: "Запуск",
      jurisdictions: "Юрисдикции",
      landscape: "Карта системы",
      learn: "Обучение",
      method: "Методология",
    },
    hero: {
      eyebrow: "Право × автономность × реальный запуск",
      line1: "Одна технология",
      line2: "Много правовых миров",
      line3: "Atlas соединяет части",
      body: "Исследуйте регуляторную систему автономной мобильности и применяйте анализ с опорой на источники к реальным вопросам запуска — через юрисдикции, разрешения, человеческие роли, условия эксплуатации и первичные источники.",
      atlaslings: "Познакомьтесь с Atlaslings",
      atlaslingsSub: "Три проводника. Одна регуляторная карта.",
    },
    modes: {
      title: "Как вы хотите использовать Atlas?",
      deployTitle: "Понять путь к запуску",
      deployBody: "Примените Atlas к реальному сценарию: какие уровни регулирования, разрешения, условия эксплуатации и нерешённые вопросы имеют значение.",
      deployCta: "Открыть Deploy",
      exploreTitle: "Исследовать регуляторную систему",
      exploreBody: "Изучайте юрисдикции, уровни регулирования, стандарты, институты и первичные источники — и смотрите, как они связаны.",
      exploreCta: "Открыть карту системы",
      learnTitle: "Понять, как связаны элементы",
      learnBody: "Разбирайтесь в регулировании автономной мобильности через понятия, задачи и реальные примеры из юрисдикций и источников.",
      learnCta: "Начать обучение",
    },
    map: {
      eyebrow: "Интерактивный Atlas",
      title: "Одна технология, разные правовые ответы",
      body: "Выберите маяк, чтобы открыть профиль юрисдикции. Координаты и статус покрытия поступают из базы данных Atlas.",
    },
    puzzle: {
      eyebrow: "Учимся с Котом",
      title: "Тип одобрен. Почему система не может просто выехать на дорогу?",
      body: "Одобрение продукта и разрешение на эксплуатацию на дорогах отвечают на разные правовые вопросы.",
      reveal: "Показать регуляторную связку",
      answer: "Одобрение типа может подтверждать соответствие транспортного средства или системы автоматизированного вождения применимому режиму одобрения продукта. Само по себе оно не решает все вопросы дорожного движения, оператора, разрешений или географии эксплуатации. Следующий уровень задаёт юрисдикция эксплуатации.",
      secondaryOne: "В кресле водителя никого нет. Исчез ли водитель как правовая роль?",
      secondaryOneConcept: "ADS · водитель · удалённый человек",
      secondaryTwo: "Удалённое вождение и удалённая помощь звучат похоже. Равны ли они юридически?",
      secondaryTwoConcept: "Удалённые операции",
    },
    method: {
      eyebrow: "Опора на источники",
      title: "Создан для регуляторной ясности",
      body: "Atlas отделяет содержание источника от юридической интерпретации и её операционного значения. Первичные источники остаются на языке оригинала.",
      steps: [
        "Положение источника",
        "Юридическая интерпретация Atlas",
        "Операционное значение",
        "Точный источник",
      ],
      statement: "Atlas не превращает правовую неопределённость в принудительный ответ «да» или «нет».",
      uncertainty: "Если правовую позицию нельзя установить с достаточной уверенностью, Atlas указывает «Неясно» или «Не выявлено».",
      principles: [
        { title: "Связь с источником", body: "Существенные выводы ведут к соответствующему правовому основанию." },
        { title: "Учёт статуса", body: "Действующее право отделено от предложений, будущих изменений и материалов толкования." },
        { title: "Конкретный сценарий", body: "Статус «Разрешено» всегда относится к определённому регуляторному сценарию." },
        { title: "Без ложной определённости", body: "Правовая неоднозначность остаётся видимой и не сводится к удобной категории." },
      ],
    },
  },
  fr: {
    nav: {
      deploy: "Déploiement",
      jurisdictions: "Juridictions",
      landscape: "Carte du système",
      learn: "Apprendre",
      method: "Méthode",
    },
    hero: {
      eyebrow: "Droit × autonomie × déploiement réel",
      line1: "Une technologie",
      line2: "Plusieurs mondes juridiques",
      line3: "Atlas relie les pièces",
      body: "Explorez le paysage réglementaire de la mobilité autonome et appliquez une analyse fondée sur les sources à des questions concrètes de déploiement — juridictions, autorisations, rôles humains, conditions d’exploitation et sources primaires.",
      atlaslings: "Découvrez les Atlaslings",
      atlaslingsSub: "Trois guides. Une carte réglementaire.",
    },
    modes: {
      title: "Comment voulez-vous utiliser Atlas ?",
      deployTitle: "Comprendre le parcours vers le déploiement",
      deployBody: "Appliquez Atlas à un scénario réel : identifiez les niveaux réglementaires, autorisations, conditions d’exploitation et questions non résolues qui comptent.",
      deployCta: "Ouvrir Deploy",
      exploreTitle: "Naviguer dans le paysage réglementaire",
      exploreBody: "Explorez les juridictions, niveaux réglementaires, normes, institutions et sources primaires — et voyez comment les pièces se relient.",
      exploreCta: "Ouvrir la carte du système",
      learnTitle: "Comprendre comment les pièces s’articulent",
      learnBody: "Apprenez la réglementation de la mobilité autonome à travers des concepts, des problèmes et des exemples réels fondés sur les juridictions et les sources.",
      learnCta: "Commencer à apprendre",
    },
    map: {
      eyebrow: "Atlas interactif",
      title: "Une même technologie, des réponses juridiques différentes",
      body: "Choisissez un repère pour ouvrir le profil d’une juridiction. Les positions et l’état de couverture proviennent de la base Atlas.",
    },
    puzzle: {
      eyebrow: "Apprendre avec le Chat",
      title: "Homologué. Pourquoi ne peut-il pas simplement circuler ?",
      body: "L’homologation d’un produit et l’autorisation de circuler sur la voie publique répondent à des questions juridiques différentes.",
      reveal: "Révéler l’articulation réglementaire",
      answer: "L’homologation peut établir qu’un véhicule ou un système de conduite automatisée satisfait à un régime applicable d’approbation du produit. Elle ne règle pas, à elle seule, toutes les conditions de circulation, d’opérateur, d’autorisation ou de zone de déploiement. La juridiction d’exploitation fournit ce niveau suivant.",
      secondaryOne: "Personne n’est au volant. Le conducteur juridique a-t-il disparu ?",
      secondaryOneConcept: "ADS · conducteur · humain à distance",
      secondaryTwo: "Conduite à distance et assistance à distance se ressemblent. Sont-elles juridiquement identiques ?",
      secondaryTwoConcept: "Opérations à distance",
    },
    method: {
      eyebrow: "Fondé sur les sources",
      title: "Conçu pour la clarté réglementaire",
      body: "Atlas sépare le contenu de la source, son interprétation juridique et son impact opérationnel. Les sources primaires restent dans leur langue originale.",
      steps: [
        "Proposition de la source",
        "Interprétation juridique Atlas",
        "Impact opérationnel",
        "Source exacte",
      ],
      statement: "Atlas ne force pas l’incertitude juridique dans une réponse oui/non.",
      uncertainty: "Lorsque la position juridique ne peut être établie avec une confiance suffisante, Atlas indique Incertain ou Non identifié.",
      principles: [
        { title: "Traçable à la source", body: "Les conclusions importantes renvoient à l’autorité juridique sous-jacente." },
        { title: "Sensible au statut", body: "Le droit en vigueur est séparé des propositions, changements futurs et documents interprétatifs." },
        { title: "Propre au scénario", body: "« Autorisé » renvoie toujours à un scénario réglementaire défini." },
        { title: "Sans fausse certitude", body: "L’ambiguïté juridique reste visible au lieu d’être forcée dans une catégorie." },
      ],
    },
  },
  de: {
    nav: {
      deploy: "Deployment",
      jurisdictions: "Jurisdiktionen",
      landscape: "Systemkarte",
      learn: "Lernen",
      method: "Methode",
    },
    hero: {
      eyebrow: "Recht × Autonomie × realer Einsatz",
      line1: "Eine Technologie",
      line2: "Viele Rechtswelten",
      line3: "Atlas verbindet die Teile",
      body: "Erkunden Sie die regulatorische Landschaft autonomer Mobilität und wenden Sie quellenbasierte Analyse auf reale Deployment-Fragen an — über Jurisdiktionen, Genehmigungen, menschliche Rollen, Betriebsbedingungen und Primärquellen hinweg.",
      atlaslings: "Die Atlaslings",
      atlaslingsSub: "Drei Guides. Eine regulatorische Karte.",
    },
    modes: {
      title: "Wie möchten Sie Atlas nutzen?",
      deployTitle: "Den Weg zum Deployment verstehen",
      deployBody: "Wenden Sie Atlas auf ein reales Szenario an: Welche regulatorischen Ebenen, Genehmigungen, Betriebsbedingungen und offenen Fragen sind relevant?",
      deployCta: "Deploy öffnen",
      exploreTitle: "Die regulatorische Landschaft navigieren",
      exploreBody: "Erkunden Sie Jurisdiktionen, regulatorische Ebenen, Standards, Institutionen und Primärquellen — und ihre Verbindungen.",
      exploreCta: "Systemkarte öffnen",
      learnTitle: "Verstehen, wie die Teile zusammenhängen",
      learnBody: "Lernen Sie die Regulierung autonomer Mobilität anhand von Konzepten, Problemen und realen Beispielen aus Jurisdiktionen und Quellen.",
      learnCta: "Lernen starten",
    },
    map: {
      eyebrow: "Interaktiver Atlas",
      title: "Dieselbe Technologie, unterschiedliche Rechtsantworten",
      body: "Wählen Sie einen Wegpunkt, um das Jurisdiktionsprofil zu öffnen. Positionen und Abdeckungsstatus stammen aus der Atlas-Datenbank.",
    },
    puzzle: {
      eyebrow: "Lernen mit der Katze",
      title: "Typgenehmigt. Warum darf es nicht einfach fahren?",
      body: "Produktgenehmigung und die Erlaubnis zum Betrieb auf öffentlichen Straßen beantworten unterschiedliche Rechtsfragen.",
      reveal: "Die regulatorische Verbindung zeigen",
      answer: "Eine Typgenehmigung kann belegen, dass ein Fahrzeug oder automatisiertes Fahrsystem ein anwendbares Produktgenehmigungsregime erfüllt. Sie klärt allein nicht sämtliche verkehrsrechtlichen, betreiberbezogenen, genehmigungsrechtlichen oder geografischen Bedingungen für den Einsatz. Diese nächste Ebene bestimmt die Einsatzjurisdiktion.",
      secondaryOne: "Niemand sitzt am Steuer. Ist die rechtliche Fahrerrolle verschwunden?",
      secondaryOneConcept: "ADS · Fahrer · Mensch aus der Ferne",
      secondaryTwo: "Fernsteuerung und Fernassistenz klingen ähnlich. Sind sie rechtlich gleich?",
      secondaryTwoConcept: "Remote Operations",
    },
    method: {
      eyebrow: "Quellenbasiert",
      title: "Für regulatorische Klarheit entwickelt",
      body: "Atlas trennt Quellenaussage, rechtliche Auslegung und operative Auswirkung. Primärquellen bleiben in ihrer Originalsprache.",
      steps: [
        "Quellenaussage",
        "Rechtliche Atlas-Auslegung",
        "Operative Auswirkung",
        "Exakte Quelle",
      ],
      statement: "Atlas zwingt rechtliche Unsicherheit nicht in eine Ja/Nein-Antwort.",
      uncertainty: "Lässt sich die Rechtslage nicht mit ausreichender Sicherheit bestimmen, weist Atlas sie als Unklar oder Nicht identifiziert aus.",
      principles: [
        { title: "Quellennachweis", body: "Wesentliche Schlussfolgerungen führen zur zugrunde liegenden Rechtsquelle." },
        { title: "Statusbewusst", body: "Geltendes Recht wird von Vorschlägen, künftigen Änderungen und Auslegungsmaterial getrennt." },
        { title: "Szenariobezogen", body: "„Zulässig“ bezieht sich immer auf ein definiertes regulatorisches Szenario." },
        { title: "Keine Scheinsicherheit", body: "Rechtliche Mehrdeutigkeit bleibt sichtbar, statt in eine Kategorie gezwungen zu werden." },
      ],
    },
  },
  nl: {
    nav: {
      deploy: "Deployment",
      jurisdictions: "Jurisdicties",
      landscape: "Systeemkaart",
      learn: "Leren",
      method: "Methode",
    },
    hero: {
      eyebrow: "Recht × autonomie × inzet in de praktijk",
      line1: "Eén technologie",
      line2: "Veel juridische werelden",
      line3: "Atlas verbindt de stukken",
      body: "Verken het regelgevingslandschap voor autonome mobiliteit en pas brongebaseerde analyse toe op concrete deploymentvragen — over jurisdicties, goedkeuringen, menselijke rollen, operationele voorwaarden en primaire bronnen.",
      atlaslings: "Maak kennis met de Atlaslings",
      atlaslingsSub: "Drie gidsen. Eén regelgevingskaart.",
    },
    modes: {
      title: "Hoe wil je Atlas gebruiken?",
      deployTitle: "Begrijp het pad naar deployment",
      deployBody: "Pas Atlas toe op een echt scenario: zie welke regelgevingslagen, goedkeuringen, operationele voorwaarden en open vragen relevant zijn.",
      deployCta: "Open Deploy",
      exploreTitle: "Navigeer door het regelgevingslandschap",
      exploreBody: "Verken jurisdicties, regelgevingslagen, normen, instellingen en primaire bronnen — en zie hoe de onderdelen samenhangen.",
      exploreCta: "Systeemkaart openen",
      learnTitle: "Begrijp hoe de onderdelen samenhangen",
      learnBody: "Leer regelgeving voor autonome mobiliteit via concepten, vraagstukken en echte voorbeelden uit jurisdicties en bronnen.",
      learnCta: "Begin met leren",
    },
    map: {
      eyebrow: "Interactieve Atlas",
      title: "Dezelfde technologie, andere juridische antwoorden",
      body: "Kies een baken om het jurisdictieprofiel te openen. Locaties en dekkingsstatus komen uit de Atlas-database.",
    },
    puzzle: {
      eyebrow: "Leren met de Kat",
      title: "Typegoedgekeurd. Waarom kan het niet gewoon rijden?",
      body: "Productgoedkeuring en toestemming om op de openbare weg te rijden beantwoorden verschillende juridische vragen.",
      reveal: "Toon de regelgevende schakel",
      answer: "Typegoedkeuring kan aantonen dat een voertuig of geautomatiseerd rijsysteem aan een toepasselijk productgoedkeuringsregime voldoet. Daarmee zijn niet automatisch alle verkeers-, operator-, vergunnings- of geografische voorwaarden voor inzet vastgesteld. De operationele jurisdictie levert die volgende laag.",
      secondaryOne: "Niemand zit achter het stuur. Is de juridische bestuurder verdwenen?",
      secondaryOneConcept: "ADS · bestuurder · mens op afstand",
      secondaryTwo: "Besturen op afstand en assistentie op afstand klinken hetzelfde. Zijn ze juridisch gelijk?",
      secondaryTwoConcept: "Operaties op afstand",
    },
    method: {
      eyebrow: "Brongebaseerd",
      title: "Gebouwd voor regelgevingsduidelijkheid",
      body: "Atlas scheidt de bronstelling, juridische interpretatie en operationele impact. Primaire bronnen blijven in hun oorspronkelijke taal.",
      steps: [
        "Bronstelling",
        "Juridische Atlas-interpretatie",
        "Operationele impact",
        "Exacte bron",
      ],
      statement: "Atlas dwingt juridische onzekerheid niet in een ja/nee-antwoord.",
      uncertainty: "Wanneer de juridische positie niet met voldoende zekerheid kan worden vastgesteld, vermeldt Atlas Onduidelijk of Niet geïdentificeerd.",
      principles: [
        { title: "Herleidbaar tot de bron", body: "Materiële conclusies verwijzen naar de onderliggende juridische autoriteit." },
        { title: "Statusbewust", body: "Geldend recht staat los van voorstellen, toekomstige wijzigingen en interpretatief materiaal." },
        { title: "Scenariospecifiek", body: "‘Toegestaan’ verwijst altijd naar een bepaald regelgevingsscenario." },
        { title: "Geen schijnzekerheid", body: "Juridische dubbelzinnigheid blijft zichtbaar en wordt niet in een categorie gedwongen." },
      ],
    },
  },
  es: {
    nav: {
      deploy: "Despliegue",
      jurisdictions: "Jurisdicciones",
      landscape: "Mapa del sistema",
      learn: "Aprender",
      method: "Método",
    },
    hero: {
      eyebrow: "Derecho × autonomía × despliegue real",
      line1: "Una tecnología",
      line2: "Muchos mundos jurídicos",
      line3: "Atlas conecta las piezas",
      body: "Explora el panorama regulatorio de la movilidad autónoma y aplica un análisis basado en fuentes a preguntas reales de despliegue — entre jurisdicciones, homologaciones, roles humanos, condiciones operativas y fuentes primarias.",
      atlaslings: "Conoce a los Atlaslings",
      atlaslingsSub: "Tres guías. Un mapa regulatorio.",
    },
    modes: {
      title: "¿Cómo quieres utilizar Atlas?",
      deployTitle: "Entender el camino hacia el despliegue",
      deployBody: "Aplica Atlas a un escenario real: identifica las capas regulatorias, autorizaciones, condiciones operativas y preguntas abiertas que importan.",
      deployCta: "Abrir Deploy",
      exploreTitle: "Navegar por el panorama regulatorio",
      exploreBody: "Explora jurisdicciones, capas regulatorias, normas, instituciones y fuentes primarias — y observa cómo se conectan.",
      exploreCta: "Abrir el mapa del sistema",
      learnTitle: "Entender cómo encajan las piezas",
      learnBody: "Aprende regulación de movilidad autónoma mediante conceptos, problemas y ejemplos reales basados en jurisdicciones y fuentes.",
      learnCta: "Empezar a aprender",
    },
    map: {
      eyebrow: "Atlas interactivo",
      title: "La misma tecnología, respuestas jurídicas diferentes",
      body: "Elige un punto para abrir el perfil de la jurisdicción. Las ubicaciones y el estado de cobertura proceden de la base de datos Atlas.",
    },
    puzzle: {
      eyebrow: "Aprender con el Gato",
      title: "Homologado. ¿Por qué no puede simplemente circular?",
      body: "La homologación del producto y el permiso para operar en vías públicas responden a preguntas jurídicas diferentes.",
      reveal: "Mostrar la conexión regulatoria",
      answer: "La homologación puede establecer que un vehículo o sistema de conducción automatizada cumple un régimen aplicable de aprobación del producto. Por sí sola no resuelve todas las condiciones de tráfico, operador, autorización o ámbito geográfico del despliegue. La jurisdicción operativa aporta esa siguiente capa.",
      secondaryOne: "No hay nadie al volante. ¿Desapareció el conductor jurídico?",
      secondaryOneConcept: "ADS · conductor · humano remoto",
      secondaryTwo: "La conducción remota y la asistencia remota suenan parecidas. ¿Son jurídicamente iguales?",
      secondaryTwoConcept: "Operaciones remotas",
    },
    method: {
      eyebrow: "Basado en fuentes",
      title: "Diseñado para la claridad regulatoria",
      body: "Atlas separa la proposición de la fuente, la interpretación jurídica y el impacto operativo. Las fuentes primarias permanecen en su idioma original.",
      steps: [
        "Proposición de la fuente",
        "Interpretación jurídica de Atlas",
        "Impacto operativo",
        "Fuente exacta",
      ],
      statement: "Atlas no fuerza la incertidumbre jurídica a una respuesta de sí o no.",
      uncertainty: "Cuando la posición jurídica no puede establecerse con suficiente confianza, Atlas indica No está claro o No identificado.",
      principles: [
        { title: "Trazable a la fuente", body: "Las conclusiones sustantivas enlazan con la autoridad jurídica subyacente." },
        { title: "Consciente del estado", body: "El derecho vigente se separa de propuestas, cambios futuros y materiales interpretativos." },
        { title: "Específico del escenario", body: "«Permitido» siempre se refiere a un escenario regulatorio definido." },
        { title: "Sin falsa certeza", body: "La ambigüedad jurídica permanece visible en vez de forzarse en una categoría." },
      ],
    },
  },
};

export function normalizeLocale(
  value: string | string[] | undefined,
): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return locales.includes(candidate as Locale) ? (candidate as Locale) : "en";
}
