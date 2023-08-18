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

// export function summarizeTransactionsByGroup(
//   transactions: Pick<Transaction, "value" | "type">[]
// ) {
//   console.log(transactions);
//   // todo - ts check by certain transaction expenses or incomes category
// }

// // todo - add - 0 if no money

// todo - normal TS
function sumGroupedTransactions(obj: any) {
  let sum = 0;
  for (let transactionValue of Object.values(obj)) {
    sum += transactionValue;
  }
  return sum;
}

// todo - normal naming
export function summarizeTransactionsByGroup(array: any) {
  // todo - change any in normal TS
  let groups = array.reduce(function (r: any, o: any) {
    var type = o.type;
    var sum = o.value;
    r[type] ? (r[type] += sum) : (r[type] = sum);
    return r;
  }, {});
  // todo - normal ALL option, not hardcoded
  groups.ALL = sumGroupedTransactions(groups);
  return groups;
}
// console.log(summarizeTransactionsByGroup(arr));
