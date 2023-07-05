import { SetStateAction, useState } from "react";
import { useCar } from "../../hooks/useCar";
import { apiLocal } from "../../services/api";
import { CarProps } from "../../pages/home";
import { GrClose } from "react-icons/gr";

interface ModalFilterTaskProps {
  toggleModal: () => void;
}

export const ModalFilterTask = ({ toggleModal }: ModalFilterTaskProps) => {
  const {
    allCars,
    setAllCars,
    setSelectedBrand,
    selectedBrand,
    brandSearch,
    setArrayFilter,
    arrayFilter,
    setSelectedFilters,
    selectedFilters,
    setSortBy,
    filtersActive,
    setFiltersActive,
  } = useCar();
  const [activeFilter, setActiveFilter] = useState("");
  const [showModels] = useState(false);
  const [activeModelFilter, setActiveModelFilter] = useState("");
  const [modelFilter, setModelFilter] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [activeColorFilter] = useState("");
  // const [filtersActive, setFiltersActive] = useState(false);
  const [activeCategory] = useState<string>("");

  const colors = [
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
  ];

  const clickFilter = async (category: string, filter: string) => {
    const updatedFilters = {
      ...selectedFilters,
      [category.toLowerCase()]: filter,
    };
    setSelectedFilters(updatedFilters);
    try {
      const filtersRequest = updatedFilters;
      const response = await apiLocal.get(`/ads`, {
        params: {
          ...filtersRequest,
        },
      });
      setAllCars(response.data);
      setArrayFilter(response.data);
      setFiltersActive(true);
    } catch (err) {
      console.log(err);
    }
  };
  const getUniqueColors = () => {
    const uniqueColors = Array.from(
      new Set(allCars.map((car) => car.color))
    ).filter((color) => colors.includes(color));
    return uniqueColors;
  };

  const uniqueColors = getUniqueColors();

  const getUniqueYears = () => {
    const uniqueYears = Array.from(
      new Set(allCars.map((car) => car.year))
    ).filter((year) =>
      [
        "2022",
        "2021",
        "2020",
        "2019",
        "2018",
        "2017",
        "2016",
        "2015",
        "2013",
        "2012",
        "2010",
      ].includes(year)
    );
    return uniqueYears;
  };
  const uniqueYears = getUniqueYears();
  const getUniqueFuels = () => {
    const uniqueFuels = Array.from(new Set(allCars.map((car) => car.fuel)));
    return uniqueFuels;
  };
  const uniqueFuels = getUniqueFuels();

  const getModels = async (brand: string) => {
    try {
      const response = await apiLocal.get(`/ads?brand=${brand}`);

      const modelNames = response.data.map((model: CarProps) => {
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
      setAllCars(carsByBrand);
    } catch (error) {
      console.log(error);
    }
  };
  const filteredCars = selectedBrand ? arrayFilter : allCars;

  const filteredModels = selectedModel
    ? modelFilter.filter((model) => model === selectedModel)
    : modelFilter;

  const uniqueBrands = Array.from(
    new Set(filteredCars.map((car: CarProps) => car.brand))
  );
  const sortCars = (sortType: SetStateAction<string>, sortBy: string) => {
    const sortedCarsCopy = [...allCars];

    if (sortBy === "km") {
      if (sortType === "min") {
        sortedCarsCopy.sort(
          (a, b) => parseInt(a.mileage) - parseInt(b.mileage)
        );
      } else if (sortType === "max") {
        sortedCarsCopy.sort(
          (a, b) => parseInt(b.mileage) - parseInt(a.mileage)
        );
      }
    } else if (sortBy === "price") {
      if (sortType === "min") {
        sortedCarsCopy.sort((a, b) => a.price - b.price);
      } else if (sortType === "max") {
        sortedCarsCopy.sort((a, b) => b.price - a.price);
      }
    }

    setSortBy(sortType);
    setAllCars(sortedCarsCopy);
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-full bg-black bg-opacity-50 flex items-center justify-center overflow-none pt-[80px]">
      <div className="w-full flex flex-col pl-5 bg-white overflow-auto  max-h-[100%] py-[40px] rounded">
        <header className="flex justify-between h-[40px] items-center pr-[30px] lexend">
          <h4>Filtro</h4>
          <button onClick={toggleModal} type="button" className="text-grey4">
            <GrClose />
          </button>
        </header>
        <div className="mt-5">
          <h2 className="text-[28px] font-bold mb-2 text-[28px] lexend">
            Marca
          </h2>
          <div className="overflow-auto h-175">
            {uniqueBrands.map((brand: string, index) => {
              const isBrandActive =
                activeFilter === brand ||
                (showModels && selectedBrand === brand);
              const isActiveCategory = activeCategory === brand;
              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isBrandActive ? "underline" : ""
                  } ${isActiveCategory ? "active" : ""}`}
                  onClick={() => {
                    brandSearch(brand);
                    setSelectedBrand(brand);
                    getModels(brand);
                    clickFilter("brand", brand);
                  }}
                >
                  {brand
                    .split(" ")
                    .map(
                      (word: string) =>
                        word.slice(0, 1).toUpperCase() + word.slice(1)
                    )
                    .join(" ")}
                </button>
              );
            })}
          </div>
        </div>
        {modelFilter.length > 0 && (
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
                      clickFilter("model", name);
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
            {uniqueColors.map((color, index) => {
              const isColorActive = activeColorFilter === color;

              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isColorActive ? "underline active" : ""
                  }`}
                  onClick={() => {
                    clickFilter("color", color);
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
            {uniqueYears.map((year, index) => {
              const isYearActive = activeFilter === year;

              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isYearActive ? "underline" : ""
                  }`}
                  onClick={() => {
                    clickFilter("year", year);
                  }}
                >
                  {year}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-[28px] font-bold mb-2">Combustível</h2>
          <div>
            {uniqueFuels.map((fuel, index) => {
              const isFuelActive = activeFilter === fuel;

              return (
                <button
                  key={index}
                  className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                    isFuelActive ? "underline" : ""
                  }`}
                  onClick={() => {
                    clickFilter("fuel", fuel);
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
            <button
              className="w-[125px] h-[37px] mr-5 text-grey3 bg-grey5 font-bold "
              onClick={() => sortCars("min", "km")}
            >
              Mínimo
            </button>
            <button
              className="w-[125px] h-[37px] text-grey3 bg-grey5 font-bold "
              onClick={() => sortCars("max", "km")}
            >
              Máximo
            </button>
          </div>
        </div>
        <div className="mt-12">
          <h2 className="text-[28px] font-bold mb-2  font-bold ">Preço</h2>
          <div className="flex justify-start">
            <button
              className="w-[125px] h-[37px] mr-5 bg-grey5 text-grey3 font-bold "
              onClick={() => sortCars("min", "price")}
            >
              Mínimo
            </button>
            <button
              className="w-[125px] h-[37px] text-grey3 bg-grey5 font-bold "
              onClick={() => sortCars("max", "price")}
            >
              Máximo
            </button>
          </div>
        </div>
        {filtersActive && (
          <button
            className="block py-0 px-3 text-white font-bold border-0 bg-brand1 mt-[42px] hover:underline w-[279px] min-h-[48px] rounded"
            onClick={() => {
              clickFilter("", "");
              setSelectedFilters({});
              setModelFilter([]);
              setActiveFilter("");
              setFiltersActive(false);
            }}
          >
            Limpar filtros
          </button>
        )}
        <div className="w-full flex justify-center">
          <button
            className="w-[80%] max-w-[300px] min-h-[48px] rounded flex-grow-0 mt-[20px] bg-brand1 
        border-brand1 text-white hover:bg-brand2 
        font:bold hover:border-brand2 "
            onClick={toggleModal}
          >
            Ver Anuncios
          </button>
        </div>
      </div>
    </div>
  );
};
