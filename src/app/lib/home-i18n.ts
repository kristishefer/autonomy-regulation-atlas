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
  nav: { jurisdictions: string; learn: string; method: string };
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    line3: string;
    body: string;
    atlaslings: string;
  };
  modes: {
    title: string;
    deployKicker: string;
    deployTitle: string;
    deployBody: string;
    deployCta: string;
    exploreKicker: string;
    exploreTitle: string;
    exploreBody: string;
    exploreCta: string;
    learnKicker: string;
    learnTitle: string;
    learnBody: string;
    learnCta: string;
  };
  puzzles: { eyebrow: string; body: string };
  method: { eyebrow: string; title: string; steps: string[] };
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    nav: { jurisdictions: "Jurisdictions", learn: "Learn", method: "Method" },
    hero: {
      eyebrow: "Law × autonomy × real-world deployment",
      line1: "One technology.",
      line2: "Many legal worlds.",
      line3: "Atlas connects the pieces.",
      body: "Explore how autonomous systems move from technical capability to lawful operation — across jurisdictions, approvals, human roles, operating conditions and primary sources.",
      atlaslings: "Meet the Atlaslings",
    },
    modes: {
      title: "How do you want to use the Atlas?",
      deployKicker: "We want to deploy",
      deployTitle: "Find the route to lawful operation.",
      deployBody: "Start with your use case, choose a jurisdiction and see which regulatory gates stand between the system and the road.",
      deployCta: "Choose a market",
      exploreKicker: "I need the regulatory landscape",
      exploreTitle: "Explore how the legal pieces fit together.",
      exploreBody: "Move through jurisdictions, issues and sources. Compare how the same technology is treated by different legal systems.",
      exploreCta: "Explore the Atlas",
      learnKicker: "I want to learn",
      learnTitle: "Make sense of AV regulation through real puzzles.",
      learnBody: "Learn why type approval is not road access, who remains human in driverless operation and how market-access architecture works.",
      learnCta: "Start learning",
    },
    puzzles: {
      eyebrow: "Learn with Cat",
      body: "Counter-intuitive regulatory problems become structured learning paths grounded in real jurisdictions and sources.",
    },
    method: {
      eyebrow: "Source-backed by design",
      title: "Follow every conclusion back",
      steps: ["Source", "Legal interpretation", "Operational impact", "Exact traceability"],
    },
  },
  ru: {
    nav: { jurisdictions: "Юрисдикции", learn: "Обучение", method: "Методология" },
    hero: {
      eyebrow: "Право × автономность × реальный запуск",
      line1: "Одна технология.",
      line2: "Много правовых миров.",
      line3: "Atlas соединяет части.",
      body: "Исследуйте путь автономных систем от технической готовности до законной эксплуатации — через юрисдикции, допуски, человеческие роли, условия эксплуатации и первичные источники.",
      atlaslings: "Познакомьтесь с Atlaslings",
    },
    modes: {
      title: "Как вы хотите использовать Atlas?",
      deployKicker: "Мы хотим запускаться",
      deployTitle: "Найдите маршрут к законной эксплуатации.",
      deployBody: "Начните со своего сценария, выберите юрисдикцию и посмотрите, какие регуляторные барьеры отделяют систему от дороги.",
      deployCta: "Выбрать рынок",
      exploreKicker: "Мне нужна регуляторная картина",
      exploreTitle: "Исследуйте, как складываются правовые элементы.",
      exploreBody: "Переходите между юрисдикциями, вопросами и источниками и сравнивайте разные правовые системы.",
      exploreCta: "Исследовать Atlas",
      learnKicker: "Я хочу обучиться",
      learnTitle: "Разберитесь в AV regulation через реальные загадки.",
      learnBody: "Поймите, почему type approval не равен допуску на дорогу, какая роль остаётся у человека и как устроен market access.",
      learnCta: "Начать обучение",
    },
    puzzles: {
      eyebrow: "Учимся с Котом",
      body: "Неочевидные регуляторные проблемы превращаются в структурированные учебные маршруты на основе реальных юрисдикций и источников.",
    },
    method: {
      eyebrow: "Опора на источники",
      title: "Каждый вывод можно проследить до первоисточника",
      steps: ["Источник", "Юридическая интерпретация", "Операционный эффект", "Точная прослеживаемость"],
    },
  },
  fr: {
    nav: { jurisdictions: "Juridictions", learn: "Apprendre", method: "Méthode" },
    hero: {
      eyebrow: "Droit × autonomie × déploiement réel",
      line1: "Une technologie.",
      line2: "Plusieurs mondes juridiques.",
      line3: "Atlas relie les pièces.",
      body: "Explorez le passage des systèmes autonomes de la capacité technique à l’exploitation légale — entre juridictions, homologations, rôles humains, conditions d’exploitation et sources primaires.",
      atlaslings: "Découvrez les Atlaslings",
    },
    modes: {
      title: "Comment voulez-vous utiliser Atlas ?",
      deployKicker: "Nous voulons déployer",
      deployTitle: "Trouvez la route vers une exploitation légale.",
      deployBody: "Partez de votre cas d’usage, choisissez une juridiction et identifiez les étapes réglementaires entre le système et la route.",
      deployCta: "Choisir un marché",
      exploreKicker: "J’ai besoin du paysage réglementaire",
      exploreTitle: "Explorez la façon dont les pièces juridiques s’assemblent.",
      exploreBody: "Parcourez juridictions, questions et sources et comparez différents systèmes juridiques.",
      exploreCta: "Explorer Atlas",
      learnKicker: "Je veux apprendre",
      learnTitle: "Comprenez la réglementation AV grâce à de vrais puzzles.",
      learnBody: "Comprenez pourquoi l’homologation ne vaut pas accès à la route et comment fonctionnent les rôles humains et l’accès au marché.",
      learnCta: "Commencer à apprendre",
    },
    puzzles: {
      eyebrow: "Apprendre avec le Chat",
      body: "Les problèmes réglementaires contre-intuitifs deviennent des parcours d’apprentissage structurés, fondés sur des juridictions et des sources réelles.",
    },
    method: {
      eyebrow: "Fondé sur les sources",
      title: "Remontez chaque conclusion à sa source",
      steps: ["Source", "Interprétation juridique", "Impact opérationnel", "Traçabilité précise"],
    },
  },
  de: {
    nav: { jurisdictions: "Jurisdiktionen", learn: "Lernen", method: "Methode" },
    hero: {
      eyebrow: "Recht × Autonomie × realer Einsatz",
      line1: "Eine Technologie.",
      line2: "Viele Rechtswelten.",
      line3: "Atlas verbindet die Teile.",
      body: "Erkunden Sie, wie autonome Systeme von technischer Fähigkeit zu rechtmäßigem Betrieb gelangen — über Jurisdiktionen, Genehmigungen, menschliche Rollen, Betriebsbedingungen und Primärquellen.",
      atlaslings: "Die Atlaslings",
    },
    modes: {
      title: "Wie möchten Sie Atlas nutzen?",
      deployKicker: "Wir wollen deployen",
      deployTitle: "Finden Sie den Weg zum rechtmäßigen Betrieb.",
      deployBody: "Starten Sie mit Ihrem Use Case, wählen Sie eine Jurisdiktion und sehen Sie die regulatorischen Hürden zwischen System und Straße.",
      deployCta: "Markt wählen",
      exploreKicker: "Ich brauche die regulatorische Landschaft",
      exploreTitle: "Erkunden Sie, wie die rechtlichen Teile zusammenpassen.",
      exploreBody: "Navigieren Sie durch Jurisdiktionen, Themen und Quellen und vergleichen Sie unterschiedliche Rechtsordnungen.",
      exploreCta: "Atlas erkunden",
      learnKicker: "Ich möchte lernen",
      learnTitle: "Verstehen Sie AV-Regulierung anhand echter Puzzles.",
      learnBody: "Lernen Sie, warum Typgenehmigung nicht Straßenzugang bedeutet und wie menschliche Rollen und Marktzugang funktionieren.",
      learnCta: "Lernen starten",
    },
    puzzles: {
      eyebrow: "Lernen mit der Katze",
      body: "Kontraintuitive Regulierungsfragen werden zu strukturierten Lernpfaden mit realen Jurisdiktionen und Quellen.",
    },
    method: {
      eyebrow: "Quellenbasiert",
      title: "Verfolgen Sie jede Schlussfolgerung zurück",
      steps: ["Quelle", "Rechtliche Auslegung", "Operative Auswirkung", "Exakte Rückverfolgbarkeit"],
    },
  },
  nl: {
    nav: { jurisdictions: "Jurisdicties", learn: "Leren", method: "Methode" },
    hero: {
      eyebrow: "Recht × autonomie × inzet in de praktijk",
      line1: "Eén technologie.",
      line2: "Veel juridische werelden.",
      line3: "Atlas verbindt de stukken.",
      body: "Ontdek hoe autonome systemen van technische capaciteit naar rechtmatige inzet gaan — via jurisdicties, goedkeuringen, menselijke rollen, operationele voorwaarden en primaire bronnen.",
      atlaslings: "Maak kennis met de Atlaslings",
    },
    modes: {
      title: "Hoe wil je Atlas gebruiken?",
      deployKicker: "Wij willen implementeren",
      deployTitle: "Vind de route naar rechtmatige inzet.",
      deployBody: "Begin met je use case, kies een jurisdictie en zie welke regelgevingsstappen tussen het systeem en de weg staan.",
      deployCta: "Kies een markt",
      exploreKicker: "Ik heb het regelgevingslandschap nodig",
      exploreTitle: "Ontdek hoe de juridische stukken samenhangen.",
      exploreBody: "Navigeer door jurisdicties, onderwerpen en bronnen en vergelijk hoe dezelfde technologie juridisch wordt behandeld.",
      exploreCta: "Atlas verkennen",
      learnKicker: "Ik wil leren",
      learnTitle: "Begrijp AV-regelgeving via echte puzzels.",
      learnBody: "Leer waarom typegoedkeuring geen wegtoegang is en hoe menselijke rollen en markttoegang werken.",
      learnCta: "Begin met leren",
    },
    puzzles: {
      eyebrow: "Leren met de Kat",
      body: "Contra-intuïtieve regelgevingsproblemen worden gestructureerde leerpaden op basis van echte jurisdicties en bronnen.",
    },
    method: {
      eyebrow: "Brongebaseerd",
      title: "Volg elke conclusie terug naar de bron",
      steps: ["Bron", "Juridische interpretatie", "Operationele impact", "Exacte traceerbaarheid"],
    },
  },
  es: {
    nav: { jurisdictions: "Jurisdicciones", learn: "Aprender", method: "Método" },
    hero: {
      eyebrow: "Derecho × autonomía × despliegue real",
      line1: "Una tecnología.",
      line2: "Muchos mundos jurídicos.",
      line3: "Atlas conecta las piezas.",
      body: "Explora cómo los sistemas autónomos pasan de la capacidad técnica a la operación legal — entre jurisdicciones, homologaciones, roles humanos, condiciones operativas y fuentes primarias.",
      atlaslings: "Conoce a los Atlaslings",
    },
    modes: {
      title: "¿Cómo quieres utilizar Atlas?",
      deployKicker: "Queremos desplegar",
      deployTitle: "Encuentra la ruta hacia una operación legal.",
      deployBody: "Empieza con tu caso de uso, elige una jurisdicción y descubre qué pasos regulatorios separan el sistema de la carretera.",
      deployCta: "Elegir un mercado",
      exploreKicker: "Necesito el panorama regulatorio",
      exploreTitle: "Explora cómo encajan las piezas jurídicas.",
      exploreBody: "Navega por jurisdicciones, temas y fuentes y compara distintos sistemas jurídicos.",
      exploreCta: "Explorar Atlas",
      learnKicker: "Quiero aprender",
      learnTitle: "Comprende la regulación AV mediante puzzles reales.",
      learnBody: "Aprende por qué la homologación no equivale al acceso a la carretera y cómo funcionan los roles humanos y el acceso al mercado.",
      learnCta: "Empezar a aprender",
    },
    puzzles: {
      eyebrow: "Aprender con el Gato",
      body: "Los problemas regulatorios contraintuitivos se convierten en rutas de aprendizaje estructuradas basadas en jurisdicciones y fuentes reales.",
    },
    method: {
      eyebrow: "Basado en fuentes",
      title: "Rastrea cada conclusión hasta su origen",
      steps: ["Fuente", "Interpretación jurídica", "Impacto operativo", "Trazabilidad exacta"],
    },
  },
};

export function normalizeLocale(value: string | string[] | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return locales.includes(candidate as Locale) ? (candidate as Locale) : "en";
}
