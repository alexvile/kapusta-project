import type { Expense as IExpense } from "@prisma/client";
import { Summary } from "../summary";
import { TransactionsTable } from "./TransactionsTable";

type TransactionsMain = {
  filteredTransactions: IExpense[];
  sixMonthsTransactions: Pick<IExpense, "createdTime" | "value">[];
};
export const TransactionsMain = ({
  filteredTransactions,
  sixMonthsTransactions,
}: TransactionsMain) => {
  return (
    <div className="flex gap-3 bg-white">
      <TransactionsTable filteredTransactions={filteredTransactions} />
      <Summary transactions={sixMonthsTransactions} />
    </div>
  );
};
