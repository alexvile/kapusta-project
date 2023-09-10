import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Button } from "~/components/button";
import { ClientConnector } from "~/components/client-connector";
import { DateInput } from "~/components/date-input";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
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
  const ownerId = await requireUserId(request);
  const form = await request.formData();
  const localTime = form.get("createdTime");
  const clientId = form.get("clientId");
  const description = form.get("description");
  const priceS = form.get("price");
  const price = Number(priceS);

  if (!localTime) {
    return json({ error: `No time provided` }, { status: 400 });
  }
  if (typeof localTime !== "string") {
    return json({ error: `Wrong time format` }, { status: 400 });
  }
  const plannedTime = new Date(localTime).toISOString();

  if (
    typeof plannedTime !== "string" ||
    typeof clientId !== "string" ||
    typeof description !== "string" ||
    typeof price !== "number"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await createRecord({
    ownerId,
    plannedTime,
    clientId,
    description,
    price,
  });
  return redirect("/dashboard/business/records");
};

export default function NewRecord() {
  const [plannedTime, setPlannedTime] = useState();
  const { user } = useLoaderData();

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
            {/* todo - think how add ownerId, not useing inpu type hidden */}
            <input type="hidden" value={user} name="ownerId" />

            <DateInput
              name="createdTime"
              id="createdTime"
              value={plannedTime}
              onChange={(e) => {
                setPlannedTime(e.currentTarget.value);
              }}
              label="Select planned time of record"
            />
            <FormField type="text" htmlFor="description" label="Description" />
            <FormField type="number" htmlFor="price" label="Select price" />
            <ClientConnector />
            <Button type="submit" label="submit" />
            {/* Reset BTN */}
          </Form>
        </div>
      </Modal>
    </>
  );
}
