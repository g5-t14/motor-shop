import { Input } from "../Input/default";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { GreyButton, PurpleButton } from "../Button";
import { useUser } from "../../hooks/useUser";
import { AddressData, addressSchema } from "../../validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

export const EditAddressModal = () => {
  const { addressEdit, toggleAddressModal } = useUser();
  const { userData } = useAuth();

  const { register, handleSubmit } = useForm<AddressData>({
    resolver: zodResolver(addressSchema),
    mode: "onChange",
  });

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
      <form
        onSubmit={handleSubmit(addressEdit)}
        className="box-border h-[700px] flex flex-col gap-4 w-full max-w-lg bg-whiteFixed p-4 rounded-md overflow-auto md:h-auto md:max-w-[33rem]"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-500 text-[16px] text-grey1">Editar endereço</h2>
          <button
            onClick={toggleAddressModal}
            type="button"
            className="text-grey4"
          >
            <GrClose />
          </button>
        </div>
        <h3 className="font-500 text-[14px] text-grey1">
          Infomações de endereço
        </h3>
        <Input
          id="cep"
          label="CEP"
          placeholder="Digite seu CEP"
          type="text"
          register={register("cep")}
          defaultValue={userData.cep}
        />
        <div className="flex gap-4">
          <Input
            id="state"
            label="Estado"
            placeholder="Digite seu estado"
            type="text"
            register={register("state")}
            defaultValue={userData.state}
          />
          <Input
            id="city"
            label="Cidade"
            placeholder="Digite sua cidade"
            type="text"
            register={register("city")}
            defaultValue={userData.city}
          />
        </div>
        <Input
          id="street"
          label="Rua"
          placeholder="Digite o nome da sua rua"
          type="text"
          register={register("street")}
          defaultValue={userData.street}
        />
        <div className="flex gap-4">
          <Input
            id="number"
            label="Número"
            placeholder="Digite o número da sua rua"
            type="text"
            register={register("number")}
            defaultValue={userData.number}
          />
          <Input
            id="complement"
            label="Complemento"
            placeholder="Digite o complemento"
            type="text"
            register={register("complement")}
            defaultValue={userData.complement}
          />
        </div>
        <div className="flex justify-end gap-4">
          <GreyButton onClick={toggleAddressModal} type="button" size="big">
            Cancelar
          </GreyButton>
          <PurpleButton type="submit" size="big">
            Salvar alterações
          </PurpleButton>
        </div>
      </form>
    </div>
  );
};
