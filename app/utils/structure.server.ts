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

export const updateBusinessById = async ({
  id,
  name,
  notes,
}: Omit<IBusiness, "ownerId" | "icon">) => {
  return await db.business.update({
    where: {
      id,
    },
    data: {
      name,
      notes,
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

export const updateServiceById = async ({
  id,
  name,
  price,
  duration,
}: Omit<IService, "businessId" | "icon">) => {
  await db.service.update({
    where: {
      id,
    },
    data: {
      name,
      price,
      duration,
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
