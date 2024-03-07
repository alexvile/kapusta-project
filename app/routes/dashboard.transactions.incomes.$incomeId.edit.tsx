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
} from "@remix-run/react";

import { IncomeKind } from "@prisma/client";

import { getUserId, requireUserId } from "~/utils/session.server";
import {
  getIncomeByIdAndUserId,
  updateIncomeById,
} from "~/utils/transaction.server";
import { Modal } from "~/components/modal";

import { convertFromUTCToLocalISO } from "~/helpers/timeConvertor";
import { FormField } from "~/components/form-field";
import { IncomeKinds } from "~/utils/constants";
import { SelectBox } from "~/components/select-box";
import { useState } from "react";
import { DateInput } from "~/components/date-input";
import { Button } from "~/components/button";
// import { requireUserId } from "~/utils/session.server";
// import { createExpense } from "~/utils/transaction.server";
// import type { Expense as IExpense } from "@prisma/client";
// import { Form } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request, params }) => {
  // console.log("params from edit", params);
  const userId = await getUserId(request);
  const { incomeId } = params;
  if (typeof userId !== "string" || typeof incomeId !== "string") {
    return redirect("/");
    // todo - right redirect !!!
  }

  // todo - error cath boundry and handlers
  // todo - meta, links etc

  const incomeById = await getIncomeByIdAndUserId(userId, incomeId);
  return { userId, incomeId, incomeById };
};

// todo add native remix "Form, Links, separating scripts, lazyloads etc"

// todo = update, return new data. After update you should update all expenses at frontend

export const action: ActionFunction = async ({
  request,
  params,
}: ActionArgs) => {
  // todo: do we need OwnerID and this middleware ????????????
  const ownerId = await requireUserId(request);
  const { incomeId } = params;

  const form = await request.formData();

  const description = form.get("description");
  const type = form.get("type");
  const localTime = form.get("createdTime");
  const valueS = form.get("value");
  const value = Number(valueS);

  // console.log(2, localTime);
  if (typeof localTime !== "string") {
    return alert("wrong local timeformat");
  }
  const createdTime = new Date(localTime).toISOString();

  // console.log(createdTime);
  // todo: typeof type should be enum
  if (
    typeof description !== "string" ||
    typeof type !== "string" ||
    typeof value !== "number" ||
    typeof createdTime !== "string" ||
    typeof incomeId !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await updateIncomeById({
    id: incomeId,
    createdTime,
    description,
    type: type as IncomeKind,
    value,
  });
  // return { expenseId, description, type, createdTime, value };
  return redirect("/dashboard/transactions/incomes");

  // return null;
};
// todo - add route or function or snippet "get expense by ID"

// todo: check if we need load "requireUserID" at every step

// todo: loaders, notifications, auto close/open, add modals
export default function EditIncome() {
  const matches = useMatches();
  console.log(matches);
  const { userId, incomeId, incomeById } = useLoaderData();
  const actionData = useActionData();

  const timeInUTC = incomeById?.createdTime;
  const localTime = convertFromUTCToLocalISO(timeInUTC);

  const [time, setTime] = useState(localTime);
  const [type, setType] = useState();
  // console.log("actionData11", actionData);
  // todo: logic to update
  // todo: for options we use CONSTANT in separate file
  // todo add checking if we have this expense if no -404
  // todo !!!! when edit date is lost !!!
  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="New income"
        className="w-2/3 p-10"
        type="modal"
        backTo="/dashboard/transactions/incomes"
      >
        <div className="outline w-fit bg-white outline-4 p-2 ">
          <h3>Edit expense MODAL</h3>
          <div>Editing: {incomeId}</div>
          {/* todo: hide userID */}
          <Form method="post">
            <input type="hidden" value={userId} name="ownerId" />
            <FormField
              type="text"
              htmlFor="description"
              label="Description"
              defaultValue={incomeById?.description}
            />
            <SelectBox
              options={IncomeKinds}
              name="type"
              // value={formData.style.backgroundColor}
              // onChange={(e) => handleStyleChange(e, "backgroundColor")}
              value={type}
              onChange={(e) => {
                setType(e.currentTarget.value);
              }}
              label="Select income Type"
            />
            {/* todo input datetime - but global or including local */}
            <DateInput
              name="createdTime"
              id="createdTime"
              // defaultValue={localTime}
              value={time}
              onChange={(e) => {
                setTime(e.currentTarget.value);
              }}
              label="Created time"
            />

            <FormField
              type="number"
              htmlFor="value"
              label="Select value of exp"
              defaultValue={incomeById?.value}

              // error={actionData?.fieldErrors?.email}
            />

            <Button type="submit" label="submit" />
          </Form>
        </div>
      </Modal>
    </>
  );
}

// todo: !!! when getting, creating, editing, deleting need to check if current user do this, not another user !!!

// export const loader = async ({ params, request }: LoaderArgs) => {
//   const userId = await getUserId(request);
//   const joke = await db.joke.findUnique({
//     where: { id: params.jokeId },
//   });
//   if (!joke) {
//     throw new Response("What a joke! Not found.", {
//       status: 404,
//     });
//   }
//   return json({ joke, isOwner: userId === joke.jokesterId });
// };

// export const action = async ({ params, request }: ActionArgs) => {
//   const form = await request.formData();
//   if (form.get("intent") !== "delete") {
//     throw new Response(`The intent ${form.get("intent")} is not supported`, {
//       status: 400,
//     });
//   }
//   const userId = await requireUserId(request);
//   const joke = await db.joke.findUnique({
//     where: { id: params.jokeId },
//   });
//   if (!joke) {
//     throw new Response("Can't delete what does not exist", {
//       status: 404,
//     });
//   }
//   if (joke.jokesterId !== userId) {
//     throw new Response("Pssh, nice try. That's not your joke", { status: 403 });
//   }
//   await db.joke.delete({ where: { id: params.jokeId } });
//   return redirect("/jokes");
// };

// const localTime2 = new Date(UTCTimeString).toLocaleString("hu-HU");
// console.log(localTime2);
// const localTimeForInput1 = localTime2.replaceAll(". ", "-");
// console.log(2, localTimeForInput1);
// // const localTimeForInput1 = "2023-06-30T20:01";
// // console.log(3, localTimeForInput1);
