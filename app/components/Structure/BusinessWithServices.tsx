import { IBusinessWithServices, IOpenModal } from "~/types/types";
import { Service } from "./Service";
import { useState } from "react";
import type { Service as IService } from "@prisma/client";

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
          <button
            type="button"
            className="mx-2 px-2 outline"
            onClick={toggleCategories}
          >
            {showCategories ? "hide" : "show"}
          </button>
        )}
        <button
          name="create-service"
          // todo - need refactor
          data-parent-id={id}
          className="border mx-2 px-2 bg-slate-300"
          onClick={openModal}
        >
          +
        </button>
        {/* <button
        name="edit-business"
        // todo - need refactor
        data-parent-id={e.id}
        className="border mx-2 px-2 bg-slate-300"
        onClick={(e) => openModal(e.target)}
      >
        edit
      </button> */}
      </div>
      {services.length > 0 && showCategories && (
        <ul>
          {services.map((s: IService) => (
            <Service key={s.id} {...s} openModal={openModal} />
          ))}
        </ul>
      )}
    </li>
  );
};
