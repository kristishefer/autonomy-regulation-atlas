import Image from "next/image";
import Link from "next/link";

import type { LearningNote } from "@/app/explore/learning-concepts";

type ExplainProps = {
  note: LearningNote;
  title: string;
  deeperHref?: string;
  tone?: "light" | "dark";
};

export function ExplainDetails({
  note,
  title,
  deeperHref,
  tone = "light",
}: ExplainProps) {
  return (
    <details
      className={`group mt-6 border-t pt-4 ${tone === "dark" ? "border-white/15" : "border-[#b97512]/25"}`}
    >
      <summary
        className={`inline-flex cursor-pointer list-none items-center gap-2 rounded-sm text-sm font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-offset-4 ${
          tone === "dark"
            ? "text-[#f1c780] hover:text-[#9ce0d6] focus-visible:ring-[#9ce0d6] focus-visible:ring-offset-[#10264a]"
            : "text-[#8b5a10] hover:text-[#147c73] focus-visible:ring-[#147c73]"
        }`}
      >
          <span>Explain this concept</span>
          <span
            aria-hidden="true"
            className="text-lg font-normal leading-none transition-transform group-open:rotate-45"
          >
            +
          </span>
      </summary>

      <div className="mt-4 rounded-[22px] border border-[#b97512]/18 bg-[#fff8e8] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <Image
            alt=""
            aria-hidden="true"
            className="h-14 w-14 shrink-0 object-contain"
            height={112}
            src="/atlaslings/cat-explain.png"
            width={112}
          />
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a6513]">
              Cat explains
            </div>
            <div className="mt-1 font-serif text-lg font-semibold text-[#10264a]">
              {title}
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 text-[#10264a]/65">
          {note.plain}
        </p>
        <p className="mt-3 text-sm leading-6 text-[#10264a]/58">
          <strong className="text-[#10264a]/75">Why it matters here:</strong>{" "}
          {note.why}
        </p>
        <div className="mt-3 rounded-xl bg-[#f4ead3] p-3">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b5a10]">
            Common confusion
          </div>
          <p className="mt-1 text-sm leading-6 text-[#10264a]/65">
            {note.confusion}
          </p>
        </div>

        {deeperHref ? (
          <Link
            className="mt-4 inline-flex rounded-sm text-xs font-semibold text-[#147c73] underline decoration-[#147c73]/30 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-[#147c73] focus-visible:ring-offset-4"
            href={deeperHref}
          >
            Learn deeper in the System Map →
          </Link>
        ) : null}
      </div>
    </details>
  );
}

export function ExplainTooltip({
  note,
  title,
}: Pick<ExplainProps, "note" | "title">) {
  return (
    <div
      className="pointer-events-none invisible absolute left-3 right-3 top-[calc(100%+8px)] z-[80] translate-y-1 rounded-[20px] border border-[#b97512]/18 bg-[#fffaf0] p-4 opacity-0 shadow-[0_18px_45px_rgba(16,38,74,.16)] transition duration-150 group-hover/node:visible group-hover/node:translate-y-0 group-hover/node:opacity-100 group-focus-within/node:visible group-focus-within/node:translate-y-0 group-focus-within/node:opacity-100 sm:left-auto sm:right-0 sm:w-[360px]"
      role="tooltip"
    >
      <div className="flex items-start gap-3">
        <Image
          alt=""
          aria-hidden="true"
          className="h-14 w-14 shrink-0 object-contain"
          height={112}
          src="/atlaslings/cat-explain.png"
          width={112}
        />
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a6513]">
            Cat explains
          </div>
          <div className="mt-1 font-serif text-lg font-semibold">{title}</div>
        </div>
      </div>

      <p className="mt-3 text-xs leading-5 text-[#10264a]/65">{note.plain}</p>
      <div className="mt-3 border-t border-[#10264a]/8 pt-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#10264a]/55">
          Why it matters
        </div>
        <p className="mt-1 text-xs leading-5 text-[#10264a]/60">{note.why}</p>
      </div>
      <div className="mt-3 rounded-xl bg-[#f4ead3] p-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b5a10]">
          Common confusion
        </div>
        <p className="mt-1 text-xs leading-5 text-[#10264a]/65">
          {note.confusion}
        </p>
      </div>
      <div className="mt-3 text-[11px] font-semibold text-[#147c73]">
        Click the node to open the full regulatory detail.
      </div>
    </div>
  );
}
