import { useId } from "react";

interface ISelectBox {
  options: {
    name: string;
    value: any;
  }[];
  hasEmptyOption?: boolean;
  // className?: string;
  // containerClassName?: string;

  name: string;
  label?: string;
  defaultValue?: any;
  value?: any;
  onChange?: (...args: any) => any;
}
export function SelectBox({
  options = [],
  onChange = () => {},
  hasEmptyOption = false,
  //   className = "",
  //   containerClassName = "",
  name,
  value,
  label,
  defaultValue,
}: ISelectBox) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <select
          name={name}
          id={id}
          defaultValue={defaultValue}
          onChange={onChange}
          // value={value || ""}
        >
          {hasEmptyOption && <option value="">Please select</option>}
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

// todo - refactor all components !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
