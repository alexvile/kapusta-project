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
  calculatedTransactions?: any;
}
export function RadioButtons({
  inputs = [],
  onChange = () => {},
  groupName,
  selected,
  label,
  calculatedTransactions,
}: // defaultValue,
IRadioButtons) {
  // use memo For calculations
  return (
    <fieldset>
      {/* <legend>Please select your preferred contact method:</legend> */}
      <div>
        {inputs.map((input, index) => (
          <div
            key={input.name}
            className="outline p-1 m-1 my-2 inline-block w-fit"
          >
            <input
              type="radio"
              id={`${groupName}-choice-${index}`}
              name={groupName}
              value={input.value}
              checked={selected === input.value}
              onChange={onChange}
            />
            <label htmlFor={`${groupName}-choice-${index}`}>{input.name}</label>
            <div>{calculatedTransactions[input.value] || 0}</div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
// todo - make first one defaultChecked
// todo - add debounces and trottle !!!!!!!!!!!!!!!!!
