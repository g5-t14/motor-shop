import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { RecoverPasswordData, forgotPasswordSchema } from "../../validations/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { PurpleButton } from "../../components/Button";
import { Input } from "../../components/Input/default";
import { Footer } from "../../components/Footer";
import { apiLocal } from "../../services/api";


export const ForgotPassword = () => {

  const { register, handleSubmit } = useForm<RecoverPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onChange",
  });

  const sendEmailToRecover = async (formData: RecoverPasswordData) => {
    try {
      const response = await apiLocal.post("/users/resetPassword",formData.email)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className="h-[100vh] bg-grey7 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(sendEmailToRecover)}
          className="box-border flex flex-col gap-3 w-full bg-whiteFixed px-[49px] py-[44px] rounded-4 max-w-[412px]"
        >
          <h1 className="mb-[32px] lexend text-[24px] font-medium">Recuperação de senha</h1>

          <Input
            id="email"
            label="Email"
            placeholder="Digitar email"
            type="email"
            register={register("email")}
          />
         
          <Link
            to={"/login"}
            className="text-right text-[14px] mb-[21px] text-grey2 font-medium hover:underline"
          >
            Lembrei a senha
          </Link>

          <PurpleButton size="big" type="submit">
            Recuperar
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
  )
}