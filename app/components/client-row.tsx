import type { Client as IClient } from "@prisma/client";
import { Link } from "@remix-run/react";
// import { Form, Link } from "@remix-run/react";
// import { Modal } from "./modal";
// import { useState } from "react";
// import { Button } from "./button";
// import { formatIsoUTCStringToLocalWithoutSeconds } from "~/helpers/timeConvertor";
// todo - import all types from Prisma. Do not create extra

export function ClientRow({ ...props }: Partial<IClient>) {
  const { firstName, lastName, phone, id } = props;
  const url = `${id}/edit`;
  // todo - use id from params not from clie////////

  return (
    <tr className="">
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phone}</td>
      <td>
        <Link to={url}>Ed</Link>
      </td>
      <td>rm</td>
    </tr>
  );
}
