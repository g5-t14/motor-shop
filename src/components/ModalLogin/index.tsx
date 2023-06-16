import { Modal } from "../Modal";
import { useNavigate } from "react-router-dom";
import { PurpleButton } from "../Button";

interface ModalRegisterTaskProps {
  toggleModal: () => void;
}

export const ModalLogin = ({ toggleModal }: ModalRegisterTaskProps) => {
  const navigate = useNavigate();

  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100 top-10  w-full h-[55%] max-w-[720px]  rounded-2xl p-10 flex-col justify-between">
        <div className="flex w-full justify-between items-end">
          <h1 className="font-bold">Sucesso!</h1>
          <span className="text-brand3 cursor-pointer " onClick={toggleModal}>
            X
          </span>
        </div>
        <div className="h-full flex flex-col justify-between">
          <span className="text-sm font-bold">
            Seu Login foi feito com sucesso!
          </span>
          <p> Agora você poderá ver seus negócios crescendo em grande escala</p>
          <PurpleButton size="big" onClick={() => navigate("/")}>
            Ir para home
          </PurpleButton>
        </div>
      </div>
    </Modal>
  );
};

