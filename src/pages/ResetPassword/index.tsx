import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import {
  UpdatePasswordData,
  newPasswordSchema,
} from "../../validations/forgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { PurpleButton } from "../../components/Button";
import { Input } from "../../components/Input/default";
import { Footer } from "../../components/Footer";
import { apiLocal } from "../../services/api";
import { Header } from "../../components/Header";

export const ResetPassword = () => {
  const { token } = useParams();

  const { register, handleSubmit } = useForm<UpdatePasswordData>({
    resolver: zodResolver(newPasswordSchema),
    mode: "onChange",
  });

  const sendNewPassword = async (newPassword: any) => {
    try {
      const response = await apiLocal.patch(
        `/users/resetPassword/${token}`,
        newPassword
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <main className="h-[100vh] bg-grey7 flex flex-col justify-center items-center">
        <form
          onSubmit={handleSubmit(sendNewPassword)}
          className="box-border flex flex-col gap-3 w-full bg-whiteFixed px-[49px] py-[44px] rounded-4 max-w-[412px]"
        >
          <h1 className="mb-[32px] lexend text-[24px] font-medium">
            Atualização de senha
          </h1>

          <Input
            id="password"
            label="Nova senha"
            placeholder="Digitar senha"
            type="password"
            register={register("password")}
          />

          <Input
            id="confirmPassword"
            label="Confirmar nova senha"
            placeholder="Digitar senha novamente"
            type="password"
            register={register("confirmPassword")}
          />

          <Link
            to={"/login"}
            className="text-right text-[14px] mb-[21px] text-grey2 font-medium hover:underline"
          >
            Lembrei a senha
          </Link>

          <PurpleButton size="big" type="submit">
            Atualizar
          </PurpleButton>
        </form>
      </main>
      <Footer />
    </>
  );
};
