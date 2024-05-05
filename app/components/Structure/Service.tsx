import { convertMsToTime } from "~/helpers/calculations";
import type { Service as IService } from "@prisma/client";
import { IOpenModal } from "~/types/types";

type ServiceProps = IService & { openModal: IOpenModal };
export const Service = ({ ...props }: ServiceProps) => {
  const { id, name, price, duration, openModal } = props;
  return (
    <li className="pl-6 w-fit border">
      <div>Name: {name}</div>
      <div>Price: {price}&nbsp;UAH</div>
      <div>Duration:{convertMsToTime(duration)}</div>
      <button
        type="button"
        className="bg-slate-200 p-2"
        onClick={() => openModal({ intent: "edit-service", target: id })}
      >
        edit
      </button>
    </li>
  );
};
