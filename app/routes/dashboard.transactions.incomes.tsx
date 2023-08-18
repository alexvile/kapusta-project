import {
  LoaderFunction,
  redirect,
  json,
  LoaderArgs,
  ActionArgs,
} from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import {
  deleteIncomeById,
  getIncomesForLastSixMonths,
  getFilteredIncomes,
} from "~/utils/transaction.server";
import type { Income as IIncome, Prisma } from "@prisma/client";
import { Income } from "~/components/income";
import { requireUserId } from "~/utils/session.server";
import { SortAndFilterBar } from "~/components/sort-and-filter-bar";
import { ExpenseKind } from "@prisma/client";
import {
  getISOFromAndToForToday,
  getSixMonthsPeriod,
  localDateFromToIsoString,
  localDateToToIsoString,
} from "~/helpers/timeConvertor";

import { Summary } from "~/components/summary";

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

  let sortOptions: Prisma.IncomeOrderByWithRelationInput = {};
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

  let whereFilter: Prisma.IncomeWhereInput = {};
  let dateFilter: Prisma.IncomeWhereInput = {};
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

  let textFilter: Prisma.IncomeWhereInput = {};
  if (filter) {
    console.log(filter);
    textFilter = {
      description: { mode: "insensitive", contains: filter },
    };
  }
  let categoryFilter: Prisma.IncomeWhereInput = {};

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

  const filteredIncomes: IIncome[] = await getFilteredIncomes(
    userId,
    sortOptions,
    whereFilter
  );

  const period = getSixMonthsPeriod();
  const sixMonthsIncomes: Pick<IIncome, "createdTime" | "value">[] =
    await getIncomesForLastSixMonths(userId, period);

  // console.log({ filteredIncomes, sixMonthsIncomes });
  return json({ filteredIncomes, sixMonthsIncomes });
};

//  todo: create separate route or logic to delete !!!!!!!!!!!!!!!!
export const action = async ({ params, request }: ActionArgs) => {
  const form = await request.formData();
  // console.log(form);
  // console.log(form.get("intent"));
  if (form.get("intent") !== "delete") {
    throw new Response(`The intent ${form.get("intent")} is not supported`, {
      status: 400,
    });
  }
  const incomeId = form.get("id");
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
  if (typeof incomeId !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  const deleted = await deleteIncomeById(incomeId);
  console.log(deleted);
  return null;
};

export default function Incomes() {
  const { filteredIncomes, sixMonthsIncomes } = useLoaderData();

  return (
    <>
      <div className="flex gap-3 bg-white outline">
        {/* topBar */}
        <SortAndFilterBar type="incomes"/>
        <div>
          <Link to="new">Add income +</Link>
        </div>
      </div>
      <div className="flex gap-3">
        <table className="table-auto">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Sum</th>
              <th>Edit</th>
              <th>Del</th>
            </tr>
          </thead>
          <tbody>
            {filteredIncomes?.length > 0 &&
              filteredIncomes.map((income: IIncome) => (
                <Income key={income.id} {...income} />
              ))}
          </tbody>
        </table>
        <Summary transactions={sixMonthsIncomes} />
      </div>

      <Outlet />
    </>
  );
}

// todo : maybe we should use transactions instead expenses and incomes in some cases to not copy same code
