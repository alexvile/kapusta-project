import {
  ActionArgs,
  LoaderFunction,
  V2_MetaFunction,
  json,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout";
import { TopBar } from "~/components/top-bar";
import { getUser } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};
export const loader: LoaderFunction = async ({ request }) => {
  // console.log("first11");
  const user = await getUser(request);
  // console.log(user);
  return json({ user });
};
// export const action = async ({ request }: ActionArgs) => {
//   const allExpenses = await getAllExpense();
//   console.log(11111, allExpenses);
//   return json({});
// };
export default function Index() {
  const { user }: { user: User } = useLoaderData();
  // const url = `${user.id}/transactions`;
  // console.log("dashboard rerender");
  return (
    <>
      <Layout user={user}>
        <Link to="/" title="" aria-label="">
          <h1>Home page</h1>
        </Link>
        <Link to="transactions" title="" aria-label="">
          transactions - link
        </Link>
        <div>
          <Link to="abc" title="" aria-label="">
            TEST PAGE - link
          </Link>
        </div>
        <TopBar />
        <Outlet />
      </Layout>
    </>
  );
}

// todo - Balance - separate document with total expenses and total incomes value ????? --- to prevent fetch of ALL expenses and incomes
