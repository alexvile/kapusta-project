import { useId } from "react";

// type - number, email,
// with prefix or suffix
interface TextFieldProps {
  type?: "text" | "number" | "email";
  name: string;
  label?: string;
  value?: any;
  onInputChange?: (...args: any) => any;
}

export function TextField({
  type = "text",
  name,
  label,
  value,
  onInputChange = () => {},
}: TextFieldProps) {
  const id = useId();
  return (
    <div className="mb-1">
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        type={type}
        onChange={onInputChange}
        id={id}
        name={name}
        className="px-3 py-1.5 border border-[#000] rounded-lg text-[14px]"
        value={value}
      />
    </div>
  );
}
