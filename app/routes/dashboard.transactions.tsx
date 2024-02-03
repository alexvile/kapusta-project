import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { NavLinks } from "~/components/Navigation/NavLinks";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { requireUserId } from "~/utils/session.server";
import {
  getAllExpensesByUserId,
  getAllIncomesByUserId,
} from "~/utils/transaction.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  // const recipient = await getUserById(userId);
  // const user = await getUser(request);
  // return json({ recipient, user });
  const allExpenses: number | null = await getAllExpensesByUserId(userId);
  const allIncomes: number | null = await getAllIncomesByUserId(userId);
  return json({ allExpenses, allIncomes });
};

// todo: decide if use requireuserID or getUserId
export default function Transactions() {
  const {
    user,
    allExpenses = 0,
    allIncomes = 0,
  }: {
    user: User;
    allExpenses: number;
    allIncomes: number;
  } = useLoaderData();
  const balance: IBalance = allIncomes - allExpenses;
  // todo - refactor
  const arr = [
    { to: "expenses", label: "Expenses" },
    { to: "incomes", label: "Incomes" },
  ];
  return (
    <>
      <div>Transactions - opened</div>
      <TopBar balance={balance} />
      {/* tabs */}
      {/* one of tabs should be opened by default */}

      <NavLinks navLinks={arr} />
      <Outlet />
    </>
  );
}
