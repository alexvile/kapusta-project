import { useNavigate, useSearchParams } from "@remix-run/react";
// import { sortOptions } from "~/utils/constants";
import { useEffect, useState } from "react";
import { SelectBox } from "./select-box";
import { dirOptions, sortOptions } from "~/utils/constants";

export function SortAndFilterBar() {
  const [dropDown, setDropDown] = useState();
  const [direction, setDirection] = useState();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("filter");
    searchParams.delete("sort");
    // navigate("/home");
  };

  useEffect(() => {
    // todo = at the start value = undefined, need default value

    console.log(dropDown, direction);
  }, [dropDown, direction]);

  return (
    <div className="bg-white">
      Sort and filter
      <form>
        <SelectBox
          name="sort"
          options={sortOptions}
          id="1"
          onChange={(e) => {
            setDropDown(e.currentTarget.value);
          }}
          value={dropDown}
        />
        <SelectBox
          name="dir"
          options={dirOptions}
          id="2"
          onChange={(e) => {
            setDirection(e.currentTarget.value);
          }}
          value={direction}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
