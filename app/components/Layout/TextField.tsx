import { useId } from "react";

// type - number, email,
// with prefix or suffix
interface TextFieldProps {
  type?: "text" | "number" | "email";
  name: string;
  label?: string;
  value?: any;
  defaultValue?: any;
  onInputChange?: (...args: any) => any;
  multiline?: number;
}

// useTextarea
// multiline == Columns
export function TextField({
  type = "text",
  name,
  label,
  value,
  defaultValue,
  onInputChange = () => {},
  multiline,
}: TextFieldProps) {
  const id = useId();
  return (
    <div className="mb-1">
      <label htmlFor={id} id={id + "Label"} className="block">
        {label}
      </label>
      {multiline ? (
        <textarea
          onChange={onInputChange}
          id={id}
          name={name}
          rows={multiline}
          className="px-3 py-1.5 border border-[#000] rounded-lg text-[14px] w-full resize-none"
          value={value}
          defaultValue={defaultValue}
        ></textarea>
      ) : (
        <input
          type={type}
          onChange={onInputChange}
          id={id}
          aria-labelledby={id + "Label"}
          name={name}
          className="px-3 py-1.5 border border-[#000] rounded-lg text-[14px]"
          value={value}
          defaultValue={defaultValue}
        />
      )}
    </div>
  );
}
