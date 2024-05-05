import { convertMsToTime } from "~/helpers/calculations";
import type { Service as IService } from "@prisma/client";

export const Service = ({ ...props }: IService) => {
  const { name, price, duration } = props;
  return (
    <li className="pl-6 w-fit border">
      <div>Name: {name}</div>
      <div>Price: {price}&nbsp;UAH</div>
      <div>Duration:{convertMsToTime(duration)}</div>
    </li>
  );
};
