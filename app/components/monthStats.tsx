import type { Expense as IExpense, Income as IIncome } from "@prisma/client";
import { summarizeTransactions } from "~/helpers/calculations";
export const MonthStats = ({
  expenses,
  incomes,
}: {
  expenses: Pick<IExpense, "value">[];
  incomes: Pick<IIncome, "value">[];
}) => {
  // todo functions for calulations
  return (
    <div className="flex justify-evenly items-center bg-white rounded border border-black m-3">
      <div>
        <span>Expenses:</span>
        <span>
          - {expenses.length > 0 ? summarizeTransactions(expenses) : 0} UAH
        </span>
      </div>
      <div>Income: </div>
      <span>
        + {incomes.length > 0 ? summarizeTransactions(incomes) : 0} UAH
      </span>
    </div>
  );
};

// todo - if 0 we should hide "-" and "currency"
