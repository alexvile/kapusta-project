import { LoaderFunction } from "@remix-run/node";
import { useState } from "react";
import { Button } from "~/components/button";
import { Modal } from "~/components/modal";
import { PopupInner } from "~/components/popup-inner";
export const loader: LoaderFunction = async ({ request }) => {
  return null;
};

export default function Abc() {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="w-full h-full  bg-slate-100 ">
        <div>TEST PAGE</div>
        <div className="m-2">
          <Button label="LOG IN" type="submit" style="primary-shadowed" />
        </div>
        <div className="m-2">
          <Button label="REGISTER" type="submit" style="secondary-shadowed" />
        </div>
        <div className="m-2">
          <Button label="SUBMIT" type="submit" style="primary" />
        </div>
        <div className="m-2">
          <Button label="SUBMIT" type="submit" style="secondary" />
        </div>
        <button onClick={handleClick}>Open popup</button>
        <Modal isOpen={open} onClose={handleClick} type="popup">
          <PopupInner label="Are you sure ?" />
        </Modal>

        {/* <>
          <h1 className="text-accent">Test</h1>
          <h1 className="text-accent-light">Test</h1>
          <h1 className="text-main">Test</h1>
          <h1 className="text-secondary">Test</h1>
          <h1 className="text-placeholder">Test</h1>
          <h1 className="text-bg-input">Test</h1>
          <h1 className="text-error">Test</h1>
        </> */}
      </div>
    </>
  );
}
