interface IRadioButtons {
  inputs: {
    name: string;
    value: any;
  }[];
  groupName: string;
  label?: string;
  // defaultValue?: any;
  selected?: any;
  onChange?: (...args: any) => any;
}
export function RadioButtons({
  inputs = [],
  onChange = () => {},
  groupName,
  selected,
  label,
}: // defaultValue,
IRadioButtons) {
  return (
    <fieldset>
      {/* <legend>Please select your preferred contact method:</legend> */}
      <div>
        {inputs.map((input, index) => (
          <div key={input.name}>
            <input
              type="radio"
              id={`${groupName}Choice${index}`}
              name={groupName}
              value={input.value}
              checked={selected === input.value}
              onChange={onChange}
            />
            <label htmlFor={`${groupName}Choice${index}`}>{input.name}</label>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
// todo - make first one defaultChecked
// todo - add debounces and trottle !!!!!!!!!!!!!!!!!
