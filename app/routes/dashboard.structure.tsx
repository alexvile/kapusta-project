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
import { CustomDurationPicker } from "~/components/durationPicker";
import { convertMsToTime } from "~/helpers/calculations";

export const loader: LoaderFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  // if ownerId !== string or null do we need to do ?
  return await getAllBusinessesWithServicesByOwnerId(ownerId);
};

export const action: ActionFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);

  const form = await request.formData();
  const intent = form.get("intent");

  if (intent === "createBusiness") {
    const name = form.get("name");
    if (typeof name !== "string" || typeof ownerId !== "string") {
      return json({ error: `Invalid Form Data` }, { status: 400 });
    }
    await createBusiness({ ownerId, name });
    return json("created business");
  }

  if (intent === "createService") {
    const obj = Object.fromEntries(form.entries());
    console.log(obj);
    // todo - check if we have this fields in all routes !!!!!!!!!!!!!!
    // todo - validations !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! front end + backend
    if (!obj.businessId || !obj.name || !obj.price || !obj.duration) {
      return json({ error: `Some fields are empty` }, { status: 400 });
    }

    if (
      typeof obj.businessId !== "string" ||
      typeof obj.name !== "string" ||
      typeof obj.price !== "string" ||
      typeof obj.duration !== "string"
    ) {
      return json({ error: `Invalid Form Data` }, { status: 400 });
    }
    const { businessId, name, price, duration } = obj;
    await createService({
      businessId,
      name,
      price: Number(price),
      duration: Number(duration),
    });
    // return null;
    return json("created service");

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
  // console.log(businessAndServices);

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
