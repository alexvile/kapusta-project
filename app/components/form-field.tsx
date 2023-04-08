import { useState, useEffect } from "react";

interface FormFieldProps {
  htmlFor: string;
  label: string;
  type?: string;
  value?: any;
  onChange?: (...args: any) => any;
  error?: string;
}

export function FormField({
  htmlFor,
  label,
  type = "text",
  value,
  onChange = () => {},
  error = "",
}: FormFieldProps) {
  const [errorText, setErrorText] = useState(error);

  useEffect(() => {
    setErrorText(error);
  }, [error]);

  return (
    <div className="mb-8">
      <label htmlFor={htmlFor} className="text-xs font-roboto block text-left mb-2">
        {label}
      </label>
      <input
        onChange={(e) => {
          onChange(e);
          setErrorText("");
        }}
        type={type}
        id={htmlFor}
        name={htmlFor}
        className="bg-bg-input w-full rounded-3xl font-roboto text-sm py-4 px-5 text-placeholder"
        value={value}
      />
      <div className="text-xs font-semibold text-center tracking-wide text-red-500 w-full">
        {errorText || ""}
      </div>
    </div>
  );
}
