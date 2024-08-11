import {
  Radio,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { useId } from "react";
import { ISortAndSelectOptions } from "~/types/types";

type RadioGroupProps = {
  options: ISortAndSelectOptions;
  groupName: string;
  initial: string | null;
};
export const ListOfRadio = ({
  options,
  groupName,
  initial,
}: RadioGroupProps) => {
  const id = useId();

  return (
    <List>
      {/* <legend>Please select your preferred contact method:</legend> */}
      {options.map(({ name, value }, index) => (
        <ListItem key={index} className="p-0">
          <label
            htmlFor={name + "-" + index}
            className="flex w-full cursor-pointer items-center px-3 py-2"
          >
            <ListItemPrefix className="mr-3">
              <Radio
                name={groupName}
                label={name}
                defaultChecked={initial === value}
                value={value}
                id={name + "-" + index}
                ripple={false}
                className="hover:before:opacity-0"
                containerProps={{
                  className: "p-0",
                }}
              />
            </ListItemPrefix>
          </label>
        </ListItem>
      ))}
    </List>
  );
};
