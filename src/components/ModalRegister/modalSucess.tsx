import { GrClose } from "react-icons/gr";
import { PurpleButton } from "../Button";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

export const ModalSucess = () => {
  const { toggleSucessRegisterModal } = useUser();
  const navigate = useNavigate();
  const redirect = () => {
    navigate("/login");
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-500 text-grey1">Sucesso!</h2>
          <button
            onClick={toggleSucessRegisterModal}
            type="button"
            className="text-grey4"
          >
            <GrClose />
          </button>
        </div>
        <p className="text-black font-500">Sua conta foi criada com sucesso!</p>
        <p className="font-400 text-grey2">
          Agora você poderá ver seus negócios crescendo em grande escala
        </p>
        <div>
          <PurpleButton onClick={redirect} type="button" size="medium">
            Ir para login
          </PurpleButton>
        </div>
      </div>
    </div>
  );
};
