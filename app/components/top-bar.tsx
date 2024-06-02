import { Link, useLocation, useNavigate } from "@remix-run/react";
import { Balance } from "./balance";
import { useEffect, useState } from "react";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { Svg } from "./Svg";

export const TopBar = ({ result }: { result: any }) => {
  const { allExpenses, allIncomes } = result;
  const getBalance = (allExpenses = 0, allIncomes = 0) => {
    return allIncomes - allExpenses;
  };
  //   const [month, setMonth] = useState("");
  //   const [period, setPeriod] = useState({});

  // const [month, setMonth] = useState(() => getCurrentIsoYearAndMonth());
  //   todo ---- initialize with date now
  //   todo --- do we need to pull immediately all expenses and incomes for a month ????
  //   todo --- temporary solution

  //   useEffect(() => {
  //     if (month !== "" && month) {
  //          console.log(month);
  //       const obj = getFullMonthStartEndDays(month);
  //          console.log(obj);
  //       setPeriod(obj);
  //     }
  //   }, [month]);
  const navigate = useNavigate();
  return (
    <div className=" p-3">
      <div className="flex items-center justify-around">
        <Balance balance={getBalance(allExpenses, allIncomes)} />
      </div>
    </div>
  );
};

// todo - fully custom date (month and year) selector !!!

// todo - check page - if reports - we change topbar
//   const matches = useMatches();
//   for breadcrumbs
