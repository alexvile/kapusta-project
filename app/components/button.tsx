
interface ButtonProps {
  label: string;
  type: 'submit' | 'reset' | 'button' | undefined;
  style?: string
}

export function Button({ label, type , style = "primary" }: ButtonProps) {
  let s = 'inline-flex items-center text-center justify-center p-3 rounded-2xl font-roboto text-xs uppercase hover:opacity-50 active:opacity-50 focus:opacity-50 transition-opacity '
  switch (style) {
    case 'primary':
      s+='bg-accent text-light drop-shadow-[1px_3px_3px_rgba(255,107,8,0.35)]'
      break;
      case 'secondary':
        s+='bg-bg-main text-secondary drop-shadow-[1px_3px_5px_rgba(82,85,95,0.15)]'
        break;
    default:
      s+='bg-bg-main';
  }
  return (
    <>
     <button type={type} className={s} >
        {label}
    </button>
    <div className=""></div>
    </>
  );
}
