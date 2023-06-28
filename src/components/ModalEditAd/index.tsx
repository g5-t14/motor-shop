import { SetStateAction, useState } from "react";
import { useCar } from "../../hooks/useCar";
import { zodResolver } from "@hookform/resolvers/zod";
import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import {
  adData,
  adSchema,
  adUpdateData,
  editSchema,
} from "./../../validations/ad";
import { DeleteModalAd } from "./deleteModalAd";

const ModalEditAds = () => {
  const {
    adsEdit,
    infoCarId,
    toggleEditModalAds,
    selectedOption,
    setSelectedOption,
    deleteModal,
    toggleDeleteAds,
  } = useCar();
  const [galeryInputs, setGaleryInputs] = useState(["picture_1", "picture_2"]);

  const idLogged = localStorage.getItem("user-id");

  const handleOptionChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedOption(e.target.value);
  };
  const [imageCount, setImageCount] = useState(2);

  const handleAddImage = () => {
    setImageCount((prevCount) => prevCount + 1);
    if (imageCount < 6) {
      setGaleryInputs((prevInputs) => [
        ...prevInputs,
        `picture_${imageCount + 1}`,
      ]);
    }
  };
  const renderGalleryInputs = () => {
    return galeryInputs.slice(2).map((fieldName, index) => (
      <div className="flex flex-col" key={index}>
        <label className="text-[14px] font-medium mb-[8px]">
          {index + 3}º Imagem de galeria
        </label>
        <input
          type="url"
          id={`image${index + 3}`}
          className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
          {...register(`pictures.${fieldName}`)}
        />
      </div>
    ));
  };
  const { register, handleSubmit } = useForm<adData>({
    resolver: zodResolver(editSchema),
    mode: "onChange",
  });

  return (
    <>
      {infoCarId && (
        <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center overflow-hidden">
          <div className="bg-white  w-screen max-w-[530px] h-full rounded-2xl p-[25px] flex-col overflow-auto pb-[20px] relative">
            <h3 className="text-grey1 font-lexend text-[18px] mb-[30px]">
              Editar anúncio
            </h3>
            <form className="p-[5px]" onSubmit={handleSubmit(adsEdit)}>
              <h4 className="text-[14px] font-medium mb-[24px]">
                Informações do veículo
              </h4>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  Marca
                </label>
                <input
                  type="text"
                  id="marca"
                  className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 bg-grey8 text-[14px] mb-[20px] w-full tracking-wider cursor-not-allowed"
                  defaultValue={infoCarId.brand}
                  disabled={true}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  Modelo
                </label>
                <input
                  id="modelo"
                  className={`rounded border-[1.5px] border-grey7 p-[10px] bg-grey8 text-grey3 text-[14px] mb-[20px] w-full tracking-wider cursor-not-allowed`}
                  type="text"
                  defaultValue={infoCarId.model}
                  disabled={true}
                />
              </div>
              <div className="flex gap-[25px]">
                <div className="flex flex-col w-full maxsm:w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1">
                    Ano
                  </label>
                  <input
                    type="text"
                    id="ano"
                    disabled={true}
                    defaultValue={infoCarId.year}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] bg-grey8 text-grey3 text-[14px] mb-[20px] w-full cursor-not-allowed`}
                  />
                </div>
                <div className="flex flex-col w-full maxsm:w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1">
                    Combustível
                  </label>
                  <input
                    type="text"
                    id="combustivel"
                    defaultValue={infoCarId.fuel}
                    disabled={true}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 bg-grey8 text-[14px] mb-[20px] w-full cursor-not-allowed`}
                  />
                </div>
              </div>
              <div className="flex gap-[25px]">
                <div className="flex flex-col w-full w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1">
                    Quilometragem
                  </label>
                  <input
                    type="number"
                    id="quilometragem"
                    defaultValue={infoCarId.mileage}
                    {...register("mileage")}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full`}
                  />
                </div>
                <div className="flex flex-col w-full w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1">
                    Cor
                  </label>
                  <input
                    id="cor"
                    type="text"
                    defaultValue={infoCarId.color}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 bg-grey8 text-[14px] mb-[20px] w-full cursor-not-allowed`}
                  />
                </div>
              </div>
              <div className="flex gap-[25px]">
                <div className="flex flex-col w-full maxsm:w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1 ">
                    Preço tabela FIPE
                  </label>
                  <input
                    type="number"
                    id="fipe"
                    disabled={true}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] bg-grey8 mb-[20px] w-full cursor-not-allowed`}
                    defaultValue={infoCarId.fipe_table}
                    //   .toLocaleString("pt-br", {
                    //   style: "currency",
                    //   currency: "BRL",
                    // })}
                  />
                </div>
                <div className="flex flex-col w-full maxsm:w-auto">
                  <label className="text-[14px] font-medium mb-[8px] text-grey1">
                    Preço
                  </label>
                  <input
                    type="number"
                    id="preco"
                    defaultValue={infoCarId.price}
                    {...register("price", { valueAsNumber: true })}
                    className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full`}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  Descrição
                </label>

                <textarea
                  id="descricao"
                  defaultValue={infoCarId.description}
                  {...register("description")}
                  className={`rounded border-[1.5px] border-grey7 resize-none p-[10px] text-grey3 text-[14px] mb-[20px]`}
                />
              </div>
              <div>
                <p className="text-sm mb-[16px] font-bold">Publicado</p>
                <div className="flex gap-4 w-full mb-[15px]">
                  <label
                    className={`flex items-center rounded h-[48px] w-full ${
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
                    <div className="border-2 border-grey3 text-[16px]  h-[48px] w-full font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                      Sim
                    </div>
                  </label>

                  <label
                    className={`flex items-center rounded h-[48px] w-full ${
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
                    <div className="border-2 border-grey3 text-[16px] h-[48px] w-full font-bold rounded-md px-4 py-2 cursor-pointer flex justify-center items-center">
                      Não
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  Imagem da capa
                </label>
                <input
                  type="url"
                  id="imagePrincipal"
                  defaultValue={infoCarId.cover_img}
                  {...register("cover_img")}
                  className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full`}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  1º Imagem da galeria
                </label>

                <input
                  type="url"
                  id="firstImage"
                  {...register("pictures.picture_1")}
                  className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full`}
                  defaultValue={infoCarId.pictures.picture_1}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-[14px] font-medium mb-[8px]">
                  2º Imagem de galeria
                </label>
                <input
                  type="url"
                  id="secondImagem"
                  {...register("pictures.picture_2")}
                  defaultValue={infoCarId.pictures.picture_2}
                  className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full `}
                />
              </div>

              {renderGalleryInputs()}
              {imageCount < 6 && (
                <button
                  type="button"
                  className="w-[315px] h-[38px] rounded bg-brand4 text-brand1 text-[14px] font-600"
                  onClick={handleAddImage}
                >
                  Adicionar campo para imagem da galeria
                </button>
              )}
              <div className="mt-[42px] flex justify-end gap-[10px]">
                <button
                  type="button"
                  className="bg-grey6 h-[48px] w-full text-grey2 font-600 text-[16px] rounded"
                  onClick={toggleDeleteAds}
                >
                  Excluir anúncio
                </button>
                <button
                  type="submit"
                  className="bg-brand1 w-full h-[48px] rounded text-white"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
            <button
              className="absolute top-[22px] right-[22px] text-whiteFixed "
              onClick={toggleEditModalAds}
            >
              <GrClose />
            </button>
          </div>
        </div>
      )}
      {deleteModal ? <DeleteModalAd /> : null}
    </>
  );
};

export default ModalEditAds;
