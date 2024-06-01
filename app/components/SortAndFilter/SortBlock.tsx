import { useSearchParams } from "@remix-run/react";
import { useState } from "react";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";
import { RadioGroup } from "../Layout/RadioGroup";
import { ISortAndSelectOptions } from "~/types/types";
import { Divider } from "../Layout/Divider";
import { NewDirectionHandler } from "./NewDirectionHandler";
import { DropdownMenu } from "./DropdownMenu";

// use local state and functions or use props from parent ?????????
type SortBlockProps = {
  options: ISortAndSelectOptions;
};
export const SortBlock = ({ options }: SortBlockProps) => {
  let [searchParams] = useSearchParams();

  // const [sortOption, setSortOption] = useState(() => searchParams.get("sort"));
  // const [direction, setDirection] = useState(() => searchParams.get("dir"));
  // uncontrolled logic
  const getSortOption = () => {
    return searchParams.get("sort");
  };
  const getDirection = () => {
    return searchParams.get("dir");
  };

  // useEffect(() => {
  //   // todo = at the start value = undefined, need default value
  //   console.log(sortOption, direction);
  // }, [sortOption, direction]);

  return (
    <DropdownMenu type="sort">
      Sort by
      <Divider />
      <RadioGroup
        options={options}
        groupName="sort"
        initial={getSortOption()}
      />
      <Divider />
      <NewDirectionHandler initial={getDirection()} />
    </DropdownMenu>
  );
};
