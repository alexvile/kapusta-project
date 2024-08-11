import { useSearchParams } from "@remix-run/react";
import { DropdownMenu } from "./DropdownMenu";
import { DateRange } from "./DateRange";
import { SelectBox } from "../select-box";
import { Resetter } from "./Resetter";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Card,
  Typography,
} from "@material-tailwind/react";
import { Icon } from "../Layout/Icon";
import { MyInput } from "./Test";

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
    // <DropdownMenu type="filter">
    //   Filter block
    //   <Divider />
    //   <Resetter label="Date range" />
    //   <DateRange initial={getInterval()} />
    //   <Resetter label="Category" />
    //   <SelectBox
    //     name="category"
    //     options={categories}
    //     defaultValue={getCategory()}
    //   />
    // </DropdownMenu>

    <Menu>
      <MenuHandler>
        <Button
          aria-label="Filter items"
          variant="outlined"
          size="sm"
          className="flex items-center gap-1"
        >
          <Icon name="filter" />
          Filter
        </Button>
      </MenuHandler>
      <MenuList>
        <MenuItem>1</MenuItem>
        {/* <Resetter label="Date range" />
        <Resetter label="Date range" />
        <DateRange initial={getInterval()} />
        <Resetter label="Category" />
        <SelectBox
          name="category"
          options={categories}
          defaultValue={getCategory()}
        /> */}
        {/* <MenuItem>Menu Item 1</MenuItem> */}
        {/* <hr className="my-3" /> */}
        {/* <Resetter label="Date range" /> */}
        {/* <MenuItem>Menu Item 2</MenuItem> */}
        {/* <Resetter label="Date range" />
        <DateRange initial={getInterval()} />
        <Resetter label="Category" />
        <SelectBox
          name="category"
          options={categories}
          defaultValue={getCategory()}
        /> */}
      </MenuList>
    </Menu>
  );
};
