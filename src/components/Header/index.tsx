import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/Motors shop.svg";
import closeDropDown from "./../../assets/closedropmenu.png";
import dropDown from "./../../assets/DropDown.png";
import { BorderGreyButton } from "../Button";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { useAuth } from "../../hooks/useAuth";
import { useUser } from "../../hooks/useUser";
import { EditProfileModal } from "../ModalEdits/editProfile";
import { EditAddressModal } from "../ModalEdits/editAddress";

export const Header = () => {
  const { userData, logout, isUserLoggedIn } = useAuth();
  const { profileModal, addressModal, toggleProfileModal, toggleAddressModal } =
    useUser();
  const [active, setActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [dropdownActive, setDropdownActive] = useState(false);

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
  const showDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  const homeHandler = () => {
    navigate("/");
    window.location.reload();
  };

  const getInitials = (name: string) => {
    if (name) {
      const names = name.split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      } else if (names.length > 1) {
        const firstInitial = names[0].charAt(0).toUpperCase();
        const lastInitial = names[names.length - 1].charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
      }
    }
    return "";
  };

  return (
    <>
      <header className="bg-grey10 text-white h-20 shadow-bottom relative sticky top-0 right-0 left-0 z-10">
        <div className="container mx-auto pl-4 pr-4 h-full flex justify-between items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-13 h-8 ${active ? "opacity-50" : ""}`}
            onClick={homeHandler}
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
            {isUserLoggedIn ? (
              <>
                <button
                  type="button"
                  className="mr-4 border-none underline-hover font-semibold delay-1000 text-grey2 flex gap-[5px] items-center"
                  onClick={showDropdown}
                >
                  <div
                    className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: userData.user_color }}
                  >
                    {getInitials(userData.name)}
                  </div>
                  <span className="ml-2 text-[14px]">{userData.name}</span>
                </button>
                {dropdownActive && (
                  <div className="absolute right-0 mt-[200px] w-[250px] bg-white rounded-md shadow-lg flex flex-col justify-items-end">
                    <button
                      className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center
                    "
                      onClick={toggleProfileModal}
                    >
                      Editar perfil{" "}
                      <span className="text-[18px]">
                        <AiOutlineEdit />
                      </span>
                    </button>
                    <button
                      className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center"
                      onClick={toggleAddressModal}
                    >
                      Editar endereço
                      <span className="text-[18px]">
                        <BiMap />
                      </span>
                    </button>
                    <button
                      className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center"
                      onClick={() => logout()}
                    >
                      Sair da conta
                      <span className="text-[18px]">
                        <IoMdLogOut />
                      </span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {!active && (
                  <button
                    type="button"
                    className={`mr-4 border-none underline-hover font-semibold delay-1000 text-grey2`}
                    onClick={() => loginHandler()}
                  >
                    <span className="relative font-inter">
                      Fazer Login
                      <span className="absolute left-0 w-full h-px bg-black transform scale-x-0 transition-transform duration-1000 origin-left"></span>
                    </span>
                  </button>
                )}
                {!active && (
                  <BorderGreyButton
                    size="big"
                    onClick={() => registerHandler()}
                  >
                    Cadastrar
                  </BorderGreyButton>
                )}
              </>
            )}
          </nav>
        </div>
        {active && (
          <div
            className="fixed top-[40px] right-0 bg-grey10 text-black animate-slideFromRight w-[344px]"
            style={{ zIndex: "5" }}
          >
            <div className="flex flex-col justify-start pt-4 pb-4">
              {!isUserLoggedIn && (
                <button
                  className="border-none  font-medium hover:underline pl-3 pr-3 pt-3 pb-3 mb-4 text-left text-grey2"
                  onClick={() => loginHandler()}
                >
                  Fazer Login
                </button>
              )}
              {!isUserLoggedIn && (
                <button
                  className="border-[1.5px] border-grey4  transform font-medium rounded-md hover:scale-110 transition duration-1000 dark-gray pl-3 pr-3 pt-3 pb-3 ml-[13px] w-[315px]"
                  onClick={() => registerHandler()}
                >
                  Cadastrar
                </button>
              )}
              {isUserLoggedIn && (
                <div className="absolute right-0 w-[250px] bg-white pt-[20px] pl-[10px] pr-[10px] rounded-md shadow-lg flex flex-col justify-items-end">
                  <div className="w-full flex items-center">
                    <div
                      className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: userData.user_color }}
                    >
                      {getInitials(userData.name)}
                    </div>
                    <span className="ml-2 text-[14px]">{userData.name}</span>
                  </div>
                  <button
                    onClick={toggleProfileModal}
                    className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center
                 "
                  >
                    Editar perfil{" "}
                    <span className="text-[18px]">
                      <AiOutlineEdit />
                    </span>
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center"
                    onClick={toggleAddressModal}
                  >
                    Editar endereço
                    <span className="text-[18px]">
                      <BiMap />
                    </span>
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 h-[50px] hover:bg-gray-100 flex gap-[5px] items-center justify-center"
                    onClick={() => logout()}
                  >
                    Sair da conta
                    <span className="text-[18px]">
                      <IoMdLogOut />
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        {profileModal ? <EditProfileModal /> : null}
        {addressModal ? <EditAddressModal /> : null}
      </header>
    </>
  );
};
