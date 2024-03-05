import type { Expense as IExpense } from "@prisma/client";
import { TransactionRow } from "./TransactionRow";
import { RowPlaceholder } from "./RowPlaceholder";

type TransactionsTableProps = {
  filteredTransactions: IExpense[];
};
export const TransactionsTable = ({
  filteredTransactions,
}: TransactionsTableProps) => {
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
      <tbody>
        {filteredTransactions?.length > 0 &&
          // temporary use IExpense because we have the same Income and Expense structure
          // in future it can be different
          filteredTransactions.map((transaction: IExpense) => (
            <TransactionRow key={transaction.id} {...transaction} />
          ))}
        {/* need to refactor this */}
        <RowPlaceholder rows={4} />
      </tbody>
    </table>
  );
};
