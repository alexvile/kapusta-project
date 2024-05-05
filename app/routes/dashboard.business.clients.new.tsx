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
import { DateInput } from "~/components/date-input";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
import { SelectBox } from "~/components/select-box";
import { createClient } from "~/utils/clients.server";
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
  const firstName = form.get("firstName");
  const lastName = form.get("lastName");
  const birthday = form.get("birthday");
  const phone = form.get("phone");
  const priceLevel = form.get("priceLevel");
  const description = form.get("description");

  if (
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof phone !== "string" ||
    typeof priceLevel !== "string" ||
    typeof birthday !== "string" ||
    typeof description !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await createClient({
    ownerId,
    firstName,
    lastName,
    birthday,
    phone,
    priceLevel,
    description,
    // createdTime,
    // description,
    // type: type as ExpenseKind,
    // value,
  });
  // return redirect("/home");
  // return { ownerId, description, type, createdTime, value };
  return redirect("/dashboard/business/clients");
};

// todo - use user outlet context and remove user id from all routes !!!!!

// todo - change actionData to form data from state.
// todo - add value and react state
export default function NewClient() {
  const [birthday, setBirthday] = useState("");
  // var offset = new Date().getTimezoneOffset();
  // console.log(offset);

  // const [time, setTime] = useState();
  // const [type, setType] = useState();

  const { user } = useLoaderData();
  // const actionData = useActionData();
  // console.log("actionData", actionData);

  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="New client"
        type="modal"
        backTo="/dashboard/business/clients"
      >
        <div className="m-2 p-2 outline w-fit">
          <h4>New Client</h4>

          <Form method="post">
            {/* todo - think how add ownerId, not useing inpu type hidden */}
            <input type="hidden" value={user} name="ownerId" />
            <FormField type="text" htmlFor="firstName" label="Name" />
            <FormField type="text" htmlFor="lastName" label="Surname" />
            <DateInput
              name="birthday"
              type="date"
              value={birthday}
              onChange={(e) => {
                setBirthday(e.currentTarget.value);
              }}
              label="Set birthday"
            />
            <FormField type="tel" htmlFor="phone" label="Phone" />
            <select name="priceLevel" id="">
              <option value="DEFAULT">Default</option>
              <option value="SPECIAL">Special</option>
              {/* todo import from prisma */}
            </select>
            {/* todo - create UX - price level */}
            <FormField type="text" htmlFor="description" label="Add info" />
            {/* todo - USE TEXTAREA TO BIG TEXTS !!!!!!!!!!!!!!!! */}

            <LegacyButton type="submit" label="submit" />
            {/* Reset BTN */}
          </Form>
        </div>
      </Modal>
    </>
  );
}
