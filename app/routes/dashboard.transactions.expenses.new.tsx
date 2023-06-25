import { ExpenseKind } from "@prisma/client";
import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
  ActionArgs,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { Modal } from "~/components/modal";
import { getUserId, requireUserId } from "~/utils/session.server";
import { createExpense } from "~/utils/transaction.server";
// import type { Expense as IExpense } from "@prisma/client";
// import { Form } from "@remix-run/react";

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

  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // console.log(description, type, createdTime, typeof value);

  // '2023-06-13T22:24:39'  --- from input
  // 2023-06-10T18:49:13.387+00:00 ---- in db
  // 2023-06-10T18:49:13.387Z  --- in response from db

  // todo - right format to DB with timeZONE !!!!!!!!!!!!!!!!!!

  // todo - after registration give user ability to accept/change his timezone
  // todo- add timezone to context and take it from context together with user

  if (
    typeof description !== "string" ||
    typeof type !== "string" ||
    typeof value !== "number" ||
    typeof createdTime !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  // console.log(ownerId);
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
        className="w-2/3 p-10"
        type="modal"
        backTo="/dashboard/transactions/expenses"
      >
        <div className="m-2 outline w-fit">
          <h4>New expense</h4>

          <form method="post">
            <input type="hidden" value={user} name="ownerId" />
            <label>
              <span className="block">Description</span>
              <input
                type="text"
                name="description"
                defaultValue={actionData?.description}
              />
            </label>
            <span className="block">Select Type</span>
            <select
              name="type"
              id="type"
              className="block"
              defaultValue={actionData?.type}
            >
              <option value="RENT">RENT</option>
              <option value="COMMUNAL">COMMUNAL</option>
              <option value="MARKETING">MARKETING</option>
              <option value="CONSUMABLES">CONSUMABLES</option>
              <option value="OTHER">OTHER</option>
            </select>

            <span className="block"> Select time</span>

            {/* todo input datetime - but global or including local */}

            <input
              type="datetime-local"
              name="createdTime"
              // step="1"
              defaultValue={actionData?.createdTime}
            ></input>

            <span className="block"> Select value</span>
            <input type="number" name="value" />
            <button type="submit" className="block outline mt-1">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
}
