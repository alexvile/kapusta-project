import { useId } from "react";

interface IDateInput {
  name: string;
  label?: string;
  defaultValue?: string;
  type?: "datetime-local" | "date";
  value: string;
  onChange?: (...args: any) => any;
}
export function DateInput({
  name,
  label,
  defaultValue,
  value,
  onChange = () => {},
  type = "datetime-local",
}: IDateInput) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[10px]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        onChange={onChange}
        value={value || ""}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}
// todo: use normal id and names to input, select
// todo: using values instead default value
