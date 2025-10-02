import * as Yup from "yup";

export const ReviewSchema = Yup.object().shape({
  text: Yup.string().min(20).max(450).when("rating", {
    is: (rating: number) => rating < 3,
    then: (schema) =>
      schema.required("Please explain why you gave a low rating").min(3, "Too short"),
    otherwise: (schema) => schema.notRequired(),
  }),
  rating: Yup.number().min(1, "Please give a rating").required("Required"),
  tags: Yup.array().of(Yup.string().min(1).max(20)),
});
