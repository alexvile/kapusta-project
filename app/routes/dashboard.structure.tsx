import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { Form, Outlet, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Modal } from "~/components/modal";
import { requireUserId } from "~/utils/session.server";
import {
  createBusiness,
  createService,
  getAllBusinessesWithServicesByOwnerId,
  updateBusinessById,
  updateServiceById,
} from "~/utils/structure.server";

import {
  BusinessModalProps,
  IBusinessWithServices,
  IOpenModal,
} from "~/types/types";
import { StructureModalContent } from "~/components/Structure/StructureModalContent";
import {
  validateStructureBusinessCreate,
  validateStructureBusinessUpdate,
  validateStructureServicesCreate,
  validateStructureServicesUpdate,
} from "~/utils/form-validators.server";
import { BusinessWithServices } from "~/components/Structure/BusinessWithServices";
import { Button } from "~/components/Layout/Button";
import { Icon } from "~/components/Layout/Icon";

export const loader: LoaderFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  // throw new Error(`The intent  is not supported`, {
  //   status: 400,
  // });
  return await getAllBusinessesWithServicesByOwnerId(ownerId);
};
// todo - check if we have this fields in all routes !!!!!!!!!!!!!!
// todo - validations !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! front end + backend
export const action: ActionFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  const form = await request.formData();
  const intent = form.get("intent");
  const formObject = Object.fromEntries(form.entries());
  if (intent === "createBusiness") {
    const response = validateStructureBusinessCreate({
      ...formObject,
      ownerId,
    });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await createBusiness(response.validatedData);
    return json({ status: "success" }, { status: 201 });
  }
  if (intent === "editBusiness") {
    const response = validateStructureBusinessUpdate({ ...formObject });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await updateBusinessById(response.validatedData);
    return json({ status: "success" }, { status: 200 });
  }

  if (intent === "createService") {
    const response = validateStructureServicesCreate({
      ...formObject,
      ownerId,
    });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await createService(response.validatedData);
    return json({ status: "success" }, { status: 201 });
  }

  if (intent === "editService") {
    const response = validateStructureServicesUpdate({
      ...formObject,
    });
    if (response.error) {
      const { error, status } = response;
      return json({ error }, { status });
    }
    await updateServiceById(response.validatedData);
    return json({ status: "success" }, { status: 200 });
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
  // fix open-close all logic. IF all open or close manually
  const [allAccOpen, setAllAccOpen] = useState(true);

  // todo - ts warning
  // todo move to types

  const [modalTarget, setModalTarget] = useState<BusinessModalProps>();
  // const { userId } = useLoaderData();
  const toggleModal = () => {
    setOpen(!open);
  };

  const openModal: IOpenModal = (data) => {
    setModalTarget(data);
    toggleModal();
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
    // todo ts check

    <>
      <div className="flex items-center justify-between">
        <Button
          style="outlined"
          ariaLabel="Add new business"
          onPress={() => openModal({ intent: "create-business" })}
        >
          Add new business <Icon name="bank" />
        </Button>
        <Button
          style="outlined"
          onPress={() => setAllAccOpen(!allAccOpen)}
          ariaLabel={allAccOpen ? "Close All" : "Expand All"}
        >
          {allAccOpen ? "Close All" : "Expand All"}
        </Button>
      </div>

      <Modal isOpen={open} onClose={toggleModal} type="popup">
        <Form method="post">
          {modalTarget && <StructureModalContent data={modalTarget} />}
        </Form>
      </Modal>
      {/* add accordions */}
      {businessAndServices.length > 0 && (
        <ul>
          {businessAndServices.map((b: IBusinessWithServices) => (
            <BusinessWithServices
              key={b.id}
              {...b}
              openModal={openModal}
              allAccOpen={allAccOpen}
            />
          ))}
        </ul>
      )}

      {/* todo - add placeholder with images if empty (business, clients, etc) */}

      <Outlet />
    </>
  );
}

// pagination
