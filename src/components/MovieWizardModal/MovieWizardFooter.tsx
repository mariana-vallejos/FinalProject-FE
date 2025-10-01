type MovieWizardFooterProps = {
  step: number;
  onBack: () => void;
  onNext: () => void;
  onSave: () => void;
};

export default function MovieWizardFooter({
  step,
  onBack,
  onNext,
  onSave,
}: MovieWizardFooterProps) {
  return (
    <div className="mt-6 flex items-center justify-end gap-3">
      {step === 1 && (
        <button
          type="button"
          className="btn-secondary"
          onClick={onBack}
        >
          Back
        </button>
      )}

      {step === 0 && (
        <button
          type="button"
          className="btn-primary"
          onClick={onNext}
        >
          Next
        </button>
      )}

      {step === 1 && (
        <button
          type="submit"
          className="btn-primary"
          onClick={onSave}
        >
          Save Movie
        </button>
      )}
    </div>
  );
}
