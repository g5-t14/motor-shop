import { MdOutlineAnnouncement } from "react-icons/md";

interface NoAdsProps {
  text: string;
  click: () => void;
}

export const NoAds = ({ text, click }: NoAdsProps) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-center border-[2px] p-[50px] bg-grey8">
      <div className="flex flex-col w-full justify-center items-center">
        <h3 className="text-[35px] mb-[20px]">
          Não existe nenhum carro anunciado!
        </h3>
        <span
          className=" text-brand1 hover:underline cursor-pointer flex gap-[10px] justify-center text-[30px]"
          onClick={click}
        >
          {text} <MdOutlineAnnouncement />
        </span>
      </div>
    </div>
  );
};
