import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../validations/login";
import { UserData } from "../validations/user";
import { apiLocal } from "../services/api";
import { CarProps } from "../pages/home";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  userLogin: (data: LoginData) => void;
  userData: UserData;
  setUserData: (value: UserData) => void;
  userExists: boolean;
  logout: () => void;
  tokenLoading: boolean;
  setTokenLoading: Dispatch<SetStateAction<boolean>>;
  isUserLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({} as UserData);
  const [userExists, setUserExists] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const resetUser = {
    name: "",
    description: "",
    id: 0,
    user_color: "",
    number: "",
    email: "",
    password: "",
    cpf: "",
    phone: "",
    birthdate: "",
    is_seller: false,
    cep: "",
    state: "",
    city: "",
    street: "",
    complement: "",
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      if (token) {
        try {
          apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
          const { data } = await apiLocal.get("/users/profile");
          setUserData(data);
          setIsUserLoggedIn(true);
        } catch (error) {
          console.log(error);
          setIsUserLoggedIn(false);
        }
      }
    })();
  }, []);

  const userLogin = async (dataUser: LoginData) => {
    try {
      const response = await apiLocal.post("/login", dataUser);
      const { token, user_id } = response.data;
      apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", user_id);
      const { data, status } = await apiLocal.get(`/users/${user_id}`);
      if (data.is_seller) {
        navigate(`/advertiser/${user_id}`);
      } else {
        navigate("/");
      }
      if (status === 200) {
        setUserData(data);
        setUserExists(true);
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
      setIsUserLoggedIn(false);
    }
  };

  const logout = () => {
    setUserData(resetUser);
    localStorage.clear();
    setIsUserLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userData,
        setUserData,
        userExists,
        logout,
        tokenLoading,
        setTokenLoading,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
