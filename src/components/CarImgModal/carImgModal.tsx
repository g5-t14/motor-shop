import { GrClose } from "react-icons/gr";

interface CarImgProps {
  img: string;
  closeModal: () => void;
}

export const CarImgModal = ({ img, closeModal }: CarImgProps) => {
  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-4 p-6 w-full max-w-xl flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="text-[20px] text-grey1 font-500 font-lexend">
            Imagem do veículo
          </h2>
          <button onClick={closeModal}>
            <GrClose />
          </button>
        </div>
        <img src={img} alt="Imagem do veículo" className="rounded-xl" />
      </div>
    </div>
  );
};
