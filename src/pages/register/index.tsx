import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import logo from "./../../assets/Motors shop.svg";
import closeDropDown from "./../../assets/closedropmenu.png";
import dropDown from "./../../assets/DropDown.png";
import { BorderGreyButton } from "../../components/Button";
import { InputForm } from "../../components/Input/forms";
import { useNavigate } from "react-router-dom";
import { RegisterData, registerSchema } from "../../validations/register";
import { Footer } from "../../components/Footer";

export const Register = () => {
  const [active, setActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const loginHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    navigate("/login");
  };

  return (
    <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center">
      <div className="w-full flex py-[55px]">
        <main className="w-full flex flex-col jutify-center items-center">
          <form className="  p-8 w-[70%] box-border top-20 flex flex-col gap-1.5 max-w-360 rounded-3xl shadow-md ">
            <h2 className="font-bold text-lg">Cadastro</h2>

            <p className="font-bold text-sm">Informações pessoais</p>
            <InputForm
              id="name"
              type="name"
              label="name"
              placeholder="Digite seu nome"
              register={register("name")}
              error={
                errors.name?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.name.message}
                  </span>
                )
              }
            />

            <InputForm
              id="email"
              type="email"
              label="email"
              placeholder="Digite seu Email"
              register={register("email")}
              error={
                errors.email?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.email.message}
                  </span>
                )
              }
            />

            <InputForm
              id="password"
              type="password"
              label="password"
              placeholder="Digite sua senha"
              register={register("password")}
              error={
                errors.password?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.password.message}
                  </span>
                )
              }
            />

            <InputForm
              id="cpf"
              type="cpf"
              label="cpf"
              placeholder="Digite seu Cpf"
              register={register("cpf")}
              error={
                errors.cpf?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.cpf.message}
                  </span>
                )
              }
            />

            <InputForm
              id="phone"
              type="phone"
              label="phone"
              placeholder="Digite seu Telefone"
              register={register("phone")}
              error={
                errors.phone?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.phone.message}
                  </span>
                )
              }
            />

            <InputForm
              id="birthdate"
              type="birthdate"
              label="birthdate"
              placeholder="Digite sua data de nascimento"
              register={register("birthdate")}
              error={
                errors.birthdate?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.birthdate.message}
                  </span>
                )
              }
            />

            <InputForm
              id="description"
              type="description"
              label="description"
              placeholder="Digite uma descrição para o seu perfil"
              register={register("description")}
              error={
                errors.description?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.description.message}
                  </span>
                )
              }
            />

            <select
              className="box-border h-[40px] w-[100%] outline-none p-0 16px 
          border-solid 
          border-2px 
          rounded-2xl"
            >
              <option
                className="box-border h-[40px] w-[100%] outline-none 16px 
          border-solid 
          border-2px 
          rounded-2xl"
                value="true"
              >
                Vendedor
              </option>
              <option
                className="box-border h-[40px] w-[100%] outline-none 16px 
          border-solid 
          border-2px 
          rounded-2xl"
                value="false"
              >
                Client
              </option>
            </select>

            <InputForm
              id="cep"
              type="cep"
              label="cep"
              placeholder="Digite o seu cep"
              register={register("cep")}
              error={
                errors.cep?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.cep.message}
                  </span>
                )
              }
            />

            <InputForm
              id="slate"
              type="slate"
              label="slate"
              placeholder="Insira o seu estado"
              register={register("slate")}
              error={
                errors.slate?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.slate.message}
                  </span>
                )
              }
            />

            <InputForm
              id="city"
              type="city"
              label="city"
              placeholder="Digite o nome da sua cidade"
              register={register("city")}
              error={
                errors.city?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.city.message}
                  </span>
                )
              }
            />

            <InputForm
              id="street"
              type="street"
              label="street"
              placeholder="Digite o nome da sua rua"
              register={register("street")}
              error={
                errors.street?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.street.message}
                  </span>
                )
              }
            />

            <InputForm
              id="number"
              type="number"
              label="number"
              placeholder="Digite o numero da sua rua"
              register={register("number")}
              error={
                errors.number?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.number.message}
                  </span>
                )
              }
            />

            <InputForm
              id="complement"
              type="complement"
              label="complement"
              placeholder="Digite o complemento Ex:última casa da rua"
              register={register("complement")}
              error={
                errors.complement?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.complement.message}
                  </span>
                )
              }
            />

            <div className="flex justify-end flex-row align-end ">
              <p className="text-brand2 mx-12 text-sm">Esqueci minha senha</p>
            </div>

            <div className="flex flex-col flex-auto items-center justify-center">
              <button
                className="w-[100%] h-[48px] my-20 rounded-1xl flex-grow-0 bg-brand1 
          border-brand1 text-white hover:bg-brand2 
          font:bold hover:border-brand2 "
              >
                Entrar
              </button>

              <p>Já possui Cadastro ?</p>

              <span
                className="flex align-center justify-center items-center w-[100%] h-[48px] my-20 rounded-1xl flex-grow-0 bg-grey10 
border-solid 
border-grey1  text-black hover:bg-grey4 
font:bold hover:border-brand2 "
              >
                <Link to={"/login"}>Fazer Login</Link>
              </span>
            </div>
          </form>
        </main>
      </div>
      <div className="my-108px" style={{ width: "98vw" }}>
        <Footer />
      </div>
    </div>
  );
};
