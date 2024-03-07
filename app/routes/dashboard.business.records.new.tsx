import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useMatches,
  useOutletContext,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import { ClientConnector } from "~/components/client-connector";
import { DateInput } from "~/components/date-input";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
import { SelectBox } from "~/components/select-box";
import {
  convertFromUTCToLocalISO,
  convertToMs,
  formatIsoUTCStringToLocalWithoutSeconds,
  summMsAndReturnLocalTime,
} from "~/helpers/timeConvertor";
import { createRecord } from "~/utils/records.server";
import { getUserId, requireUserId } from "~/utils/session.server";
// import type { Expense as IExpense } from "@prisma/client";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return redirect("/");
    // todo - right redirect !!!
  }
  return userId;
};
// todo:
// todo: decide where hide user ID or use it from action/loader data
export const action: ActionFunction = async ({ request }: ActionArgs) => {
  // update backend !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  const ownerId = await requireUserId(request);
  const form = await request.formData();
  const localTimeStart = form.get("plannedStart");
  const localTimeEnd = form.get("plannedEnd");
  const clientId = form.get("clientId");
  const description = form.get("description");
  const priceS = form.get("price");
  const price = Number(priceS);

  // todo - normal proverka
  if (!localTimeStart || !localTimeEnd) {
    return json({ error: `No time provided` }, { status: 400 });
  }
  if (typeof localTimeStart !== "string" || typeof localTimeEnd !== "string") {
    return json({ error: `Wrong time format` }, { status: 400 });
  }
  const plannedStartTime = new Date(localTimeStart).toISOString();
  // todo - create normal plannedEndTime (with preselect)
  const plannedEndTime = new Date(localTimeEnd).toISOString();
  /* todo - list 
  1) on click to calendar open modal with preselecet date from click (selected) (can change)
  2) set procedure
  3) set client
  4) output - preselected plannedEndTime and price (can change)
  5) on submit - create new record with pending status
  6) after cancellation or approve - go to draft...
  */
  if (
    typeof plannedStartTime !== "string" ||
    typeof plannedEndTime !== "string" ||
    typeof clientId !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await createRecord({
    ownerId,
    plannedStartTime,
    plannedEndTime,
    clientId,
    description,
    price,
  });
  return redirect("/dashboard/business/records");
  // return null;
};

export default function NewRecord() {
  const [plannedStartTime, setPlannedStartTime] = useState<string>();
  const [plannedEndTime, setPlannedEndTime] = useState<string>();
  const { user } = useLoaderData();
  // const matches = useMatches();
  const { businessStructure } = useRouteLoaderData("routes/dashboard");
  // todo - TS fix
  console.log(businessStructure);
  // todo - add callback for this func or add to useState
  const businessOptions = businessStructure.map((e) => {
    return { name: e.name, value: e.name };
  });
  // console.log(businessOptions);

  const [business, setBusiness] = useState(businessOptions[0].value);
  // const [business, setBusiness] = useState(null);
  const [serviceOptions, setServiceOptions] = useState([]);
  const [service, setService] = useState(null);
  const [clientPriceLevel, setClientPriceLevel] = useState(null);

  const [price, setPrice] = useState("");
  // const [service, setService] = useState(null);
  useEffect(() => {
    if (business) {
      // todo need optimization !!!
      const foundBusiness = businessStructure.find((e) => e.name === business);
      const cServiceOptions = foundBusiness.services.map((e) => {
        return { name: e.name, value: e.name };
      });
      setServiceOptions(cServiceOptions);

      // todo - use callback
    } else {
      setServiceOptions([]);
    }
  }, [business]);

  useEffect(() => {
    if (!plannedStartTime || !service) return;
    // todo - adding time in ms or in converted hours and minuts ????
    console.log("setting app end time");
    // todo need optimization !!!
    // todo need refactor !!!
    const foundBusiness = businessStructure.find((e) => e.name === business);
    const selectedOption = foundBusiness.services.find(
      (e) => e.name === service
    );
    // todo need refactor !!!
    const approximatelyNewTime = summMsAndReturnLocalTime(
      convertToMs(plannedStartTime),
      selectedOption.duration
    );
    // todo need refactor !!!
    //  todo - it always rebuild planned end ??? if we should fix it ???
    setPlannedEndTime(approximatelyNewTime);
  }, [service, plannedStartTime]);

  // var dateValue = new Date("2021-01-12 23:10:20");
  // dateValue.setHours(dateValue.getHours() + 2);
  // console.log(dateValue);

  useEffect(() => {
    console.log(clientPriceLevel);
    if (!clientPriceLevel || !service) return;
    if (clientPriceLevel !== "DEFAULT") {
      // todo - logic to set price from client level
      console.log("not standart");
    }
    if (clientPriceLevel === "DEFAULT") {
      // todo - logic to set price from client level
      // todo - need refactor
      const foundBusiness = businessStructure.find((e) => e.name === business);
      const selectedOption = foundBusiness.services.find(
        (e) => e.name === service
      );
      // todo - need refactor
      setPrice(selectedOption.price);
      console.log(" standart");
    }
  }, [clientPriceLevel, service]);
  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="New record"
        type="modal"
        backTo="/dashboard/business/records"
      >
        <div className="m-2 p-2 outline w-fit bg-white">
          <h4>New Record</h4>

          <Form method="post">
            {/* todo - think how add ownerId, not using input type hidden */}
            <input type="hidden" value={user} name="ownerId" />
            <SelectBox
              name="business"
              options={businessOptions}
              label="business"
              hasEmptyOption={true}
              onChange={(e) => {
                setBusiness(e.currentTarget.value);
              }}
              value={business}
            />
            <SelectBox
              name="service"
              options={serviceOptions || []}
              label="service"
              hasEmptyOption={true}
              onChange={(e) => {
                setService(e.currentTarget.value);
              }}
              value={service}
            />
            <DateInput
              name="plannedStart"
              id="plannedStart"
              value={plannedStartTime}
              onChange={(e) => {
                setPlannedStartTime(e.currentTarget.value);
              }}
              label="Set planned start time"
            />
            <DateInput
              name="plannedEnd"
              id="plannedEnd"
              value={plannedEndTime}
              onChange={(e) => {
                setPlannedEndTime(e.currentTarget.value);
              }}
              label="Set planned end time"
            />
            <ClientConnector getPriceLevel={setClientPriceLevel} />
            <FormField
              type="number"
              htmlFor="price"
              label="Select price"
              onInputChange={setPrice}
              value={price}
            />
            <FormField type="text" htmlFor="description" label="Description" />
            <Button type="submit" label="submit" />
            {/* Reset BTN */}
          </Form>
        </div>
      </Modal>
    </>
  );
}
