import { useState } from "react";
import { Icon } from "../Layout/Icon";
import { Button } from "../Layout/Button";

type DDTypes = "sort" | "filter" | "custom";

type DropdownMenuProps = {
  children: React.ReactNode;
  type: DDTypes;
};
type ActivatorProps = {
  type: DDTypes;
  handler: () => void;
};

const Activator = ({ type, handler }: ActivatorProps) => {
  switch (type) {
    case "sort":
      return (
        <Button
          aria-label="Sort items"
          onPress={handler}
          style="outlined flex items-center gap-1"
        >
          <Icon name="sort" />
          Sort by
        </Button>
      );
    case "filter":
      return (
        <Button aria-label="Filter items" onPress={handler}>
          <Icon name="filter" />
          Filter
        </Button>
      );
    default:
      return null;
  }
};
export const DropdownMenu = ({ children, type }: DropdownMenuProps) => {
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  //   close by click outside !
  return (
    <div className="relative">
      {/*  add different button activators */}
      <Activator type={type} handler={toggleOpen} />
      {/* rewrite styles !!!!!!!!!!!!!!!!!!!!!!!!! */}
      {/* add difrenet styles by type */}
      <div
        className={`${
          open ? "block" : "hidden"
        } absolute top-8 left-0 min-w-44 border bg-white rounded z-10 p-3`}
      >
        {children}
      </div>
    </div>
  );
};
