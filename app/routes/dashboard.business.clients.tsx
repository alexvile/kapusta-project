import { LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { requireUserId } from "~/utils/session.server";
import {
  getAllExpensesByUserId,
  getAllIncomesByUserId,
} from "~/utils/transaction.server";
import type { Client as IClient, Prisma } from "@prisma/client";
import { getAllClientsByUserId } from "~/utils/business.server";
import { ClientRow } from "~/components/client-row";

export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await requireUserId(request);
  const userId = await requireUserId(request);
  const allClients: IClient[] = await getAllClientsByUserId(userId);
  return json({ allClients });
};

// todo: decide if use requireuserID or getUserId
export default function Clients() {
  const { allClients } = useLoaderData();
  // console.log(allClients);
  return (
    <>
      <div>Clients</div>
      <div>
        <Link to="new">Add client +</Link>
      </div>
      <div>
        Client list
        <table className="table-auto">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {allClients?.length > 0 &&
              allClients.map((client: IClient) => (
                <ClientRow key={client.id} {...client} />
              ))}
          </tbody>
        </table>
      </div>
      <Outlet />
    </>
  );
}

// pagination
