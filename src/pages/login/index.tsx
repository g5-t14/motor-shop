import { useForm } from "react-hook-form";
import { PurpleButton } from "../../components/Button";
import { LoginData, loginSchema } from "../../validations/login";
import { Footer } from "../../components/Footer";
import { Input } from "../../components/Input/default";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "../../components/Header";

export const Login = () => {
  const { userLogin } = useAuth();

  const { register, handleSubmit } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <>
      <Header />
      <main className="h-[100vh] bg-grey7 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(userLogin)}
          className="box-border flex flex-col gap-3 w-full bg-whiteFixed px-[49px] py-[44px] rounded-4 max-w-[412px]"
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
          <Link
            to={"/forgotPassword"}
            className="text-right text-[14px] mb-[21px] text-grey2 font-medium hover:underline"
          >
            Esqueci minha senha
          </Link>

          <PurpleButton size="big" type="submit">
            Entrar
          </PurpleButton>
          <p className="text-center text-[14px] my-[24px]">
            Ainda não possui conta?
          </p>
          <Link
            className="bg-none border-grey4 border-[1.5px] text-grey0 hover:bg-grey1 hover:border-grey1 hover:text-whiteFixed flex font-bold justify-center items-center h-[48px] rounded w-[100%]"
            to={`/register`}
          >
            Cadastrar
          </Link>
        </form>
      </main>
      <Footer />
    </>
  );
};
