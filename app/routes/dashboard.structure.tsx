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

import { IBusinessWithServices } from "~/types/types";
import { StructureModalContent } from "~/components/structure-modal-content";
import { convertMsToTime } from "~/helpers/calculations";
import {
  ttt,
  validateStructureBusinessForm,
  validateStructureServicesForm,
} from "~/utils/form-validators.server";

export const loader: LoaderFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  // if ownerId !== string or null do we need to do ?
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
  console.log(actionData);
  const businessAndServices = useLoaderData();

  const [open, setOpen] = useState(false);
  // todo - ts warning

  const [modalTarget, setModalTarget] = useState<EventTarget>(null);
  // const { userId } = useLoaderData();
  const handleClick = () => {
    setOpen(!open);
  };

  const openModal = (target: EventTarget) => {
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
      <div>Structure - title</div>
      <button
        type="button"
        name="create-business"
        className="bg-slate-200 p-2"
        onClick={(e) => openModal(e.target)}
      >
        add new business category +
      </button>

      <Modal isOpen={open} onClose={handleClick} type="popup">
        <Form method="post">
          <StructureModalContent target={modalTarget} />
        </Form>
      </Modal>
      {/* add accordions */}
      {businessAndServices.length > 0 && (
        <ul>
          {businessAndServices.map((e: IBusinessWithServices) => (
            <li key={e.id} className="pl-3 my-2">
              <div className="flex items-center justify-start">
                {e.name}
                <button
                  name="create-service"
                  // todo - need refactor
                  data-parent-id={e.id}
                  className="border mx-2 px-2 bg-slate-300"
                  onClick={(e) => openModal(e.target)}
                >
                  +
                </button>
                {/* <button
                  name="edit-business"
                  // todo - need refactor
                  data-parent-id={e.id}
                  className="border mx-2 px-2 bg-slate-300"
                  onClick={(e) => openModal(e.target)}
                >
                  edit
                </button> */}
              </div>
              {e.services.length > 0 && (
                <ul>
                  {e.services.map((s) => (
                    <li key={s.id} className="pl-6">
                      <span> {s.name} </span>-<span>{s.price}&nbsp;UAH</span>
                      &nbsp;
                      <span>
                        approximately duration: {convertMsToTime(s.duration)}
                        &nbsp;
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* todo - add placeholder with images if empty (business, clients, etc) */}

      <Outlet />
    </>
  );
}

// pagination
