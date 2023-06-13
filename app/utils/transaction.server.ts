import { db } from "./db.server";

// export const getAllExpense = async () => {
//   return await db.expense.findMany({});
// };

export const getAllExpensesByUserId = async (userId: string) => {
  return await db.expense.findMany({
    where: {
      ownerId: userId,
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
type ExpenseKind =
  | "RENT"
  | "MARKETING"
  | "COMMUNAL"
  | "MARKETING"
  | "CONSUMABLES"
  | "OTHER";

type Expense = {
  ownerId: string;
  description?: string;
  type?: ExpenseKind;
  createdTime?: Date;
};

// let newExpense = ('d': Expense["type"])  {

// }
export const createExpense = async () => {};

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
