import { ReactNode, createContext, useState, useEffect } from "react";
import { api } from "../services/api";

interface CarProviderProps {
  children: ReactNode;
}
interface Car {
  name: string;
}

interface CarContextValues {
  cars: string[];
}

export const CarContext = createContext({} as CarContextValues);

export const CarProvider = ({ children }: CarProviderProps) => {
  const [cars, setCars] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/cars`);
        const brandCars = response.data;
        const brandNames = Object.keys(brandCars);
        setCars(brandNames);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return <CarContext.Provider value={{ cars }}>{children}</CarContext.Provider>;
};
