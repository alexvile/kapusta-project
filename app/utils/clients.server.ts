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

export const getFilteredClients = async (
  userId: string,
  sortFilter: Prisma.ClientOrderByWithRelationInput,
  whereFilter: Prisma.ClientWhereInput
) => {
  return await db.client.findMany({
    orderBy: {
      ...sortFilter,
    },
    where: {
      ownerId: userId,
      ...whereFilter,
    },
    include: {
      owner: true,
      records: true,
    },
  });
};

export const getClientsAutocomplete = async (
  userId: string,
  whereFilter: Prisma.ClientWhereInput
) => {
  // first 5 or 10. No more !!
  return await db.client.findMany({
    where: {
      ownerId: userId,
      ...whereFilter,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      priceLevel: true,
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
export const getClientByIdAndUserId = async (
  userId: string,
  clientId: string
) => {
  return await db.client.findFirstOrThrow({
    where: {
      ownerId: userId,
      id: clientId,
    },
  });
  // todo: select optimal db.expense.findOne or findUnique or findFirstOrThrow or findUniqueOrThrow
};

// todo - do we need add by id and owner id ????
export const updateClientById = async ({
  id,
  firstName,
  lastName,
  birthday,
  phone,
  priceLevel,
  description,
}: Pick<
  IClient,
  | "id"
  | "firstName"
  | "lastName"
  | "birthday"
  | "phone"
  | "priceLevel"
  | "description"
>) => {
  return await db.client.update({
    where: {
      id,
    },
    data: {
      firstName,
      lastName,
      birthday,
      phone,
      priceLevel,
      description,
    },
  });
};

export const deleteClientById = async (id: string) => {
  return await db.client.delete({ where: { id } });
};

// todo - cascad actions to delete or update data
// onDelete: SetNull, onUpdate: Cascade
