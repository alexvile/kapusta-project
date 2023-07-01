interface IDateInput {
  // className?: string;
  // containerClassName?: string;
  id: string;
  name: string;
  label?: string;
  defaultValue?: any;
  type?: "datetime-local" | "date";
  value?: any;
  onChange?: (...args: any) => any;
}
export function DateInput({
  id,
  name,
  label,
  defaultValue,
  value,
  onChange,
  type = "datetime-local",
}: IDateInput) {
  return (
    <div>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="outline"
        // step="1"
        onChange={onChange}
        value={value}
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}
// todo: use normal id and names to input, select
