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
    case "outlined":
      _style = `${
        isActive ? "outline outline-2 outline-offset-2" : ""
      } rounded-lg justify-between border border-black focus:outline focus:outline-2 outline-offset-2 `;
      break;
    case "direction":
      _style = "w-full rounded";
      break;
    case "sort-and-filter":
      _style = "";
    default:
      break;
  }
  // active or pressed styles
  // disabled styles
  // loading styles

  // const baseStyles =
  // "leading-none p-1 hover:opacity-70 transition-opacity flex items-center gap-1";
  const baseStyles =
    "leading-none p-1 hover:opacity-70 transition-opacity flex items-center gap-1";
  // add basic animations
  return (
    <button
      type={type}
      onClick={onPress}
      name={name}
      value={value}
      aria-label={ariaLabel}
      className={_style + " " + baseStyles}
    >
      {children}
    </button>
  );
}
