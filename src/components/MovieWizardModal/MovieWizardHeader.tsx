type MovieWizardHeaderProps = {
  title: string;
  onClose: () => void;
};

export default function MovieWizardHeader({
  title,
  onClose,
}: MovieWizardHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 pt-5 pb-3">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
        {title}
      </h2>
      <button type="button" className="close-button" onClick={onClose}>
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6l12 12M18 6l-12 12"
          />
        </svg>
      </button>
    </div>
  );
}
