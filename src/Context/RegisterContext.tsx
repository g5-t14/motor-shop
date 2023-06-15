import { ReactNode, createContext, useState } from "react";
import { Api } from "../services/apiMotors";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RegisterData } from "../validations/register";

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegisterContextValues {
  userRegister: (data: RegisterData) => void;
  loading: boolean;
}

export const RegisterContext = createContext<RegisterContextValues>(
  {} as RegisterContextValues
);

export const RegisterProvider = ({ children }: RegisterProviderProps)=>{
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

 const userRegister =   async (data: RegisterData)=>{
    try {
      setLoading(true);
      await Api.post("/users", data);
      toast.success("Conta criada com sucesso");
      setTimeout(() => navigate("/login"), 4500);
    } catch (error) {
      console.error(error);
      toast.error("Email já cadastrado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <RegisterContext.Provider value={{ userRegister, loading }}>
      {children}
    </RegisterContext.Provider>
  );
}