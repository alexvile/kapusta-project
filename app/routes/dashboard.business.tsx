import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useOutletContext } from "@remix-run/react";
import { requireUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  return null;
};

// todo: decide if use requireuserID or getUserId
export default function Business() {
  return (
    <>
      <div>Business - title</div>
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      <div className="nav-links">
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
