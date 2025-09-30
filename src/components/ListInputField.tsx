import { Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";

export type ListInputFieldProps = {
  field: string;
  error: boolean;
  touched: boolean;
  placeholder: string;
  label?: string;
};

export default function ListInputField({
  field,
  error,
  touched,
  placeholder,
  label,
}: ListInputFieldProps) {
  const hasValidationError = Boolean(error && touched);
  const labelText =
    label ?? field.charAt(0).toUpperCase() + field.slice(1);

  return (
    <div className="relative">
      <label className="form-label">{labelText}</label>

      <Field name={field}>
        {({ field: formikField, form }: any) => {
          const [rawListInputText, setRawListInputText] = useState<string>(() => {
            const currentArrayValue = Array.isArray(formikField.value)
              ? (formikField.value as string[])
              : [];
            return currentArrayValue.join(", ");
          });

          useEffect(() => {
            const currentArrayValue = Array.isArray(formikField.value)
              ? (formikField.value as string[])
              : [];
            const joinedText = currentArrayValue.join(", ");
            setRawListInputText(joinedText);
          }, [formikField.value]);

          const handleListInputChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const nextRawText = event.target.value;
            setRawListInputText(nextRawText);
          };

          const commitRawTextToFormikArray = () => {
            const parsedTokens = rawListInputText
              .split(",")
              .map((token) => token.trim())
              .filter((token) => token.length > 0);
            form.setFieldValue(formikField.name, parsedTokens);
            form.setFieldTouched(formikField.name, true);
          };

          const handleListInputKeyDown = (
            event: React.KeyboardEvent<HTMLInputElement>
          ) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commitRawTextToFormikArray();
            }
          };

          return (
            <input
              name={formikField.name}
              value={rawListInputText}
              placeholder={placeholder}
              onChange={handleListInputChange}
              onBlur={commitRawTextToFormikArray}
              onKeyDown={handleListInputKeyDown}
              className={`input-base ${
                hasValidationError ? "input-error" : "input-normal"
              }`}
            />
          );
        }}
      </Field>

      <ErrorMessage name={field} component="p" className="error-message" />
    </div>
  );
}
