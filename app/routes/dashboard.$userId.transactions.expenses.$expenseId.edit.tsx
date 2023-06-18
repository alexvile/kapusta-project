import {
  LoaderFunction,
  redirect,
  json,
  ActionFunction,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";

import { ExpenseKind } from "@prisma/client";

import { requireUserId } from "~/utils/session.server";
import {
  getExpenseByIdAndUserId,
  updateExpenseById,
} from "~/utils/transaction.server";
// import { requireUserId } from "~/utils/session.server";
// import { createExpense } from "~/utils/transaction.server";
// import type { Expense as IExpense } from "@prisma/client";
// import { Form } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  // console.log("params from edit", params);
  const { userId, expenseId } = params;
  if (typeof userId !== "string" || typeof expenseId !== "string") {
    return redirect("/");
    // todo - right redirect !!!
  }
  // todo - error cath boundry and handlers
  // todo - meta, links etc
  const expenseById = await getExpenseByIdAndUserId(userId, expenseId);
  return { userId, expenseId, expenseById };
};

// todo add native remix "Form, Links, separating scripts, lazyloads etc"

// todo = update, return new data. After update you should update all expenses at frontend

export const action: ActionFunction = async ({ request, params }) => {
  const ownerId = await requireUserId(request);
  const { userId, expenseId } = params;

  const form = await request.formData();

  const description = form.get("description");
  const type = form.get("type");
  const createdTime = form.get("createdTime");
  const valueS = form.get("value");
  const value = Number(valueS);

  // todo: typeof type should be enum
  if (
    typeof description !== "string" ||
    typeof type !== "string" ||
    typeof value !== "number" ||
    typeof createdTime !== "string" ||
    typeof expenseId !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  await updateExpenseById({
    id: expenseId,
    createdTime,
    description,
    type: type as ExpenseKind,
    value,
  });
  // return redirect("/home");
  return { expenseId, description, type, createdTime, value };
  // return null;
};
// todo - add route or function or snippet "get expense by ID"

// todo: check if we need load "requireUserID" at every step

// todo: loaders, notifications, auto close/open, add modals
export default function EditExpense() {
  const { userId, expenseId, expenseById } = useLoaderData();
  const actionData = useActionData();
  // console.log("actionData11", actionData);

  // console.log("loaderData", expenseById);
  // todo: logic to update
  // todo: for options we use CONSTANT in separate file

  return (
    <>
      <div className="outline w-fit bg-bg-input outline-4 m-2">
        <h3>Edit expense MODAL</h3>
        <div>Editing: {expenseId}</div>

        <form method="post">
          <input type="hidden" value={userId} name="ownerId" />
          <label>
            <span className="block">Description</span>
            <input
              type="text"
              name="description"
              defaultValue={expenseById?.description}
            />
          </label>
          <span className="block">Select Type</span>
          <select
            name="type"
            id="type"
            className="block"
            defaultValue={expenseById?.type}
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
            defaultValue={expenseById?.createdTime}
          ></input>
          <span className="block"> Select value</span>
          <input type="number" name="value" defaultValue={expenseById?.value} />
          <button type="submit" className="block outline mt-1">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

// todo: !!! when getting, creating, editing, deleting need to check if current user do this, not another user !!!
