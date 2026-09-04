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
  string
> = {
  jurisdictions: "#map",
  compare: "/explore/compare",
  "system-map": "/explore/system-map",
  sources: "#method",
};

export function RegulatoryQuestionExplorer({
  copy,
}: {
  copy: HomeQuestionDemoCopy;
}) {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const questionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const questionCardRef = useRef<HTMLDivElement>(null);
  const hasSelectedQuestion = useRef(false);
  const selectedQuestion = copy.questions[selectedQuestionIndex] ?? copy.questions[0];

  useEffect(() => {
    if (!hasSelectedQuestion.current) {
      hasSelectedQuestion.current = true;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const card = questionCardRef.current;
    if (!card) return;

    card.getAnimations().forEach((animation) => animation.cancel());
    card.animate(
      [
        { opacity: 0.45, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 260,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );
  }, [selectedQuestionIndex]);

  if (!selectedQuestion) {
    return null;
  }

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
    <div className="atlas-research-path">
      <div
        aria-label={copy.questionsLabel}
        className="atlas-question-tabs grid grid-cols-2 lg:grid-cols-4"
        role="tablist"
      >
        {copy.questions.map((question, index) => {
          const active = index === selectedQuestionIndex;

          return (
            <button
              aria-controls="regulatory-question-panel"
              aria-selected={active}
              className={`atlas-question-tab min-h-24 px-4 py-4 text-left text-sm font-semibold leading-5 outline-none transition focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[var(--atlas-teal)] focus-visible:ring-inset sm:min-h-20 ${
                active
                  ? "is-active text-[var(--atlas-ink)]"
                  : "text-[var(--atlas-ink-muted)] hover:text-[var(--atlas-ink)]"
              }`}
              id={`regulatory-question-tab-${index}`}
              key={question.label}
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
              {question.label}
            </button>
          );
        })}
      </div>

      <div
        aria-labelledby={`regulatory-question-tab-${selectedQuestionIndex}`}
        className="atlas-research-canvas"
        id="regulatory-question-panel"
        role="tabpanel"
      >
        <div aria-live="polite" className="atlas-research-question-card" ref={questionCardRef}>
          <span aria-hidden="true" className="atlas-research-question-star" />
          <p className="atlas-research-kicker">{copy.previewLabel}</p>
          <h3>{selectedQuestion.label}</h3>
          <p className="atlas-research-framing">{selectedQuestion.frame}</p>
        </div>

        <div aria-label={copy.layersLabel} className="atlas-research-route">
          <div className="atlas-research-route-heading">
            <p className="atlas-research-kicker">{copy.layersLabel}</p>
            <span aria-hidden="true">01—04</span>
          </div>

          <ol className="atlas-research-stages">
            {copy.layers.map((layer, index) => (
              <li className="atlas-research-stage" key={layer.id}>
                <Link
                  className="atlas-research-stage-link"
                  href={layerHrefs[layer.id]}
                >
                  <span className="atlas-research-stage-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4>{layer.label}</h4>
                  <p>{layer.body}</p>
                  <span className="atlas-research-stage-action">
                    {layer.linkLabel} <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
