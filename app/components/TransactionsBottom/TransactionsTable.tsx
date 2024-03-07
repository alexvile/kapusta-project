import type { Expense as IExpense } from "@prisma/client";
import { TransactionRow } from "./TransactionRow";
import { RowPlaceholder } from "./RowPlaceholder";
import { TransactionType } from "~/types/types";

type TransactionsTableProps = {
  filteredTransactions: IExpense[];
  transactionType: TransactionType;
};
export const TransactionsTable = ({
  filteredTransactions,
  transactionType,
}: TransactionsTableProps) => {
  const getPlaceholderRowsQty = (existingRows: number) => {
    const MinRowsQty = 8;
    return MinRowsQty - existingRows < 0 ? 0 : 8 - existingRows;
  };

  return (
    <table className="table-auto rounded-t-3xl overflow-hidden">
      <thead className="bg-tableBorder border-2 border-tableBorder">
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sum</th>
          <th>Ed</th>
          <th>Del</th>
        </tr>
      </thead>
      {/* need refactor */}
      <tbody
        className={`[&_td]:font-roboto [&_td]:text-secondary [&_td]:text-label [&_.value]:font-bold ${
          transactionType === "expenses"
            ? "[&_.value]:text-expenses"
            : "[&_.value]:text-incomes"
        }`}
      >
        {filteredTransactions?.length > 0 &&
          // temporary use IExpense because we have the same Income and Expense structure
          // in future it can be different
          filteredTransactions.map((transaction: IExpense) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))}
        {/* need to refactor this */}
        <RowPlaceholder
          rows={getPlaceholderRowsQty(filteredTransactions?.length)}
        />
      </tbody>
    </table>
  );
};
