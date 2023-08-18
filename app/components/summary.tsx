import { calculateByMonths } from "~/helpers/monthsCalculator";
import { MONTH_NAMES } from "~/utils/constants";

export const Summary = ({ transactions }: { transactions: any }) => {
  // console.log("refetch");
  const groupsByMonths = calculateByMonths(transactions);
  // console.log(233, groupsByMonths);
  // todo : show month name and quantity even it 0 ???????????????????????????????????????
  return (
    <div className="bg-white outline p-2 rounded border mt-2">
      Summary
      <ul>
        {groupsByMonths.map((el) => (
          <li key={el.month}>
            {MONTH_NAMES[el.month]} &nbsp; {el.total}
            {/* createdTime:{el.createdTime}&nbsp; local:
            {new Date(el.createdTime).toLocaleString()}
            <b>{new Date(el.createdTime).getMonth()}</b>
            &nbsp;{el.value} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

// todo - decide if we can use in db months expense or income ???

// todo do we need to call new Date and get month every time after rerender ???

// todo : do we need useMemo, useCallback etc for prevent extra rerender
// https://github.com/remix-run/remix/discussions/4182

// todo - loaders, block interface add skeletons
