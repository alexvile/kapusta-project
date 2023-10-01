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

//  todo - include - to get relations !!!!!!!!!!!!!!!!!!!!
// todo - try - catch everywhere ????????????????????????????????????????????????????

// todo -db typing
export const getRecordsByCalendarParameters = async (
  userId: string,
  start: string,
  end: string
) => {
  return await db.record.findMany({
    where: {
      ownerId: userId,
      plannedStartTime: {
        gte: start,
        lte: end,
      },
    },
  });
};
// todo - exclude UserID, select only needed fields !!!
// todo - include cliend name and surname
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
