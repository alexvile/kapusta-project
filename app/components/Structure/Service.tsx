import { convertMsToTime } from "~/helpers/calculations";

export const Service = ({ ...props }) => {
  const { name, price, duration } = props;
  return (
    <li className="pl-6 w-fit border">
      <div>Name: {name}</div>
      <div>Price: {price}&nbsp;UAH</div>
      <div>Duration:{convertMsToTime(duration)}</div>
    </li>
  );
};
