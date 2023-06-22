import { Modal } from "../Modal";
import { Link } from "react-router-dom";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}

export const ModalRegister = ({ toggleModal }: ModalRegisterTaskProps) => {

  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100 top-[250px]  w-full h-[55%] max-w-[520px]  rounded-2xl p-10 flex-col justify-between">
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
          <Link
            className="bg-brand1 text-grey6 hover:bg-brand2 hover:border-grey1 hover:text-whiteFixed  flex justify-center h-[40px] items-center w-[20%] rounded-2x1"
            to={"/login"}
          >
            Ir para login
          </Link>
        </div>
      </div>
    </Modal>
  );
};
