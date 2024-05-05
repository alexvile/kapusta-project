interface ButtonProps {
  type?: "submit" | "reset" | "button";
  name?: string;
  ariaLabel?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export function NewButton({
  type = "submit",
  name,
  ariaLabel,
  onPress,
  children,
}: ButtonProps) {
  return (
    <button type={type} name={name} onClick={onPress} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
