import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";

export const ClientConnector = () => {
  const fetcher = useFetcher();
  const [filter, SetFilter] = useState("");
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [blocked, setBlocked] = useState(false);

  // todo - make it better !!!!!!!!!! now it is at the previous filter step !!!!!!!!!!!!!!!!!!!!!!!!!!
  // todo - fetch only name and surname
  // todo - make separate route to fetch only name, surname and ID
  // todo - DEBOUNCE !!!!!!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    // console.log(filter);
    const trimmedFilter = filter.trim();
    // todo - strip or trim
    if (trimmedFilter) {
      fetcher.load(`/dashboard/business/clients?filter=${trimmedFilter}`);
    }
    console.log(fetcher.data);
    setFilteredClients(fetcher.data);
  }, [filter]);
  useEffect(() => {
    console.log(111, filteredClients);
  }, [filteredClients]);

  //   useEffect(() => {
  //     if (fetcher.state === "idle" && fetcher.data == null) {
  //       fetcher.load(`/dashboard/business/clients?filter=${filter}`);
  //     }
  //     setFilteredClients(fetcher.data);
  //   }, [fetcher]);

  //   todo - better code and UI !!!!!!!!!!!!!!!!!!
  const mm = filteredClients?.filteredClients;
  const select = (id: string, name, surname) => {
    console.log(1212, id);
    setSelectedClient(id);
    // todo - prevent extra refetch
    SetFilter(name + " " + surname);
    setFilteredClients([]);

    setBlocked(true);
  };
  const deselect = () => {
    setSelectedClient("");
    SetFilter("");
    setBlocked(false);
  };
  return (
    <div>
      Client connector
      <br />
      <input
        className="border"
        type="text"
        // hidden
        name="clientId"
        id=""
        placeholder="hidden"
        defaultValue={selectedClient}
      />
      <br />
      {/* <input type="hidden" name="clientId" id="" /> */}
      <input
        type="text"
        className="border"
        placeholder="start typing client"
        disabled={blocked}
        value={filter}
        onChange={(e) => {
          SetFilter(e.currentTarget.value);
        }}
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
        {filteredClients &&
          mm?.length > 0 &&
          mm.map((client) => (
            <li
              key={client.id}
              onClick={() =>
                select(client.id, client.firstName, client.lastName)
              }
            >
              {client.firstName}&nbsp;{client.lastName}
            </li>
          ))}
      </ul>
    </div>
  );
};

//   console.log(fetcher);
//   <fetcher.Form {...formOptions} />;

//   useEffect(() => {
//     fetcher.submit(data, options);
//     fetcher.load(href);
//   }, [fetcher]);

//   fetcher.state;
//   fetcher.formMethod;
//   fetcher.formAction;
//   fetcher.formData;
//   fetcher.formEncType;
//   fetcher.data;.
