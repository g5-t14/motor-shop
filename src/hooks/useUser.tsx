import { useContext } from "react";
import { UserContext } from "../Context/UserContexts";

export const useUser = () => {
  const userContext = useContext(UserContext);
  return userContext;
};
