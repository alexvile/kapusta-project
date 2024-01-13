import { Svg } from "./Svg";

export const IconWrapper = ({ name }: { name: string }) => {
  return (
    <span className="[&>svg]:w-full">
      <Svg name={name} />
    </span>
  );
};
