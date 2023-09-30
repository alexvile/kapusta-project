import { ActionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { Calendar11 } from "~/components/calendar";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { getRecordsForMonth } from "~/utils/records.server";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }
  const currentMonth = getFullMonthStartEndDays(Date.now());
  const recordsForCurrentMonth = await getRecordsForMonth(userId, currentMonth);
  return json({ recordsForCurrentMonth });
};

export const action = async ({ params, request }: ActionArgs) => {
  return null;
};

export default function Records() {
  const { recordsForCurrentMonth } = useLoaderData();
  // console.log(323232323, recordsForCurrentMonth);
  return (
    <>
      <div>Records</div>
      <div>
        <Link to="new">Add record +</Link>
      </div>
      Calendar for certain month
      <Calendar11 />
      <ul>
        {recordsForCurrentMonth.map((record) => (
          <li key={record.id}>
            {record.plannedStartTime}&nbsp;
            {record.plannedEndTime}&nbsp;
            {record.description} &nbsp;
            {record.price} &nbsp;
            {record.status} &nbsp;
          </li>
        ))}
      </ul>
      <Outlet />
    </>
  );
}
// todo - USE !!!!!!!!!!!!!! calendar for new records. It will automatically add date and time
// pagination

// todo -approximate time to procedurs to show if one cover another
