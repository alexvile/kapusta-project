import { Link, useLocation } from "@remix-run/react";
import { Balance } from "./balance";
import { useEffect, useState } from "react";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";

export const TopBar = ({ balance }: { balance: IBalance }) => {
  const location = useLocation();
  // const [isReports, setIsReports] = useState(Boolean);
  const checkIsReport = () => {
    return location.pathname.includes("/dashboard/reports");
  };
  const [isReports, setIsReports] = useState(() => checkIsReport());

  //   const [month, setMonth] = useState("");
  //   const [period, setPeriod] = useState({});

  // const [month, setMonth] = useState(() => getCurrentIsoYearAndMonth());
  //   todo ---- initialize with date now
  //   todo --- do we need to pull immediately all expenses and incomes for a month ????
  //   todo --- temporary solution

  useEffect(() => {
    // console.log(location);
    if (location.pathname.includes("/dashboard/transactions/reports")) {
      setIsReports(true);
    } else {
      setIsReports(false);
    }
  }, [location]);

  //   useEffect(() => {
  //     if (month !== "" && month) {
  //          console.log(month);
  //       const obj = getFullMonthStartEndDays(month);
  //          console.log(obj);
  //       setPeriod(obj);
  //     }
  //   }, [month]);

  return (
    <div className="outline p-3">
      <div className="flex items-center justify-around">
        <div>
          {/* todo - we should remember page and state from where we came !!!! */}
          {isReports ? (
            <Link to="/dashboard/transactions">Back</Link>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        <div>
          <Balance balance={balance} />
        </div>
        <div>
          {isReports ? (
            <div>
              {/* Current period
              <br />
              <input
                type="month"
                value={month}
                onChange={(e) => {
                  setMonth(e.currentTarget.value);
                }}
              /> */}
            </div>
          ) : (
            <Link to="/dashboard/transactions/reports">Reports</Link>
          )}
        </div>
      </div>
    </div>
  );
};

// todo - fully custom date (month and year) selector !!!

// todo - check page - if reports - we change topbar
//   const matches = useMatches();
//   for breadcrumbs
