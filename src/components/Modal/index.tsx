import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  toggleModal: () => void;
  blockClosgin?: boolean;
  children: ReactNode;
}

export const Modal = ({ toggleModal, children, blockClosgin }: ModalProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current) {
        return;
      }

      if (!event.target) {
        return;
      }

      if (!ref.current.contains(event.target as HTMLElement)) {
        toggleModal();
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  }, [toggleModal]);

  return createPortal(
    <div className="fixed top-0 bg-zinc-800 bg-opacity-50 w-[100vw] h-[100vh] flex justify-center align-center overflow-scroll">
      <div ref={blockClosgin ? null : ref}>{children}</div>
    </div>,
    document.body
  );
};
