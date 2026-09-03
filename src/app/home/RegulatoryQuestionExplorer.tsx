"use client";

import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

import type { HomeQuestionDemoCopy } from "@/app/home/home-i18n";

const layerHrefs: Record<
  HomeQuestionDemoCopy["layers"][number]["id"],
  string | null
> = {
  jurisdictions: "/#map",
  compare: "/explore/compare",
  "system-map": "/explore/system-map",
  sources: null,
};

export function RegulatoryQuestionExplorer({
  copy,
}: {
  copy: HomeQuestionDemoCopy;
}) {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(0);
  const questionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const hasSelected = useRef(false);
  const hasSelectedQuestion = useRef(false);
  const selectedQuestion = copy.questions[selectedQuestionIndex] ?? copy.questions[0];
  const selectedLayer = copy.layers[selectedLayerIndex] ?? copy.layers[0];

  useEffect(() => {
    if (!hasSelected.current) {
      hasSelected.current = true;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const preview = previewRef.current;
    if (!preview) return;

    preview.getAnimations().forEach((animation) => animation.cancel());
    preview.animate(
      [
        { opacity: 0.45, transform: "translateX(8px)" },
        { opacity: 1, transform: "translateX(0)" },
      ],
      {
        duration: 280,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  }, [selectedLayerIndex, selectedQuestionIndex]);

  useEffect(() => {
    if (!hasSelectedQuestion.current) {
      hasSelectedQuestion.current = true;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const heading = questionHeadingRef.current;
    if (!heading) return;

    heading.getAnimations().forEach((animation) => animation.cancel());
    heading.animate(
      [
        { opacity: 0.5, transform: "translateY(6px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 260,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  }, [selectedQuestionIndex]);

  if (!selectedQuestion || !selectedLayer) {
    return null;
  }

  const selectedHref = layerHrefs[selectedLayer.id];

  function selectQuestion(index: number, focus = false) {
    setSelectedQuestionIndex(index);
    if (focus) {
      requestAnimationFrame(() => questionRefs.current[index]?.focus());
    }
  }

  function handleQuestionKeyDown(
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % copy.questions.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + copy.questions.length) % copy.questions.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = copy.questions.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    selectQuestion(nextIndex, true);
  }

  return (
    <div>
      <div
        aria-label={copy.questionsLabel}
        className="grid grid-cols-2 gap-2 lg:grid-cols-4"
        role="tablist"
      >
        {copy.questions.map((question, index) => {
          const active = index === selectedQuestionIndex;

          return (
            <button
              aria-controls="regulatory-question-panel"
              aria-selected={active}
              className={`min-h-24 rounded-2xl border px-4 py-4 text-left text-sm font-semibold leading-5 outline-none transition focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 sm:min-h-20 ${
                active
                  ? "border-[#10264a] bg-[#10264a] text-white shadow-sm"
                  : "border-[#10264a]/12 bg-white/70 text-[#10264a]/65 hover:border-[#147c73]/45 hover:bg-white hover:text-[#10264a]"
              }`}
              id={`regulatory-question-tab-${index}`}
              key={question}
              onClick={() => selectQuestion(index)}
              onKeyDown={(event) => handleQuestionKeyDown(event, index)}
              ref={(node) => {
                questionRefs.current[index] = node;
              }}
              role="tab"
              tabIndex={active ? 0 : -1}
              type="button"
            >
              <span
                className={`mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] ${
                  active ? "text-white/50" : "text-[#b97512]"
                }`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {question}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`regulatory-question-tab-${selectedQuestionIndex}`}
        className="mt-4 rounded-[28px] border border-[#10264a]/12 bg-white p-5 shadow-[0_18px_55px_rgba(16,38,74,0.05)] sm:p-7"
        id="regulatory-question-panel"
        role="tabpanel"
      >
        <div className="grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#147c73]">
              {copy.previewLabel}
            </p>
            <h3
              className="mt-3 max-w-xl font-serif text-2xl font-semibold leading-tight tracking-[-0.025em] sm:text-3xl"
              ref={questionHeadingRef}
            >
              {selectedQuestion}
            </h3>

            <div
              aria-label={copy.layersLabel}
              className="mt-6 grid grid-cols-2 gap-2"
              role="group"
            >
              {copy.layers.map((layer, index) => {
                const active = index === selectedLayerIndex;

                return (
                  <button
                    aria-pressed={active}
                    className={`rounded-xl border px-3 py-3 text-left text-xs font-semibold leading-4 outline-none transition focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-2 ${
                      active
                        ? "border-[#147c73] bg-[#e7f1ed] text-[#10264a]"
                        : "border-[#10264a]/10 bg-[#fbf7ef] text-[#10264a]/58 hover:border-[#147c73]/35 hover:text-[#10264a]"
                    }`}
                    key={layer.id}
                    onClick={() => setSelectedLayerIndex(index)}
                    type="button"
                  >
                    {layer.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            aria-live="polite"
            className="flex min-h-52 flex-col justify-between rounded-2xl bg-[#edf0e7] p-6 sm:p-8"
            ref={previewRef}
          >
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#b97512]">
                {String(selectedLayerIndex + 1).padStart(2, "0")} · {selectedLayer.label}
              </p>
              <p className="mt-5 max-w-2xl font-serif text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
                {selectedLayer.body}
              </p>
            </div>

            {selectedHref && selectedLayer.linkLabel ? (
              <Link
                className="mt-8 w-fit rounded-sm text-sm font-semibold text-[#147c73] outline-none transition hover:text-[#10264a] focus-visible:ring-2 focus-visible:ring-[#b97512] focus-visible:ring-offset-4"
                href={selectedHref}
              >
                {selectedLayer.linkLabel} →
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
