import { useEffect, useState } from "react";
import { useSaveMovie } from "../hooks/useSaveMovie";
import type { Movie, NewMovie } from "../domain/Movie";
import { movieSchema } from "../validators/MovieSchema";

type Props = {
  open: boolean;
  onClose?: () => void;
  onSaved?: (movie: Movie) => void;
};

export default function MovieModal({ open, onClose, onSaved }: Props) {
  const { save } = useSaveMovie();
  const [values, setValues] = useState<NewMovie>({
    title: "",
    description: "",
    imageUrl: "",
    year: new Date().getFullYear(),
  });
  const [errors, setErrors] = useState<Record<keyof NewMovie | "_root", string>>(
    {} as any
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setValues({
        title: "",
        description: "",
        imageUrl: "",
        year: new Date().getFullYear(),
      });
      setErrors({} as any);
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const setField =
    (name: keyof NewMovie) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val =
        name === "year" ? (e.target.value === "" ? ("" as any) : Number(e.target.value)) : e.target.value;
      setValues((v) => ({ ...v, [name]: val }));
      setErrors((err) => ({ ...err, [name]: "" }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({} as any);

    try {
      const valid = await movieSchema.validate(values, { abortEarly: false });
      const movie = await save({ ...valid, year: valid.year ?? new Date().getFullYear() });
      onSaved?.(movie);
      onClose?.();
    } catch (err: any) {
      if (err?.inner?.length) {
        const fieldErrors: Record<string, string> = {};
        for (const issue of err.inner) {
          if (issue.path && !fieldErrors[issue.path]) {
            fieldErrors[issue.path] = issue.message;
          }
        }
        setErrors(fieldErrors as any);
      } else {
        setErrors((prev) => ({ ...prev, _root: err?.message ?? "Unexpected error" }));
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="mx-4 w-full max-w-lg rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl
                   dark:bg-neutral-900/40 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Add a Movie
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-neutral-500 hover:bg-white/20 hover:text-neutral-800 dark:hover:text-neutral-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {errors._root && (
          <div className="mb-4 rounded-lg border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300">
            {errors._root}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Title
            </label>
            <input
              type="text"
              value={values.title}
              onChange={setField("title")}
              className="w-full rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-neutral-900 shadow-inner
                         placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-indigo-300
                         dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400"
              placeholder="e.g., Interstellar"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Description
            </label>
            <textarea
              value={values.description}
              onChange={setField("description")}
              className="h-28 w-full resize-y rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-neutral-900 shadow-inner
                         placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-indigo-300
                         dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400"
              placeholder="Brief synopsis..."
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Image URL
            </label>
            <input
              type="url"
              value={values.imageUrl}
              onChange={setField("imageUrl")}
              className="w-full rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-neutral-900 shadow-inner
                         placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-indigo-300
                         dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400"
              placeholder="https://..."
            />
            {errors.imageUrl && (
              <p className="mt-1 text-xs text-red-600">{errors.imageUrl}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Year
            </label>
            <input
              type="number"
              value={values.year}
              onChange={setField("year")}
              className="w-full rounded-xl border border-white/30 bg-white/70 px-3 py-2 text-neutral-900 shadow-inner
                         placeholder:text-neutral-500 focus:outline-none focus:ring-4 focus:ring-indigo-300
                         dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400"
              placeholder="2014"
            />
            {errors.year && (
              <p className="mt-1 text-xs text-red-600">{errors.year}</p>
            )}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-white/30
                         dark:text-neutral-200 dark:hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow
                         hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300
                         disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? "Saving..." : "Save Movie"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
