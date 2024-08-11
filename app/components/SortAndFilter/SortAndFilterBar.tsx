import { Form, useNavigate, useSearchParams } from "@remix-run/react";
// import { sortOptions } from "~/utils/constants";
import { useEffect, useState } from "react";
import { SelectBox } from "../select-box";
import {
  ExpenseKindsForFilter,
  IncomeKindsForFilter,
  sortOptionsTransactions,
} from "~/utils/constants";
import { getLocalDate } from "~/helpers/timeConvertor";
import { LegacyButton } from "../button";
import { Svg } from "../Svg";
import { SortAndFilterType } from "~/types/types";
import { SortBlock } from "./SortBlock";
import { FilterBlock } from "./FilterBlock";

interface SortAndFilterBarProps {
  type: SortAndFilterType;
}
// need to use as global type !!!
export function SortAndFilterBar({ type }: SortAndFilterBarProps) {
  // need refactor
  const getSortOptions = () => {
    switch (type) {
      case "expenses":
        return sortOptionsTransactions;
      case "incomes":
        return sortOptionsTransactions;
      case "clients":
        return [];
      default:
        return [];
    }
  };
  const getCategories = () => {
    // need refactor
    // use only dynamic categories
    switch (type) {
      case "expenses":
        return ExpenseKindsForFilter;
      case "incomes":
        return IncomeKindsForFilter;
      case "clients":
        return [];
      default:
        return [];
    }
  };
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    console.log(1111, searchParams);
  }, [searchParams]);
  // const [timeFrom, setTimeFrom] = useState(
  //   () => searchParams.get("from") || ""
  // );
  // const [timeTo, setTimeTo] = useState(() => searchParams.get("to") || "");
  // const [category, setCategory] = useState(() => searchParams.get("category"));

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
                  <SortBlock options={getSortOptions()} />
                  <FilterBlock categories={getCategories()} />
                  <div className="px-2 py-1">
                    <input
                      type="text"
                      name="filter"
                      placeholder="Search by description"
                    />
                  </div>
                </div>

                <div className="w-full flex items-center justify-between mt-1 rounded-bl-xl border-2 border-inputBorder rounded-br-xl"></div>
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
