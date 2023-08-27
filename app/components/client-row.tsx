import type { Client as IClient } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Modal } from "./modal";
import { useState } from "react";
import { Button } from "./button";

export function ClientRow({ ...props }: Partial<IClient>) {
  const { firstName, lastName, phone, id } = props;
  const url = `${id}/edit`;
  // todo - use id from params not from clie////////
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <tr className="">
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phone}</td>
      <td>
        <Link to={url}>Ed</Link>
      </td>
      <td>
        <button onClick={handleClick}>De</button>
        <Modal isOpen={open} onClose={handleClick} type="popup">
          <p className="pb-5 text-center">Are you sure ?</p>
          <div className="flex justify-center gap-4">
            <Form method="post">
              <input type="hidden" name="id" value={id} />
              <Button label="Yes" type="submit" name="intent" value="delete" />
            </Form>
            <Button
              label="no"
              type="submit"
              style="secondary"
              onClick={handleClick}
            />
          </div>
        </Modal>
      </td>
    </tr>
  );
}
