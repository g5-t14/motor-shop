import logo from "./../../assets/Motors shop white.svg";
import { IoIosArrowUp } from "react-icons/io";

export const Footer = () => {
  return (
    <footer className="bg-grey0">
      <div className="container mx-auto pl-4 pr-4 h-full flex flex-col justify-between items-center py-10 gap-6 md:flex-row">
        <img src={logo} alt="Logo" className="w-40 h-30" />
        <span className="text-whiteFixed text-sm font-400">
          © 2022 - Todos os direitos reservados.
        </span>
        <button
          type="button"
          className="text-whiteFixed rounded-4 w-10 h-10 bg-grey1 flex justify-center items-center"
        >
          <IoIosArrowUp />
        </button>
      </div>
    </footer>
  );
};
