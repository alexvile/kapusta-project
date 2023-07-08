export const ExpenseKinds = [
  { name: "Rent", value: "RENT" },
  { name: "Communal", value: "COMMUNAL" },
  { name: "Marketing", value: "MARKETING" },
  { name: "Consumables", value: "CONSUMABLES" },
  { name: "Other", value: "OTHER" },
];
export const ExpenseKindsForFilter = [
  { name: "Expense category", value: "ALL" },
  ...ExpenseKinds,
];

//   todo - how to synchronize with db ???

export const sortOptions = [
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
