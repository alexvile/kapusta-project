import { IncomeKind } from "@prisma/client";
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
import { SelectBox } from "~/components/select-box";
import { IncomeKinds } from "~/utils/constants";
import { getUserId, requireUserId } from "~/utils/session.server";
import { createIncome } from "~/utils/transaction.server";
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

  const description = form.get("description");
  const type = form.get("type");
  const localTime = form.get("createdTime");
  const valueS = form.get("value");
  const value = Number(valueS);

  if (!localTime) {
    return json({ error: `No time provided` }, { status: 400 });
  }
  if (typeof localTime !== "string") {
    return json({ error: `Wrong time format` }, { status: 400 });
  }
  const createdTime = new Date(localTime).toISOString();

  if (
    typeof description !== "string" ||
    typeof type !== "string" ||
    typeof value !== "number" ||
    typeof createdTime !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await createIncome({
    ownerId,
    createdTime,
    description,
    type: type as IncomeKind,
    value,
  });
  // return redirect("/home");
  // return { ownerId, description, type, createdTime, value };
  return redirect("/dashboard/transactions/incomes");
};

// todo - use user outlet context and remove user id from all routes !!!!!

// todo - change actionData to form data from state.
// todo - add value and react state
export default function NewIncome() {
  // var offset = new Date().getTimezoneOffset();
  // console.log(offset);

  const [time, setTime] = useState();
  const [type, setType] = useState();

  const { user } = useLoaderData();
  const actionData = useActionData();
  // console.log("actionData", actionData);

  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="New income"
        type="modal"
        backTo="/dashboard/transactions/incomes"
      >
        <div className="m-2 p-2 outline w-fit">
          <h4>New expense</h4>

          <Form method="post">
            {/* todo - think how add ownerId, not useing inpu type hidden */}
            <input type="hidden" value={user} name="ownerId" />
            <FormField
              type="text"
              htmlFor="description"
              label="Description"
              // defaultValue={actionData?.description}
              // value={email}
              // error={actionData?.fieldErrors?.email}
            />
            <SelectBox
              options={IncomeKinds}
              name="type"
              id="type"
              // value={formData.style.backgroundColor}
              // onChange={(e) => handleStyleChange(e, "backgroundColor")}
              value={type}
              onChange={(e) => {
                setType(e.currentTarget.value);
              }}
              label="Select Expense Type"
            />
            {/* todo input datetime - but global or including local */}
            <DateInput
              name="createdTime"
              id="createdTime"
              value={time}
              onChange={(e) => {
                setTime(e.currentTarget.value);
              }}
              label="Select time of creation"
            />
            <FormField
              type="number"
              htmlFor="value"
              label="Select value of exp"
              // error={actionData?.fieldErrors?.email}
            />
            <Button type="submit" label="submit" />
            {/* Reset BTN */}
          </Form>
        </div>
      </Modal>
    </>
  );
}

// console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

// console.log(description, type, createdTime, typeof value);

// '2023-06-13T22:24:39'  --- from input
// 2023-06-10T18:49:13.387+00:00 ---- in db
// 2023-06-10T18:49:13.387Z  --- in response from db

// todo - right format to DB with timeZONE !!!!!!!!!!!!!!!!!!

// todo - after registration give user ability to accept/change his timezone
// todo- add timezone to context and take it from context together with user
