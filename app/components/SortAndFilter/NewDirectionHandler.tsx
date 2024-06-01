import { useEffect, useState } from "react";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";

type DirectionHandlerProps = {
  initial: string | null;
};
export const NewDirectionHandler = ({ initial }: DirectionHandlerProps) => {
  const [direction, setDirection] = useState(initial);
  //   useEffect(() => {
  //     console.log(111, direction);
  //   }, [direction]);
  return (
    <div>
      {/* fix ts error */}
      <input type="hidden" name="dir" value={direction || ""} />
      <Button
        ariaLabel="ascending"
        style="direction"
        isActive={direction === "asc"}
        onPress={() => {
          setDirection("asc");
        }}
      >
        <Icon name="arrow-up" /> Ascending
      </Button>
      <Button
        ariaLabel="descending"
        style="direction"
        isActive={direction === "desc"}
        onPress={() => {
          setDirection("desc");
        }}
      >
        <Icon name="arrow-down" /> Descending
      </Button>
    </div>
  );
};
