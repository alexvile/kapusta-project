import {
  ActionFunction,
  LoaderFunction,
  json,
  redirect,
} from "@remix-run/node";
import {
  Form,
  NavLink,
  Outlet,
  useActionData,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/button";
import { FormField } from "~/components/form-field";
import { Modal } from "~/components/modal";
import { getUserId, requireUserId } from "~/utils/session.server";
import {
  createBusiness,
  getAllBusinessesByOwnerId,
} from "~/utils/structure.server";

export const loader: LoaderFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  // if ownerId !== string or null do we need to do ?
  return await getAllBusinessesByOwnerId(ownerId);
};

export const action: ActionFunction = async ({ request }) => {
  const ownerId = await requireUserId(request);
  const form = await request.formData();
  const name = form.get("name");
  // todo - return redirects
  // todo snippet for redirects, invalid form data etc
  // todo - error boundaries
  if (typeof name !== "string" || typeof ownerId !== "string") {
    return json({ error: `Invalid Form Data` }, { status: 400 });
  }
  await createBusiness({ ownerId, name });
  // return newBusiness;s
  return json({ send: true });
  // return redirect("/dashboard/structure");

  // todo - close popup after creating !!!!!!!!!!!!!!
};

// todo: decide if use requireuserID or getUserId
export default function Structure() {
  const actionData = useActionData();
  const businessAndServices = useLoaderData();
  console.log(businessAndServices);

  const [open, setOpen] = useState(false);
  // const { userId } = useLoaderData();
  const handleClick = () => {
    setOpen(!open);
  };
  // todo - temporary solution. need fix later
  useEffect(() => {
    if (actionData) {
      setOpen(false);
    }
  }, [actionData]);

  return (
    <>
      <div>Structure - title</div>
      <button type="button" onClick={handleClick}>
        {" "}
        add new business
      </button>

      <Modal isOpen={open} onClose={handleClick} type="popup">
        <Form method="post">
          <FormField type="text" htmlFor="name" label="Name" />
          <Button type="submit" label="submit" />
          {/* Reset BTN */}
        </Form>
      </Modal>

      {businessAndServices.length > 0 &&
        businessAndServices.map((e: any) => <div key={e.id}>{e.name}</div>)}

      {/* todo - add placeholder with images if empty (business, clients, etc) */}
      {/* tabs */}
      {/* one of tabs should be opened by default */}
      {/* <div className="navLinks">
        <NavLink
          to="clients"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          (Clients - l)
        </NavLink>
        <NavLink
          to="records"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          (Journal - l)
        </NavLink>
      </div> */}
      <Outlet />
    </>
  );
}

// pagination
