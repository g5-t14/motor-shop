import { GrClose } from "react-icons/gr";
import { useCar } from "../../hooks/useCar";

import { GreyButton, RedButton } from "../Button";

export const DeleteModalAd = () => {
  const { toggleDeleteAds, deleteAds } = useCar();

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg w-full px-[20px] max-w-[520px] pb-[20px] flex flex-col gap-4 relative">
        <header className="flex justify-beetween h-[56px] items-center mb-[14px]">
          <h3 className="font-lexend font-normal">Excluir anúncio</h3>
          <button
            className="absolute top-[22px] right-[22px] text-whiteFixed "
            onClick={toggleDeleteAds}
          >
            <GrClose />
          </button>
        </header>
        <h2 className="text-black font-semibold font-lexend text-[16px] mb-[15px] ">
          Tem certeza que deseja remover este anúncio?
        </h2>
        <p className="font-normal text-[16px] leading-7 text-grey2 mb-[25px]">
          Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
          conta e removerá seus dados de nossos servidores.
        </p>
        <div className="w-full flex gap-4 justify-end">
          <GreyButton type="button" onClick={toggleDeleteAds} size="big">
            Cancelar
          </GreyButton>
          <RedButton type="button" onClick={deleteAds} size="big">
            Sim, excluir anúncio
          </RedButton>
        </div>
      </div>
    </div>
  );
};
