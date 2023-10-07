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
// CP - calendar parameters
export const getRecordsByCP = async (
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
    select: {
      id: true,
      plannedStartTime: true,
      plannedEndTime: true,
      description: true,
      price: true,
      client: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
    },
  });
};

export const simpleUpdateRecordByCP = async (
  recordId: string,
  newStart: string,
  newEnd: string
) => {
  console.log(recordId, newStart, newEnd);
  return await db.record.update({
    data: {
      plannedStartTime: newStart,
      plannedEndTime: newEnd,
    },
    where: {
      id: recordId,
    },
  });
};
