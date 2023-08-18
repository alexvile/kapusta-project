// type ISwitcher = {
//   type: "incomes" | "expenses";
// };
import { useEffect, useRef, useState } from "react";

import {
  ExpenseKindsForRadioButtons,
  IncomeKindsForRadioButtons,
  transactionTypes,
} from "~/utils/constants";
import { SelectBox } from "./select-box";
import { RadioButtons } from "./radio-buttons";
import type { Expense as IExpense, Income as IIncome } from "@prisma/client";
import { summarizeTransactionsByGroup } from "~/helpers/calculations";
import { Graphic } from "./graphic";

// todo - should be enum
export const TransactionSwitcher = ({
  expenses,
  incomes,
}: {
  expenses: Pick<IExpense, "value" | "type">[];
  incomes: Pick<IIncome, "value" | "type">[];
}) => {
  const [transactionType, setTransactionType] = useState("Expenses");
  const [category, setCategory] = useState("ALL");
  const [calculatedExpenses, setCalculatedExpenses] = useState(() =>
    summarizeTransactionsByGroup(expenses)
  );
  const [calculatedIncomes, setCalculatedIncomes] = useState(() =>
    summarizeTransactionsByGroup(incomes)
  );
  // const calcul
  // console.log(222, expenses);
  // todo - smth instead hardcoded 'ALL' ny default or add TS types at least
  // todo - enum to transaction Type

  useEffect(() => {
    setCalculatedExpenses(summarizeTransactionsByGroup(expenses));
    setCalculatedIncomes(summarizeTransactionsByGroup(incomes));
  }, [expenses, incomes]);

  useEffect(() => {
    // console.log(category);
  }, [category]);
  return (
    <div>
      <SelectBox
        name="type"
        options={transactionTypes}
        id="1"
        onChange={(e) => {
          setTransactionType(e.currentTarget.value);
        }}
        value={transactionType || ""}
        // value={transactionType || "" || searchParams.get("sort")}
      />
      {/* todo - separate function for calculated functions maybe use state */}
      <RadioButtons
        groupName={transactionType}
        calculatedTransactions={
          transactionType === "Expenses"
            ? calculatedExpenses
            : calculatedIncomes
        }
        inputs={
          transactionType === "Expenses"
            ? ExpenseKindsForRadioButtons
            : IncomeKindsForRadioButtons
        }
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        selected={category || ""}
      />
      <Graphic
        selectedCategory={category}
        transactionType={transactionType}
        calculatedExpenses={calculatedExpenses}
      />
    </div>
  );
};
/* todo only with 'ALL' types when we group and draw graphic by main types  */

// todo - add drawings by changing category. Do we need another fetch ?? for after changing??
