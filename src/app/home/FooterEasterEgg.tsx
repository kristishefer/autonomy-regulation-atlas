export type FooterEasterEggCopy = {
  ariaLabel: string;
  intro: string;
  dog: string;
  fox: string;
  cat: string;
  origin: string;
};

const marks = [
  { id: "dog", label: "Dog" },
  { id: "fox", label: "Fox" },
  { id: "cat", label: "Cat" },
  { id: "origin", label: "Origin" },
] as const;

export function FooterEasterEgg({ copy }: { copy: FooterEasterEggCopy }) {
  return (
    <div aria-label={copy.ariaLabel} className="atlas-footer-easter" role="group">
      <p className="atlas-footer-easter-key">{copy.intro}</p>
      <div className="atlas-footer-marks">
        {marks.map(({ id, label }) => {
          const descriptionId = `atlas-${id}-note`;

          return (
            <div className="atlas-footer-mark" key={id}>
              <button
                aria-describedby={descriptionId}
                className={`atlas-footer-mark-button atlas-footer-mark-${id}`}
                type="button"
              >
                <MarkGraphic mark={id} />
                <span>{label}</span>
              </button>
              <span className="atlas-footer-mark-line" id={descriptionId}>
                {copy[id]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

type MarkId = (typeof marks)[number]["id"];

function MarkGraphic({ mark }: { mark: MarkId }) {
  if (mark === "cat") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M4 15C7 8 10 9 12 7M12 7C15 8 17 11 20 9M12 7C13 12 15 15 18 18" />
        <circle cx="4" cy="15" r="1.4" />
        <circle cx="12" cy="7" r="2" />
        <circle cx="20" cy="9" r="1.4" />
        <circle cx="18" cy="18" r="1.4" />
      </svg>
    );
  }

  if (mark === "origin") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path className="atlas-signature-origin-orbit" d="M6 9A7 7 0 1 1 13 19" />
        <path className="atlas-signature-origin-line" d="M11 12L19 6M11 12L21 15" />
        <circle className="atlas-signature-origin-core" cx="11" cy="12" r="2.2" />
      </svg>
    );
  }

  if (mark === "fox") {
    return (
      <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
        <path d="M3 17C7 6 11 10 14 13S18 8 21 5" />
        <circle cx="3" cy="17" r="1.5" />
        <circle cx="8" cy="8" r="2" />
        <circle cx="14" cy="13" r="1.2" />
        <circle cx="21" cy="5" r="1.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path d="M4 12C7 12 9 12 11 12M11 12C14 11 16 8 19 6M11 12C14 13 16 17 19 18" />
      <circle cx="4" cy="12" r="1.5" />
      <circle cx="11" cy="12" r="2" />
      <circle cx="19" cy="6" r="1.5" />
      <circle cx="19" cy="18" r="1.2" />
    </svg>
  );
}
