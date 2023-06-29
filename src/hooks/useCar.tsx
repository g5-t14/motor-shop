import { useContext } from "react";
import { CarContext } from "../providers/CarProvider";

export const useCar = () => {
  const carContext = useContext(CarContext);

  return carContext;
};
