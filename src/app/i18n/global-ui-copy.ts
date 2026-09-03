import uiCopy from "@/app/i18n/global-ui-copy.json";
import type { Locale } from "@/app/i18n/locale";

export const globalUiCopy = uiCopy;

export type CommonUiCopy = (typeof globalUiCopy.common)[Locale];
export type LearningUiCopy = (typeof globalUiCopy.learning)[Locale];
export type CompareUiCopy = (typeof globalUiCopy.compare)[Locale];
export type MethodologyStatusCopy =
  (typeof globalUiCopy.methodologyStatuses)[Locale];

/**
 * Russian is an interface locale, not a request to translate the underlying
 * regulatory analysis or source-native legal terminology. These overrides are
 * editorial Russian UI copy. Official legal terms remain in the source layer
 * and the analytical content remains English until separately reviewed.
 */
const russianCommon = {
  ...globalUiCopy.common.ru,
  deploy: "Сценарий",
  systemMap: "Система регулирования",
  compare: "Сравнить",
  learning: "Разобраться",
  methodology: "Метод",
  backToAtlas: "Вернуться в Atlas",
  scope: "Сфера применения",
  currentLawReview: "Проверено по действующему праву",
  regulatoryProfile: "Профиль юрисдикции",
  regulatorySnapshot: "Ключевые выводы",
  regulatoryArchitecture: "Правовая архитектура",
  deploymentAnswer: "Ответ для выбранного сценария",
  keyTakeaway: "Главный вывод",
  whatMeansDeployment: "Что это меняет для эксплуатации",
  deploymentQuestions: "Что проверить перед эксплуатацией",
  explain: "Пояснить",
  learnDeeper: "Разобрать подробнее",
  plainLanguage: "Простыми словами",
  whyMattersHere: "Почему это важно в этой юрисдикции",
  commonConfusion: "Что здесь часто путают",
  officialTerminology: "Официальные термины",
  atlasAnalysis: "Анализ Atlas",
  operationalSignificance: "Практическое значение",
  exactSource: "Официальный источник",
  compareJurisdictions: "Сравнить юрисдикции",
  contentAvailableEnglish:
    "Регуляторный анализ в Explorer пока ведётся на английском. Официальные юридические термины и первичные источники сохраняются на языке оригинала.",
  termsEnglishOnly:
    "Условия использования пока доступны только на английском языке.",
};

const russianMethodology = {
  ...globalUiCopy.methodologyStatuses.ru,
  established: "Подтверждено источниками",
  establishedLong: "Вывод подтверждён указанными официальными источниками",
  unclear: "Однозначного вывода нет",
  notIdentified: "Не выявлено",
  notIdentifiedLong:
    "В указанном объёме проверки специальное правило не выявлено",
  whyUnclear: "Почему нельзя сделать однозначный вывод",
  searchScope: "Что именно проверено",
  scopeFirst: "Сначала — сфера применения",
  permitted: "Допускается",
  conditional: "При соблюдении условий",
  experimentalOnly: "Только в экспериментальном режиме",
  required: "Требуется",
  notRequired: "Не требуется",
};

const russianLearning = {
  ...globalUiCopy.learning.ru,
  learningNavigation: "Раздел обучения",
  essentials: "Базовые понятия",
  applied: "Применение",
  deepDive: "Подробный разбор",
  standardsWatch: "Стандарты и изменения",
  knowledgeCheck: "Проверьте себя",
  showAnswer: "Показать ответ",
  hideAnswer: "Скрыть ответ",
  officialReferences: "Официальные источники",
  realCase: "Практический кейс",
  establishedFacts: "Установленные обстоятельства",
  authorityFindings: "Выводы компетентного органа",
  atlasRelevance: "Почему это важно для Atlas",
  notToConclude: "Какой вывод из этого делать нельзя",
  jurisdictionExamples: "Как это работает в разных юрисдикциях",
  relatedConcepts: "Связанные понятия",
  planned: "В разработке",
  startPath: "Начать",
  backToPath: "К разделу обучения",
  previous: "Назад",
  next: "Далее",
  footer:
    "Learning объясняет логику регулирования и доказательств, но не заменяет анализ права конкретной юрисдикции.",
};

const russianCompare = {
  ...globalUiCopy.compare.ru,
  eyebrow: "Сравнение юрисдикций",
  title: "Один сценарий — разные правовые архитектуры",
  intro:
    "Сравнивайте ответы на одни и те же регуляторные вопросы. Для каждого вывода отдельно видны сфера применения, степень определённости и конкретное правовое основание.",
  notIdentifiedBody:
    "В указанном объёме проверки официальных источников специальное правило не выявлено. Это не означает, что правила не существует.",
  unclearBody:
    "Доступные официальные источники не позволяют сделать однозначный вывод. Причина неопределённости остаётся видимой.",
  scopeFirstBody:
    "Любой статус нужно читать вместе со сферой применения: типом транспортного средства, автоматизацией, дорогой, сценарием и ролью человека.",
  swipe: "Проведите в сторону, чтобы сравнить юрисдикции",
  atlasInterpretation: "Анализ Atlas",
  footerLeft: "Сравнение действующего регулирования",
  footerRight:
    "Atlas предоставляет регуляторную информацию, а не юридическую консультацию",
};

export function getCommonUiCopy(locale: Locale): CommonUiCopy {
  return (locale === "ru" ? russianCommon : globalUiCopy.common[locale]) as CommonUiCopy;
}

export function getLearningUiCopy(locale: Locale): LearningUiCopy {
  return (locale === "ru" ? russianLearning : globalUiCopy.learning[locale]) as LearningUiCopy;
}

export function getCompareUiCopy(locale: Locale): CompareUiCopy {
  return (locale === "ru" ? russianCompare : globalUiCopy.compare[locale]) as CompareUiCopy;
}

export function getMethodologyStatusCopy(
  locale: Locale,
): MethodologyStatusCopy {
  return (locale === "ru"
    ? russianMethodology
    : globalUiCopy.methodologyStatuses[locale]) as MethodologyStatusCopy;
}

export function getNativeLocaleName(locale: Locale) {
  return globalUiCopy.localeNames[locale][locale];
}
