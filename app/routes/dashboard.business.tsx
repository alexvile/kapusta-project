import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useOutletContext } from "@remix-run/react";
import { Navigation } from "~/components/Navigation/Navigation";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);
  return null;
};

// todo: decide if use requireuserID or getUserId
export default function Business() {
  const links = [
    { to: "clients", label: "clients" },
    { to: "records", label: "Journal" },
  ];
  return (
    <>
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      <Navigation navLinks={links} style="submain" />
      <Outlet />
    </>
  );
}

// pagination !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
