type AccordionContentProps = {
  children: React.ReactNode;
  isOpen: Boolean;
};
export const AccordionContent = ({
  children,
  isOpen,
}: AccordionContentProps) => {
  return (
    <div
      className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }`}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
};
