import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import logo from "./../../assets/Motors shop.svg";
import closeDropDown from "./../../assets/closedropmenu.png";
import dropDown from "./../../assets/DropDown.png";
import { BorderGreyButton } from "../../components/Button";
import { InputForm } from "../../components/Input/forms";
import { LoginData, loginSchema } from "../../validations/login";
import { Footer } from "../../components/Footer";

export const Login = () => {
  const [active, setActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });


  return (
  <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center">
    <div className="w-full flex py-[55px]">
    <main className="w-full flex flex-col jutify-center items-center">
      <form className="  p-8 w-[70%] box-border top-20 flex flex-col gap-1.5 max-w-360 rounded-3xl shadow-md ">
        <h2 className="font-bold text-lg">Login</h2>

        <InputForm
          id="Email"
          type="Email"
          label="Email"
          placeholder="Digite seu email"
          register={register("email")}
          error={
            errors.password?.message && <span>{errors.password.message}</span>
          }
        />

        <InputForm
          id="password"
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          register={register("password")}
          error={
            errors.password?.message && <span>{errors.password.message}</span>
          }
        />

      <div className="flex justify-end flex-row align-end "><p className="text-brand2 mx-12 text-sm">Esqueci minha senha</p></div>
        
      <div className="flex flex-col flex-auto items-center justify-center">  
        <button
          className="w-[100%] h-[48px] my-20 rounded-1xl flex-grow-0 bg-brand1 
        border-brand1 text-white hover:bg-brand2 
        font:bold hover:border-brand2 "
        >
          Entrar
        </button>

        <p>Ainda não possui cadastro ?</p>

        <button
          className="w-[100%] h-[48px] my-20 rounded-1xl flex-grow-0 bg-grey10 
        border-solid 
        border-grey1  text-black hover:bg-grey4 
        font:bold hover:border-brand2 "
        >
          Cadastrar-se
        </button>
      </div>  
      </form>
    </main>
    </div>  
    <div className="my-108px"style={{ width: "100vw"}}>
        <Footer />
      </div> 
      
  </div>  
  );
};
