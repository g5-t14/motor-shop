import { Modal } from "../Modal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { GrClose } from "react-icons/gr";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}

export const ModalRegister = ({ toggleModal }: ModalRegisterTaskProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  () => setIsOpenModal(!isOpenModal);
  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100 h-[320px] w-[520px] rounded py-[32px] px-[24px] flex-col justify-between mt-[50px]">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-medium text-[16px] font-lexend text-grey1">
            Sucesso!
          </h1>
          <span
            className="text-brand3 cursor-pointer text-gre2"
            onClick={toggleModal}
          >
            <GrClose />
          </span>
        </div>
        <div className="h-full flex flex-col mt-[48px]">
          <span className="text-[16px] font-medium font-lexend text-grey1 mb-[15px]">
            Sua conta foi criada com sucesso !
          </span>

          <p className="text-[16px] text-grey2 leading-7 font-normal mb-[15px]">
            {" "}
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
          <Link
            className="bg-brand1 border-2 text-grey6 text-[16px]  h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center"
            to={"/login"}
          >
            Ir para login
          </Link>
        </div>
      </div>
    </Modal>
  );
};
