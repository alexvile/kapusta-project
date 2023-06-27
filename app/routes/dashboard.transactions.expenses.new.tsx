import { ExpenseKind } from "@prisma/client";
import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/button";
import { DateInput } from "~/components/date-input";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
import { SelectBox } from "~/components/select-box";
import { ExpenseKinds } from "~/utils/constants";
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

  const description = form.get("description");
  const type = form.get("type");
  const localTime = form.get("createdTime");
  const valueS = form.get("value");
  const value = Number(valueS);

  if (typeof localTime !== "string") {
    return alert("wrong local timeformat");
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

  await createExpense({
    ownerId,
    createdTime,
    description,
    type: type as ExpenseKind,
    value,
  });
  // return redirect("/home");
  // return { ownerId, description, type, createdTime, value };
  return redirect("/dashboard/transactions/expenses");
};

// todo - use user outlet context and remove user id from all routes !!!!!

// todo - change actionData to form data from state.
// todo - add value and react state
export default function NewExpense() {
  // var offset = new Date().getTimezoneOffset();
  // console.log(offset);

  const { user } = useLoaderData();
  const actionData = useActionData();
  // console.log("actionData", actionData);

  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="New expense"
        type="modal"
        backTo="/dashboard/transactions/expenses"
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
              defaultValue={actionData?.description}
              // value={email}
              // error={actionData?.fieldErrors?.email}
            />
            <SelectBox
              options={ExpenseKinds}
              name="type"
              id="type"
              // value={formData.style.backgroundColor}
              // onChange={(e) => handleStyleChange(e, "backgroundColor")}
              label="Select Expense Type"
              // containerClassName="w-36"
              // className="w-full rounded-xl px-3 py-2 text-gray-400"
            />
            {/* todo input datetime - but global or including local */}
            <DateInput
              name="createdTime"
              id="createdTime"
              // step="1"
              label="Select time of creation"
              defaultValue={actionData?.createdTime}
            />
            <FormField
              type="number"
              htmlFor="value"
              label="Select value of exp"
              defaultValue={actionData?.value}
              // value={email}
              // error={actionData?.fieldErrors?.email}
            />
            <Button type="submit" label="submit" />
            Reset BTN
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
