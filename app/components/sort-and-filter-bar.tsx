import { useNavigate, useSearchParams } from "@remix-run/react";
// import { sortOptions } from "~/utils/constants";
import { useEffect, useRef, useState } from "react";
import { SelectBox } from "./select-box";
import {
  ExpenseKindsForFilter,
  dirOptions,
  sortOptions,
} from "~/utils/constants";
import { DateInput } from "./date-input";
import { getLocalDate } from "~/helpers/timeConvertor";
import { Button } from "./button";

export function SortAndFilterBar() {
  const [sortOption, setSortOption] = useState();
  const [direction, setDirection] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [category, setCategory] = useState();

  const date = getLocalDate();
  // todo use useRef or useMemo to not rerender date

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("filter");
    searchParams.delete("sort");
    searchParams.delete("dir");
    searchParams.delete("from");
    searchParams.delete("to");
    searchParams.delete("category");
    // navigate("/dashboard/transactions");
  };

  useEffect(() => {
    // todo = at the start value = undefined, need default value
    // console.log(sortOption, direction);
  }, [sortOption, direction]);

  return (
    <div className="bg-white p-2 outline">
      Sort and filter
      <div className="flex gap-5">
        <div>Cal: {date}</div>
        <div>
          <form>
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
                      options={ExpenseKindsForFilter}
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
              </div>
            </div>

            {/* state to filter */}

            {/* todo - doesnt work */}
            {/* {searchParams.get("filter") && (
          <button onClick={clearFilters}>Clear Filters</button>
        )} */}
          </form>
        </div>
      </div>
    </div>
  );
}

// todo
