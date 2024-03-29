import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { useDebounce } from "use-lodash-debounce";
import type { Client as IClient } from "@prisma/client";

// todo lodash cancelable bug !!!!!!

interface IClientConnector {
  // todo - TS
  getPriceLevel?: (...args: any) => any;
}
export const ClientConnector = ({
  getPriceLevel = () => {},
}: IClientConnector) => {
  const fetcher = useFetcher();
  const [filter, setFilter] = useState("");
  const [autocompleteClients, setAutocompleteClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [blocked, setBlocked] = useState(false);
  const debouncedFilter = useDebounce(filter, 400);

  // todo - better code and UI !!!!!!!!!!!!!!!!!!
  // todo - fetch only first 20-30 clients

  useEffect(() => {
    if (!debouncedFilter) {
      setAutocompleteClients([]);
    }
    let value = debouncedFilter.trim();
    if (value && value !== "" && !blocked) {
      console.log("fetching");
      fetcher.load(`/service/autocomplete/clients?filter=${value}`);
    }
  }, [debouncedFilter]);

  useEffect(() => {
    const filteredClients = fetcher.data?.filteredClients;
    if (!filteredClients) return;
    setAutocompleteClients(filteredClients);
  }, [fetcher]);

  const select = (
    id: IClient["id"],
    name: IClient["firstName"],
    surname: IClient["lastName"],
    priceLevel: IClient["priceLevel"]
  ) => {
    setSelectedClient(id);
    getPriceLevel(priceLevel);
    setBlocked(true);
    setFilter(name + " " + surname);
    setAutocompleteClients([]);
  };
  const deselect = () => {
    getPriceLevel(null);
    setSelectedClient("");
    setFilter("");
    setBlocked(false);
  };

  return (
    <div>
      Client connector
      <br />
      <input
        className="border"
        type="hidden"
        name="clientId"
        placeholder="hidden"
        defaultValue={selectedClient}
      />
      <br />
      <input
        type="text"
        className="border"
        placeholder="start typing client"
        disabled={blocked}
        onChange={(e) => setFilter(e.currentTarget.value)}
        value={filter}
      />
      {blocked && (
        <span
          className="text-xl inline-flex w-7 h-7 border justify-center items-center"
          onClick={deselect}
        >
          x
        </span>
      )}
      <ul>
        {autocompleteClients &&
          autocompleteClients.length > 0 &&
          autocompleteClients.map(
            (
              client: Pick<
                IClient,
                "id" | "firstName" | "lastName" | "priceLevel"
              >
            ) => (
              <li
                key={client.id}
                onClick={() =>
                  select(
                    client.id,
                    client.firstName,
                    client.lastName,
                    client.priceLevel
                  )
                }
              >
                {client.firstName}&nbsp;{client.lastName}
              </li>
            )
          )}
      </ul>
    </div>
  );
};
