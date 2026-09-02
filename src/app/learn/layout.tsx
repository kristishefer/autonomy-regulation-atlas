import type { ReactNode } from "react";

import { LearningShell } from "@/app/learn/LearningShell";
import { getRequestLocale } from "@/app/i18n/request-locale";

export default async function LearnLayout({ children }: { children: ReactNode }) {
  const locale = await getRequestLocale();

  return <LearningShell locale={locale}>{children}</LearningShell>;
}
