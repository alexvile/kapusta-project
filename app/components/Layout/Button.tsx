interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onPress?: () => void;
  children?: React.ReactNode;
  name?: string;
  value?: string;
  ariaLabel?: string;
  style?: string;
  isActive?: boolean;
}

export function Button({
  type = "button",
  onPress,
  children,
  name,
  value,
  ariaLabel,
  isActive,
  style = "",
}: ButtonProps) {
  // need refactor
  //  button when pressed
  let _style = "";
  switch (style) {
    case "action":
      _style = "rounded-lg p-1.5 bg-slate-200 justify-between";
      break;
    case "direction":
      _style = "w-full rounded";
      break;
    default:
      break;
  }
  // add basic animations
  return (
    <button
      type={type}
      onClick={onPress}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={`${_style} ${
        isActive ? "bg-slate-200" : ""
      } leading-none p-1 hover:opacity-70 transition-opacity flex items-center gap-1 `}
    >
      {children}
    </button>
  );
}
