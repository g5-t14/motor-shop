import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";
import { Api } from "../services/apiMotors";
import { useNavigate } from "react-router-dom";
import { RegisterData } from "../validations/register";

interface RegisterProviderProps {
  children: ReactNode;
}

interface RegisterContextValues {
  userRegister: (data: RegisterData) => void;
  loading: boolean;
  setSelectedOption: Dispatch<SetStateAction<string>>;
  selectedOption: string;
}

export const RegisterContext = createContext<RegisterContextValues>(
  {} as RegisterContextValues
);

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("true");

  const userRegister = async (data: RegisterData) => {
    try {
      setLoading(true);

      data.is_seller = selectedOption === "false";
      await Api.post("/users", data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterContext.Provider
      value={{ userRegister, loading, setSelectedOption, selectedOption }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
