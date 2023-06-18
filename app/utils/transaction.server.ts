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

// ownerId,
// createdTime,
// description,
// type,
// value,
// }: Pick<
// IExpense,
// "ownerId" | "createdTime" | "description" | "type" | "value"
// >)
export const updateExpenseById = async (
  expenseId: string,
  {
    createdTime,
    description,
    type,
    value,
  }: Pick<IExpense, "createdTime" | "description" | "type" | "value">
) => {
  return await db.expense.update({
    where: {
      id: expenseId,
    },
    data: {
      description,
      createdTime,
      type,
      value,
    },
  });
};

// enum ExpenseKind {
//   RENT,
//   COMMUNAL,
//   MARKETING,
//   CONSUMABLES,
//   OTHER,
// }

// todo : research enum TS
// type ExpenseKind =
//   | "RENT"
//   | "MARKETING"
//   | "COMMUNAL"
//   | "MARKETING"
//   | "CONSUMABLES"
//   | "OTHER";

// type Expense = {
//   ownerId: string;
//   description?: string;
//   type?: ExpenseKind;
//   createdTime?: Date;
// };

// let newExpense = ('d': Expense["type"])  {

// }
// IExpense
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
  console.log(ownerId);
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

// export const createKudo = async (
//   message: string,
//   userId: string,
//   recipientId: string,
//   style: KudoStyle
// ) => {
//   await prisma.kudo.create({
//     data: {
//       message,
//       style,
//       author: {
//         connect: {
//           id: userId,
//         },
//       },
//       recipient: {
//         connect: {
//           id: recipientId,
//         },
//       },
//     },
//   });
// };
