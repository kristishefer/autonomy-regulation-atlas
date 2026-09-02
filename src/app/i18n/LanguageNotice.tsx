import { getCommonUiCopy } from "@/app/i18n/global-ui-copy";
import type { Locale } from "@/app/i18n/locale";

export function LanguageNotice({
  locale,
  variant = "analysis",
}: {
  locale: Locale;
  variant?: "analysis" | "terms";
}) {
  if (locale === "en") return null;

  const common = getCommonUiCopy(locale);
  const notice =
    variant === "terms"
      ? common.termsEnglishOnly
      : common.contentAvailableEnglish;

  return (
    <aside
      className="border-b border-[#10264a]/10 bg-[#fff8e8]"
      role="note"
    >
      <p className="mx-auto max-w-7xl px-5 py-3 text-xs leading-5 text-[#10264a]/65 sm:px-8 lg:px-10">
        {notice}
      </p>
    </aside>
  );
}
