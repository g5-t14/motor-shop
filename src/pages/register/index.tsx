import { useForm } from "react-hook-form";
import { useRegister } from "../../hooks/userRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../../validations/register";
import { Footer } from "../../components/Footer";
import { ChangeEvent } from "react";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input/default";
import { TextArea } from "../../components/Input/textArea";
import { PurpleButton } from "../../components/Button";
import { ModalSucess } from "../../components/ModalRegister/modalSucess";
import { useUser } from "../../hooks/useUser";
import { apiLocal } from "../../services/api";
import { ModalError } from "../../components/ModalRegister/modalError";

export const Register = () => {
  const { setSelectedOption, selectedOption } = useRegister();
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.value);
  };
  const {
    toggleSucessRegisterModal,
    registerSucessModal,
    toggleErrorRegisterModal,
    registerErrorModal,
  } = useUser();

  const userRegister = async (data: RegisterData) => {
    try {
      data.is_seller = selectedOption === "true";
      await apiLocal.post("/users", data);
      toggleSucessRegisterModal();
    } catch (error) {
      toggleErrorRegisterModal();
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  return (
    <>
      <Header />
      <div className="pl-4 pr-4 h-full flex flex-col justify-between items-center bg-grey7">
        <div className="w-full flex py-[55px]">
          <main className="w-full flex flex-col jutify-center items-center">
            <form
              onSubmit={handleSubmit(userRegister)}
              className="flex flex-col gap-4 w-auto bg-grey10 pl-[48px] pr-[48px] pt-[44px] pb-[44px] rounded"
            >
              <h2 className="mb-[20px] lexend text-[24px] font-medium">
                Cadastro
              </h2>
              <p className="text-sm font-bold">Informações pessoais</p>
              <Input
                id="name"
                label="Nome"
                placeholder="Digite seu nome"
                type="text"
                register={register("name")}
                error={
                  errors.name?.message && (
                    <span className="span-error">{errors.name.message}</span>
                  )
                }
              />
              <Input
                id="email"
                label="Email"
                placeholder="Digitar email"
                type="email"
                register={register("email")}
                error={
                  errors.email?.message && (
                    <span className="span-error">{errors.email.message}</span>
                  )
                }
              />
              <Input
                id="cpf"
                label="CPF"
                placeholder="Digite seu CPF"
                type="text"
                register={register("cpf")}
                error={
                  errors.cpf?.message && (
                    <span className="span-error">{errors.cpf.message}</span>
                  )
                }
              />
              <Input
                id="phone"
                label="Telefone"
                placeholder="Digite seu telefone"
                type="text"
                register={register("phone")}
                error={
                  errors.phone?.message && (
                    <span className="span-error">{errors.phone.message}</span>
                  )
                }
              />
              <Input
                id="birthdate"
                label="Data de nascimento"
                placeholder="Digite sua data de nascimento"
                type="text"
                register={register("birthdate")}
                error={
                  errors.birthdate?.message && (
                    <span className="span-error">
                      {errors.birthdate.message}
                    </span>
                  )
                }
              />
              <TextArea
                id="description"
                label="Descrição"
                placeholder="Digitar descrição"
                register={register("description")}
                error={
                  errors.description?.message && (
                    <span className="span-error">
                      {errors.description.message}
                    </span>
                  )
                }
              />
              <p className="text-sm font-bold">Informações de endereço</p>
              <Input
                id="cep"
                label="CEP"
                placeholder="Digite o seu CEP"
                type="text"
                register={register("cep")}
                error={
                  errors.cep?.message && (
                    <span className="span-error">{errors.cep.message}</span>
                  )
                }
              />
              <Input
                id="state"
                label="Estado"
                placeholder="Digite o seu estado"
                type="text"
                register={register("state")}
                error={
                  errors.state?.message && (
                    <span className="span-error">{errors.state.message}</span>
                  )
                }
              />
              <Input
                id="city"
                label="Cidade"
                placeholder="Digite a sua cidade"
                type="text"
                register={register("city")}
                error={
                  errors.city?.message && (
                    <span className="span-error">{errors.city.message}</span>
                  )
                }
              />
              <Input
                id="street"
                label="Rua"
                placeholder="Digite a sua rua"
                type="text"
                register={register("street")}
                error={
                  errors.street?.message && (
                    <span className="span-error">{errors.street.message}</span>
                  )
                }
              />
              <Input
                id="number"
                label="Número"
                placeholder="Digite o numero da sua rua"
                type="number"
                register={register("number")}
                error={
                  errors.number?.message && (
                    <span className="span-error">{errors.number.message}</span>
                  )
                }
              />
              <Input
                id="complement"
                label="Complemento"
                placeholder="Digite o complemento Ex: Última casa da rua"
                type="text"
                register={register("complement")}
                error={
                  errors.complement?.message && (
                    <span className="span-error">
                      {errors.complement.message}
                    </span>
                  )
                }
              />
              <div>
                <p className="text-sm mb-[16px] font-bold">Tipo de conta</p>
                <div className="flex gap-4">
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
                    <div className="border-2 border-grey3 text-[16px]  h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                      Comprador
                    </div>
                  </label>

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
                    <div className="border-2 border-grey3 text-[16px] h-[48px] w-[152px] font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                      Anunciante
                    </div>
                  </label>
                </div>
              </div>
              <Input
                id="password"
                label="Senha"
                placeholder="Digite sua senha"
                type="password"
                register={register("password")}
                error={
                  errors.password?.message && (
                    <span className="span-error">
                      {errors.password.message}
                    </span>
                  )
                }
              />
              <Input
                id="confirmPassword"
                label="Confirmar senha"
                placeholder="Digite sua senha"
                type="password"
              />
              <PurpleButton type="submit" size="big">
                Finalizar Cadastro
              </PurpleButton>
              {registerSucessModal ? <ModalSucess /> : null}
              {registerErrorModal ? <ModalError /> : null}
            </form>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};
