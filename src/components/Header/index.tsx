import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/Motors shop.svg";
import closeDropDown from "./../../assets/closedropmenu.png";
import dropDown from "./../../assets/DropDown.png";
import { BorderGreyButton } from "../Button";


export const Header = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };

  const registerHandler = () => {
    navigate("/register");
  };

  const showMenu = () => {
    setActive(!active);
  };

  return (
    <>
      <header className="bg-grey10 text-white h-20 shadow-bottom relative sticky top-0 right-0 left-0 z-10">
        <div className="container mx-auto pl-4 pr-4 h-full flex justify-between items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-13 h-8 ${active ? "opacity-50" : ""}`}
          />

          <nav className="md:hidden relative">
            <button
              type="button"
              className="focus:outline-none"
              onClick={showMenu}
            >
              <img
                src={active ? closeDropDown : dropDown}
                alt="Dropdown"
                className="w-6 h-6 fill-current text-black"
              />
            </button>
          </nav>

          <nav className="hidden md:flex md:gap-11 items-center border-l-2 border-grey6 h-full pl-11">
            <button
              type="button"
              className={`mr-4 border-none underline-hover font-semibold delay-1000 text-grey2 ${
                active ? "pl-5 border-l-2 border-grey-300" : ""
              }`}
              onClick={() => loginHandler()}
            >
              <span className="relative font-inter">
                Fazer Login
                <span className="absolute left-0 w-full h-px bg-black transform scale-x-0 transition-transform duration-1000 origin-left"></span>
              </span>
            </button>
            <BorderGreyButton size="big" onClick={() => registerHandler()}>
              Cadastrar
            </BorderGreyButton>
          </nav>
        </div>
        {active && (
          <div
            className="fixed top-[60px] right-0 bg-grey10 text-black animate-slideFromRight w-[344px] "
            style={{ zIndex: "9" }}
          >
            <div className="flex flex-col justify-start pt-4 pb-4">
              <button
                className="border-none  font-medium hover:underline pl-3 pr-3 pt-3 pb-3 mb-4 text-left text-grey2"
                onClick={() => loginHandler()}
              >
                Fazer Login
              </button>
              <button
                className="border-[1.5px] border-grey4  transform font-medium rounded-md hover:scale-110 transition duration-1000 dark-gray pl-3 pr-3 pt-3 pb-3 ml-[13px] w-[315px]"
                onClick={() => registerHandler()}
              >
                Cadastrar
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
