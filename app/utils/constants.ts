export const ExpenseKinds = [
  { name: "Rent", value: "RENT" },
  { name: "Communal", value: "COMMUNAL" },
  { name: "Marketing", value: "MARKETING" },
  { name: "Consumables", value: "CONSUMABLES" },
  { name: "Other", value: "OTHER" },
];

export const IncomeKinds = [
  { name: "Laser", value: "LASER" },
  { name: "Brows", value: "BROWS" },
  { name: "Other", value: "OTHER" },
];

export const ExpenseKindsForFilter = [
  { name: "Expense category", value: "ALL" },
  ...ExpenseKinds,
];

export const IncomeKindsForFilter = [
  { name: "Income category", value: "ALL" },
  ...IncomeKinds,
];

export const ExpenseKindsForRadioButtons = [
  { name: "All", value: "ALL" },
  ...ExpenseKinds,
];

export const IncomeKindsForRadioButtons = [
  { name: "All", value: "ALL" },
  ...IncomeKinds,
];

//   todo - how to synchronize with db ???

export const transactionTypes = [
  { name: "Expenses", value: "Expenses" },
  { name: "Incomes", value: "Incomes" },
];

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
