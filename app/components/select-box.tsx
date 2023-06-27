interface ISelectBox {
  options: {
    name: string;
    value: any;
  }[];
  // className?: string;
  // containerClassName?: string;
  id: string;
  name: string;
  label?: string;
  defaultValue?: any;
  // value?: any;
  // onChange?: (...args: any) => any;
}
export function SelectBox({
  options = [],
  //   onChange = () => {},
  //   className = "",
  //   containerClassName = "",
  name,
  id,
  //   value,
  label,
  defaultValue,
}: ISelectBox) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <select
          name={name}
          id={id}
          defaultValue={defaultValue}
          className="outline"
        >
          {options.map((option) => (
            <option key={option.name} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
