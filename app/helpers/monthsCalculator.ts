interface ITransaction {
  id: string;
  createdTime: string;
  value: number;
}
// todo - extended from expenses or incomes

// todo - urizanui typ transaction with id, value and createdTime
export function calculateByMonths(array: ITransaction[]) {
  let orderKey = 0;
  let groups = array.reduce(function (r: any, o: ITransaction) {
    var m = new Date(o.createdTime).getMonth();
    var sum = o.value;
    r[m]
      ? (r[m].total += sum)
      : (r[m] = { order: orderKey++, month: m, total: sum });
    return r;
  }, {});
  const result = Object.keys(groups).map((k) => groups[k]);
  result.sort((a, b) => a.order - b.order);
  // console.log(result);
  return result;
}
