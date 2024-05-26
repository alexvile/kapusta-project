interface ButtonProps {
  type?: "submit" | "reset" | "button";
  onPress?: () => void;
  children?: React.ReactNode;
  name?: string;
  value?: string;
  ariaLabel?: string;
  style?: string;
}

export function Button({
  type = "button",
  onPress,
  children,
  name,
  value,
  ariaLabel,
  style = "",
}: ButtonProps) {
  // need refactor
  let _style = "";
  switch (style) {
    case "action":
      _style = "rounded-lg p-1.5";
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
      className={`${_style} leading-none bg-slate-200 p-1 hover:opacity-70 transition-opacity mx-1 flex items-center justify-between gap-1 `}
    >
      {children}
    </button>
  );
}
