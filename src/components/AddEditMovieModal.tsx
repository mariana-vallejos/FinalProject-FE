import type { Movie } from "../domain/Movie";
import { useState } from "react";
import { movieSchema } from "../validators/MovieSchema";

type FieldType = "title" | "year" | "description" | "posterUrl";
type ErrorsType = Partial<Record<FieldType, string>> ;

type AddEditMovieProps = {
    open: Boolean;
    onClose?: () => void;
    onSubmit: (movie: Omit<Movie, 'id' | 'createdAt'>) => void;
}

export default function AddEditMovieModal({open, onClose, onSubmit}: AddEditMovieProps){

    const [values, setValues] = useState(
        {title: "", year: 0, description: "", posterUrl: "", genres: [], cast: [], tags: []}
    );
    const [errors, setErrors] = useState<ErrorsType>({});

    const mapYupErrors = (errors: any) => {
        const next: ErrorsType = {};
        errors.inner.forEach((error: any) => {
            if (!next[error.path as FieldType]) {
                next[error.path as FieldType] = error.message;
            }
        })
        setErrors(next);
    }

    const onField = (name: FieldType) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = name === "year" ? Number(event.target.value) : event.target.value;
        setValues((fields) => ({...fields, [name]: value}));
        setErrors((fields) => ({...fields, [name]: undefined}));
    }

    const handleValidate = async() => {
        try{
            console.log("xddxd")
            setErrors({});
            await movieSchema.validate(values, {abortEarly: false});
            onSubmit(values);
        } catch(error: any) {
            mapYupErrors(error);
        }
    }

    if(!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
            <div
              className="
                relative mx-4 w-full max-w-lg rounded-2xl
                border border-gray-200 bg-white
                dark:border-gray-700 dark:bg-gray-800
                shadow-2xl px-3 py-3
              "
            >
                <div className="flex items-center justify-between px-6 pt-5 pb-3">
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    Add a Movie
                  </h2>

                  <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                                 border border-white/30 bg-white/30 text-neutral-700
                                 hover:bg-neutral-300 active:bg-white/50
                                 dark:bg-neutral-800/50 dark:text-neutral-200 dark:border-white/10
                                 transition-all duration-200 ease-in-out
                      "
                      onClick={onClose}
                   >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
                    </svg>
                  </button>
                </div>
                <div className="px-6 pb-6 pt-4">
                    <form className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                                Title
                            </label>
                            <input
                              type="text"
                              value={values.title}
                              onChange={onField("title")}
                              placeholder="e.g., Interstellar"
                              className={`w-full rounded-xl border px-3 py-2 shadow-inner
                                ${errors.title ? "border-red-500 focus:ring-red-300" : "border-white/30 focus:ring-[rgba(0,166,232,0.35)]"}
                                bg-white/70 text-neutral-900 placeholder:text-neutral-500
                                focus:outline-none focus:ring-4
                                dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400
                              `}
                            />
                            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                        </div>

                         <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            Year
                          </label>
                          <input
                            type="number"
                            placeholder="2014"
                            value={values.year}
                            onChange={onField("year")}
                            className={`w-full rounded-xl border px-3 py-2 shadow-inner
                              ${errors.year ? "border-red-500 focus:ring-red-300" : "border-white/30 focus:ring-[rgba(0,166,232,0.35)]"}
                              bg-white/70 text-neutral-900 placeholder:text-neutral-500
                              focus:outline-none focus:ring-4
                              dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400
                            `}
                          />
                          {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year}</p>}
                        </div>

                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            Poster URL
                          </label>
                          <input
                            type="url"
                            value={values.posterUrl}
                            onChange={onField("posterUrl")}
                            placeholder="https://example.com/poster.jpg"
                            className={`w-full rounded-xl border px-3 py-2 shadow-inner
                              ${errors.posterUrl ? "border-red-500 focus:ring-red-300" : "border-white/30 focus:ring-[rgba(0,166,232,0.35)]"}
                              bg-white/70 text-neutral-900 placeholder:text-neutral-500
                              focus:outline-none focus:ring-4
                              dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400
                            `}
                          />
                          {errors.posterUrl && <p className="mt-1 text-xs text-red-600">{errors.posterUrl}</p>}
                        </div>
                        <div>
                          <label className="mb-1 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                            Description
                          </label>
                          <textarea
                            placeholder="Brief synopsis..."
                            value={values.description}
                            onChange={onField("description")}
                            className={`h-28 w-full resize-y rounded-xl border px-3 py-2 shadow-inner
                              ${errors.description ? "border-red-500 focus:ring-red-300" : "border-white/30 focus:ring-[rgba(0,166,232,0.35)]"}
                              bg-white/70 text-neutral-900 placeholder:text-neutral-500
                              focus:outline-none focus:ring-4
                              dark:bg-neutral-800/70 dark:text-neutral-100 dark:border-white/10 dark:placeholder:text-neutral-400
                            `}
                          />
                          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                          <button
                            type="button"
                            className="
                              rounded-xl border border-white/30 bg-white/30 px-4 py-2 text-sm font-medium
                              text-neutral-700 hover:bg-white/40 active:bg-white/50
                              dark:text-neutral-200 dark:bg-neutral-800/50 dark:hover:bg-neutral-800/70 dark:border-white/10
                            "
                            onClick={onClose}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="
                              rounded-xl px-4 py-2 text-sm font-semibold text-white shadow
                              bg-[#00A6E8] hover:brightness-110 active:brightness-95
                              focus:outline-none focus:ring-4 focus:ring-[rgba(0,166,232,0.35)]
                            "
                            onClick={handleValidate}
                          >
                            Save Movie
                          </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}