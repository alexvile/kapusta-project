import { useSearchParams } from "@remix-run/react";
import { DropdownMenu } from "./DropdownMenu";
import { DateRange } from "./DateRange";
import { Divider } from "../Layout/Divider";
import { SelectBox } from "../select-box";
import { Resetter } from "./Resetter";

// todo maybe we will have not only one categories group to filter

type FilterBlockProps = {
  categories: any;
};
export const FilterBlock = ({ categories }: FilterBlockProps) => {
  let [searchParams] = useSearchParams();

  // uncontrolled logic
  const getInterval = () => {
    return { from: searchParams.get("from"), to: searchParams.get("to") };
  };
  const getCategory = () => {
    return searchParams.get("category");
  };

  return (
    <DropdownMenu type="filter">
      Filter block
      <Divider />
      <Resetter label="Date range" />
      <DateRange initial={getInterval()} />
      <Resetter label="Category" />
      <SelectBox
        name="category"
        options={categories}
        defaultValue={getCategory()}
      />
    </DropdownMenu>
  );
};
