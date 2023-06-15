import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import { InputForm } from "../../components/Input/forms";
import { LoginData, loginSchema } from "../../validations/login";
import { Footer } from "../../components/Footer";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  console.log(errors);

  const { login, loading } = useAuth();

  return (
    <div className="pl-4 pr-4 h-full w-full flex flex-col justify-between items-center">
      <div className="w-full flex py-[55px]">
        <main className="w-full flex flex-col jutify-center items-center">
          <form
            onSubmit={handleSubmit(login)}
            className="p-8 w-[100%] box-border top-20 flex flex-col gap-1.5 max-w-360 rounded-3xl shadow-md max-w-sm"
          >
            <h2 className="font-bold text-lg">Login</h2>

            <InputForm
              id="Email"
              type="Email"
              label="Email"
              placeholder="Digite seu email"
              register={register("email")}
              error={
                errors.email?.message && (
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute">
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
                  <span className="text-brand2 bottom-[-16px] right-0 text-sm absolute">
                    {errors.password.message}
                  </span>
                )
              }
            />

            <div className="flex justify-end flex-row align-end my-8 ">
              <p className="text-brand2 mx-12 text-sm ml-10">
                Esqueci minha senha
              </p>
            </div>

            <div className="flex flex-col flex-auto items-center justify-center ">
              <button
                className="w-[100%] h-[48px] my-20 rounded-2xl flex-grow-0 bg-brand1 
        border-brand1 text-white hover:bg-brand2 
        font:bold hover:border-brand2 "
                type="submit"
              >
                {loading ? "Entrando..." : "Entrar"}
              </button>

              <p>Ainda não possui Cadastro ?</p>

              <span
                className="flex align-center justify-center items-center w-[100%] h-[48px] my-20 rounded-2xl flex-grow-0 bg-grey10 border-solid 
border-grey1  text-black hover:bg-grey4 
font:bold hover:border-brand2 cursor-pointer"
              >
                <Link to={"/register"}>Fazer Registro </Link>
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
