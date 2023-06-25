import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
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
      <Link to="expenses">Expenses - link</Link>
      <Outlet />
    </>
  );
}
