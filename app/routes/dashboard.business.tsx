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
  const userId = await requireUserId(request);

  return json({});
};

// todo: decide if use requireuserID or getUserId
export default function Clients() {
  return (
    <>
      <div>Business - title</div>
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      <div className="navLinks">
        <NavLink
          to="clients"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          (Clients - l)
        </NavLink>
        <NavLink
          to="records"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          (Journal - l)
        </NavLink>
      </div>
      <Outlet />
    </>
  );
}

// pagination
