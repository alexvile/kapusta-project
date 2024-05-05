import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Modal } from "~/components/modal";
import { requireUserId } from "~/utils/session.server";
import {
  createBusiness,
  createService,
  getAllBusinessesWithServicesByOwnerId,
} from "~/utils/structure.server";

import { IBusinessWithServices, ModalTarget } from "~/types/types";
import { StructureModalContent } from "~/components/structure-modal-content";
import {
  validateStructureBusinessForm,
  validateStructureServicesForm,
} from "~/utils/form-validators.server";
import { BusinessWithServices } from "~/components/Structure/BusinessWithServices";

export const loader: LoaderFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  return await getAllBusinessesWithServicesByOwnerId(ownerId);
};

export const action: ActionFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  const form = await request.formData();
  const intent = form.get("intent");
  const formObject = Object.fromEntries(form.entries());

  if (intent === "createBusiness") {
    const response = validateStructureBusinessForm({ ...formObject, ownerId });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await createBusiness(response.validatedData);
    return json({ status: "success" }, { status: 201 });
  }

  if (intent === "createService") {
    // todo - check if we have this fields in all routes !!!!!!!!!!!!!!
    // todo - validations !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! front end + backend
    const response = validateStructureServicesForm({ ...formObject, ownerId });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await createService(response.validatedData);
    return json({ status: "success" }, { status: 201 });

    // await createService({});
    // const name = form.get("name");
    // if (typeof name !== "string" || typeof ownerId !== "string") {
    //   return json({ error: `Invalid Form Data` }, { status: 400 });
    // }
    // await createBusiness({ ownerId, name });
    // return json("created business");
  }

  // todo - return redirects
  // todo snippet for redirects, invalid form data etc
  // todo - error boundaries

  // return newBusiness;s
  // return redirect("/dashboard/structure");

  // todo - close popup after creating !!!!!!!!!!!!!!
};

// todo: decide if use requireuserID or getUserId
export default function Structure() {
  const actionData = useActionData();
  // console.log(actionData);
  const businessAndServices = useLoaderData();
  const [open, setOpen] = useState(false);

  // todo - ts warning
  // todo move to types

  const [modalTarget, setModalTarget] = useState();
  // const { userId } = useLoaderData();
  const handleClick = () => {
    setOpen(!open);
  };

  const openModal = (event: React.ChangeEvent<HTMLButtonElement>) => {
    const target = event.target;
    // if (!target || typeof target !== "string") return;
    // todo ts check
    setModalTarget(target);
    handleClick();
  };

  // todo - temporary solution. need fix later
  // todo - popup problem dont close every time, a lot of bugs !!!!!!!!!!!
  useEffect(() => {
    // console.log(actionData);
    if (actionData) {
      setOpen(false);
    }
  }, [actionData]);

  // todo - add feature edit as form fields not a popup (in future !!!!!!!!!!!!!!!)
  // todo - if we edit name and structure of business, old business will not be available
  return (
    <>
      <button
        type="button"
        name="create-business"
        className="bg-slate-200 p-2"
        // todo ts check
        onClick={openModal}
      >
        add new business category +
      </button>
      <div>Expand all (close all)</div>

      <Modal isOpen={open} onClose={handleClick} type="popup">
        <Form method="post">
          <StructureModalContent target={modalTarget} />
        </Form>
      </Modal>
      {/* add accordions */}
      {businessAndServices.length > 0 && (
        <ul>
          {businessAndServices.map((b: IBusinessWithServices) => (
            <BusinessWithServices key={b.id} {...b} openModal={openModal} />
          ))}
        </ul>
      )}

      {/* todo - add placeholder with images if empty (business, clients, etc) */}

      <Outlet />
    </>
  );
}

// pagination
