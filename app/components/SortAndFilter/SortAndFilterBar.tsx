import { Form, useNavigate, useSearchParams } from "@remix-run/react";
// import { sortOptions } from "~/utils/constants";
import { useEffect, useState } from "react";
import { SelectBox } from "../select-box";
import {
  ExpenseKindsForFilter,
  IncomeKindsForFilter,
  sortOptionsTransactions,
} from "~/utils/constants";
import { DateInput } from "../date-input";
import { getLocalDate } from "~/helpers/timeConvertor";
import { LegacyButton } from "../button";
import { Svg } from "../Svg";
import { DirectionHandler } from "./DirectionHandler";
import { TransactionType } from "~/types/types";
import { SortBlock } from "./SortBlock";
import { Button } from "../Layout/Button";
import { Icon } from "../Layout/Icon";
import { FilterBlock } from "./FilterBlock";

interface ISortAndFilter {
  type: TransactionType;
}
// need to use as global type !!!

export function SortAndFilterBar({ type }: ISortAndFilter) {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const [timeFrom, setTimeFrom] = useState(
    () => searchParams.get("from") || ""
  );
  const [timeTo, setTimeTo] = useState(() => searchParams.get("to") || "");
  const [category, setCategory] = useState(() => searchParams.get("category"));

  const date = getLocalDate();
  // todo use useRef or useMemo or UseCallback to not rerender date

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

  return (
    <div className="p-2">
      <div className="flex gap-3">
        <div className="flex items-center justify-center h-fit gap-2.5">
          <Svg name="calendar" />
          <span className="font-roboto text-label font-black tracking-medium text-secondary">
            {date}
          </span>
        </div>
        <div>
          <Form>
            <div className="flex gap-4 items-center">
              <div className="flex flex-wrap col-gap-2">
                <div className="w-full flex border-2 border-inputBorder rounded-tl-xl items-center justify-between gap-2 rounded-tr-xl">
                  {/* <div className="flex gap-2 items-center justify-start px-2 py-1 border-r-2 border-inputBorder">
                    <p>Sort By:</p>
                    <SelectBox
                      name="sort"
                      options={sortOptions}
                      onChange={(e) => {
                        setSortOption(e.currentTarget.value);
                      }}
                      value={sortOption}
                    />
                    <DirectionHandler
                      value={direction}
                      setDirection={setDirection}
                    />
                  </div> */}
                  <SortBlock options={sortOptionsTransactions} />
                  <FilterBlock />

                  <div className="px-2 py-1">
                    <input
                      type="text"
                      name="filter"
                      placeholder="Search by description"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-between mt-1 rounded-bl-xl border-2 border-inputBorder rounded-br-xl">
                  <div className="flex gap-2 px-2 border-r-2 border-inputBorder">
                    {/* Date filter */}
                    <DateInput
                      name="from"
                      type="date"
                      label="From:"
                      onChange={(e) => {
                        setTimeFrom(e.currentTarget.value);
                      }}
                      value={timeFrom}
                    />

                    <DateInput
                      name="to"
                      type="date"
                      label="To:"
                      onChange={(e) => {
                        setTimeTo(e.currentTarget.value);
                      }}
                      value={timeTo}
                    />
                  </div>
                  <div className="px-2 py-1">
                    <SelectBox
                      name="category"
                      options={
                        type === "expenses"
                          ? ExpenseKindsForFilter
                          : IncomeKindsForFilter
                      }
                      onChange={(e) => {
                        setCategory(e.currentTarget.value);
                      }}
                      value={category}
                    />
                  </div>
                </div>
              </div>

              <div className="actions">
                <LegacyButton
                  type="submit"
                  style="custom"
                  className="action-button mb-3"
                  icon="search"
                  ariaLabel="Search"
                />
                <LegacyButton
                  type="button"
                  style="custom"
                  className="action-button"
                  icon="clear-filters"
                  ariaLabel="Clear filters"
                  onClick={clearFilters}
                />
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
