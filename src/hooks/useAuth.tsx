import { useContext } from "react";
import { AuthContext } from "../Context/AuthContexts";

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  return authContext;
};
