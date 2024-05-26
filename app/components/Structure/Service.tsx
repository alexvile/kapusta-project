import { convertMsToTime } from "~/helpers/calculations";
import type { Service as IService } from "@prisma/client";
import { IOpenModal } from "~/types/types";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";
import { formatToPrice } from "~/helpers/priceFormat";

type ServiceProps = IService & { openModal: IOpenModal };
export const Service = ({ ...props }: ServiceProps) => {
  const { id, name, price, duration, openModal } = props;
  return (
    <li className="my-2 w-fit border flex gap-3 items-center bg-white rounded-md p-1 gap-4">
      <div>
        {/* by default from settings */}
        <Icon size="m" name="beauty" />
        {/* placeholder */}
      </div>
      <div>
        <div>Name: {name}</div>
        <div>Price: {formatToPrice(price)}</div>
        <div>Duration:{convertMsToTime(duration)}</div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Button
          ariaLabel="Edit service"
          style="action"
          onPress={() => openModal({ intent: "edit-service", target: id })}
        >
          <Icon name="edit" />
        </Button>
        <Button ariaLabel="Delete service" style="action">
          <Icon name="delete" />
        </Button>
      </div>
    </li>
  );
};

// archive or remove for business and services
