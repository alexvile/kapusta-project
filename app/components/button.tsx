interface ButtonProps {
  label: string;
  type: "submit" | "reset" | "button";
  style?: string;
  name?: string;
  value?: string;
  className?: string;
  onClick?: () => void;
}
// todo: use Pick to get some of props
// todo - onPress insteda onClick
export function Button({
  label,
  type = "submit",
  style = "primary",
  name,
  value,
  className,
  onClick,
}: ButtonProps) {
  let s =
    "inline-flex items-center text-center justify-center px-4 py-3 min-w-[7rem] font-bold tracking-wide rounded-2xl font-roboto text-xs uppercase hover:opacity-50 active:opacity-50 focus:opacity-50 transition-opacity ";
  switch (style) {
    case "primary-shadowed":
      s +=
        "bg-accent text-light drop-shadow-[1px_3px_3px_rgba(255,107,8,0.35)]";
      break;
    case "secondary-shadowed":
      s +=
        "bg-mainBg text-secondary drop-shadow-[1px_3px_5px_rgba(82,85,95,0.15)]";
      break;
    case "primary":
      s += "bg-accent text-light";
      break;
    case "secondary":
      s += "bg-light text-secondary border-solid border-2 border-bg-input";
      break;
    default:
      s += "bg-mainBg";
  }
  return (
    <>
      <button
        type={type}
        className={`${s} ${className}`}
        name={name}
        value={value}
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
}
