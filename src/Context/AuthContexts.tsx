import { ReactNode, createContext, useEffect, useState } from "react";
import { Api } from "../services/apiMotors";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../validations/login";
import { UserData } from "../validations/user";


interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValues {
  login: (data: LoginData) => void;
  loading: boolean;
  tokenLoading: boolean;
  userData: UserData;
  setUserData: (value: UserData) => void;
  userExists: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps)=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [userData, setUserData] = useState({} as UserData);

  const [userExists, setUserExists] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const token = localStorage.getItem("Motorshop:token");
  //     if (!token) {
  //       setTokenLoading(false);
  //       return;
  //     }
  //     try {
  //       Api.defaults.headers.common.authorization = `Bearer ${token}`;
  //       const { data, status } = await Api.get("/users");
  //       if (status === 200) {
  //         setUserData(data);
  //         setUserExists(true);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setTokenLoading(false);
  //     }
  //   })();
  // }, []);

  const login = async(data: LoginData)=>{
    try {
      setLoading(true);
      const response = await Api.post("/login", data);
      const { token } = response.data;
      Api.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("MotorShop:token", token);

      // const { data: profile } = await Api.get("/users");
      // setUserData(profile);
      // setUserExists(true);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const logout = ()=>{
    localStorage.clear();
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{
        login,
        loading,
        tokenLoading,
        userData,
        setUserData,
        userExists,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}