import { LoaderFunction, redirect, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getAllExpensesByUserId } from "~/utils/transaction.server";
import type { Expense as IExpense } from "@prisma/client";
import { Expense } from "~/components/expense";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { userId } = params;
  // console.log(params);

  if (typeof userId !== "string") {
    return redirect("/home");
    // todo - right redirect !!!
  }
  const allExpenses = await getAllExpensesByUserId(userId);
  return json({ allExpenses });
};

export default function Expenses() {
  const { allExpenses } = useLoaderData();
  // console.log(allExpenses);
  return (
    <>
      <div>Expenses</div>
      <ul>
        {/* todo check if array > 1 */}
        {allExpenses.map((expense: IExpense) => (
          <Expense key={expense.id} {...expense} />
        ))}
      </ul>
    </>
  );
}

// todo - use $dynamic only for transaction, ot for user
// todo - pass all props using {... props}

// https://medium.com/coding-at-dawn/how-to-pass-all-props-to-a-child-component-in-react-bded9e38bb62
