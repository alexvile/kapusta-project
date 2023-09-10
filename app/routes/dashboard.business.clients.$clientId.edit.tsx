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

import { getUserId, requireUserId } from "~/utils/session.server";

import { Modal } from "~/components/modal";

import { FormField } from "~/components/form-field";
import { useState } from "react";
import { DateInput } from "~/components/date-input";
import { Button } from "~/components/button";
import {
  getClientByIdAndUserId,
  updateClientById,
} from "~/utils/clients.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const { clientId } = params;
  if (typeof userId !== "string" || typeof clientId !== "string") {
    return redirect("/");
    // todo - right redirect !!!
  }

  // todo - error cath boundry and handlers
  // todo - meta, links etc

  const clientById = await getClientByIdAndUserId(userId, clientId);
  return { userId, clientById };
};

export const action: ActionFunction = async ({
  request,
  params,
}: ActionArgs) => {
  // todo: do we need OwnerID and this middleware ????????????
  const ownerId = await requireUserId(request);
  const { clientId } = params;

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
    typeof description !== "string" ||
    typeof clientId !== "string"
  ) {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }

  await updateClientById({
    id: clientId,
    firstName,
    lastName,
    phone,
    priceLevel,
    birthday,
    description,
  });
  // return { expenseId, description, type, createdTime, value };
  return redirect("/dashboard/business/clients");

  // return null;
};

export default function EditExpense() {
  const { userId, clientById } = useLoaderData();
  const [birthday, setBirthday] = useState(clientById?.birthday);
  // console.log("actionData11", actionData);
  // todo: logic to update
  // todo: for options we use CONSTANT in separate file
  // todo add checking if we have this expense if no -404
  // todo !!!! when edit date is lost !!!
  return (
    <>
      <Modal
        isOpen={true}
        ariaLabel="Updating client"
        className="w-2/3 p-10"
        type="modal"
        backTo="/dashboard/business/clients"
      >
        <div className="outline w-fit bg-white outline-4 p-2 ">
          <h3>Edit client MODAL</h3>
          <Form method="post">
            <input type="hidden" value={userId} name="ownerId" />
            <FormField
              type="text"
              htmlFor="firstName"
              label="Name"
              defaultValue={clientById?.firstName}
            />
            <FormField
              type="text"
              htmlFor="lastName"
              label="Surname"
              defaultValue={clientById?.lastName}
            />
            <DateInput
              name="birthday"
              id="birthday"
              type="date"
              // defaultValue={clientById?.birthday}
              value={birthday}
              onChange={(e) => {
                setBirthday(e.currentTarget.value);
              }}
              label="Set birthday"
            />

            <FormField
              type="tel"
              htmlFor="phone"
              label="Phone"
              defaultValue={clientById?.phone}
            />
            <FormField
              type="text"
              htmlFor="priceLevel"
              label="Price level"
              defaultValue={clientById?.priceLevel}
            />
            <FormField
              type="text"
              htmlFor="description"
              label="Description"
              defaultValue={clientById?.description}
            />
            <Button type="submit" label="submit" />
          </Form>
        </div>
      </Modal>
    </>
  );
}
