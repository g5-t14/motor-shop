import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/userRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputForm } from "../../components/Input/forms";
import { RegisterData, registerSchema } from "../../validations/register";
import { Footer } from "../../components/Footer";
import { useState } from "react";
import { ModalRegister } from "../../components/ModalRegister";
import { Link } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });


  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);


  console.log(isSubmitSuccessful);

  const { userRegister, loading } = useRegister();

  // const handleRegistry = (data)=> {

  // console.log(data)

  // useRegister(data)


  const { userRegister, loading } = useRegister();

  return (
    <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center">
      <div className="w-full flex py-[55px]">
        <main className="w-full flex flex-col justify-center items-center">
          <form
            onSubmit={handleSubmit(userRegister)}
            className="  p-8 w-[70%] box-border top-20 flex flex-col gap-1.5 max-w-360 rounded-3xl shadow-lg max-w-sm "
          >
            <h2 className="font-bold text-lg">Cadastro</h2>

            <p className="text-sm">Informações pessoais</p>
            <InputForm
              id="name"
              type="name"
              label="Nome"
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
              label="Email"
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
              label="Senha"
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
              label="Cpf"
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
              label="Telefone"
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
              label="Data de nascimento"
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
              label="Descrição"
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

            <div className="flex justify-between items-center">
              <button
                onClick={(event)=>{event.preventDefault()}}
                className=" bg-grey5 border-grey2 border-solid  text-grey0 hover:bg-brand1 hover:border-grey1 hover:text-whiteFixed  h-[40px] w-[40%] focus:bg-brand1 focus:text-whiteFixed px-4 rounded-1xl"
                value="true"
              >
                Vendedor
              </button>
              <button
                onClick={(event)=>{event.preventDefault()}}
                className="bg-grey5 border-grey2 border-solid text-grey0 hover:bg-brand1 hover:border-grey1 hover:text-whiteFixed  h-[40px] w-[40%] focus:bg-brand1 focus:text-whiteFixed px-4 rounded-1xl"
                value="false"
              >
                Cliente
              </button>
            </div>

            <InputForm
              id="cep"
              type="cep"
              label="Cep"
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
              id="state"
              type="state"
              label="Estado"
              placeholder="Insira o seu estado"
              register={register("state")}
              error={
                errors.state?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute ">
                    {errors.state.message}
                  </span>
                )
              }
            />

            <InputForm
              id="city"
              type="city"
              label="Cidade"
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
              label="Rua"
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
              label="Número"
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
              label="Complemento"
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

            <div className="flex justify-end flex-row align-end my-8  ">
              <p className="text-brand2 mx-12 text-sm ml-10">
                Esqueci minha senha
              </p>
            </div>

            <div className="flex flex-col flex-auto items-center justify-between">
              <button
                className=" bg-brand1 text-grey6 hover:bg-brand2 hover:border-grey1 hover:text-whiteFixed  flex justify-center h-[40px] items-center w-full rounded-2x1"
                type="submit"
                onClick={toggleModal}
              >
                {loading ? "Cadastrando..." : "Cadastrar"}
              </button>

              {isSubmitSuccessful ? (
                <ModalRegister toggleModal={toggleModal} />
              ) : (
                <p></p>
              )}

              <p>Já possui Cadastro ?</p>

              <div className=" bg-none border-grey4 text-grey0 hover:bg-grey1 hover:border-grey1 hover:text-whiteFixed  flex justify-center h-[40px] items-center w-full rounded-2x1">
                <Link to={"/login"}>Ir para Login</Link>
              </div>
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
