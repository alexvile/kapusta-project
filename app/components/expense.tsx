import type { Expense as IExpense } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Modal } from "./modal";
import { useState } from "react";
import { Button } from "./button";
import { formatIsoUTCStringToLocalWithoutSeconds } from "~/helpers/timeConvertor";
import { Svg } from "./Svg";
// todo -  hover to all SVG. Use currentColor instead hardcoded
// todo - import all types from Prisma. Do not create extra
export function Expense({
  ...props
}: Pick<IExpense, "id" | "type" | "description" | "createdTime" | "value">) {
  const { type, description, createdTime, value, id } = props;
  const url = `${id}/edit`;
  // if (typeof createdTime !== "string") {
  //   return alert("Time wrong type");
  // }
  const formattedData = formatIsoUTCStringToLocalWithoutSeconds(createdTime);
  // todo - normal data view + optimization
  // console.log(createdTime);
  // todo - normal link
  // const formattedData = dateObject.toString();
  // const formattedData = dateObject.toLocaleDateString();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  // sdf
  return (
    <tr className="">
      <td>{formattedData || 0}</td>
      <td>{description}</td>
      <td>{type}</td>
      <td>-{value}&nbsp;UAH</td>
      <td>
        <Link to={url}>Ed</Link>
      </td>
      <td>
        <button onClick={handleClick}>
          <span className="w-8 h-8 hover:bg-mainBg flex items-center justify-center rounded-full">
            <Svg name="delete" />
          </span>
        </button>
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

// todo - universal popup inner
// todo after actions we should return redirects !!!
// return redirect("/jokes");

// todo: do we need all route to edit only just modal without route ?????
// todo: tailwind not delete basic just extend
//  todo : modal or popup : Are you sure to delete ???

// todo - createdTime. Use Date or String. How to change/ view and code / encode date
// todo - edit change time input + convert to format ISO + to string before submit

// todo - add multilanguage !!!!!!!!!!!!!!!!!!!!!!!!!!!

// console.log(date_object.toUTCString());
// console.log(date_object.toString());

// const forTesting = "2023-06-10T18:49:13.387+00:00";
// const forTesting2 = "2023-06-10T18:49:13.387Z"
// const forTesting3 = "2023-06-10T15:48:00.000+00:00"
// console.log(createdAt);

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
// todo - add time except date
