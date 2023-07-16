import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  // const recipient = await getUserById(userId);

  // const user = await getUser(request);
  // return json({ recipient, user });
  return json({});
};

// todo: decide if use requireuserID or getUserId
export default function Transactions() {
  return (
    <>
      <div>Transactions</div>
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      <>
        <div className="navLinks">
          <NavLink
            to="expenses"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            (Expenses - l)
          </NavLink>
          <NavLink
            to="incomes"
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
          >
            (Incomes - l)
          </NavLink>
        </div>
      </>
      <Outlet />
    </>
  );
}
