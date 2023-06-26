import { useState } from "react";
import { useCar } from "../../../../hooks/useCar";
import { apiLocal } from "../../../../services/api";
import { CarProps } from "../../../Product";

const AsideHome = () => {
  const {
    setFilters,
    allCars,
    setSelectedBrand,
    selectedBrand,
    brandSearch,
    setArrayFilter,
    arrayFilter,
    setSearchBrand,
  } = useCar();
  const [activeFilter, setActiveFilter] = useState("");
  const [showModels, setShowModels] = useState(false);
  const [activeModelFilter, setActiveModelFilter] = useState("");
  const [modelFilter, setModelFilter] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [activeColorFilter, setActiveColorFilter] = useState("");
  const [colorsActive, setColorsActive] = useState(false);
  const [filtersActive, setFiltersActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  

  interface TAdsRequest {
    brand: string,
    model: string,
    year: string,
    fuel: string,
    mileage: string,
    color: [
      "Preto",
      "Cinza",
      "Marrom",
      "Vermelho",
      "Laranja",
      "Amarelo",
      "VerdeClaro",
      "VerdeEscuro",
      "AzulClaro",
      "AzulEscuro",
      "Roxo",
      "Rosa",
      "Branco",
    ],
    fipe_table: number,
    price: number,
    description: string,
    cover_img: string,
    is_active: boolean,
    pictures: string,
}
  

  const clickFilter = (category: string, filter: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category.toLowerCase()]: filter,
    }));
  };
  const clickColorFilter = (color: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      color: color,
    }));
  };

  const getModels = async (brand: string) => {
    try {
      const response = await apiLocal.get(`/ads?brand=${brand}`);
      const modelNames = response.data.map((model:TAdsRequest) => {
        const firstName = model.model.split(" ")[0];
        return firstName.charAt(0).toUpperCase() + firstName.slice(1);
      });
      const uniqueNames = Array.from(new Set<string>(modelNames));
      setModelFilter(uniqueNames);
      setActiveModelFilter("");

      const carsByBrand = allCars.filter(
        (car: CarProps) => car.brand === brand
      );
      setArrayFilter(carsByBrand);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredCars = selectedBrand ? arrayFilter : allCars;
  setSearchBrand(filteredCars);
  const filteredModels = selectedModel
    ? modelFilter.filter((model) => model === selectedModel)
    : modelFilter;

  return (
    <aside className="w-[454px] flex flex-col pl-5">
      <div className="mt-5">
        <h2 className="text-[28px] font-bold mb-2 text-[28px] lexend">Marca</h2>
        <div className="overflow-auto h-175">
          {filteredCars.map(
            (car: CarProps, index: number) => {
              const isBrandActive =
                activeFilter === car?.brand ||
                (showModels && selectedBrand === car?.brand);
              const isActiveCategory = activeCategory === car?.brand;
              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isBrandActive ? "underline" : ""
                  } ${isActiveCategory ? "active" : ""}`}
                  onClick={() => {
                    setSelectedBrand(car?.brand);
                    brandSearch(car.brand);
                    clickFilter("Marca", car.brand);
                    getModels(car.brand);
                  }}
                >
                  {car.brand
                    .split(" ")
                    .map(
                      (word: string) =>
                        word.slice(0, 1).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </button>
              );
            }
          )}
        </div>
      </div>
      {showModels && (
        <div className="mt-12">
          <h2 className="text-[28px] font-bold mb-2">Modelo</h2>
          <div>
            {filteredModels.map((name, index) => {
              const isModelActive =
                activeFilter === name ||
                activeFilter === name.split(" ")[0] ||
                activeModelFilter === name ||
                activeModelFilter === name.split(" ")[0];

              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isModelActive ? "underline" : ""
                  }`}
                  onClick={() => {
                    setActiveFilter(name);
                    setActiveModelFilter(name);
                    setSelectedModel(name);
                  }}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Cor</h2>
        <div>
          {[
            "Preto",
            "Cinza",
            "Marrom",
            "Vermelho",
            "Laranja",
            "Amarelo",
            "Verde Claro",
            "Verde Escuro",
            "Azul Claro",
            "Azul Escuro",
            "Roxo",
            "Rosa",
            "Branco",
          ].map((color, index) => {
            const isColorActive = activeColorFilter === color;

            return (
              <button
                key={index}
                className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                  isColorActive ? "underline" : ""
                }`}
                onClick={() => {
                  clickFilter("color", color);
                  clickColorFilter(color);
                  setFiltersActive(false);
                  setColorsActive(true);
                }}
                style={{
                  display: isColorActive || !colorsActive ? "block" : "none",
                }}
              >
                {color}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Ano</h2>
        <div>
          {["2022", "2021", "2018", "2015", "2013", "2012", "2010"].map(
            (year, index) => {
              const isYearActive = activeFilter === year;

              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isYearActive ? "underline" : ""
                  }`}
                  onClick={() => {
                    clickFilter("Ano", year);
                  }}
                >
                  {year}
                </button>
              );
            }
          )}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Combustível</h2>
        <div>
          {["Diesel", "Etanol", "Gasolina", "Flex"].map((fuel, index) => {
            const isFuelActive = activeFilter === fuel;

            return (
              <button
                key={index}
                className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                  isFuelActive ? "underline" : ""
                }`}
                onClick={() => {
                  clickFilter("Combustível", fuel);
                }}
              >
                {fuel}
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Km</h2>
        <div className="flex justify-start">
          <button className="w-[125px] h-[37px] mr-5 text-grey3 bg-grey5 font-bold ">
            Mínimo
          </button>
          <button className="w-[125px] h-[37px] text-grey3 bg-grey5 font-bold ">
            Máximo
          </button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2  font-bold ">Preço</h2>
        <div className="flex justify-start">
          <button className="w-[125px] h-[37px] mr-5 bg-grey5 text-grey3 font-bold ">
            Mínimo
          </button>
          <button className="w-[125px] h-[37px] text-grey3 bg-grey5 font-bold ">
            Máximo
          </button>
        </div>
      </div>
      {filtersActive && (
        <button
          className="block py-0 px-3 text-white font-bold border-0 bg-brand2 mt-[42px] hover:underline w-[279px] h-[48px] rounded"
          onClick={() => {
            setActiveFilter("");
            setActiveCategory("");
            setActiveColorFilter("");
            setSelectedBrand("");
            setSelectedModel("");
            setColorsActive(false);
            setShowModels(false);
            setFiltersActive(false);
          }}
        >
          Limpar filtros
        </button>
      )}
    </aside>
  );
};

export default AsideHome;
