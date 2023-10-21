import { db } from "./db.server";
import type { Business as IBusiness, Prisma } from "@prisma/client";

export const createBusiness = async ({
  ownerId,
  name,
}: Pick<IBusiness, "ownerId" | "name">) => {
  await db.business.create({
    data: {
      name,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

export const getAllBusinessesByOwnerId = async (
  ownerId: IBusiness["ownerId"]
) => {
  return await db.business.findMany({
    where: {
      ownerId,
    },
    include: {
      services: true,
    },
  });
};
