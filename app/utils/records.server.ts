import { db } from "./db.server";
import type { Record as IRecord, Prisma } from "@prisma/client";

export const createRecord = async ({
  ownerId,
  plannedTime,
  clientId,
  description,
  price,
}: Pick<
  IRecord,
  "ownerId" | "plannedTime" | "clientId" | "description" | "price"
>) => {
  await db.record.create({
    data: {
      plannedTime,
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
