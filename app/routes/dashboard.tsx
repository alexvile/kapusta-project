import {
  ActionArgs,
  LoaderFunction,
  V2_MetaFunction,
  json,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { Layout } from "~/components/layout";
import { getUser } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};
export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  console.log(user);
  return json({ user });
};
// export const action = async ({ request }: ActionArgs) => {
//   const allExpenses = await getAllExpense();
//   console.log(11111, allExpenses);
//   return json({});
// };
export default function Index() {
  const { user }: { user: User } = useLoaderData();
  const url = `${user.id}/transactions`;
  return (
    <>
      <Layout user={user}>
        <h1>Home page</h1>
        <Link to={url} title="" aria-label="">
          transactions - link
        </Link>
        <Outlet />
      </Layout>
    </>
  );
}
