import { calculateByMonths } from "~/helpers/monthsCalculator";
import { formatToPrice } from "~/helpers/priceFormat";
import { MONTH_NAMES } from "~/utils/constants";

export const Summary = ({ transactions }: { transactions: any }) => {
  // console.log("refetch");
  const groupsByMonths = calculateByMonths(transactions);

  return (
    <div className="rounded-t-2xl rounded-br-2xl overflow-hidden min-w-[230px]">
      <h3 className="bg-mainBg mb-0.5 text-center font-roboto text-main text-label tracking-small font-bold uppercase py-3">
        Summary
      </h3>
      <ul>
        {groupsByMonths.map((el) => (
          <li
            key={el.month}
            className="bg-mainBg mb-0.5 lg:mb-1 py-3 px-5 gap-8 last:mb-0 font-roboto text-secondary text-label tracking-medium uppercase flex items-center justify-between"
          >
            <span>{MONTH_NAMES[el.month]}</span>
            <span>
              {formatToPrice(el.total, { symbolType: "narrowSymbol" })}
            </span>
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
