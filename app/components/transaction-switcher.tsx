type ISwitcher = {
  type: "incomes" | "expenses";
};
// todo - should be enum
export const TransactionSwitcher = ({ type }: ISwitcher) => {
  return (
    <div>
      <div>select: expense/ income</div>
    </div>
  );
};
