import { GrClose } from "react-icons/gr";

import { GreyButton, RedButton } from "../Button";

interface DeleteModalProps {
  title: string;
  ask: string;
  text: string;
  openModal: () => void;
  clickFunction: () => void;
}

export const DeleteModal = ({
  title,
  ask,
  text,
  openModal,
  clickFunction,
}: DeleteModalProps) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg w-full px-[20px] max-w-[520px] pb-[20px] flex flex-col gap-4 relative">
        <header className="flex justify-beetween h-[56px] items-center mb-[14px]">
          <h3 className="font-lexend font-normal">{title}</h3>
          <button
            className="absolute top-[22px] right-[22px] text-whiteFixed "
            onClick={openModal}
          >
            <GrClose />
          </button>
        </header>
        <h2 className="text-black font-semibold font-lexend text-[16px] mb-[15px] ">
          {ask}
        </h2>
        <p className="font-normal text-[16px] leading-7 text-grey2 mb-[25px]">
          {text}
        </p>
        <div className="w-full flex gap-4 justify-end">
          <GreyButton type="button" onClick={openModal} size="big">
            Cancelar
          </GreyButton>
          <RedButton type="button" onClick={clickFunction} size="big">
            Sim, desejo excluir!
          </RedButton>
        </div>
      </div>
    </div>
  );
};
