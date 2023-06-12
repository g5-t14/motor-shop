// import { Dispatch, SetStateAction } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { api } from "../../services/api";
import { Modal } from "../Modal";
import { useCar } from "../../hooks/useCar";
interface ModalFilterTaskProps {
  toggleModal: () => void;
}

export const ModalFilterTask = ({ toggleModal }: ModalFilterTaskProps) => {
  const { cars } = useCar();

  return (
    <Modal toggleModal={toggleModal}>
      <div className="bg-neutral-100  w-[420px] h-[90%] rounded-2xl p-10 flex-col overflow-auto  ">
        <div className="flex-auto flex-col justify-center">
          <h2 className="text-[28px] font-bold mb-2 text-[28px] lexend">
            Marca
          </h2>
          <div className="overflow-auto h-175">
            {cars.map((car, index) => (
              <button
                key={index}
                className="block py-0 px-3 text-grey3 font-bold  border-0 bg-transparent mb-0 hover:underline"
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
                className="block py-0 px-3 text-grey3 border-0 font-bold  bg-transparent mb-0  hover:underline"
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
                  className="block py-0 px-3 text-grey3 font-bold  border-0 bg-transparent mb-0  hover:underline"
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
                  className="block py-0 px-3 text-grey3 font-bold  border-0 bg-transparent mb-0  hover:underline"
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
                className="block py-0 px-3 text-grey3 font-bold  border-0 bg-transparent mb-0  hover:underline"
              >
                {fuel}
              </button>
            ))}
          </div>
          <button
          className="w-[80%] h-[60px] rounded-2xl flex-grow-0 mx-5 my-5 visible lg:block bg-brand1 
        border-brand1 text-white hover:bg-brand2 
        font:bold hover:border-brand2 "
          onClick={toggleModal}
        >
          Ver Anuncios
        </button>
        </div>
      </div>
    </Modal>
  );
};
