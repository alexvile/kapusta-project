import type { Expense as IExpense } from "@prisma/client";
import { TransactionRow } from "./TransactionRow";

type TransactionsTableProps = {
  filteredTransactions: IExpense[];
};
export const TransactionsTable = ({
  filteredTransactions,
}: TransactionsTableProps) => {
  return (
    <table className="table-auto rounded-t-3xl overflow-hidden">
      <thead className="bg-mainBg">
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Sum</th>
          <th>Edit</th>
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
      </tbody>
    </table>
  );
};
