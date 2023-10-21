import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { convertToCalendarFormat } from "~/helpers/calendarDataConvertor";
import { localWithTZtoIsoString } from "~/helpers/timeConvertor";
import { getRecordsByCP, simpleUpdateRecordByCP } from "~/utils/records.server";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  return null;
};
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();
  const obj = Object.fromEntries(form.entries());
  // todo - check if string etc
  await simpleUpdateRecordByCP(obj.id, obj.start, obj.end);
  // throw new Error("Test Error !");
  // throw new Response("Can't delete what does not exist", {
  //   status: 404,
  // });

  // throw new Response("No random joke found", {
  //   status: 404,
  // });
  return json({ success: true });
};

// todo - store or Redux to save data in Remix, prevent extra fetches etc

// todo - each component group in separate folder !!!
