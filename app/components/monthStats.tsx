import type { Expense as IExpense } from "@prisma/client";
import { summarizeTransactions } from "~/helpers/calculations";
export const MonthStats = ({
  expenses,
}: {
  expenses: Pick<IExpense, "value">[];
}) => {
  return (
    <div className="flex justify-evenly items-center bg-white rounded border border-black m-3">
      <div>
        <span>Expenses:</span>
        <span>
          - {expenses.length > 0 ? summarizeTransactions(expenses) : 0} UAH
        </span>
      </div>
      <div>Income: </div>
    </div>
  );
};

// todo - if 0 we should hide "-" and "currency"
