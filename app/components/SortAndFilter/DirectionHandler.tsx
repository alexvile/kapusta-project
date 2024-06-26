import { useState } from "react";
import { Svg } from "../Svg";
import { DirectionType } from "~/types/types";
// todo - SVG container
interface DirectionHandlerProps {
  // todo - ts check
  // value: DirectionType | null;
  // setDirection: React.Dispatch<React.SetStateAction<DirectionType | null>>;
  value: string | null;
  setDirection: React.Dispatch<React.SetStateAction<string | null>>;
}
export const DirectionHandler = ({
  value,
  setDirection,
}: DirectionHandlerProps) => {
  const getInitial = () => {
    return value === "desc" ? true : false;
  };
  const [checked, setChecked] = useState<boolean>(() => getInitial());
  const handleChange = () => {
    setChecked(!checked);
    setDirection(checked ? "desc" : "asc");
  };
  // todo - ts check
  return (
    <div className="flex">
      <input type="hidden" name="dir" defaultValue={checked ? "desc" : "asc"} />
      <label className="cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          value={checked}
          onChange={handleChange}
        />
        <span>
          {checked ? <Svg name="descending" /> : <Svg name="ascending" />}
        </span>
      </label>
    </div>
  );
};

// todo - hover, transition
