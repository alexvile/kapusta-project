import { useId } from "react";
import { ISortAndSelectOptions } from "~/types/types";

type RadioGroupProps = {
  options: ISortAndSelectOptions;
  groupName: string;
  initial: string | null;
};
export const RadioGroup = ({
  options,
  groupName,
  initial,
}: RadioGroupProps) => {
  const id = useId();

  // todo add react state
  // add default value etc
  // add handler and value
  return (
    <fieldset>
      {/* <legend>Please select your preferred contact method:</legend> */}
      {options.map(({ name, value }, index) => (
        <div key={index} className="flex gap-1 my-0.5">
          <input
            type="radio"
            id={id + index}
            name={groupName}
            value={value}
            defaultChecked={initial === value}
          />
          <label htmlFor={id + index}>{name}</label>
        </div>
      ))}
    </fieldset>
  );
};
