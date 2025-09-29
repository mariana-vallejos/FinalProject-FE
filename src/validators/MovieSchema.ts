import * as Yup from "yup";

export const movieSchema = Yup.object({
    title: Yup.string().trim().required("Title is required").max(120, "Max 120 characters please"),
    description: Yup.string().trim().required("Description is required").max(2000, "Max is 2000 characters"),
    posterUrl: Yup.string().trim().required().url("Must be a valid URL").max(500, "Sorry pal, limit is 500 chars"),
    year: Yup.number()
        .required()
        .typeError("Year must be a number")
        .integer("Year must be an integer")
        .min(1888, "Year seems to be early")
        .max(new Date().getFullYear() + 1, "Year seems too far in the future")
});