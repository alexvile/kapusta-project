import { IBusinessWithServices, IOpenModal } from "~/types/types";
import { Service } from "./Service";
import { useState } from "react";
import type { Service as IService } from "@prisma/client";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";

type BusinessProps = IBusinessWithServices & { openModal: IOpenModal };

export const BusinessWithServices = ({ ...props }: BusinessProps) => {
  // todo REFACTOR!!!!!
  const { name, services, id, openModal } = props;
  const [showCategories, setShowCategories] = useState(true);
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <li className="pl-3 my-2">
      <div className="flex items-center justify-start">
        {name}
        {services.length > 0 && (
          <Button onPress={toggleCategories} style="round">
            <span
              className={`transition-transform block ${
                showCategories ? "rotate-180" : ""
              }`}
            >
              <Icon name="chevron-down" />
            </span>
          </Button>
        )}
        <Button
          style="round"
          ariaLabel="Edit business"
          onPress={() => openModal({ intent: "edit-business", target: id })}
        >
          <Icon name="edit" />
        </Button>
        <Button
          style="round"
          ariaLabel="Add service"
          onPress={() => openModal({ intent: "create-service", target: id })}
        >
          <Icon name="plus" />
        </Button>
      </div>
      {services.length > 0 && (
        <ul
          className={` ml-6 transition-transform ${
            showCategories ? "max-h-auto" : "max-h-0 overflow-hidden"
          }`}
        >
          {services.map((s: IService) => (
            <Service key={s.id} {...s} openModal={openModal} />
          ))}
        </ul>
      )}
    </li>
  );
};
