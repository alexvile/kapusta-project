import {
  LoaderFunction,
  redirect,
  json,
  LoaderArgs,
  ActionArgs,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  deleteExpenseById,
  getAllExpensesByUserId,
  getExpensesForLastSixMonths,
  getFilteredExpenses,
} from "~/utils/transaction.server";
import type { Expense as IExpense, Prisma } from "@prisma/client";
import { Expense } from "~/components/expense";
import { requireUserId } from "~/utils/session.server";
import { SortAndFilterBar } from "~/components/SortAndFilter/SortAndFilterBar";
import { ExpenseKind } from "@prisma/client";
import {
  getISOFromAndToForToday,
  getSixMonthsPeriod,
  localDateFromToIsoString,
  localDateToToIsoString,
} from "~/helpers/timeConvertor";

import { Summary } from "~/components/summary";
import { TransactionsTable } from "~/components/TransactionsBottom/TransactionsTable";
import { TransactionsMain } from "~/components/TransactionsBottom/TransactionsMain";

export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  // const allExpenses: IExpense[] = await getAllExpensesByUserId(userId);

  // console.log(request.url);
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort");
  const filter = url.searchParams.get("filter");
  const dir = url.searchParams.get("dir");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const category = url.searchParams.get("category");

  const direction: Prisma.SortOrder = dir as Prisma.SortOrder;

  let sortOptions: Prisma.ExpenseOrderByWithRelationInput = {};
  if (sort) {
    // console.log(111, sort);
    // console.log(222, dir);
    if (sort === "date") {
      sortOptions = { createdTime: `${direction}` };
    }
    if (sort === "value") {
      sortOptions = { value: `${direction}` };
    }
    if (sort === "category") {
      sortOptions = { type: `${direction}` };
    }
  }

  let whereFilter: Prisma.ExpenseWhereInput = {};
  let dateFilter: Prisma.ExpenseWhereInput = {};
  if (to && from) {
    dateFilter = {
      createdTime: {
        lte: localDateToToIsoString(to),
        gte: localDateFromToIsoString(from),
      },
    };
  } else {
    const { todayFrom, todayTo } = getISOFromAndToForToday();
    dateFilter = {
      createdTime: {
        lte: todayTo,
        gte: todayFrom,
      },
    };
  }

  let textFilter: Prisma.ExpenseWhereInput = {};
  if (filter) {
    console.log(filter);
    textFilter = {
      description: { mode: "insensitive", contains: filter },
    };
  }
  let categoryFilter: Prisma.ExpenseWhereInput = {};

  // const categoryValue: ExpenseKind = category as ExpenseKind;

  if (category !== "ALL" && category) {
    categoryFilter = {
      type: { equals: category },
    };
  }
  // fix ts error !!!!!!!!!!!!!!!
  whereFilter = { ...dateFilter, ...textFilter, ...categoryFilter };
  // todo - get by TODAY for default
  // todo - add PAGINATION !!!!
  // todo - default sorting by craetedTime asc
  // todo - filter by title
  // todo - filter by product category by select

  const filteredExpenses: IExpense[] = await getFilteredExpenses(
    userId,
    sortOptions,
    whereFilter
  );

  const period = getSixMonthsPeriod();
  const sixMonthsExpenses: Pick<IExpense, "createdTime" | "value">[] =
    await getExpensesForLastSixMonths(userId, period);

  return json({ filteredExpenses, sixMonthsExpenses });
};

export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const expenseId = form.get("id");
  // const userId = await requireUserId(request);
  // const joke = await db.joke.findUnique({
  //   where: { id: params.jokeId },
  // });
  // if (!joke) {
  //   throw new Response("Can't delete what does not exist", {
  //     status: 404,
  //   });
  // }
  // if (joke.jokesterId !== userId) {
  //   throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
  // }
  if (typeof expenseId !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  const deleted = await deleteExpenseById(expenseId);
  // console.log(deleted);
  return null;
};

export default function Expenses() {
  const { filteredExpenses, sixMonthsExpenses } = useLoaderData();
  return (
    <>
      <div className="flex gap-3 bg-white outline">
        {/* topBar */}
        <SortAndFilterBar type="expenses" />
        <div>
          <Link to="new">Add expense +</Link>
        </div>
      </div>
      <TransactionsMain
        filteredTransactions={filteredExpenses}
        sixMonthsTransactions={sixMonthsExpenses}
      />
      <Outlet />
    </>
  );
}

// todo - check base styles like box-sizing -border box etc
// todo - table - separate component

// todo - summary/statistics -  separate component
//  todo : fix "expense" underline ts bug ??

// todo - filters and sort by !!!!!!!!!!!!!!! very complicated !!!!!

// todo - clear URL, remove query params if you dont use it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// todo - may we can use equal or start in instead from and to ??? to get by today we lost
// createdTime: {
//   startsWith: "2023-06-25",
// },
// but we lost some of them (((
