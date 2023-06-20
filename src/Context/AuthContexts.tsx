import { ReactNode, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginData } from "../validations/login";
import { UserData } from "../validations/user";
import { apiLocal } from "../services/api";

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
}

export const AuthContext = createContext<AuthContextValues>(
  {} as AuthContextValues
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({} as UserData);
  const [userExists, setUserExists] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("user-token");
      const id = localStorage.getItem("user-id");
      if (!token || !id) {
        setTokenLoading(false);
        return;
      }
      try {
        apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
        const { data, status } = await apiLocal.get(`/users/${id}`);
        if (status === 200) {
          setUserData(data);
          setUserExists(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setTokenLoading(false);
      }
    })();
  }, []);

  const userLogin = async (data: LoginData) => {
    try {
      const response = await apiLocal.post("/login", data);
      const { token, user_id } = response.data;
      apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", user_id);

      navigate(`/advertiser/${user_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.clear();
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
