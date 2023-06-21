import { Modal } from "../Modal";
import { Link } from "react-router-dom";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}

export const ModalRegister = ({ toggleModal }: ModalRegisterTaskProps) => {

  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100 top-10  w-full h-[45%] max-w-[620px]  rounded-2xl p-5 flex-col justify-around">
        <div className="flex w-full justify-between items-end">
          <h1 className="font-bold">Sucesso!</h1>
          <span className="text-brand3 cursor-pointer " onClick={toggleModal}>
            X
          </span>
        </div>
        <div className="h-full flex flex-col my-12 gap-6">
          <span className="text-sm font-bold">
            Sua conta foi feito com sucesso !
          </span>
          <p> Agora você poderá ver seus negócios crescendo em grande escala</p>
          <Link className="bg-brand1 border-2 text-grey6 text-[16px]  h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center" to={"/login"}>
            Ir para login
          </Link>
        </div>
      </div>
    </Modal>
  );
};
