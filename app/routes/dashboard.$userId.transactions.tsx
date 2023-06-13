import { LoaderFunction, json } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  // const { userId } = params;
  // console.log(request);
  // console.log(params);

  // if (typeof userId !== "string") {
  //   return redirect("/home");
  // }
  // const recipient = await getUserById(userId);

  // const user = await getUser(request);
  // return json({ recipient, user });
  return json({});
};

export default function Transactions() {
  return (
    <>
      <div>Transactions</div>
      <Link to="expenses">Expenses - link</Link>
      <Outlet />
    </>
  );
}
