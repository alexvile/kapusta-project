import { Button } from "./Button";
import { Icon } from "./Icon";

type AccordionBtnProps = {
  isOpen: Boolean;
  handler: () => void;
};
// todo - migrate this to Layout
export const AccordionBtn = ({ isOpen, handler }: AccordionBtnProps) => {
  return (
    <Button
      onPress={handler}
      style="action"
      ariaLabel={isOpen ? "Collapse" : "Expand"}
    >
      {/* temporary solution */}
      {/* update accordion logic */}
      <span
        className={`h-4 transition-transform flex items-center justify-center ${
          isOpen ? "rotate-180" : ""
        }`}
      >
        <Icon name="chevron-down" />
      </span>
    </Button>
  );
};
