import { db } from "./db.server";
import type { Client as IClient, Prisma } from "@prisma/client";

export const createClient = async ({
  ownerId,
  firstName,
  lastName,
  birthday,
  phone,
  priceLevel,
  description,
}: Pick<
  IClient,
  | "ownerId"
  | "firstName"
  | "lastName"
  | "birthday"
  | "phone"
  | "priceLevel"
  | "description"
>) => {
  await db.client.create({
    data: {
      firstName,
      lastName,
      birthday,
      phone,
      priceLevel,
      description,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

export const getAllClientsByUserId = async (userId: string) => {
  return await db.client.findMany({
    where: {
      ownerId: userId,
    },
  });
};

// export const getFilteredExpenses = async (
//   userId: string,
//   sortFilter: Prisma.ExpenseOrderByWithRelationInput,
//   whereFilter: Prisma.ExpenseWhereInput
// ) => {
//   return await db.expense.findMany({
//     orderBy: {
//       ...sortFilter,
//     },
//     where: {
//       ownerId: userId,
//       ...whereFilter,
//     },
//   });
// };
