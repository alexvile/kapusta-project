import { Form, useNavigate, useSearchParams } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { SelectBox } from "./select-box";
import { dirOptions, sortOptionsClients } from "~/utils/constants";
import { Button } from "./button";

export function SortAndFilterClients() {
  const [sortOption, setSortOption] = useState();
  const [direction, setDirection] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const [category, setCategory] = useState();

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const clearFilters = () => {
    searchParams.delete("filter");
    searchParams.delete("sort");
    searchParams.delete("dir");
    // // navigate doesnt work
    // todo - normal using of navigate

    // todo - clear filters doesnt work !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    setTimeout(() => {
      navigate("/dashboard/business/clients");
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
        <div>
          <Form>
            <div className="flex gap-4">
              <div className="flex flex-wrap gap-6">
                <div className="outline p-2">
                  Sorting
                  <SelectBox
                    name="sort"
                    options={sortOptionsClients}
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

                <div>
                  <input
                    type="text"
                    name="filter"
                    className="outline"
                    placeholder="Search by name or surname"
                  />
                  <div className="mt-4"></div>
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
          </Form>
        </div>
      </div>
    </div>
  );
}

//  todo -  lear filters doesnot clear input
