import { Modal } from "../Modal";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCar } from "../../hooks/useCar";
import { api, apiLocal } from "../../services/api";
import { GrClose } from "react-icons/gr";
import { useForm } from "react-hook-form";
import { adData, adSchema } from "../../validations/ad";
import { UserAdsResponse } from "../../providers/CarProvider";

interface modelsRequest {
  id: string;
  name: string;
  fuel: number;
  value: number;
  brand: string;
  year: string;
}

interface ModalCreateAdTaskProps {
  toggleModal: () => void;
  setAds: React.Dispatch<React.SetStateAction<UserAdsResponse[]>>;
}

const ModalCreateAd = ({ toggleModal, setAds }: ModalCreateAdTaskProps) => {
  const { cars, setAd } = useCar();
  const [infoCar, setInfoCars] = useState<modelsRequest>();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [models, setModels] = useState<modelsRequest[]>([]);
  const [galeryInputs, setGaleryInputs] = useState(["picture_1", "picture_2"]);
  const token = localStorage.getItem("user-token");
  const idLogged = localStorage.getItem("user-id");
  const createAd = async (data: any) => {
    try {
      apiLocal.defaults.headers.common.authorization = `Bearer ${token}`;
      await apiLocal.post("/ads", data);
      const response = await apiLocal.get<UserAdsResponse[]>(
        `/ads/seller/${idLogged}`
      );
      setAds([...response.data]);
      toggleModal();
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(adSchema),
    mode: "onBlur",
  });

  const fuels = ["Flex", "Elétrico", "Híbrido"];

  const getModels = async (brand: string) => {
    try {
      const response = await api.get(`/cars?brand=${brand}`);
      setModels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCar = (carName: string) => {
    const result = models.filter((car) => {
      return car.name == carName;
    });
    if (result[0]) {
      setInfoCars(result[0]);
    }
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
  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-white  w-screen max-w-[530px] h-full rounded-2xl p-[25px] flex-col overflow-auto pb-[100px] relative">
        <h3 className="text-grey1 font-lexend text-[18px] mb-[30px]">
          Criar anúncio
        </h3>
        <form className="p-[5px]" onSubmit={handleSubmit(createAd)}>
          <h4 className="text-[14px] font-medium mb-[24px]">
            Informações do veículo
          </h4>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">Marca</label>
            <select
              id="marca"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full tracking-wider"
              {...register("brand")}
              defaultValue=""
              onChange={(e) => {
                setSelectedBrand(e.target.value);
                getModels(e.target.value);
              }}
            >
              <option value={"#"} hidden>
                Qual é a marca do carro?
              </option>
              {cars.map((brand, index) => {
                return (
                  <option value={brand} key={index}>
                    {brand
                      .split(" ")
                      .map(
                        (word) => word.slice(0, 1).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">Modelo</label>
            <select
              id="modelo"
              disabled={!selectedBrand}
              className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full tracking-wider ${
                !selectedBrand ? "bg-grey7 cursor-not-allowed" : ""
              } ${!selectedBrand ? "text-grey2" : ""}`}
              {...register("model")}
              onChange={(e) => filterCar(e.target.value)}
            >
              <option value={"#"} hidden>
                Qual é o modelo do carro?
              </option>

              {models
                .map((element) => {
                  return element.name;
                })
                .map((model, index) => {
                  return (
                    <option value={model} key={index} disabled={!selectedBrand}>
                      {model
                        .split(" ")
                        .map(
                          (word) =>
                            word.slice(0, 1).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex gap-[25px]">
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Ano
              </label>
              <input
                type="text"
                id="ano"
                disabled={!infoCar?.name}
                {...register("year")}
                value={infoCar ? infoCar?.year : ""}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Combustível
              </label>
              <input
                type="text"
                id="combustivel"
                value={infoCar ? fuels[infoCar.fuel - 1] : ""}
                disabled={!infoCar?.name}
                {...register("fuel")}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
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
                disabled={!infoCar?.name}
                {...register("mileage")}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="flex flex-col w-full w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Cor
              </label>
              <select
                id="cor"
                disabled={!infoCar?.name}
                {...register("color")}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
              >
                <option value={"#"} hidden>
                  Qual é a cor do seu carro
                </option>
                <option value="AzulClaro">Azul Claro</option>
                <option value="Preto">Preto</option>
                <option value="Rosa">Rosa</option>
                <option value="Vermelho">Vermelho</option>
                <option value="Cinza">Cinza</option>
                <option value="Marrom">Marrom</option>
                <option value="Amarelo">Amarelo</option>
                <option value="VerdeClaro">Verde Claro</option>
                <option value="VerdeEscuro">Verde Escuro</option>
                <option value="AzulEscuro">Azul Escuro</option>
                <option value="Roxo">Roxo</option>
                <option value="Branco">Branco</option>
                <option value="Laranja">Laranja</option>
              </select>
            </div>
          </div>
          <div className="flex gap-[25px]">
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Preço tabela FIPE
              </label>
              <input
                type="number"
                id="fipe"
                disabled={!infoCar?.name}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
                value={infoCar?.value || ""}
                //   .toLocaleString("pt-br", {
                //   style: "currency",
                //   currency: "BRL",
                // })}
                {...register("fipe_table", { valueAsNumber: true })}
              />
            </div>
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Preço
              </label>
              <input
                type="number"
                id="preco"
                disabled={!infoCar?.name}
                {...register("price", { valueAsNumber: true })}
                className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                  !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
                }`}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              Descrição
            </label>

            <textarea
              disabled={!infoCar?.name}
              id="descricao"
              {...register("description")}
              className={`rounded border-[1.5px] border-grey7 resize-none p-[10px] text-grey3 text-[14px] mb-[20px] ${
                !infoCar?.name ? "bg-grey7" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              Imagem da capa
            </label>
            <input
              type="url"
              id="imagePrincipal"
              disabled={!infoCar?.name}
              {...register("cover_img")}
              className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
              }`}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              1º Imagem da galeria
            </label>

            <input
              type="url"
              id="firstImage"
              disabled={!infoCar?.name}
              {...register("pictures.picture_1")}
              className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
              }`}
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
              disabled={!infoCar?.name}
              className={`rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full ${
                !infoCar?.name ? "bg-grey7 cursor-not-allowed" : ""
              }`}
            />
          </div>

          {renderGalleryInputs()}
          {imageCount < 6 && (
            <button
              type="button"
              disabled={!infoCar?.name}
              className="w-[315px] h-[38px] rounded bg-brand4 text-brand1 text-[14px] font-600"
              onClick={handleAddImage}
            >
              Adicionar campo para imagem da galeria
            </button>
          )}
          <div className="mt-[42px] flex justify-end gap-[10px]">
            <button className="bg-grey6 h-[48px] w-[126px] text-grey2 font-600 text-[16px] rounded">
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-brand3 w-[193px] h-[48px] rounded text-white"
            >
              Criar anúncio
            </button>
          </div>
        </form>
        <button
          className="absolute top-[22px] right-[22px] text-whiteFixed "
          onClick={toggleModal}
        >
          <GrClose />
        </button>
      </div>
    </Modal>
  );
};

export default ModalCreateAd;
