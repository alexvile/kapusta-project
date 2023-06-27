import type { Expense as IExpense } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Modal } from "./modal";
import { useState } from "react";
import { Button } from "./button";
// todo - import all types from Prisma. Do not create extra

export function Expense({ ...props }: Partial<IExpense>) {
  //   console.log(type);
  // console.log(props);
  const { type, description, createdTime, value, id, createdAt } = props;
  // todo: remove createdAT
  const url = `${id}/edit`;
  if (typeof createdTime !== "string") {
    return alert("Time wrong type");
  }
  // todo - normal data view + optimization

  // console.log(createdTime);

  // todo - normal link
  // console.log(typeof createdAt);
  const dateObject = new Date(createdTime);
  const formattedData = dateObject.toString();
  // console.log(date_object.toUTCString());
  // console.log(date_object.toString());

  // const forTesting = "2023-06-10T18:49:13.387+00:00";
  // const forTesting2 = "2023-06-10T18:49:13.387Z"
  // const forTesting3 = "2023-06-10T15:48:00.000+00:00"
  // console.log(createdAt);
  const time = "2023-06-10T15:48:00.000+00:00";
  // const time = createdAt;
  // console.log(time);
  const dateObject1 = new Date(time);

  // var isoDateString = new Date("2023-06-25T20:32").toISOString();
  // console.log(isoDateString);

  // console.log(dateObject1);
  //
  // const ttt = new Date(Date.UTC(2022, 0o3, 10, 23, 40, 0o0));
  // console.log("ss", ttt);
  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // var offset = new Date().getTimezoneOffset();
  // console.log(offset);

  // todo: use offset or Intl for getting timezone

  // todo- add skeletons
  // todo add loaders

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li className="outline inline-block bg-light">
      <p>{type}</p>
      <p>{description}</p>
      <p>{formattedData}</p>
      <p>{value}&nbsp;UAH</p>
      <p>ID: {id}</p>
      <Link to={url}>Edit ICON</Link>

      <button onClick={handleClick}>Delete ICON</button>
      <Modal
        isOpen={open}
        className="w-2/3 p-10"
        onClose={handleClick}
        type="popup"
      >
        <Form method="post">
          <input type="hidden" name="id" value={id} />

          <Button label="Yes" type="submit" name="intent" value="delete" />
        </Form>
        <button>No</button>
      </Modal>
    </li>
  );
}
// todo after actions we should return redirects !!!
// return redirect("/jokes");

// todo: do we need all route to edit only just modal without route ?????
// todo: tailwind not delete basic just extend
//  todo : modal or popup : Are you sure to delete ???

// todo - createdTime. Use Date or String. How to change/ view and code / encode date
// todo - edit change time input + convert to format ISO + to string before submit

// todo - add multilanguage !!!!!!!!!!!!!!!!!!!!!!!!!!!
