import { Svg } from "../Svg";

type IconProps = {
  name: string;
  size?: "s" | "m" | "l";
};
export function Icon({ name, size = "s" }: IconProps) {
  let c_size = "";
  switch (size) {
    case "s":
      c_size = "w-4 h-4";
      break;
    case "m":
      c_size = "w-6 h-6";
      break;
    case "l":
      c_size = "w-8 h-8";
      break;
    default:
      break;
  }
  return (
    <span className={`${c_size} block [&>svg]:w-full [&>svg]:h-full`}>
      <Svg name={name} />
    </span>
  );
}
