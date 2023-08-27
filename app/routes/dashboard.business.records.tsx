import { ActionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  return null;
};

export const action = async ({ params, request }: ActionArgs) => {
  return null;
};

export default function Records() {
  // console.log(allClients);
  return (
    <>
      <div>Records</div>
      <div>
        <Link to="new">Add record +</Link>
      </div>
      <Outlet />
    </>
  );
}
// todo - USE !!!!!!!!!!!!!! calendar for new records. It will automatically add date and time
// pagination

// todo -approximate time to procedurs to show if one cover another
