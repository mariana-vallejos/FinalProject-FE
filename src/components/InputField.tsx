import { ErrorMessage, Field } from "formik";

export type InputFieldProps = {
    field: string;
    error: boolean;
    touched: boolean;
    type: string;
    placeholder: string;
}

export default function InputField({field, error, touched, type, placeholder}: InputFieldProps){

    const isTextarea = type === "textarea";
    return (
        <div key={field} className="relative">
          <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <Field
            as={isTextarea ? "textarea" : "input"}
            type={type}
            name={field}
            placeholder={placeholder}
            className={`input-base ${error && touched ? "input-error" : "input-normal"}`}
          />
          <ErrorMessage name={field} component="p" className="error-message" />
        </div>
    );
}