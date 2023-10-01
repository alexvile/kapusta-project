import { ActionArgs, LoaderFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { Calendar } from "~/components/calendar";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { getUserId } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (!userId) {
    return null;
  }
  return null;
};

export const action = async ({ params, request }: ActionArgs) => {
  return null;
};

export default function Records() {
  // const { recordsForCurrentMonth } = useLoaderData();

  // todo - fetch not only current month but + 5-6 days of previous and 5-6 days of next. If February - even more. Need to find solution
  // console.log(323232323, recordsForCurrentMonth);
  return (
    <>
      <div>Records</div>
      <div>
        <Link to="new">Add record +</Link>
      </div>
      Calendar for certain month
      <Calendar />
      {/* <ul>
        {recordsForCurrentMonth.map((record) => (
          <li key={record.id}>
            {record.plannedStartTime}&nbsp;
            {record.plannedEndTime}&nbsp;
            {record.description} &nbsp;
            {record.price} &nbsp;
            {record.status} &nbsp;
          </li>
        ))}
      </ul> */}
      <Outlet />
    </>
  );
}
// todo - USE !!!!!!!!!!!!!! calendar for new records. It will automatically add date and time
// pagination

// todo -approximate time to procedurs to show if one cover another
