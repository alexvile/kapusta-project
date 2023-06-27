interface IDateInput {
  // className?: string;
  // containerClassName?: string;
  id: string;
  name: string;
  label?: string;
  defaultValue?: any;
  // value?: any;
  // onChange?: (...args: any) => any;
}
export function DateInput({ id, name, label, defaultValue }: IDateInput) {
  return (
    <div>
      <label htmlFor={id} className="block">
        {label}
      </label>
      <input
        type="datetime-local"
        name={name}
        className="outline"
        // step="1"
        defaultValue={defaultValue}
      ></input>
    </div>
  );
}
