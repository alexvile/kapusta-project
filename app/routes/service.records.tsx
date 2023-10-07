import { LoaderFunction, json } from "@remix-run/node";
import { convertToCalendarFormat } from "~/helpers/calendarDataConvertor";
import { getRecordsByCP } from "~/utils/records.server";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  // todo - take userID from context, prevent extra fetch
  const userId = await getUserId(request);
  if (!userId) return;

  const url = new URL(request.url);
  const startTime = url.searchParams.get("start");
  const endTime = url.searchParams.get("end");

  if (!startTime || !endTime) return;

  const filteredRecords = await getRecordsByCP(userId, startTime, endTime);
  const calendarData = convertToCalendarFormat(filteredRecords);
  // todo - error handling !!!!!!
  return calendarData;
};

// todo - store or Redux to save data in Remix, prevent extra fetches etc

// todo - each component group in separate folder !!!
