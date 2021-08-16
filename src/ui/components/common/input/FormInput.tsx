import classNames from "classnames";
import { FieldHookConfig, useField } from "formik";
import React from "react";

interface FormInputProps {
  customClassName?: string;
  name: string;
  variant?: "textarea";
  labelText?: string;
  type?: string;
}

const FormInput: React.FC<FormInputProps & FieldHookConfig<string>> = ({
  customClassName,
  placeholder,
  variant,
  type = "text",
  labelText,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={field.name}>
        {labelText}
        {!variant ? (
          <input
            type={type}
            {...field}
            placeholder={placeholder}
            className={classNames(["standart-input", { customClassName }])}
          />
        ) : (
          <textarea
            {...field}
            placeholder={placeholder}
            className={customClassName}
          />
        )}
      </label>
      <div className="validation">
        {meta.touched && meta.error && (
          <div className="subtext">{meta.error}</div>
        )}
      </div>
    </>
  );
};

export default FormInput;
