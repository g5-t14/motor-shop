import { useState } from "react";
import { useCar } from "../../../../hooks/useCar";

const AsideHome = () => {
  const { cars } = useCar();
  const [activeFilter, setActiveFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [filtersActive, setFiltersActive] = useState(false);

  return (
    <aside className="w-[454px] flex flex-col pl-5">
      <div className="mt-5">
        <h2 className="text-[28px] font-bold mb-2 text-[28px] lexend">Marca</h2>
        <div className="overflow-auto h-175">
          {cars.map((car, index) => (
            <button
              key={index}
              className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                activeFilter === car && filtersActive ? "underline" : ""
              }`}
              onClick={() => {
                setActiveFilter(car);
                setFiltersActive(true);
              }}
            >
              {car
                .split(" ")
                .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Modelo</h2>
        <div>
          {[
            "Civic",
            "Corolla",
            "Cruze",
            "Fit",
            "Gol",
            "Ka",
            "Onix",
            "Porsche 718",
          ].map((model, index) => (
            <button
              key={index}
              className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                activeFilter === model && filtersActive ? "underline" : ""
              }`}
              onClick={() => {
                setActiveFilter(model);
                setFiltersActive(true);
              }}
            >
              {model}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Cor</h2>
        <div>
          {["Azul", "Branca", "Cinza", "Prata", "Preta", "Verde"].map(
            (color, index) => (
              <button
                key={index}
                className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                  activeFilter === color && filtersActive ? "underline" : ""
                }`}
                onClick={() => {
                  setActiveFilter(color);
                  setFiltersActive(true);
                }}
              >
                {color}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Ano</h2>
        <div>
          {["2022", "2021", "2018", "2015", "2013", "2012", "2010"].map(
            (year, index) => (
              <button
                key={index}
                className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                  activeFilter === year && filtersActive ? "underline" : ""
                }`}
                onClick={() => {
                  setActiveFilter(year);
                  setFiltersActive(true);
                }}
              >
                {year}
              </button>
            )
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-[28px] font-bold mb-2">Combustível</h2>
        <div>
          {["Diesel", "Etanol", "Gasolina", "Flex"].map((fuel, index) => (
            <button
              key={index}
              className={`block py-0 px-3 text-grey3 font-bold border-0 bg-transparent mb-0 hover:underline ${
                activeFilter === fuel && filtersActive ? "underline" : ""
              }`}
              onClick={() => {
                setActiveFilter(fuel);
                setFiltersActive(true);
              }}
            >
              {fuel}
            </button>
          ))}
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
