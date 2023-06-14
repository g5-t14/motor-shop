import { Modal } from "../Modal";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCar } from "../../hooks/useCar";
import { api } from "../../services/api";
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
}

const ModalCreateAd = ({ toggleModal }: ModalCreateAdTaskProps) => {
  const { cars } = useCar();
  const [infoCar, setInfoCars] = useState<modelsRequest>();
  const [brand, setBrand] = useState<modelsRequest>();

  const [models, setModels] = useState<modelsRequest[]>([]);

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
  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-white  w-screen max-w-[530px] h-full rounded-2xl p-[25px] flex-col overflow-auto pb-[100px] ">
        <h3 className="text-grey1 font-lexend text-[18px] mb-[30px]">
          Criar anúncio
        </h3>
        <form className="p-[5px]">
          <h4 className="text-[14px] font-medium mb-[24px]">
            Informações do veículo
          </h4>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">Marca</label>
            <select
              name="marca"
              id="marca"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full tracking-wider"
              onChange={(e) => getModels(e.target.value)}
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
              name="marca"
              id="marca"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full tracking-wider"
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
                    <option value={model} key={index}>
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
                name="Ano"
                id="ano"
                value={infoCar?.year}
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full"
              />
            </div>
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Combustível
              </label>
              <input
                type="text"
                name="Ano"
                id="ano"
                value={infoCar ? fuels[infoCar.fuel - 1] : ""}
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full"
              />
            </div>
          </div>
          <div className="flex gap-[25px]">
            <div className="flex flex-col w-full w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Quilometragem
              </label>
              <input
                type="text"
                name="Ano"
                id="ano"
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full"
              />
            </div>
            <div className="flex flex-col w-full w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Cor
              </label>
              <select
                name=""
                id="cor"
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full tracking-wider"
              >
                <option value={"#"} hidden>
                  Qual é a cor do seu carro
                </option>
                <option value="Azul">Azul</option>
                <option value="Preto">Preto</option>
                <option value="Verde">Verde</option>
                <option value="Rosa">Rosa</option>
                <option value="Vermelho">Vermelho</option>
                <option value="Índigo">Índigo</option>
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
                type="text"
                name="fipe"
                id="fipe"
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full"
                value={infoCar?.value.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              />
            </div>
            <div className="flex flex-col w-full maxsm:w-auto">
              <label className="text-[14px] font-medium mb-[8px] text-grey1">
                Preço
              </label>
              <input
                type="text"
                name="preco"
                id="preco"
                className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px] w-full"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              Descrição
            </label>
            <textarea
              name="Descricao"
              id="descricao"
              className="rounded border-[1.5px] border-grey7 resize-none p-[10px] text-grey3 text-[14px] mb-[20px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              Imagem da capa
            </label>
            {/* <input
              type="image"
              name="Image"
              id="image"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            /> */}
            <input
              type="url"
              name="ImagePrincipal"
              id="imagePrincipal"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              1º Imagem da galeria
            </label>
            {/* <input
              type="image"
              name="Image"
              id="image"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            /> */}
            <input
              type="url"
              name="firstImage"
              id="firstImage"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[14px] font-medium mb-[8px]">
              2º Imagem de galeria
            </label>
            {/* <input
              type="image"
              name="Image"
              id="image"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            /> */}
            <input
              type="url"
              name="secondImagem"
              id="secondImagem"
              className="rounded border-[1.5px] border-grey7 p-[10px] text-grey3 text-[14px] mb-[20px]"
            />
          </div>
          <button className="w-[315px] h-[38px] rounded bg-brand4 text-brand1 text-[14px] font-600">
            Adicionar campo para imagem da galeria
          </button>
          <div className="mt-[42px] flex justify-end gap-[10px]">
            <button className="bg-grey6 h-[48px] w-[126px] text-grey2 font-600 text-[16px] rounded">
              Cancelar
            </button>

            <button className="bg-brand3 w-[193px] h-[48px] rounded text-white">
              Criar anúncio
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateAd;
