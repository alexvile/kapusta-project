import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { requireUserId } from "~/utils/session.server";
import {
  getAllExpensesByUserId,
  getAllIncomesByUserId,
} from "~/utils/transaction.server";

export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await requireUserId(request);

  return json({});
};

// todo: decide if use requireuserID or getUserId
export default function Clients() {
  return (
    <>
      <div>Clients</div>
      <div>
        <Link to="new">Add client +</Link>
      </div>
      <div>
        Client list
        <ul>
          {/* {filteredExpenses?.length > 0 &&
              filteredExpenses.map((expense: IExpense) => (
                <Expense key={expense.id} {...expense} />
              ))} */}
        </ul>
      </div>
      <Outlet />
    </>
  );
}

// pagination
