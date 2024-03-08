import type { Expense as IExpense, Income as IIncome } from "@prisma/client";
import { summarizeTransactions } from "~/helpers/calculations";
import { formatToPrice } from "~/helpers/priceFormat";
export const MonthStats = ({
  expenses,
  incomes,
}: {
  expenses: Pick<IExpense, "value">[];
  incomes: Pick<IIncome, "value">[];
}) => {
  // todo functions for calulations
  const getMonthTransactions = (
    transactions: Pick<IExpense, "value">[] | Pick<IIncome, "value">[]
  ) => {
    return formatToPrice(
      transactions.length > 0 ? summarizeTransactions(transactions) : 0
    );
  };
  return (
    <div className="flex py-[7px] gap-5 items-center justify-center bg-white rounded-[30px] drop-shadow-[0px_10px_60px_0px_rgba(170,178,197,0.20)]">
      <div className="pr-5 border-r">
        <span className="text-secondary font-roboto text-mmm font-bold pr-4">
          Expenses:
        </span>
        <span className="text-expenses2 text-mmm tracking-big font-roboto font-bold">
          - {getMonthTransactions(expenses)}
        </span>
      </div>
      <div>
        <span className="text-secondary font-roboto text-mmm font-bold pr-4">
          Income:{" "}
        </span>
        <span className="text-incomes text-mmm tracking-big font-roboto font-bold">
          + {getMonthTransactions(incomes)}
        </span>
      </div>
    </div>
  );
};

// todo - if 0 we should hide "-" and "currency"
