import type { Client as IClient } from "@prisma/client";
// import { Form, Link } from "@remix-run/react";
// import { Modal } from "./modal";
// import { useState } from "react";
// import { Button } from "./button";
// import { formatIsoUTCStringToLocalWithoutSeconds } from "~/helpers/timeConvertor";
// todo - import all types from Prisma. Do not create extra

export function ClientRow({ ...props }: Partial<IClient>) {
  const { firstName, lastName, phone } = props;

  return (
    <tr className="">
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{phone}</td>
      <td>Ed</td>
      <td>rm</td>
    </tr>
  );
}
