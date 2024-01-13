import { ActionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { TopBar } from "~/components/top-bar";
import { summarizeTransactions } from "~/helpers/calculations";
import { requireUserId } from "~/utils/session.server";

import type { Client as IClient, Prisma } from "@prisma/client";
import {
  deleteClientById,
  getAllClientsByUserId,
  getFilteredClients,
} from "~/utils/clients.server";
import { ClientRow } from "~/components/client-row";
import { SortAndFilterClients } from "~/components/SortAndFilter/sort-and-filter-clients";

export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await requireUserId(request);
  const userId = await requireUserId(request);
  // const allClients: IClient[] = await getAllClientsByUserId(userId);

  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const filter = url.searchParams.get("filter");
  const dir = url.searchParams.get("dir");

  const direction: Prisma.SortOrder = dir as Prisma.SortOrder;
  let sortOptions: Prisma.ClientOrderByWithRelationInput = {};
  if (sort) {
    if (sort === "name") {
      sortOptions = { firstName: `${direction}` };
    }
    if (sort === "surname") {
      sortOptions = { lastName: `${direction}` };
    }
  }

  let whereFilter: Prisma.ClientWhereInput = {};
  let textFilter: Prisma.ClientWhereInput = {};
  if (filter) {
    textFilter = {
      OR: [
        { lastName: { mode: "insensitive", contains: filter } },
        { firstName: { mode: "insensitive", contains: filter } },
      ],
    };
  }
  whereFilter = { ...textFilter };
  const filteredClients: IClient[] = await getFilteredClients(
    userId,
    sortOptions,
    whereFilter
  );
  return json({ filteredClients });
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const clientId = form.get("id");
  if (typeof clientId !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  await deleteClientById(clientId);
  return null;
};

// todo: decide if use requireuserID or getUserId
export default function Clients() {
  const { filteredClients } = useLoaderData();
  // console.log(allClients);
  console.log(filteredClients);
  return (
    <>
      <div>Clients</div>
      <SortAndFilterClients />
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
            {filteredClients?.length > 0 &&
              filteredClients.map((client: IClient) => (
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
