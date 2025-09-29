export default function LoadingModal({ label = "Loading…" }: { label?: string }) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />

      <div
        className="
          relative mx-4 w-full max-w-md rounded-2xl border border-white/20
          bg-white/10 p-6 shadow-2xl backdrop-blur-xl
          dark:bg-neutral-900/40 dark:border-white/10
        "
      >
        <div className="flex items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/60 dark:bg-neutral-800/60">
            <svg
              className="h-6 w-6 animate-spin text-[#00A6E8]"
              viewBox="0 0 24 24"
              fill="none"
              role="status"
              aria-label="Loading"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-90" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>

          <div className="min-w-0">
            <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Opening modal…
            </p>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
              Loading UI, please wait.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-3 w-3/4 animate-pulse rounded-lg bg-white/40 dark:bg-neutral-700/60" />
          <div className="h-3 w-5/6 animate-pulse rounded-lg bg-white/30 dark:bg-neutral-700/50" />
          <div className="h-3 w-2/3 animate-pulse rounded-lg bg-white/20 dark:bg-neutral-700/40" />
        </div>

        <div className="mt-6 h-1 rounded-b-2xl bg-[#00A6E8]" />
      </div>
    </div>
  );
}
