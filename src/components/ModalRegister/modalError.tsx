import { GrClose } from "react-icons/gr";
import { useUser } from "../../hooks/useUser";

export const ModalError = () => {
  const { toggleErrorRegisterModal } = useUser();

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg flex flex-col gap-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-500 text-grey1">Falhou!</h2>
          <button
            onClick={toggleErrorRegisterModal}
            type="button"
            className="text-grey4"
          >
            <GrClose />
          </button>
        </div>
        <p className="text-black font-500">Sua conta não foi criada!</p>
        <p className="font-400 text-grey2">Email ou CPF já cadastrados</p>
      </div>
    </div>
  );
};
