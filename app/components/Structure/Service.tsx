import { convertMsToTime } from "~/helpers/calculations";
import type { Service as IService } from "@prisma/client";
import { IOpenModal } from "~/types/types";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";

type ServiceProps = IService & { openModal: IOpenModal };
export const Service = ({ ...props }: ServiceProps) => {
  const { id, name, price, duration, openModal } = props;
  return (
    <li className="w-fit border flex gap-3 items-center">
      <div>
        {/* by default from settings */}
        <Icon size="m" name="beauty" />
        {/* placeholder */}
      </div>
      <div>
        <div>Name: {name}</div>
        <div>Price: {price}&nbsp;UAH</div>
        <div>Duration:{convertMsToTime(duration)}</div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Button
          style="round"
          onPress={() => openModal({ intent: "edit-service", target: id })}
        >
          <Icon name="edit" />
        </Button>
        <Button style="round">
          <Icon name="delete" />
        </Button>
      </div>
    </li>
  );
};

// archive or remove for business and services
