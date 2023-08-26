// import type { Expense as IExpense } from "@prisma/client";

export function summarizeTransactions(
  transactions: Pick<Transaction, "value">[]
) {
  if (transactions.length < 1) {
    return 0;
  }
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

// export function summarizeTransactionsByGroup(
//   transactions: Pick<Transaction, "value" | "type">[]
// ) {
//   console.log(transactions);
//   // todo - ts check by certain transaction expenses or incomes category
// }

// // todo - add - 0 if no money

// todo - normal TS

// todo - normal naming
export function summarizeTransactionsByGroup(array: any) {
  // todo - change any in normal TS
  let groups = array.reduce(function (r: any, o: any) {
    var type = o.type;
    var sum = o.value;
    r[type] ? (r[type].value += sum) : (r[type] = { type, value: sum });
    return r;
  }, {});
  const resultWithoutTotal = Object.keys(groups).map((k) => groups[k]);

  const summarizedAllTransactions = resultWithoutTotal.reduce(
    (accumulator, currentValue) => accumulator + currentValue.value,
    0
  );
  const resultWithTotal = [
    ...resultWithoutTotal,
    { type: "ALL", value: summarizedAllTransactions },
  ];
  resultWithoutTotal.sort((a, b) => {
    return b.value - a.value;
  });
  // todo - normal ALL option, not hardcoded
  return { resultWithoutTotal, resultWithTotal };
}

// todo - cannot delete transaction with 0 value
