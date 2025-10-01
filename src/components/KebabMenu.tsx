import { useRef, useState } from "react";

type KebabMenuProps = {
  optionLabels: string[];
  optionHandlers: Array<() => void>;
  insideLink?: boolean;
};

export default function KebabMenu({
  optionLabels,
  optionHandlers,
  insideLink,
}: KebabMenuProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const ok =
    optionLabels.length > 0 && optionLabels.length === optionHandlers.length;

  if (!ok) return null;

  function stopIfInsideLink(e: React.SyntheticEvent) {
    if (insideLink) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function executeNthHandler(
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    stopIfInsideLink(event);
    try {
      optionHandlers[index]?.();
    } finally {
      setOpen(false);
      btnRef.current?.focus();
    }
  }

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="More options"
        title="More options"
        onClick={(event) => {
          stopIfInsideLink(event);
          setOpen(!open);
        }}
        className="kebab-button"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/0"
            onClick={(event) => {
              stopIfInsideLink(event);
              setOpen(false);
              btnRef.current?.focus();
            }}
          />
          <div
            className="kebab-button-options-container"
            onClick={stopIfInsideLink}
          >
            {optionLabels.map((label, index) => (
              <button
                key={label}
                onClick={(event) => executeNthHandler(index, event)}
                className={`kebab-menu-item ${
                  index !== optionLabels.length - 1
                    ? "kebab-options-delimiter"
                    : ""
                } `}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
