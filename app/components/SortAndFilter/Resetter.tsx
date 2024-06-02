type ResetterProps = {
  label: string;
  handler?: () => void;
};
export const Resetter = ({ label, handler = () => {} }: ResetterProps) => {
  // check html
  return (
    <div className="flex items-center justify-between">
      <h4>
        <strong>{label}</strong>
      </h4>
      <button onClick={handler} className="text-[#2f932f]">
        Reset
      </button>
    </div>
  );
};
