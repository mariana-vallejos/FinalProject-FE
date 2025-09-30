import { useFormikContext } from "formik";
import InputField from "../InputField";
import ListInputField from "../ListInputField";
import {
  secondStepFields,
  type Step2Fields,
  type FieldType,
} from "./movieFormFields";
import type { Movie } from "../../domain/Movie";

type MovieDraft = Omit<Movie, "id" | "createdAt">;

export default function AddDetailsMovie() {
  const { errors, touched } = useFormikContext<MovieDraft>();

  return (
    <>
      {secondStepFields.map((element: Step2Fields) =>
        <ListInputField
            key={element.field}
            field={element.field}
            placeholder={element.placeholder}
            error={errors[element.field as FieldType] ? true : false}
            touched={touched[element.field] ? true: false}
        />
      )}
    </>
  );
}
