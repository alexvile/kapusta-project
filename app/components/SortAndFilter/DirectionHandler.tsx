import { useState } from "react";
import { Svg } from "../Svg";
// todo - SVG container
export const OrderHandler = ({ value, handler }) => {
  const getInitial = () => {
    return value === "desc" ? true : false;
  };
  const [checked, setChecked] = useState(() => getInitial());
  const handleChange = () => {
    setChecked(!checked);
  };
  // todo - ts chec
  return (
    <div className="flex pt-3">
      <input
        type="hidden"
        name="dir"
        value={checked ? "desc" : "asc"}
        onChange={handler}
      />

      <label>
        <input
          type="checkbox"
          className="hidden"
          value={checked}
          onChange={handleChange}
        />
        {checked ? (
          <span>
            <Svg name="descending" />
          </span>
        ) : (
          <span>
            <Svg name="ascending" />
          </span>
        )}
      </label>
    </div>
  );
};
