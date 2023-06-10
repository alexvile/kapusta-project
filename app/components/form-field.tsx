import { useState, useEffect } from "react";

import EyeOpen from "./svg/EyeOpen";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value?: any;
  validateHandler?: (...args: any) => any;
  onInputChange?: (...args: any) => any;
  error?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onInputChange = () => {},
  validateHandler = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const [toggledType, setToggledType] = useState("password");

  // console.log("error inside input0: ", validateEmail("asdasda"));

  useEffect(() => {
    // console.log("error inside input: ", error);
    setErrorText(error);
  }, [error]);
  // console.log(validateHandler);
  return (
    <div className="mb-8">
      <label
        htmlFor={htmlFor}
        className="text-xs font-roboto block text-left mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={(e) => {
            onInputChange(e);
            // setErrorText("");
            console.log(e.target.value);
            // setErrorText(validateHandler(e.target.value));
          }}
          onBlur={(e) => {
            setErrorText(validateHandler(e.target.value));
          }}
          type={type === "password" ? toggledType : type}
          id={htmlFor}
          name={htmlFor}
          className="bg-bg-input w-full rounded-3xl font-roboto text-sm py-4 px-5 text-placeholder"
          value={value}
          aria-invalid={Boolean(errorText)}
          aria-errormessage={errorText}
        />
        {type === "password" ? (
          <span
            className="absolute top-[50%] translate-y-[-50%] right-3"
            onClick={() => {
              setToggledType(toggledType === "password" ? "text" : "password");
            }}
          >
            {toggledType === "password" ? "show" : "hide"}
            {/* {toggledType === "password" && (
              <EyeOpen title="Eye open" titleId="eye-open" />
            )} */}
          </span>
        ) : null}
      </div>

      {/* text-xs font-semibold text-center tracking-wide text-red-500 w-full */}
      {errorText ?? (
        <div className="form-validation-error" role="alert">
          {errorText || ""}
        </div>
      )}
    </div>
  );
}
