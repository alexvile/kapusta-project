import type { Expense as IExpense } from "@prisma/client";
import { Link } from "@remix-run/react";
// todo - import all types from Prisma. Do not create extra

export function Expense({ ...props }: Partial<IExpense>) {
  //   console.log(type);
  // console.log(props);
  const { type, description, createdTime, value, id } = props;
  const url = `${id}/edit`;
  if (typeof createdTime !== "string") {
    return alert("Time wrong type");
  }
  // todo - normal data view + optimization

  // console.log(createdTime);

  // todo - normal link
  const dateObject = new Date(createdTime);
  const formattedData = dateObject.toString();
  // console.log(date_object.toUTCString());
  // console.log(date_object.toString());
  return (
    <li className="outline inline-block bg-light">
      <p>{type}</p>
      <p>{description}</p>
      <p>{formattedData}</p>
      <p>{value}&nbsp;UAH</p>
      <p>ID: {id}</p>
      <Link to={url}>Edit</Link>
    </li>
  );
}

// todo - createdTime. Use Date or String. How to change/ view and code / encode date
// todo - edit change time input + convert to format ISO + to string befor submit
