export type FooterEasterEggCopy = {
  ariaLabel: string;
  dog: string;
  fox: string;
  cat: string;
  origin: string;
};

const marks = ["dog", "fox", "cat", "origin"] as const;

export function FooterEasterEgg({ copy }: { copy: FooterEasterEggCopy }) {
  return (
    <div aria-label={copy.ariaLabel} className="atlas-footer-easter" role="group">
      <div className="atlas-footer-marks">
        {marks.map((mark) => {
          const descriptionId = `atlas-${mark}-note`;

          return (
            <div className="atlas-footer-mark" key={mark}>
              <button
                aria-describedby={descriptionId}
                aria-label={mark}
                className={`atlas-footer-mark-button atlas-footer-mark-${mark}`}
                type="button"
              >
                <MarkGraphic mark={mark} />
              </button>
              <span className="atlas-footer-mark-line" id={descriptionId}>
                {copy[mark]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MarkGraphic({ mark }: { mark: (typeof marks)[number] }) {
  if (mark === "cat") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M5 7H19M7 12H17M9 17H15" />
      </svg>
    );
  }

  if (mark === "origin") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="7" />
      </svg>
    );
  }

  if (mark === "fox") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M3 17L8 8L14 13L21 5" />
        <circle cx="3" cy="17" r="1.5" />
        <circle cx="8" cy="8" r="1.5" />
        <circle cx="14" cy="13" r="1.5" />
        <circle cx="21" cy="5" r="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4 12H11M11 12L18 6M11 12L18 18" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="11" cy="12" r="1.5" />
      <circle cx="18" cy="6" r="1.5" />
      <circle cx="18" cy="18" r="1.5" />
    </svg>
  );
}
