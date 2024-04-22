import { db } from "./db.server";
import type {
  Business as IBusiness,
  Service as IService,
  Prisma,
} from "@prisma/client";

export const createBusiness = async ({
  ownerId,
  name,
  notes,
}: Omit<IBusiness, "id" | "icon">) => {
  await db.business.create({
    data: {
      name,
      notes,
      owner: {
        connect: {
          id: ownerId,
        },
      },
    },
  });
};

export const createService = async ({
  businessId,
  name,
  price,
  duration,
}: Omit<IService, "id">) => {
  await db.service.create({
    data: {
      name,
      price,
      duration,
      business: {
        connect: {
          id: businessId,
        },
      },
    },
  });
};

export const getAllBusinessesWithServicesByOwnerId = async (
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
