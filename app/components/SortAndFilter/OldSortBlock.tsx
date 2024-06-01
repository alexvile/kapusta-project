import { useSearchParams } from "@remix-run/react";
import { SelectBox } from "../select-box";
import { DirectionHandler } from "./DirectionHandler";
import { useEffect, useState } from "react";

// use local state and functions or use props from parent ?????????
export const OldSortBlock = ({ options }: any) => {
  let [searchParams] = useSearchParams();
  const [sortOption, setSortOption] = useState(() => searchParams.get("sort"));
  const [direction, setDirection] = useState(() => searchParams.get("dir"));

  // useEffect(() => {
  //   // todo = at the start value = undefined, need default value
  //   console.log(sortOption, direction);
  // }, [sortOption, direction]);

  return (
    <div className="flex gap-2 items-center justify-start px-2 py-1 border-r-2 border-inputBorder">
      <p>Sort By:</p>
      <SelectBox
        name="sort"
        options={options}
        onChange={(e) => {
          setSortOption(e.currentTarget.value);
        }}
        value={sortOption}
      />
      <DirectionHandler value={direction} setDirection={setDirection} />
    </div>
  );
};
