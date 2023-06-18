import { db } from "./db.server";
import type { Expense as IExpense } from "@prisma/client";

// export const getAllExpense = async () => {
//   return await db.expense.findMany({});
// };

// todo - get for month and other period

export const getAllExpensesByUserId = async (userId: string) => {
  return await db.expense.findMany({
    where: {
      ownerId: userId,
    },
  });
};

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

// todo: can we use 1 operation to find, draw interface and update ??
// todo: update only by Expense ID or including user ID ???

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
