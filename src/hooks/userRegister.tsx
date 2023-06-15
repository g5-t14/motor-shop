import { useContext } from "react";
import { RegisterContext } from "../Context/RegisterContext";

export const useRegister = ()=>{
  const registerContext = useContext(RegisterContext);
  return registerContext;
}