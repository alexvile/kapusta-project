import { MonthTransaction } from "~/types/types";

interface ITransaction {
  id: string;
  createdTime: string;
  value: number;
}
// todo - extended from expenses or incomes

const getLastSixMonthIndexes = () => {
  const monthIndex = new Date().getMonth();
  // if (monthIndex > 11 || monthIndex < 0) return;
  const fiveAndMore = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
  const lessThanFive = [4, 3, 2, 1, 0, 11, 10, 9, 8, 7, 6, 5];

  const getIndexes = (arr: number[]) => {
    const index = arr.indexOf(monthIndex);
    return arr.splice(index, 6);
  };
  return monthIndex >= 5 ? getIndexes(fiveAndMore) : getIndexes(lessThanFive);
};

// todo - urizanui typ transaction with id, value and createdTime
export function calculateByMonths(array: ITransaction[]) {
  // console.log(1, array);
  let orderKey = 0;
  let groups = array.reduce(function (r: any, o: ITransaction) {
    const m = new Date(o.createdTime).getMonth();
    const sum = o.value;
    r[m]
      ? (r[m].total += sum)
      : (r[m] = { order: orderKey++, month: m, total: sum });
    return r;
  }, {});
  const result = Object.keys(groups).map((k) => groups[k]);
  result.sort((a, b) => a.order - b.order);
  // console.log(1, result);

  // new Arr with using zeros !!!
  let arrWithZeros: MonthTransaction[] = [];
  const sixMonthsIndexes = getLastSixMonthIndexes();
  sixMonthsIndexes.forEach((i) => {
    const el = result.find((e) => e?.month === i);
    el
      ? arrWithZeros.push({ month: el?.month, total: el?.total })
      : arrWithZeros.push({ month: i, total: 0 });
  });
  console.log(arrWithZeros);
  return arrWithZeros;
}
