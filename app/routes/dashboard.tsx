import { LoaderFunction, V2_MetaFunction, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
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
export default function Index() {
  const { user }: { user: User } = useLoaderData();
  return (
    <>
      <Layout user={user}>
        <Outlet />
        <h1>Home page</h1>
      </Layout>
    </>
  );
}
