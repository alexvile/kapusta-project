import { Svg } from "../Svg";

export function Icon({ name }: { name: string }) {
  return (
    <span className="block w-4 h-4 [&>svg]:w-full [&>svg]:h-full">
      <Svg name={name} />
    </span>
  );
}
