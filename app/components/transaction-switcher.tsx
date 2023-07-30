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

// todo - should be enum
export const TransactionSwitcher = () => {
  const [transactionType, setTransactionType] = useState("Expenses");
  const [category, setCategory] = useState("ALL");

  // todo - smth instead hardcoded 'ALL' ny default or add TS types at least
  // todo - enum to transaction Type
  useEffect(() => {
    console.log(222, category);
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
      <RadioButtons
        groupName={transactionType}
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
    </div>
  );
};
