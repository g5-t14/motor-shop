import { Modal } from "../Modal";
import { Link } from "react-router-dom";
import { useState } from "react";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}


export const ModalRegister = ({ toggleModal }: ModalRegisterTaskProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  () => setIsOpenModal(!isOpenModal);
  return (
    <Modal toggleModal={toggleModal}>

      <div className="bg-neutral-100 max-h-[55%] max-w-[520px] rounded-2xl p-5 flex-col justify-between">
        <div className="flex w-full justify-between items-center">
          <h1 className="font-bold text-xl">Sucesso!</h1>
          <span className="text-brand3 cursor-pointer text-xl" onClick={toggleModal}>

            X
          </span>
        </div>
        <div className="h-full flex flex-col my-12 gap-6">
          <span className="text-lg font-bold">
            Sua conta foi criada com sucesso !
          </span>

          <p className="text-xl text-grey3"> Agora você poderá ver seus negócios crescendo em grande escala</p>
          <Link className="bg-brand1 border-2 text-grey6 text-[16px]  h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center" to={"/login"}>

            Ir para login
          </Link>
        </div>
      </div>
    </Modal>
  );
};
