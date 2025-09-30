import { useMemo, useRef, useState } from "react";
import type { Movie } from "../../domain/Movie";
import AddEditMovieModal from "../AddEditMovieModal/AddEditMovieModal";
import BreadCrumbSteps from "../BreadCrumbsSteps";
import { buildTouched, makeEmptyMovieDraft, mapYupToMovieErrors, toMovie, type MovieDraft } from "../AddEditMovieModal/movieFormHelpers";
import { Form, Formik, type FormikProps } from "formik";
import { movieSchema } from "../../validators/MovieSchema";
import * as yup from "yup";
import { fields, step1Keys, step2Keys, type FieldType } from "../AddEditMovieModal/movieFormFields";
import { MovieDetailsSchema } from "../../validators/MovieDetailsSchema";
import AddDetailsMovie from "../AddEditMovieModal/AddDetailsMovie";

type MovieFormWizardProps = {
  open: boolean;
  editable?: boolean;
  initial?: Partial<Movie>;
  onClose: () => void;
  onEdit?: (movie: Movie) => void;
  onSubmit?: (movie: Partial<Movie>) => void;
};

export default function MovieFormWizard({
  open,
  editable,
  onClose,
  onSubmit,
  onEdit,
  initial,
}: MovieFormWizardProps){
    
    const [step, setStep] = useState<number>(0);

    if (!open) return null;
    const initialValues = useMemo(() => ({ ...makeEmptyMovieDraft(), ...(initial) }),[initial]);
    
    const handleSubmit = (movieValue: Partial<Movie>) => {
        if (editable && onEdit) {
            const movie: Movie = toMovie(movieValue);
            console.log("is editable")
            onEdit(movie);
        } else if (onSubmit) {
            onSubmit(movieValue);
        }
        onClose();
    };

    async function validateStepOrShow(formik: FormikProps<MovieDraft>, schema: yup.AnyObjectSchema, stepFields: readonly FieldType[]){
        try{
            await schema.validate(formik.values, {abortEarly: false});
            return true;
        } catch(error: any) {
            const errors = mapYupToMovieErrors(error as yup.ValidationError);
            formik.setErrors({...formik.errors, ...errors});
            formik.setTouched({ ...(formik.touched ?? {}), ...(buildTouched(stepFields) ?? {}) }, true);
            return false;
        }
    }

    return(
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
                <div className="px-6 pb-6">


                <BreadCrumbSteps
                  steps={[1, 2]}
                  activeStep={step}
                  onStepClick={(step) => {
                    setStep(step)
                  }}
                />
                <Formik<MovieDraft> initialValues={initialValues} validationSchema={movieSchema.concat(MovieDetailsSchema)} onSubmit={handleSubmit}>
                    {(formik) => (
                        <Form className="space-y-4">
                            {step === 0 && <AddEditMovieModal />}
                            {step === 1 && <AddDetailsMovie />}
                            <div className="mt-6 flex items-center justify-end gap-3">
                              {step === 1 && (
                                <button
                                  type="button"
                                  className="btn-secondary"
                                  onClick={() => setStep(0)}
                                >
                                  Back
                                </button>
                              )}

                              {step === 0 && (
                                <button
                                  type="button"
                                  className="btn-primary"
                                  onClick={async () => {
                                    const ok = await validateStepOrShow(formik, movieSchema, step1Keys);
                                    if (ok) setStep(1);
                                  }}
                                >
                                  Next
                                </button>
                              )}

                              {step === 1 && (
                                <button
                                  type="button"
                                  className="btn-primary"
                                  onClick={async () => {
                                    const ok = await validateStepOrShow(formik, MovieDetailsSchema, step2Keys);
                                    if (ok) formik.submitForm();
                                  }}
                                >
                                  Save Movie
                                </button>
                              )}
                            </div>
                        </Form>
                    )}
                </Formik>
                </div>
            </div>
        </div>
    );
}