import { useSearchParams } from "@remix-run/react";
import { Icon } from "../Layout/Icon";
import { RadioGroup } from "../Layout/RadioGroup";
import { ISortAndSelectOptions } from "~/types/types";
import { NewDirectionHandler } from "./NewDirectionHandler";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Radio,
} from "@material-tailwind/react";
import { ListOfRadio } from "../Layout/ListOfRadio";
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
    // <DropdownMenu type="sort">
    //   {/* <fieldset></fieldset> */}
    //   {/* fieldset and legend here */}
    //   Sort by
    //   {/* use divider or borders ? */}
    //   <Divider />
    //   <RadioGroup
    //     options={options}
    //     groupName="sort"
    //     initial={getSortOption()}
    //   />
    //   <Divider />
    //   <NewDirectionHandler initial={getDirection()} />
    // </DropdownMenu>

    <Menu>
      <MenuHandler>
        <Button
          aria-label="Sort items"
          variant="outlined"
          size="sm"
          className="flex items-center gap-1"
        >
          <Icon name="sort" />
          Sort by
        </Button>
      </MenuHandler>
      <MenuList>
        <hr className="my-3" />

        {options.map(({ name, value }, index) => (
          <MenuItem key={index}>{name}</MenuItem>
        ))}
        {/* <RadioGroup
          options={options}
          groupName="sort"
          initial={getSortOption()}
        /> */}
        {/* <NewDirectionHandler initial={getDirection()} /> */}

        <ListOfRadio
          options={options}
          groupName="sort"
          initial={getSortOption()}
        />
      </MenuList>
    </Menu>
  );
};
