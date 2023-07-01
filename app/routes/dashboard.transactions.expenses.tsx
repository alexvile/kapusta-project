import {
  LoaderFunction,
  redirect,
  json,
  LoaderArgs,
  ActionArgs,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  deleteExpenseById,
  getAllExpensesByUserId,
} from "~/utils/transaction.server";
import type { Expense as IExpense } from "@prisma/client";
import { Expense } from "~/components/expense";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  const allExpenses: IExpense[] = await getAllExpensesByUserId(userId);
  return json({ allExpenses });
};

//  todo: create separate route or logic to delete !!!!!!!!!!!!!!!!

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  // console.log(form);
  // console.log(form.get("intent"));
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const expenseId = form.get("id");
  // const userId = await requireUserId(request);
  // const joke = await db.joke.findUnique({
  //   where: { id: params.jokeId },
  // });
  // if (!joke) {
  //   throw new Response("Can't delete what does not exist", {
  //     status: 404,
  //   });
  // }
  // if (joke.jokesterId !== userId) {
  //   throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  // }
  if (typeof expenseId !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  const deleted = await deleteExpenseById(expenseId);
  // console.log(deleted);
  return null;
};

export default function Expenses() {
  const { allExpenses } = useLoaderData();
  // console.log(allExpenses);
  return (
    <>
      <div>Expenses</div>

      {/* Filters etc */}
      <div>Filter etc</div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Sum</th>
            <th>Edit</th>
            <th>Del</th>
          </tr>
        </thead>
        <tbody>
          {allExpenses?.length > 0 &&
            allExpenses.map((expense: IExpense) => (
              <Expense key={expense.id} {...expense} />
            ))}
        </tbody>
      </table>

      <Link to="new">Add expense</Link>

      <Outlet />
    </>
  );
}
//  todo : fix "expense" underline ts bug ??

// todo - use $dynamic only for transaction, not for user
// todo - pass all props using {... props}

// https://medium.com/coding-at-dawn/how-to-pass-all-props-to-a-child-component-in-react-bded9e38bb62

// todo - filters and sort by !!!!!!!!!!!!!!! very complicated !!!!!
