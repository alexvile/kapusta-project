import { IBusinessWithServices, IOpenModal } from "~/types/types";
import { Service } from "./Service";
import { useEffect, useState } from "react";
import type { Service as IService } from "@prisma/client";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";
import { AccordionBtn } from "../Layout/AccordionBtn";
import { AccordionContent } from "../Layout/AccordionContent";

type BusinessProps = IBusinessWithServices & {
  openModal: IOpenModal;
  allAccOpen: Boolean;
};

export const BusinessWithServices = ({ ...props }: BusinessProps) => {
  // todo REFACTOR!!!!!
  const { name, notes, services, id, openModal, allAccOpen } = props;
  const [showCategories, setShowCategories] = useState(allAccOpen);
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };
  useEffect(() => {
    setShowCategories(allAccOpen);
  }, [allAccOpen]);

  return (
    <li className="pl-3 my-2">
      {/* <details className="transition-all">
        <summary>Details</summary>
        Something small enough to escape casual notice.
      </details> */}

      <div className="flex items-center justify-between border-b-2 pb-2">
        <div>
          <h3 className="font-bold">{name}</h3>
          {/* use notes as tooltip */}
          <div>{notes}</div>
        </div>

        {/* actions */}
        <div className="flex">
          {services.length > 0 && (
            <AccordionBtn isOpen={showCategories} handler={toggleCategories} />
          )}
          <Button
            style="action"
            ariaLabel="Edit business"
            onPress={() =>
              openModal({
                intent: "edit-business",
                target: id,
                fields: { name, notes },
              })
            }
          >
            <Icon name="edit" />
          </Button>
          <Button
            style="action"
            ariaLabel="Add service"
            onPress={() => openModal({ intent: "create-service", target: id })}
          >
            <Icon name="plus" />
          </Button>
        </div>
      </div>
      {services.length > 0 && (
        <AccordionContent isOpen={showCategories}>
          <ul>
            {services.map((s: IService) => (
              <Service key={s.id} {...s} openModal={openModal} />
            ))}
          </ul>
        </AccordionContent>
      )}
    </li>
  );
};
