import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/userRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { InputForm } from "../../components/Input/forms";
import { RegisterData, registerSchema } from "../../validations/register";
import { Footer } from "../../components/Footer";
import { ChangeEvent, useEffect, useState } from "react";

export const Register = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setSelectedOption("true");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const { userRegister, loading } = useRegister();
  return (
    <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center bg-grey7 p-[15px]">
      <div className="w-full flex py-[55px] ">
        <main className="w-full flex flex-col jutify-center items-center px-[50px]">
          <form
            onSubmit={handleSubmit(userRegister)}
            className="w-auto bg-grey10 pl-[48px] pr-[48px] pt-[44px] pb-[44px] rounded"
          >
            <h2 className="font-bold text-[24px] lexend mb-[32px]">Cadastro</h2>

            <p className="text-sm mb-[24px] font-bold">Informações pessoais</p>
            <InputForm
              id="name"
              type="name"
              label="Nome"
              placeholder="Digite seu nome"
              register={register("name")}
              // error={
              //   errors.name?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.name.message}
              //     </span>
              //   )
            />

            <InputForm
              id="email"
              type="email"
              label="Email"
              placeholder="Digite seu Email"
              register={register("email")}
              // error={
              //   errors.email?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.email.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="cpf"
              type="cpf"
              label="Cpf"
              placeholder="Digite seu Cpf"
              register={register("cpf")}
              // error={
              //   errors.cpf?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.cpf.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="phone"
              type="phone"
              label="Telefone"
              placeholder="Digite seu Telefone"
              register={register("phone")}
              // error={
              //   errors.phone?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.phone.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="birthdate"
              type="birthdate"
              label="Data de nascimento"
              placeholder="Digite sua data de nascimento"
              register={register("birthdate")}
              // error={
              //   errors.birthdate?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.birthdate.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="description"
              type="description"
              label="Descrição"
              placeholder="Digite uma descrição para o seu perfil"
              register={register("description")}
              // error={
              //   errors.description?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.description.message}
              //     </span>
              //   )
              // }
            />
            <p className="text-sm mb-[24px] font-bold">Informações pessoais</p>
            <InputForm
              id="cep"
              type="cep"
              label="Cep"
              placeholder="Digite o seu cep"
              register={register("cep")}
              // error={
              //   errors.cep?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.cep.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="state"
              type="state"
              label="Estado"
              placeholder="Insira o seu estado"
              register={register("state")}
              // error={
              //   errors.state?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.state.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="city"
              type="city"
              label="Cidade"
              placeholder="Digite o nome da sua cidade"
              register={register("city")}
              // error={
              //   errors.city?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.city.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="street"
              type="street"
              label="Rua"
              placeholder="Digite o nome da sua rua"
              register={register("street")}
              // error={
              //   errors.street?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.street.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="number"
              type="number"
              label="Número"
              placeholder="Digite o numero da sua rua"
              register={register("number")}
              // error={
              //   errors.number?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.number.message}
              //     </span>
              //   )
              // }
            />

            <InputForm
              id="complement"
              type="complement"
              label="Complemento"
              placeholder="Digite o complemento Ex:última casa da rua"
              register={register("complement")}
              // error={
              //   errors.complement?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.complement.message}
              //     </span>
              //   )
              // }
            />
            <p className="text-sm mb-[24px] font-bold">Tipo de conta</p>
            <div className="flex space-x-4 mb-[24px] w-full justify-center">
              <label
                className={`flex items-center rounded h-[48px] w-[152px] ${
                  selectedOption === "true" ? "bg-brand1 text-white" : ""
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="userType"
                  value="true"
                  checked={selectedOption === "true"}
                  onChange={handleOptionChange}
                />
                <div className="border-2 border-grey3 text-[16px]  h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                  Comprador
                </div>
              </label>

              <label
                className={`flex items-center rounded h-[48px] w-[152px] ${
                  selectedOption === "false" ? "bg-brand1 text-white" : ""
                }`}
              >
                <input
                  type="radio"
                  className="hidden"
                  name="userType"
                  value="false"
                  checked={selectedOption === "false"}
                  onChange={handleOptionChange}
                />
                <div className="border-2 border-grey3 text-[16px] h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                  Anunciante
                </div>
              </label>
            </div>

            <InputForm
              id="password"
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              register={register("password")}
              // error={
              //   errors.password?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.password.message}
              //     </span>
              //   )
              // }
            />
            <InputForm
              id="Confirmpassword"
              type="Confirmpassword"
              label="Confirmar Senha"
              placeholder="Digite sua senha"

              // error={
              //   errors.password?.message && (
              //     <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
              //       {errors.password.message}
              //     </span>
              //   )
              // }
            />

            <div className="flex flex-col flex-auto items-center justify-center">
              <button
                className="w-[100%] h-[48px] rounded flex-grow-0 bg-brand1 
          border-brand1 text-white hover:bg-brand2 
          font:bold hover:border-brand2 font-bold"
                type="submit"
              >
                {loading ? "Registrando..." : "Finalizar cadastro"}
              </button>
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
