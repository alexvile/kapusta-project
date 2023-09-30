import { db } from "./db.server";
import type { Record as IRecord, Prisma } from "@prisma/client";

export const createRecord = async ({
  ownerId,
  plannedStartTime,
  plannedEndTime,
  clientId,
  description,
  price,
}: Pick<
  IRecord,
  | "ownerId"
  | "plannedStartTime"
  | "plannedEndTime"
  | "clientId"
  | "description"
  | "price"
>) => {
  await db.record.create({
    data: {
      plannedStartTime,
      plannedEndTime,
      description,
      price,
      owner: {
        connect: {
          id: ownerId,
        },
      },
      client: {
        connect: {
          id: clientId,
        },
      },
    },
  });
};

export const getRecordsForMonth = async (
  userId: string,
  period: { firstDay: string; lastDay: string }
) => {
  return await db.record.findMany({
    where: {
      ownerId: userId,
      plannedStartTime: {
        lte: period.lastDay,
        gte: period.firstDay,
      },
    },
  });
};
// export const getFilteredClients = async (
//   userId: string,
//   sortFilter: Prisma.ClientOrderByWithRelationInput,
//   whereFilter: Prisma.ClientWhereInput
// ) => {
//   return await db.client.findMany({
//     orderBy: {
//       ...sortFilter,
//     },
//     where: {
//       ownerId: userId,
//       ...whereFilter,
//     },
//   });
// };
