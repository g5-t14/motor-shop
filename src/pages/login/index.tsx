import { useForm } from "react-hook-form";
import { BorderGreyButton, PurpleButton } from "../../components/Button";
import { LoginData, loginSchema } from "../../validations/login";
import { Footer } from "../../components/Footer";
import { Input } from "../../components/Input/default";
import { apiLocal } from "../../services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  async function userLogin(data: LoginData) {
    try {
      const response = await apiLocal.post("/login", data);
      const { token, user_id } = response.data;
      apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
      localStorage.setItem("user-token", token);
      localStorage.setItem("user-id", user_id);
      navigate(`/advertiser/${user_id}`);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <main className="h-[100vh] bg-grey7 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(userLogin)}
          className="box-border flex flex-col gap-3 w-full max-w-[360px] bg-whiteFixed px-[49px] py-[44px] rounded-4 max-w-[412px]"
        >
          <h1 className="mb-[32px] lexend text-[24px] font-medium">Login</h1>

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
          <p className="text-right text-[14px] mb-[21px] text-grey2 font-medium">
            Esqueci minha senha
          </p>
          <PurpleButton size="big" type="submit">
            Entrar
          </PurpleButton>
          <p className="text-center text-[14px] my-[24px]">
            Ainda não possui conta?
          </p>
          <BorderGreyButton size="big" type="button">
            Cadastrar
          </BorderGreyButton>
        </form>
      </main>
      <Footer />
    </>
  );
};
