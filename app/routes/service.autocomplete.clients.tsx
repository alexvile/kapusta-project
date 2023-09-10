import { LoaderFunction, json } from "@remix-run/node";
import { getUserId } from "~/utils/session.server";

import type { Client as IClient, Prisma } from "@prisma/client";
import { getClientsAutocomplete } from "~/utils/clients.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) return;

  const url = new URL(request.url);
  const filter = url.searchParams.get("filter");

  let textFilter: Prisma.ClientWhereInput = {};
  if (filter) {
    textFilter = {
      OR: [
        { lastName: { mode: "insensitive", contains: filter } },
        { firstName: { mode: "insensitive", contains: filter } },
      ],
    };
  }

  const filteredClients: Pick<IClient, "id" | "firstName" | "lastName">[] =
    await getClientsAutocomplete(userId, textFilter);
  return json({ filteredClients });
};
