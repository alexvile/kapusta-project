import type { Expense as IExpense } from "@prisma/client";
import { Form, Link } from "@remix-run/react";
import { Modal } from "../modal";
import { useState } from "react";
import { Button } from "../button";
import { formatIsoUTCStringToLocalWithoutSeconds } from "~/helpers/timeConvertor";
import { Svg } from "../Svg";

export const TransactionRow = ({
  ...props
}: Pick<IExpense, "id" | "type" | "description" | "createdTime" | "value">) => {
  const { type, description, createdTime, value, id } = props;
  const url = `${id}/edit`;

  const formattedData = formatIsoUTCStringToLocalWithoutSeconds(createdTime);

  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <tr className="border-2 border-tableBorder">
      <td className="font-roboto text-secondary text-label">
        {formattedData || 0}
      </td>
      <td className="font-roboto text-secondary text-label">{description}</td>
      <td className="font-roboto text-secondary text-label">{type}</td>
      <td className="font-roboto text-secondary text-label">
        -{value}&nbsp;UAH
      </td>
      <td className="font-roboto text-secondary text-label">
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
};
