import { ISortAndSelectOptions } from "~/types/types";

export const ExpenseKinds: ISortAndSelectOptions = [
  { name: "Rent", value: "RENT" },
  { name: "Communal", value: "COMMUNAL" },
  { name: "Marketing", value: "MARKETING" },
  { name: "Consumables", value: "CONSUMABLES" },
  { name: "Other", value: "OTHER" },
];

export const IncomeKinds: ISortAndSelectOptions = [
  { name: "Laser", value: "LASER" },
  { name: "Brows", value: "BROWS" },
  { name: "Other", value: "OTHER" },
];

export const ExpenseKindsForFilter: ISortAndSelectOptions = [
  { name: "Expense category", value: "ALL" },
  ...ExpenseKinds,
];

export const IncomeKindsForFilter: ISortAndSelectOptions = [
  { name: "Income category", value: "ALL" },
  ...IncomeKinds,
];

export const ExpenseKindsForRadioButtons: ISortAndSelectOptions = [
  { name: "All", value: "ALL" },
  ...ExpenseKinds,
];

export const IncomeKindsForRadioButtons: ISortAndSelectOptions = [
  { name: "All", value: "ALL" },
  ...IncomeKinds,
];

//   todo - how to synchronize with db ???

export const transactionTypes: ISortAndSelectOptions = [
  { name: "Expenses", value: "Expenses" },
  { name: "Incomes", value: "Incomes" },
];

export const sortOptionsTransactions: ISortAndSelectOptions = [
  {
    name: "Date",
    value: "date",
  },
  {
    name: "Value",
    value: "value",
  },
  {
    name: "Category",
    value: "category",
  },
];

export const sortOptionsClients: ISortAndSelectOptions = [
  {
    name: "Name",
    value: "name",
  },
  {
    name: "Surname",
    value: "surname",
  },
];

export const dirOptions = [
  {
    name: "A",
    value: "asc",
  },
  {
    name: "D",
    value: "desc",
  },
];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
