import { useForm } from "react-hook-form";
import { BorderGreyButton, PurpleButton } from "../../components/Button";
import { LoginData, loginSchema } from "../../validations/login";
import { Footer } from "../../components/Footer";
import { Input } from "../../components/Input/default";
import { apiLocal } from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ModalLogin } from "../../components/ModalLogin";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = () => setIsOpenModal(!isOpenModal);
  const navigate = useNavigate();

  const userLogin = async (data: LoginData) => {
    try {
      const response = await apiLocal.post("/login", data);
      const { token } = response.data;
      apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("user-token", token);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <main className="h-[100vh] bg-slate-500 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(userLogin)}
          className="box-border flex flex-col gap-3 w-full max-w-[360px] bg-whiteFixed px-8 py-4 rounded-4"
        >
          <h1>Login</h1>

          <Input
            id="email"
            label="Email"
            placeholder="Digitar email"
            type="email"
            register={register("email")}
          />
          <Input
            id="password"
            label="Senha"
            placeholder="Digitar senha"
            type="password"
            register={register("password")}
          />
          <p className="text-right">Esqueci minha senha</p>
          <PurpleButton size="big" type="submit">
            Entrar
          </PurpleButton>
          {isSubmitSuccessful ? (
            <ModalLogin toggleModal={toggleModal} />
          ) : (
            <p></p>
          )}
          <p className="text-center">Ainda não possui conta?</p>

          <BorderGreyButton
            size="big"
            type="button"
            onClick={() => navigate("/register")}
          >
            Cadastrar
          </BorderGreyButton>
        </form>
      </main>
      <Footer />
    </>
  );
};
