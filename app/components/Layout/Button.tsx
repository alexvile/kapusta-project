interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onPress?: () => void;
  children?: React.ReactNode;
  name?: string;
  value?: string;
  ariaLabel?: string;
  style?: string;
  custom?: string;
}

export function Button({
  type = "button",
  onPress,
  children,
  name,
  value,
  ariaLabel,
  style,
  custom,
}: ButtonProps) {
  // need refactor
  let st = "";
  switch (style) {
    case "round":
      st = "rounded-full p-1.5";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onPress}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={`${custom} ${st} bg-slate-200 p-1 hover:opacity-70 mx-1 `}
    >
      {children}
    </button>
  );
}
