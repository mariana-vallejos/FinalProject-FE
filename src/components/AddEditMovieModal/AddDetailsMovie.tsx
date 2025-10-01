import ListInputField from "../ListInputField";
import {
  secondStepFields,
  type Step2Fields,
} from "./movieFormFields";

export default function AddDetailsMovie() {

  return (
    <>
      {secondStepFields.map((element: Step2Fields) =>
        <ListInputField
            key={element.field}
            field={element.field}
            placeholder={element.placeholder}
        />
      )}
    </>
  );
}
