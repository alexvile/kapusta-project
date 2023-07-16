// import type { Expense as IExpense } from "@prisma/client";

export function summarizeTransactions(
  transactions: Pick<Transaction, "value">[]
) {
  const { value } = transactions.reduce(
    (
      accumulator: Pick<Transaction, "value">,
      currentValue: Pick<Transaction, "value">
    ) => ({
      value: accumulator?.value + currentValue?.value,
    })
  );
  return value;
}

// todo file naming in project
