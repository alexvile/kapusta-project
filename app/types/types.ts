interface User {
  id: string;
  email: string;
}
type LoginForm = {
  email: string;
  password: string;
};
type RegisterForm = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};
type Transaction = {
  id: string;
  value: number;
  type: string;
};
type IBalance = number;
// enum transactionType {
//   Expenses,
//   Incomes,
// }

import type {
  Record as IRecord,
  Client as IClient,
  Prisma,
} from "@prisma/client";
import type {
  Business as IBusiness,
  Service as IService,
} from "@prisma/client";

// todo - sort types folder, add separate files for each group
export interface IPopulatedRecord {
  id: IRecord["id"];
  plannedStartTime: IRecord["plannedStartTime"];
  plannedEndTime: IRecord["plannedEndTime"];
  description: IRecord["description"];
  price: IRecord["price"];
  client: {
    id: IClient["id"];
    firstName: IClient["firstName"];
    lastName: IClient["lastName"];
  };
}
// todo smth like this

export type IBusinessWithServices = Prisma.BusinessGetPayload<{
  include: { services: true };
}>;
// export interface IBusinessWithServices {
//   ...obj: IBusiness;
//  services: IService[];
// }
// let g: IBusinessWithServices;
// console.log(g);
// let g: IBusiness & IService;
// console.log(g);
