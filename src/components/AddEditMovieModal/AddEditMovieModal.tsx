import type { Movie } from "../../domain/Movie";
import { Formik, Form } from "formik";
import { movieSchema } from "../../validators/MovieSchema";
import InputField from "../InputField";

type FieldType = "title" | "year" | "description" | "posterUrl";

type AddEditMovieProps = {
  open: boolean;
  editable?: boolean;
  initial?: Partial<Movie>;
  onClose: () => void;
  onEdit?: (movie: Movie) => void;
  onSubmit?: (movie: Partial<Movie>) => void;
};

const EmptyForm: Partial<Movie> = {
  id: 0,
  title: "",
  year: new Date().getFullYear(),
  description: "",
  posterUrl: "",
  genres: [],
  cast: [],
  tags: [],
  createdAt: new Date().toISOString(),
};

export default function AddEditMovieModal({
  open,
  editable,
  onClose,
  onSubmit,
  onEdit,
  initial = EmptyForm,
}: AddEditMovieProps) {
  if (!open) return null;

  const Fields: { field: FieldType; type: string; placeholder: string }[] = [
    { field: "title", type: "text", placeholder: "e.g., Interstellar" },
    { field: "year", type: "number", placeholder: "2014" },
    { field: "posterUrl", type: "url", placeholder: "https://example.com/poster.jpg" },
    { field: "description", type: "textarea", placeholder: "Brief synopsis..." },
  ];


  const handleSubmit = (values: Partial<Movie>) => {
    if (editable && onEdit) {
      const movie: Movie = { 
        ...values, 
        id: values.id ?? 0, 
        title: values.title ?? "", 
        year: values.year ?? new Date().getFullYear(), 
        description: values.description ?? "", 
        posterUrl: values.posterUrl ?? "", 
        genres: values.genres ?? [], 
        cast: values.cast ?? [], 
        tags: values.tags ?? [], 
        createdAt: values.createdAt ?? new Date().toISOString() 
      };
      onEdit(movie);
    } else if (onSubmit) {
      onSubmit(values);
    }
    onClose();
  };

  return (
    <div className="movie-form-modal-container">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm" />
      <div className="movie-form-modal-card">
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {editable ? "Edit Movie" : "Add a movie"}
          </h2>
          <button type="button" className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          <Formik initialValues={initial} validationSchema={movieSchema} onSubmit={handleSubmit}>
            {({ errors, touched }) => (
              <Form className="space-y-4">
                {Fields.map((element) => (
                  <InputField
                    key={element.field}
                    field={element.field}
                    type={element.type}
                    placeholder={element.placeholder}
                    error={errors[element.field as FieldType] ? true : false}
                    touched={touched[element.field] ? true: false}
                  />
                ))}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button type="button" className="btn-secondary" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Save Movie
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}