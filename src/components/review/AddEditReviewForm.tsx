import { ErrorMessage, Field, Form, Formik } from "formik";
import { useUser } from "../../context/UserContext";
import type { Review } from "../../domain/Review";
import { ReviewSchema } from "../../validators/ReviewSchema";
import ReviewTags from "./ReviewTags";
import Stars from "../Stars";

type AddEditReviewFormProps = {
  movieId: number;
  initialReview?: Review;
  onSubmit: (review: Omit<Review, "id" | "createdAt">) => void;
  onCancel?: () => void;
  isEditing?: boolean
};

const AddEditReviewForm = ({
  movieId,
  initialReview,
  onCancel,
  onSubmit,
  isEditing = false
}: AddEditReviewFormProps) => {
  const { user } = useUser();
  return (
    <article className="py-3 px-5 relative bg-[#e4f7ff] dark:bg-gray-500 rounded-xl">
      <div className="flex gap-3 pb-1 items-center">
        <img
          src={user.avatar || "https://i.pravatar.cc/150?img=1"}
          alt={user.name}
          className="rounded-4xl h-10"
        />
        <div>
          <h5 className="font-semibold text-[16px]">{user.name}</h5>
        </div>
      </div>

      <Formik
        initialValues={{
          text: initialReview?.text?.trim() ?? "",
          rating: initialReview?.rating ?? 0,
          tags: initialReview?.tags ?? [],
          newTag: "",
        }}
        validationSchema={ReviewSchema}
        onSubmit={(values, { resetForm }) => {
          onSubmit({
            userId: user.email,
            movieId,
            rating: values.rating,
            text: values.text.trim(),
            tags: values.tags,
          });
          resetForm();
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <Stars
                rating={values.rating}
                editable={true}
                onChange={(val) => setFieldValue("rating", val)}
              />
              <ErrorMessage
                name="rating"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
            <div className="flex-1 my-2">
              <Field
                as="textarea"
                name="text"
                placeholder="Add your review..."
                rows={1}
                className="w-full resize-none border-b-2 border-gray-300 focus:border-primary focus:outline-none bg-transparent p-1 text-sm dark:text-gray-100"
              />
              <ErrorMessage
                name="text"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="flex gap-2 items-center mb-2">
              <Field
                type="text"
                name="newTag"
                placeholder="Add tag"
                className="border border-primary px-2 py-1 rounded-md text-sm dark:text-gray-100"
              />
              <button
                type="button"
                onClick={() => {
                  if (
                    values.newTag.trim() &&
                    !values.tags.includes(values.newTag.trim())
                  ) {
                    setFieldValue("tags", [
                      ...values.tags,
                      values.newTag.trim(),
                    ]);
                    setFieldValue("newTag", "");
                  }
                }}
                className="text-sm text-primary font-medium px-3 py-1 border border-primary hover:bg-blue-400 hover:text-gray-200 dark:bg-gray-600 rounded-md"
              >
                + Add
              </button>
            </div>

            <ReviewTags tags={values.tags} />

            <div className="flex justify-end gap-2">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
              <button type="submit" className="btn-primary">
                {isEditing ? "Save changes" : "Post review"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </article>
  );
};

export default AddEditReviewForm;
