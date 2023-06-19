import { Input } from "../Input/default";
import { useForm } from "react-hook-form";
import { TextArea } from "../Input/textArea";
import { GrClose } from "react-icons/gr";
import { GreyButton, PurpleButton, RedButton } from "../Button";
import { useUser } from "../../hooks/useUser";
import { ProfileData, profileSchema } from "../../validations/user";
import { zodResolver } from "@hookform/resolvers/zod";

export const EditProfileModal = () => {
  const { profileEdit } = useUser();

  const { register, handleSubmit } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
  });

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(profileEdit)}
        className="box-border h-[700px] flex flex-col gap-4 w-full max-w-lg bg-whiteFixed p-4 rounded-md overflow-auto md:h-auto md:max-w-[33rem]"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-500 text-[16px] text-grey1">Editar perfil</h2>
          <button className="text-grey4">
            <GrClose />
          </button>
        </div>
        <h3 className="font-500 text-[14px] text-grey1">Infomações pessoais</h3>
        <Input
          id="name"
          label="Nome"
          placeholder="Digite seu nome"
          type="text"
          register={register("name")}
        />
        <Input
          id="email"
          label="Email"
          placeholder="Digite seu email"
          type="email"
          register={register("email")}
        />
        <Input
          id="cpf"
          label="CPF"
          placeholder="Digite seu CPF"
          type="text"
          register={register("cpf")}
        />
        <Input
          id="cel"
          label="Celular"
          placeholder="Digite seu celular"
          type="text"
          register={register("phone")}
        />
        <Input
          id="birthdate"
          label="Data de nascimento"
          placeholder="Digite sua data de nascimento"
          type="text"
          register={register("birthdate")}
        />
        <TextArea
          id="description"
          label="Descrição"
          placeholder="Digite uma descrição para seu perfil"
          register={register("description")}
        />
        <div className="flex flex-col gap-4 md:flex-row md:gap-2 md:justify-between">
          <GreyButton size="big">Cancelar</GreyButton>
          <RedButton size="big">Excluir perfil</RedButton>
          <PurpleButton size="big">Salvar alterações</PurpleButton>
        </div>
      </form>
    </div>
  );
};
