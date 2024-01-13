import { Form, useNavigate, useSearchParams } from "@remix-run/react";
// import { sortOptions } from "~/utils/constants";
import { useEffect, useRef, useState } from "react";
import { SelectBox } from "../select-box";
import {
  ExpenseKindsForFilter,
  IncomeKindsForFilter,
  dirOptions,
  sortOptions,
} from "~/utils/constants";
import { DateInput } from "../date-input";
import { getLocalDate } from "~/helpers/timeConvertor";
import { Button } from "../button";
import { Svg } from "../Svg";
import { OrderHandler } from "./OrderHandler";

interface ISortAndFilter {
  type: "incomes" | "expenses";
}
// need to use as global type !!!

export function SortAndFilterBar({ type }: ISortAndFilter) {
  const [sortOption, setSortOption] = useState();
  const [direction, setDirection] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [category, setCategory] = useState();

  const date = getLocalDate();
  // todo use useRef or useMemo or UseCallback to not rerender date

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("filter");
    searchParams.delete("sort");
    searchParams.delete("dir");
    searchParams.delete("from");
    searchParams.delete("to");
    searchParams.delete("category");
    // // navigate doesnt work
    // todo - normal using of navigate

    // todo - clear filters doesnt work !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setTimeout(() => {
      navigate(`/dashboard/transactions/${type}`);
      // todo - normal turn back link
    }, 4);
    // navigate("../", { replace: true });
    navigate("../", { replace: true });
    // navigate("/dashboard/transactions/expenses");
  };

  useEffect(() => {
    // todo = at the start value = undefined, need default value
    // console.log(sortOption, direction);
  }, [sortOption, direction]);

  return (
    <div className="bg-white p-2 outline">
      Sort and filter
      <div className="flex gap-5">
        <div className="flex items-center justify-center h-fit gap-2.5">
          <Svg name="calendar" />
          <span className="font-roboto text-label font-black tracking-medium text-secondary">
            {date}
          </span>
        </div>
        <div>
          <Form>
            <div className="flex gap-4">
              <div className="flex flex-wrap gap-6">
                <div className="outline p-2">
                  Sorting
                  <SelectBox
                    name="sort"
                    options={sortOptions}
                    id="1"
                    onChange={(e) => {
                      setSortOption(e.currentTarget.value);
                    }}
                    value={sortOption || searchParams.get("sort")}
                  />
                  <SelectBox
                    name="dir"
                    options={dirOptions}
                    id="2"
                    onChange={(e) => {
                      setDirection(e.currentTarget.value);
                    }}
                    value={direction || searchParams.get("dir")}
                  />
                  <OrderHandler />
                </div>
                <div className="outline p-2">
                  Timegap for <br />
                  CratedTime
                  <DateInput
                    name="from"
                    id="timeFrom"
                    type="date"
                    label="Time From"
                    onChange={(e) => {
                      setTimeFrom(e.currentTarget.value);
                    }}
                    value={timeFrom || searchParams.get("from")}
                  />
                  <DateInput
                    name="to"
                    id="timeTo"
                    type="date"
                    label="Time To"
                    onChange={(e) => {
                      setTimeTo(e.currentTarget.value);
                    }}
                    value={timeTo || searchParams.get("to")}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="filter"
                    className="outline"
                    placeholder="Search by description"
                  />
                  <div className="mt-4">
                    <SelectBox
                      name="category"
                      options={
                        type === "expenses"
                          ? ExpenseKindsForFilter
                          : IncomeKindsForFilter
                      }
                      id="33"
                      onChange={(e) => {
                        setCategory(e.currentTarget.value);
                      }}
                      value={category || searchParams.get("category")}
                    />
                  </div>
                </div>
              </div>
              <div className="actions">
                <Button
                  type="submit"
                  label="search"
                  className="w-fit min-w-0"
                />
                <Button
                  type="button"
                  label="clear"
                  className="w-fit min-w-0"
                  style="secondary"
                />
                <button onClick={clearFilters}>Clear Filters</button>
              </div>
            </div>

            {/* state to filter */}

            {/* todo - doesnt work */}
          </Form>
        </div>
      </div>
    </div>
  );
}

// todo - useCallback add everywhere it is necessary