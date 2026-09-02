import type { ReactNode } from "react";

import { LearningShell } from "@/app/learn/LearningShell";

export default function LearnLayout({ children }: { children: ReactNode }) {
  return <LearningShell>{children}</LearningShell>;
}
