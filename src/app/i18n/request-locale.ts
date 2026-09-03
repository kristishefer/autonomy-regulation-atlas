import "server-only";

import { headers } from "next/headers";

import {
  ATLAS_LOCALE_HEADER,
  normalizeLocale,
  type Locale,
} from "@/app/i18n/locale";

export async function getRequestLocale(): Promise<Locale> {
  return normalizeLocale((await headers()).get(ATLAS_LOCALE_HEADER));
}
