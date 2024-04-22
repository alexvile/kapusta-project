import { IBusinessWithServices } from "~/types/types";
import { Service } from "./Service";

export const BusinessWithServices = ({ ...props }: IBusinessWithServices) => {
  const { name, services } = props;
  return (
    <li className="pl-3 my-2">
      <div className="flex items-center justify-start">
        {name}
        <button
          name="create-service"
          // todo - need refactor
          // data-parent-id={e.id}
          className="border mx-2 px-2 bg-slate-300"
          // onClick={(e) => openModal(e.target)}
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
      {services.length > 0 && (
        <ul>
          {services.map((s) => (
            <Service key={s.id} {...s} />
          ))}
        </ul>
      )}
    </li>
  );
};
