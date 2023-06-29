import { useUser } from "../../hooks/useUser";
import { GreyButton, RedButton } from "../Button";

export const ConfirmDelete = () => {
  const { toggleDeleteModal, deleteProfile } = useUser();

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-4 p-4 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-black text-[20px] font-semibold">Tem certeza?</h2>
        <p className="text-black text-[14px]">
          Não é possivel reverter essa ação!
        </p>
        <div className="w-full flex gap-4 justify-end">
          <GreyButton type="button" onClick={toggleDeleteModal} size="big">
            Cancelar
          </GreyButton>
          <RedButton type="button" onClick={deleteProfile} size="big">
            Sim, tenho!
          </RedButton>
        </div>
      </div>
    </div>
  );
};
