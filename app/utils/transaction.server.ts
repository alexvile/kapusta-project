import { db } from "./db.server";
import type {
  Expense as IExpense,
  Income as IIncome,
  Prisma,
} from "@prisma/client";

// const {
//   createRequestHandler,
// } = require("@remix-run/express");

// app.all(
//   "*",
//   createRequestHandler({
//     getLoadContext(req, res) {
//       // this becomes the loader context
//       return { expressUser: req.user };
//     },
//   })
// );

// todo - add Middleware at all routes !!

// export const getAllExpense = async () => {
//   return await db.expense.findMany({});
// };

// todo - get for month and other period

// todo - frontend or/and backend validation to expenses !!!

// todo - add modal component form remix 3 tutorial

// todo ts interfaces at server part
export const getTotalCalculatedExpensesValueByUserId = async (
  userId: string
) => {
  const aggregatedExpenseSum = await db.expense.aggregate({
    _sum: { value: true },
    where: {
      ownerId: userId,
    },
  });
  return aggregatedExpenseSum._sum.value;
};

export const getTotalCalculatedIncomesValueByUserId = async (
  userId: string
) => {
  const aggregatedIncomeSum = await db.income.aggregate({
    _sum: { value: true },
    where: {
      ownerId: userId,
    },
  });
  return aggregatedIncomeSum._sum.value;
};

export const getFilteredExpenses = async (
  userId: string,
  sortFilter: Prisma.ExpenseOrderByWithRelationInput,
  whereFilter: Prisma.ExpenseWhereInput
) => {
  return await db.expense.findMany({
    orderBy: {
      ...sortFilter,
    },
    where: {
      ownerId: userId,
      ...whereFilter,
    },
  });
};

export const getFilteredIncomes = async (
  userId: string,
  sortFilter: Prisma.IncomeOrderByWithRelationInput,
  whereFilter: Prisma.IncomeWhereInput
) => {
  return await db.income.findMany({
    orderBy: {
      ...sortFilter,
    },
    where: {
      ownerId: userId,
      ...whereFilter,
    },
  });
};

export const getExpensesForLastSixMonths = async (
  userId: string,
  period: { start: string; end: string }
) => {
  // console.log("getting expenses list");
  return await db.expense.findMany({
    orderBy: {
      createdTime: "desc",
    },
    where: {
      ownerId: userId,
      createdTime: {
        lte: period.end,
        gte: period.start,
      },
    },
    select: {
      createdTime: true,
      value: true,
    },
  });
};
// todo - interface for functions

// todo use findeoneandupdate instead find then update
export const getIncomesForLastSixMonths = async (
  userId: string,
  period: { start: string; end: string }
) => {
  return await db.income.findMany({
    orderBy: {
      createdTime: "desc",
    },
    where: {
      ownerId: userId,
      createdTime: {
        lte: period.end,
        gte: period.start,
      },
    },
    select: {
      createdTime: true,
      value: true,
    },
  });
};

export const getExpensesForMonth = async (
  userId: string,
  period: { firstDay: string; lastDay: string }
) => {
  return await db.expense.findMany({
    where: {
      ownerId: userId,
      createdTime: {
        lte: period.lastDay,
        gte: period.firstDay,
      },
    },
    select: {
      value: true,
      type: true,
    },
  });
};

export const getIncomesForMonth = async (
  userId: string,
  period: { firstDay: string; lastDay: string }
) => {
  return await db.income.findMany({
    where: {
      ownerId: userId,
      createdTime: {
        lte: period.lastDay,
        gte: period.firstDay,
      },
    },
    select: {
      value: true,
      type: true,
    },
  });
};

// todo - maybe we need separate docs with calculated values to prevent getting all documents ???
// todo - calculated properties at mongodb

// todo - default from date now() 00:00 to 23:59
//  todo right naming, delete user from naming becuse you can get only your own transactions
export const getExpenseByIdAndUserId = async (
  userId: string,
  expenseId: string
) => {
  return await db.expense.findFirstOrThrow({
    where: {
      ownerId: userId,
      id: expenseId,
    },
  });
  // todo: select optimal db.expense.findOne or findUnique or findFirstOrThrow or findUniqueOrThrow
};

export const getIncomeByIdAndUserId = async (
  userId: string,
  incomeId: string
) => {
  return await db.income.findFirstOrThrow({
    where: {
      ownerId: userId,
      id: incomeId,
    },
  });
  // todo: select optimal db.expense.findOne or findUnique or findFirstOrThrow or findUniqueOrThrow
};

export const createExpense = async ({
  ownerId,
  createdTime,
  description,
  type,
  value,
}: Pick<
  IExpense,
  "ownerId" | "createdTime" | "description" | "type" | "value"
>) => {
  await db.expense.create({
    data: {
      description,
      createdTime,
      type,
      value,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

// todo: can we use 1 operation to find, draw interface and update ??
// todo: update only by Expense ID or including user ID ???

export const createIncome = async ({
  ownerId,
  createdTime,
  description,
  type,
  value,
}: Pick<
  IIncome,
  "ownerId" | "createdTime" | "description" | "type" | "value"
>) => {
  await db.income.create({
    data: {
      description,
      createdTime,
      type,
      value,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

export const updateExpenseById = async ({
  id,
  createdTime,
  description,
  type,
  value,
}: Pick<IExpense, "id" | "createdTime" | "description" | "type" | "value">) => {
  return await db.expense.update({
    where: {
      id,
    },
    data: {
      description,
      createdTime,
      type,
      value,
    },
  });
};

export const updateIncomeById = async ({
  id,
  createdTime,
  description,
  type,
  value,
}: Pick<IIncome, "id" | "createdTime" | "description" | "type" | "value">) => {
  return await db.income.update({
    where: {
      id,
    },
    data: {
      description,
      createdTime,
      type,
      value,
    },
  });
};

export const deleteExpenseById = async (id: string) => {
  return await db.expense.delete({ where: { id } });
};

export const deleteIncomeById = async (id: string) => {
  return await db.income.delete({ where: { id } });
};

// todo: catch an error boundaries

// todo - do we need to select only some field we give to frontend ???
// export const getFilteredKudos = async (
//   userId: string,
//   sortFilter: Prisma.KudoOrderByWithRelationInput,
//   whereFilter: Prisma.KudoWhereInput
// ) => {
//   return await prisma.kudo.findMany({
//     select: {
//       id: true,
//       style: true,
//       message: true,
//       author: {
//         select: {
//           profile: true,
//         },
//       },
//     },
//     orderBy: {
//       ...sortFilter,
//     },
//     where: {
//       recipientId: userId,
//       ...whereFilter,
//     },
//   });
// };

// todo - ????????????????????- how update will work with TOTAL
// prisma raw?
