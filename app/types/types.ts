import type {
  Record as IRecord,
  Client as IClient,
  Prisma,
} from "@prisma/client";
import type {
  Business as IBusiness,
  Service as IService,
} from "@prisma/client";

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

export type DirectionType = "asc" | "desc";
export type MonthTransaction = {
  month: number;
  total: number;
};

export type SortAndFilterType = "clients" | "expenses" | "incomes";
export type TransactionType = "expenses" | "incomes";
// enum transactionType {
//   Expenses,
//   Incomes,
// }
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

// export type IOpenModal = (event: React.ChangeEvent<HTMLButtonElement>) => void;

type ModalIntendWithoutTarget = "create-business";
type ModalIntendWithTargetNoFields = "create-service";
type ModalIntendWithTargetAndFields = "edit-service" | "edit-business";

// add new subtype need fields or not
export type BusinessModalProps =
  | { intent: ModalIntendWithoutTarget; target?: never; fields?: never }
  | {
      intent: ModalIntendWithTargetNoFields;
      target: string;
      fields?: never;
    }
  | {
      intent: ModalIntendWithTargetAndFields;
      target: string;
      fields: {
        [key: string]: string | number | null;
      };
    };

export type IOpenModal = (data: BusinessModalProps) => void;

export type SortAndSelectOption = { name: string; value: string };
export type ISortAndSelectOptions = SortAndSelectOption[];
