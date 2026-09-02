import uiCopy from "@/app/i18n/global-ui-copy.json";
import type { Locale } from "@/app/i18n/locale";

export const globalUiCopy = uiCopy;

export type CommonUiCopy = (typeof globalUiCopy.common)[Locale];
export type LearningUiCopy = (typeof globalUiCopy.learning)[Locale];
export type CompareUiCopy = (typeof globalUiCopy.compare)[Locale];
export type MethodologyStatusCopy =
  (typeof globalUiCopy.methodologyStatuses)[Locale];

export function getCommonUiCopy(locale: Locale): CommonUiCopy {
  return globalUiCopy.common[locale];
}

export function getLearningUiCopy(locale: Locale): LearningUiCopy {
  return globalUiCopy.learning[locale];
}

export function getCompareUiCopy(locale: Locale): CompareUiCopy {
  return globalUiCopy.compare[locale];
}

export function getMethodologyStatusCopy(
  locale: Locale,
): MethodologyStatusCopy {
  return globalUiCopy.methodologyStatuses[locale];
}

export function getNativeLocaleName(locale: Locale) {
  return globalUiCopy.localeNames[locale][locale];
}
