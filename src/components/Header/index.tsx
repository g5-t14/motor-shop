import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/Motors shop.jpg";
import "./style.css";

export const Header = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  const showMenu = () => {
    setActive(!active);
  };
  return (
    <header className="bg-gray10 text-white h-20 shadow-bottom relative">
      <div className="container mx-auto pl-4 pr-4 h-full">
        <div className="flex h-full items-center justify-between">
          <img
            src={logo}
            alt="Logo"
            className={`w-40 h-30 ${active ? "opacity-50" : ""}`}
          />

          <nav className="md:hidden relative">
            <button
              type="button"
              className="focus:outline-none"
              onClick={showMenu}
            >
              <svg
                className={`w-6 h-6 fill-current ${
                  active ? "text-black" : "text-black"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {active ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 6H5v2h14V6zm0 5H5v2h14v-2zm0 5H5v2h14v-2z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </nav>

          <nav className="hidden md:block">
            <button
              className={`mr-4 border-none underline-hover font-medium delay-1000 text-black ${
                active ? "pl-5 border-l-2 border-gray-300" : ""
              }`}
              onClick={showMenu}
            >
              <span className="relative">
                Login
                <span className="absolute left-0 w-full h-px bg-black transform scale-x-0 transition-transform duration-1000 origin-left"></span>
              </span>
            </button>
            <button className="border border-color-gray transform  font-medium hover:scale-110 transition duration-1000 dark-gray pl-3 pr-3 pt-3 pb-3">
              Cadastrar
            </button>
          </nav>
        </div>
      </div>
      {active && (
        <div className="fixed top-20 right-0 bg-gray10 text-black flex items-end animate-slideFromRight">
          <div className="container mx-auto flex flex-col">
            <button className="border border-color-gray transform font-medium hover:scale-110 transition duration-1000 dark-gray pl-3 pr-3 pt-3 pb-3 mb-4">
              Login
            </button>
            <button className="border border-color-gray transform font-medium hover:scale-110 transition duration-1000 dark-gray pl-3 pr-3 pt-3 pb-3">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
