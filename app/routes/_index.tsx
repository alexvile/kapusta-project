import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Layout } from "~/components/layout";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <Layout>
    <Outlet/>
      <h1>test</h1>
    </Layout>
 
  );
}
