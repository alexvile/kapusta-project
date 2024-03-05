import type { Expense as IExpense } from "@prisma/client";
import { Summary } from "../summary";
import { TransactionsTable } from "./TransactionsTable";
import { TransactionType } from "~/types/types";

type TransactionsMain = {
  filteredTransactions: IExpense[];
  sixMonthsTransactions: Pick<IExpense, "createdTime" | "value">[];
  transactionType: TransactionType;
};
export const TransactionsMain = ({
  filteredTransactions,
  sixMonthsTransactions,
  transactionType,
}: TransactionsMain) => {
  return (
    <div className="flex gap-3 bg-white">
      <TransactionsTable filteredTransactions={filteredTransactions} />
      <Summary transactions={sixMonthsTransactions} />
    </div>
  );
};
