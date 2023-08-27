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
import { createClient } from "~/utils/business.server";
import { getUserId, requireUserId } from "~/utils/session.server";
import { createExpense } from "~/utils/transaction.server";
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
  // const firstName = form.get("firstName");
  // const lastName = form.get("lastName");
  // const birthday = form.get("birthday");
  // const phone = form.get("phone");
  // const priceLevel = form.get("priceLevel");
  // const description = form.get("description");

  // // select with client

  // if (
  //   typeof firstName !== "string" ||
  //   typeof lastName !== "string" ||
  //   typeof phone !== "string" ||
  //   typeof priceLevel !== "string" ||
  //   typeof birthday !== "string" ||
  //   typeof description !== "string"
  // ) {
  //   return json({ error: `Invalid Form Data` }, { status: 400 });
  // }

  // await createClient({
  //   ownerId,
  //   firstName,
  //   lastName,
  //   birthday,
  //   phone,
  //   priceLevel,
  //   description,
  //   // createdTime,
  //   // description,
  //   // type: type as ExpenseKind,
  //   // value,
  // });
  // return redirect("/home");
  // return { ownerId, description, type, createdTime, value };
  // return redirect("/dashboard/business/clients");
  return null;
};

export default function NewRecord() {
  const [plannedTime, setPlannedTime] = useState();
  const { user } = useLoaderData();

  return (
    <>
      {/* <Modal
        isOpen={true}
        ariaLabel="New record"
        type="modal"
        backTo="/dashboard/business/records"
      > */}
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

          {/* add feature client connector */}
          <ClientConnector />

          <Button type="submit" label="submit" />
          {/* Reset BTN */}
        </Form>
      </div>
      {/* </Modal> */}
    </>
  );
}
