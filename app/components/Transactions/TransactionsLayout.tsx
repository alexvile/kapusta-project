export const TransactionsLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white p-8 rounded-r-[30px] rounded-bl-[30px]">
      {children}
    </div>
  );
};
