import { useState, useEffect } from "react";

import EyeOpen from "./svg/EyeOpen";

// todo - finish form-fields logic
//  todo - update Formfield logic
interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value?: any;
  validateHandler?: (...args: any) => any;
  onInputChange?: (...args: any) => any;
  error?: string;
  defaultValue?: any;
  // todo - defaultValue
}

// todo - refactor !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// todo - controlled - uncontrolled, switch-case for input types
// todo - add name separate prop to form-field
export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onInputChange = () => {},
  validateHandler = () => {},
  error = "",
  defaultValue,
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);
  const [toggledType, setToggledType] = useState("password");

  // console.log("error inside input0: ", validateEmail("asdasda"));

  // todo-all input components update, add own
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
            // onInputChange(e);
            onInputChange(e);

            console.log(e.target.value);
            // setErrorText("");
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
          defaultValue={defaultValue}
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

// todo backto and arialabel errors in console
