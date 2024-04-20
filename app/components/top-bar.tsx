import { Link, useLocation, useNavigate } from "@remix-run/react";
import { Balance } from "./balance";
import { useEffect, useState } from "react";
import { getFullMonthStartEndDays } from "~/helpers/timeConvertor";
import { Svg } from "./Svg";

export const TopBar = ({ balance }: { balance: number }) => {
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
  const navigate = useNavigate();
  return (
    <div className=" p-3">
      <div className="flex items-center justify-around">
        <div>
          {/* todo - we should remember page and state from where we came !!!! */}
          {/* todo - use pop state*/}
          {isReports ? (
            // <Link to="/dashboard/transactions">Back</Link>
            <button
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              back
            </button>
          ) : (
            // <button
            // onClick={() => {
            //   navigate(-1);
            // }}

            <span>&nbsp;</span>
          )}
        </div>
        <Balance balance={balance} />
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
            <div>
              <Link
                to="/dashboard/transactions/reports"
                state={{ from: location.pathname }}
              >
                <span className="flex justify-between items-center gap-3.5 [&>svg]:w-full">
                  <span className="text-secondary opacity-70 font-roboto text-label tracking-medium pt-[3px]">
                    Reports
                  </span>
                  <Svg name="chart" />
                </span>
              </Link>
            </div>
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
