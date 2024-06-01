import { LoaderFunction, json, redirect } from "@remix-run/node";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { NavLinks, Navigation } from "~/components/Navigation/Navigation";
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
  // const allExpenses: number | null = await getAllExpensesByUserId(userId);
  // const allIncomes: number | null = await getAllIncomesByUserId(userId);
  const allExpenses: number | null = 0;
  const allIncomes: number | null = 0;
  return json({ allExpenses, allIncomes });
  // todo - redirect to some!!!!!!!!!!!!!!!
  // return redirect("expenses");
};

// todo: decide if use requireuserID or getUserId
export default function Transactions() {
  // const location = useLocation();
  const {
    allExpenses = 0,
    allIncomes = 0,
  }: {
    allExpenses: number;
    allIncomes: number;
  } = useLoaderData();
  const balance: number = allIncomes - allExpenses;

  return (
    <>
      <TopBar balance={balance} />
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      <Outlet />
    </>
  );
}
