import { LoaderFunction, json } from "@remix-run/node";
import {
  Form,
  Outlet,
  useFetcher,
  useLoaderData,
  useSearchParams,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { MonthStats } from "~/components/monthStats";
import { TransactionSwitcher } from "~/components/transaction-switcher";
import {
  getCurrentIsoYearAndMonth,
  getFullMonthStartEndDays,
} from "~/helpers/timeConvertor";
import { getUserId, requireUserId } from "~/utils/session.server";
import { getExpensesForMonth } from "~/utils/transaction.server";
import type { Expense as IExpense, Prisma } from "@prisma/client";
export const loader: LoaderFunction = async ({ request }) => {
  // const userId = await requireUserId(request);
  // todo - we should understand use require userId or get Userid
  const userId = await getUserId(request);
  if (!userId) {
    return null;
    // status 401
  }
  const url = new URL(request.url);
  const date = url.searchParams.get("date");

  let expenses: Pick<IExpense, "value">[] = [];
  if (date) {
    const period = getFullMonthStartEndDays(date);
    const expensesForMonth = await getExpensesForMonth(userId, period);
    expenses = expensesForMonth;
    // console.log(expenses);
  } else {
    // todo - normal logic . Maybe we should submit form at render and not to use else block in backend ??!!
    const date = getCurrentIsoYearAndMonth();
    const period = getFullMonthStartEndDays(date);
    const expensesForCurrentMonth = await getExpensesForMonth(userId, period);
    expenses = expensesForCurrentMonth;
  }
  return json({ expenses });
};
// todo - normal logic at 27-33 lines !!!!!!!!

// todo: decide if use requireuserID or getUserId
export default function Reports() {
  const [month, setMonth] = useState(() => getCurrentIsoYearAndMonth());
  let [searchParams] = useSearchParams();
  const { expenses } = useLoaderData();

  const submit = useSubmit();
  const formRef = useRef(null);

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, { replace: true });
  }

  // useEffect(() => {
  //   console.log(expenses);
  //   if (expenses.length < 1) {
  //     console.log("se");
  //     formRef?.current?.submit();
  //   }
  // }, []);
  // todo - get current expenses immediatly after render
  return (
    <>
      <div>
        <Form ref={formRef} onChange={handleChange}>
          Current period
          <br />
          <input
            name="date"
            type="month"
            value={searchParams.get("date") || month || ""}
            onChange={(e) => {
              setMonth(e.currentTarget.value);
            }}
          />
        </Form>
      </div>
      <MonthStats expenses={expenses} />
      <TransactionSwitcher type="expenses" />

      <Outlet />
    </>
  );
}

// todo - what is fetcher ??? const fetcher = useFetcher();
// todo - add prefetch by hover on some links/tabs etc
