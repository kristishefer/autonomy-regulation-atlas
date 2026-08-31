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
      body: "Explore how autonomous systems move from technical capability to lawful operation — across jurisdictions, approvals, human roles, operating conditions and primary sources.",
      atlaslings: "Meet the Atlaslings",
      atlaslingsSub: "Three guides. One regulatory map.",
    },
    modes: {
      title: "How do you want to use the Atlas?",
      deployTitle: "We want to deploy",
      deployBody: "Start with your use case, choose a jurisdiction and see which regulatory gates stand between the system and the road.",
      deployCta: "Plan a deployment",
      exploreTitle: "I need the regulatory landscape",
      exploreBody: "Move through standards, institutions and legal regimes to see how the regulatory pieces fit together.",
      exploreCta: "Open the System Map",
      learnTitle: "I want to learn",
      learnBody: "Make sense of autonomous-vehicle regulation through real puzzles grounded in jurisdictions and sources.",
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
      body: "Исследуйте путь автономных систем от технической готовности до законной эксплуатации — через юрисдикции, допуски, человеческие роли, условия эксплуатации и первичные источники.",
      atlaslings: "Познакомьтесь с Atlaslings",
      atlaslingsSub: "Три проводника. Одна регуляторная карта.",
    },
    modes: {
      title: "Как вы хотите использовать Atlas?",
      deployTitle: "Мы хотим запускаться",
      deployBody: "Начните со своего сценария, выберите юрисдикцию и посмотрите, какие регуляторные этапы отделяют систему от дороги.",
      deployCta: "Спланировать запуск",
      exploreTitle: "Мне нужна регуляторная картина",
      exploreBody: "Исследуйте стандарты, институты и правовые режимы, чтобы увидеть, как связаны элементы регулирования.",
      exploreCta: "Открыть карту системы",
      learnTitle: "Я хочу учиться",
      learnBody: "Разбирайтесь в регулировании автономного транспорта через реальные задачи, юрисдикции и источники.",
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
      body: "Explorez le passage des systèmes autonomes de la capacité technique à l’exploitation légale — entre juridictions, homologations, rôles humains, conditions d’exploitation et sources primaires.",
      atlaslings: "Découvrez les Atlaslings",
      atlaslingsSub: "Trois guides. Une carte réglementaire.",
    },
    modes: {
      title: "Comment voulez-vous utiliser Atlas ?",
      deployTitle: "Nous voulons déployer",
      deployBody: "Partez de votre cas d’usage, choisissez une juridiction et identifiez les étapes réglementaires entre le système et la route.",
      deployCta: "Planifier un déploiement",
      exploreTitle: "J’ai besoin du paysage réglementaire",
      exploreBody: "Parcourez les normes, institutions et régimes juridiques pour voir comment les pièces réglementaires s’assemblent.",
      exploreCta: "Ouvrir la carte du système",
      learnTitle: "Je veux apprendre",
      learnBody: "Comprenez la réglementation des véhicules autonomes grâce à des problèmes réels fondés sur des juridictions et des sources.",
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
      body: "Erkunden Sie, wie autonome Systeme von technischer Fähigkeit zu rechtmäßigem Betrieb gelangen — über Jurisdiktionen, Genehmigungen, menschliche Rollen, Betriebsbedingungen und Primärquellen.",
      atlaslings: "Die Atlaslings",
      atlaslingsSub: "Drei Guides. Eine regulatorische Karte.",
    },
    modes: {
      title: "Wie möchten Sie Atlas nutzen?",
      deployTitle: "Wir wollen deployen",
      deployBody: "Starten Sie mit Ihrem Use Case, wählen Sie eine Jurisdiktion und sehen Sie, welche regulatorischen Schritte zwischen System und Straße liegen.",
      deployCta: "Deployment planen",
      exploreTitle: "Ich brauche die regulatorische Landschaft",
      exploreBody: "Navigieren Sie durch Normen, Institutionen und Rechtsordnungen, um ihre regulatorischen Verbindungen zu verstehen.",
      exploreCta: "Systemkarte öffnen",
      learnTitle: "Ich möchte lernen",
      learnBody: "Verstehen Sie die Regulierung automatisierter Fahrzeuge anhand realer Probleme, Jurisdiktionen und Quellen.",
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
      body: "Ontdek hoe autonome systemen van technische capaciteit naar rechtmatige inzet gaan — via jurisdicties, goedkeuringen, menselijke rollen, operationele voorwaarden en primaire bronnen.",
      atlaslings: "Maak kennis met de Atlaslings",
      atlaslingsSub: "Drie gidsen. Eén regelgevingskaart.",
    },
    modes: {
      title: "Hoe wil je Atlas gebruiken?",
      deployTitle: "Wij willen implementeren",
      deployBody: "Begin met je use case, kies een jurisdictie en zie welke regelgevingsstappen tussen het systeem en de weg staan.",
      deployCta: "Deployment plannen",
      exploreTitle: "Ik heb het regelgevingslandschap nodig",
      exploreBody: "Navigeer door normen, instellingen en rechtsstelsels om te zien hoe de regelgevingsstukken samenhangen.",
      exploreCta: "Systeemkaart openen",
      learnTitle: "Ik wil leren",
      learnBody: "Begrijp de regelgeving voor autonome voertuigen via echte problemen, jurisdicties en bronnen.",
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
      body: "Explora cómo los sistemas autónomos pasan de la capacidad técnica a la operación legal — entre jurisdicciones, homologaciones, roles humanos, condiciones operativas y fuentes primarias.",
      atlaslings: "Conoce a los Atlaslings",
      atlaslingsSub: "Tres guías. Un mapa regulatorio.",
    },
    modes: {
      title: "¿Cómo quieres utilizar Atlas?",
      deployTitle: "Queremos desplegar",
      deployBody: "Empieza con tu caso de uso, elige una jurisdicción y descubre qué pasos regulatorios separan el sistema de la carretera.",
      deployCta: "Planificar un despliegue",
      exploreTitle: "Necesito el panorama regulatorio",
      exploreBody: "Navega por normas, instituciones y regímenes jurídicos para ver cómo se conectan las piezas regulatorias.",
      exploreCta: "Abrir el mapa del sistema",
      learnTitle: "Quiero aprender",
      learnBody: "Comprende la regulación de vehículos autónomos mediante problemas reales, jurisdicciones y fuentes.",
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
