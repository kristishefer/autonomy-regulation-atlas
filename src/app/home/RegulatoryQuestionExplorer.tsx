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

    heading.parentElement
      ?.querySelectorAll<HTMLElement>(".atlas-lens-connector")
      .forEach((connector, index) => {
        connector.getAnimations().forEach((animation) => animation.cancel());
        connector.animate(
          [{ opacity: 0.35 }, { opacity: 1 }],
          {
            delay: index * 24,
            duration: 220,
            easing: "ease-out",
          },
        );
      });
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
        className="atlas-question-tabs grid grid-cols-2 border-y border-[rgba(24,50,74,0.12)] lg:grid-cols-4"
        role="tablist"
      >
        {copy.questions.map((question, index) => {
          const active = index === selectedQuestionIndex;

          return (
            <button
              aria-controls="regulatory-question-panel"
              aria-selected={active}
              className={`atlas-question-tab min-h-24 border-b border-r border-[rgba(24,50,74,0.08)] px-4 py-4 text-left text-sm font-semibold leading-5 outline-none transition focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-inset sm:min-h-20 ${
                active
                  ? "is-active bg-white/85 text-[var(--atlas-ink)]"
                  : "bg-transparent text-[var(--atlas-ink-muted)] hover:bg-white/55 hover:text-[var(--atlas-ink)]"
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
                  active ? "text-[var(--atlas-space)]" : "text-[rgba(111,131,166,0.62)]"
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
        className="atlas-lens-panel mt-4 border-y border-[rgba(24,50,74,0.12)] bg-[rgba(250,249,245,0.4)]"
        id="regulatory-question-panel"
        role="tabpanel"
      >
        <div className="grid lg:grid-cols-[1.12fr_0.88fr] lg:divide-x lg:divide-[rgba(24,50,74,0.08)]">
          <div className="px-1 py-7 sm:px-6 lg:pl-0 lg:pr-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--atlas-teal)]">
              {copy.previewLabel}
            </p>

            <div
              aria-label={copy.layersLabel}
              className="atlas-lens-system mt-5"
              role="group"
            >
              {copy.layers.map((layer, index) => (
                <span
                  aria-hidden="true"
                  className={`atlas-lens-connector atlas-lens-connector-${layer.id} ${
                    index === selectedLayerIndex ? "is-active" : ""
                  }`}
                  key={`${layer.id}-connector`}
                />
              ))}

              <h3 className="atlas-lens-question" ref={questionHeadingRef}>
                <span>QUESTION</span>
                {selectedQuestion}
              </h3>

              {copy.layers.map((layer, index) => {
                const active = index === selectedLayerIndex;

                return (
                  <button
                    aria-pressed={active}
                    className={`atlas-lens-button atlas-lens-${layer.id} border px-3 py-3 text-left text-xs font-semibold leading-4 outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-offset-2 ${
                      active
                        ? "is-active border-[var(--atlas-teal)] bg-[rgba(79,143,130,0.1)] text-[var(--atlas-ink)]"
                        : "border-[rgba(24,50,74,0.1)] bg-[rgba(250,249,245,0.62)] text-[var(--atlas-ink-muted)] hover:border-[rgba(79,143,130,0.35)] hover:text-[var(--atlas-ink)]"
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
            className="flex min-h-64 flex-col justify-between border-t border-[rgba(24,50,74,0.08)] bg-[rgba(239,244,246,0.55)] px-5 py-7 sm:px-8 lg:border-t-0 lg:bg-transparent lg:pl-10 lg:pr-0"
            ref={previewRef}
          >
            <div>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--atlas-space)]">
                {String(selectedLayerIndex + 1).padStart(2, "0")} · {selectedLayer.label}
              </p>
              <p className="mt-5 max-w-2xl font-serif text-xl font-semibold leading-8 sm:text-2xl sm:leading-9">
                {selectedLayer.body}
              </p>
            </div>

            {selectedHref && selectedLayer.linkLabel ? (
              <Link
                className="mt-8 w-fit rounded-sm text-sm font-semibold text-[var(--atlas-teal)] outline-none transition hover:text-[var(--atlas-ink)] focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-offset-4"
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
