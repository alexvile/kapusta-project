// NOTE FORM AUTHOR ***
// TO CLOSE MODAL
// If we use modal as separate route we should use navigate to return back.
// But if we don't use separate route we should use callback to change boolean isOpen.
// We use Modal or Popup. Modal - for separate route, Popup alerts etc.
import { Portal } from "./portal";
import { useNavigate } from "@remix-run/react";

type ConditionalProps =
  | {
      type: "modal";
      onClose?: never;
      backTo: string;
      // todo - it should be url not simple string
    }
  | {
      type: "popup";
      onClose: () => void;
      backTo?: never;
    };

interface props {
  children: React.ReactNode;
  isOpen: boolean;
  ariaLabel?: string;
  className?: string;
}

export const Modal: React.FC<props & ConditionalProps> = ({
  type,
  children,
  isOpen,
  ariaLabel,
  className,
  backTo,
  onClose,
}) => {
  const navigate = useNavigate();
  if (!isOpen) return null;
  // console.log(ariaLabel);

  //  todo: create not modal route, but popup
  return (
    <Portal wrapperId="modal">
      <div
        className="fixed inset-0 overflow-y-auto bg-gray-600 bg-opacity-80"
        aria-labelledby={ariaLabel ?? "modal-title"}
        role="dialog"
        aria-modal="true"
        onClick={() => {
          type === "modal" ? navigate(backTo) : onClose();
        }}

        // todo: normal navigate
      ></div>
      <div className="fixed inset-0 pointer-events-none flex justify-center items-center max-h-screen overflow-scroll">
        <div
          className={`${className} p-4 bg-gray-200 pointer-events-auto max-h-screen md:rounded-xl`}
        >
          {children}
          <button
            onClick={() => {
              type === "modal" ? navigate(backTo) : onClose();
            }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </Portal>
  );
};
