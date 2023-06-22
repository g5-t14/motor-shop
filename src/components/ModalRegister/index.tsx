import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import { PurpleButton } from "../Button";
import { Link } from "react-router-dom";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}

export const ModalRegister = ({ toggleModal }: ModalRegisterTaskProps) => {
  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100 h-[290px] max-w-[520px] mt-[100px]  rounded py-[15px] px-[24px] flex-col">
        <div className="flex w-full justify-between items-center h-[28px] mb-[40px]">
          <h1 className="font-bold">Sucesso!</h1>
          <button
            className="text-brand3 cursor-pointer "
            onClick={() => toggleModal()}
          >
            X
          </button>
        </div>
        <div className="h-full flex flex-col">
          <span className="text-[16px] font-medium mb-[22px] lexend text-grey1">
            Sua conta foi feito com sucesso !
          </span>
          <p className="leading-7 text-[16px]font-normal text-grey2 mb-[20px]">
            {" "}
            Agora você poderá ver seus negócios crescendo em grande escala
          </p>
          <Link
            className="bg-brand1 text-grey6 text-semibold hover:bg-brand1 w-[132px]  hover:border-grey1 hover:text-whiteFixed  flex justify-center h-[40px] items-center rounded"
            to={"/login"}
          >
            Ir para login
          </Link>
        </div>
      </div>
    </Modal>
  );
};
