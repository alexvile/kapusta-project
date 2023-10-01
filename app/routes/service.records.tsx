import { LoaderFunction, json } from "@remix-run/node";
import { convertToCalendarFormat } from "~/helpers/calendarDataConvertor";
import { getRecordsByCalendarParameters } from "~/utils/records.server";
import { getUserId } from "~/utils/session.server";

// import type { Client as IClient, Prisma } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  // todo - take userID from context, prevent extra fetch
  const userId = await getUserId(request);
  if (!userId) return;

  const url = new URL(request.url);
  const startTime = url.searchParams.get("start");
  const endTime = url.searchParams.get("end");

  if (!startTime || !endTime) return;

  const filteredRecords = await getRecordsByCalendarParameters(
    userId,
    startTime,
    endTime
  );

  // todo - include client name and surname

  const calendarData = convertToCalendarFormat(filteredRecords);

  // const filteredClients: Pick<IClient, "id" | "firstName" | "lastName">[] =
  // await getClientsAutocomplete(userId, textFilter);
  // return json({ filteredClients });
  console.log("inside");
  return calendarData;
};

// todo - store or Redux to save data in Remix, prevent extra fetches etc
